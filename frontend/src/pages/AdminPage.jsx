import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  Building2,
  StickyNote,
  Trash2,
  RefreshCw,
  Inbox,
  PhoneCall,
  CheckCircle2,
  Clock,
  Lock,
  User,
  LogOut,
} from "lucide-react";

const TOKEN_KEY = "gharrpay_admin_token";

const STATUS_META = {
  new: { label: "New", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  contacted: { label: "Contacted", badge: "bg-gold-100 text-gold-600", dot: "bg-gold-500" },
  closed: { label: "Closed", badge: "bg-slate-200 text-slate-600", dot: "bg-slate-400" },
};

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const AdminPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
        setBookings([]);
        return;
      }
      if (!res.ok) throw new Error("Failed to load bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) loadBookings();
  }, [token, loadBookings]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const counts = {
    all: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    contacted: bookings.filter((b) => b.status === "contacted").length,
    closed: bookings.filter((b) => b.status === "closed").length,
  };

  const filtered = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.fullName?.toLowerCase().includes(q) ||
      b.phone?.includes(q) ||
      b.city?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem(TOKEN_KEY);
    setBookings([]);
  };

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      {/* Header */}
      <header className="bg-[#0B4DBA] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-400 text-[#0B4DBA] flex items-center justify-center font-extrabold text-lg">
              G
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-tight">GharrPay Admin</h1>
              <p className="text-blue-200 text-xs">Booking Inquiry Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors font-semibold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { key: "all", label: "Total Inquiries", icon: Inbox, color: "text-[#0B4DBA]" },
            { key: "new", label: "New", icon: Clock, color: "text-blue-500" },
            { key: "contacted", label: "Contacted", icon: PhoneCall, color: "text-gold-600" },
            { key: "closed", label: "Closed", icon: CheckCircle2, color: "text-emerald-500" },
          ].map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border transition-all text-left cursor-pointer ${
                filter === key
                  ? "border-[#0B4DBA] ring-2 ring-[#0B4DBA]/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className={`flex items-center gap-2 ${color}`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-3xl font-extrabold mt-2">{counts[key]}</p>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex gap-1.5 flex-wrap">
            {["all", "new", "contacted", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  filter === s
                    ? "bg-[#0B4DBA] text-white"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {(STATUS_META[s] || { label: "All" }).label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name / phone / city..."
              className="w-full sm:w-64 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4DBA]"
            />
            <button
              onClick={loadBookings}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0B4DBA] transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-2xl p-4 text-sm font-semibold mb-6">
            {error} — make sure the backend is running and MongoDB is connected.
          </div>
        )}

        {loading ? (
          <div className="text-center py-24 text-slate-400 text-sm font-semibold">
            Loading bookings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-16 text-center">
            <Inbox className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="mt-4 font-bold text-slate-500 dark:text-slate-400">
              No bookings here yet
            </p>
            <p className="text-sm text-slate-400 mt-1">
              New "Book Now" inquiries from the site will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((b) => {
              const meta = STATUS_META[b.status] || STATUS_META.new;
              return (
                <div
                  key={b._id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                        {b.fullName}
                      </h3>
                      <span
                        className={`shrink-0 text-[10px] font-extrabold uppercase tracking-wide px-2 py-1 rounded-full ${meta.badge}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#0B4DBA]" />
                        <a href={`tel:${b.phone}`} className="hover:text-[#0B4DBA] font-semibold">
                          {b.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#0B4DBA]" />
                        {b.city || "—"}
                      </p>
                      {b.roomType && (
                        <p className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#0B4DBA]" />
                          {b.roomType}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#0B4DBA]" />
                        {b.moveInDate ? formatDate(b.moveInDate) : "Flexible"}
                      </p>
                      {b.notes && (
                        <p className="flex items-start gap-2">
                          <StickyNote className="w-4 h-4 text-[#0B4DBA] mt-0.5 shrink-0" />
                          <span className="line-clamp-2">{b.notes}</span>
                        </p>
                      )}
                    </div>

                    <p className="mt-4 text-[11px] text-slate-400">
                      Submitted {formatDate(b.createdAt)} at {formatTime(b.createdAt)}
                    </p>
                  </div>

                  <div className="px-5 pb-4 flex items-center gap-2">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                      className="flex-1 px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0B4DBA]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      onClick={() => deleteBooking(b._id)}
                      className="p-2 rounded-lg bg-red-50 dark:bg-red-950 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid username or password");
      const data = await res.json();
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-[#0B4DBA] via-[#1253C4] to-indigo-900 p-6 text-center text-white">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gold-400 text-[#0B4DBA] flex items-center justify-center font-extrabold text-2xl">
            G
          </div>
          <h1 className="mt-3 text-xl font-extrabold">GharrPay Admin</h1>
          <p className="text-blue-200 text-sm mt-0.5">Booking Inquiry Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoFocus
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0B4DBA] text-sm"
              />
            </div>
          </div>

          {loginError && (
            <p className="text-red-500 text-xs font-semibold text-center">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0B4DBA] hover:bg-blue-800 text-white font-extrabold py-3 rounded-xl transition-colors text-sm cursor-pointer disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in to Dashboard"}
          </button>

          <Link
            to="/"
            className="block text-center text-xs text-slate-500 dark:text-slate-400 hover:text-[#0B4DBA] font-semibold"
          >
            ← Back to GharrPay site
          </Link>
        </form>
      </div>
    </div>
  );
};
