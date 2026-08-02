import { 
  CreditCard, 
  Wrench, 
  ShieldAlert, 
  HelpCircle, 
  FileText, 
  Bell 
} from "lucide-react";

export const tenantCenterCards = [
  {
    id: 1,
    title: "1-Click Rent & Utility Payments",
    description: "Pay rent seamlessly via UPI, Cards, Net Banking, or GharrPay Wallet with automatic GST tax invoices and payment receipt downloads.",
    icon: CreditCard,
    ctaText: "Pay Rent Online",
    badge: "Instant Approval"
  },
  {
    id: 2,
    title: "24/7 Rapid Maintenance Portal",
    description: "Raise plumbing, electrical, or appliance service tickets in 3 seconds. Track technician dispatch in real-time with 2-hour SLA.",
    icon: Wrench,
    ctaText: "Log Repair Ticket",
    badge: "< 2 hr SLA"
  },
  {
    id: 3,
    title: "Community Guidelines & House Rules",
    description: "Review visitor policies, quiet hours guidelines, shared space cleanliness protocols, and guest stay registration rules.",
    icon: ShieldAlert,
    ctaText: "View House Rules",
    badge: "Resident Safety"
  },
  {
    id: 4,
    title: "Resident Help & Escalation Desk",
    description: "Direct line to your property manager, city cluster head, and 24/7 emergency response officer for instant resolutions.",
    icon: HelpCircle,
    ctaText: "Contact Support",
    badge: "24/7 On-Call"
  },
  {
    id: 5,
    title: "Digital Agreement & KYC Documents",
    description: "Access your e-stamped rental agreement, police verification receipts, and security deposit certificate anytime.",
    icon: FileText,
    ctaText: "Download Agreement",
    badge: "Paperless KYC"
  },
  {
    id: 6,
    title: "Events & Community Announcements",
    description: "Stay updated on weekend rooftop movie nights, FIFA esports tournaments, networking mixers, and festive celebrations.",
    icon: Bell,
    ctaText: "Check Board",
    badge: "Weekly Events"
  }
];
