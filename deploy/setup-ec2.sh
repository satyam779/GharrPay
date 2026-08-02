#!/usr/bin/env bash
# GharrPay — one-shot EC2 setup script (Ubuntu 22.04 / 24.04)
#
# Usage:  bash deploy/setup-ec2.sh <your-git-repo-url>
# Example:
#   sudo bash deploy/setup-ec2.sh https://github.com/satyam779/gharrpay.git
#
# What it does:
#   1. Installs build tools, nginx, and Node.js 22 (NodeSource LTS)
#   2. Installs PM2 globally
#   3. Clones the repo and installs backend + frontend dependencies
#   4. Builds the frontend production bundle
#   5. Prompts for MONGO_URI / admin credentials and writes backend/.env
#      (JWT_SECRET is auto-generated with openssl)
#   6. Starts the app under PM2 (auto-restart + boot on reboot)
#   7. Configures nginx to reverse-proxy port 80 -> 127.0.0.1:5000

set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "ERROR: run with sudo (root required): sudo bash deploy/setup-ec2.sh <repo-url>"
  exit 1
fi

REPO_URL="${1:?Usage: sudo bash deploy/setup-ec2.sh <git-repo-url>}"
APP_DIR="/opt/gharrpay"
NODE_MAJOR=22

echo "==> Installing system packages (curl, build-essential, git, nginx)..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl build-essential git nginx

echo "==> Installing Node.js ${NODE_MAJOR} (NodeSource)..."
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
echo "    Node version: $(node --version)"

echo "==> Installing PM2..."
npm install -g pm2

echo "==> Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
  echo "    Repo already exists at $APP_DIR — pulling latest."
  git -C "$APP_DIR" fetch --all
  git -C "$APP_DIR" reset --hard origin/main
else
  git clone "$REPO_URL" "$APP_DIR"
fi
cd "$APP_DIR"

echo "==> Installing dependencies..."
npm ci --prefix backend
npm ci --prefix frontend

echo "==> Building frontend production bundle..."
npm run build --prefix frontend

echo "==> Writing backend/.env..."
if [ ! -f backend/.env ]; then
  read -r -p "MONGO_URI (e.g. mongodb+srv://user:pass@cluster.mongodb.net/gharrpay): " MONGO_URI
  read -r -p "ADMIN_USERNAME: " ADMIN_USERNAME
  read -r -s -p "ADMIN_PASSWORD: " ADMIN_PASSWORD; echo
  JWT_SECRET="$(openssl rand -hex 32)"
  cat > backend/.env <<EOF
MONGO_URI=$MONGO_URI
PORT=5000
ADMIN_USERNAME=$ADMIN_USERNAME
ADMIN_PASSWORD=$ADMIN_PASSWORD
JWT_SECRET=$JWT_SECRET
CORS_ORIGIN=http://localhost:5173
TRUST_PROXY=1
EOF
  echo "    backend/.env written (JWT_SECRET auto-generated)."
else
  echo "    backend/.env already exists — leaving it untouched."
fi

echo "==> Creating log directory..."
mkdir -p /var/log/gharrpay

echo "==> Starting app with PM2..."
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null | tail -n 3 || true

echo "==> Configuring nginx (port 80 -> 127.0.0.1:5000)..."
cp deploy/nginx-gharrpay.conf /etc/nginx/sites-available/gharrpay
ln -sf /etc/nginx/sites-available/gharrpay /etc/nginx/sites-enabled/gharrpay
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx || systemctl restart nginx

echo ""
echo "============================================================"
echo " GharrPay deployed!"
echo "   App:    http://$(curl -4 -s ifconfig.me)"
echo "   API:    http://$(curl -4 -s ifconfig.me)/api/health"
echo "   Admin:  http://$(curl -4 -s ifconfig.me)/admin"
echo ""
echo " Useful commands:"
echo "   pm2 logs gharrpay        # follow app logs"
echo "   pm2 status               # process state"
echo "   pm2 restart gharrpay     # restart app"
echo "   pm2 save                 # persist after changes"
echo "============================================================"
