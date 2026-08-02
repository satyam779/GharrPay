export const navItems = [
  { id: "about", label: "About Us", to: "why-choose-us", spy: true },
  { id: "amenities", label: "Amenities", to: "amenities", spy: true },
  {
    id: "locations",
    label: "Locations",
    dropdown: true,
    items: [
      { label: "Koramangala", to: "properties" },
      { label: "HSR Layout", to: "properties" },
      { label: "Whitefield", to: "properties" },
      { label: "Electronic City", to: "properties" },
      { label: "Bannerghatta Road", to: "properties" }
    ]
  },
  { id: "careers", label: "Careers", href: "#careers" },
  { id: "contact", label: "Contact", to: "contact", spy: true },
  { id: "faq", label: "FAQ", to: "faq", spy: true },
  { id: "homes", label: "Homes - Flat Rental", to: "properties", spy: true },
  {
    id: "christ",
    label: "Christ University",
    dropdown: true,
    items: [
      { label: "Bannerghatta Campus", to: "properties" },
      { label: "Kengeri Campus", to: "properties" },
      { label: "Central Campus", to: "properties" }
    ]
  }
];
