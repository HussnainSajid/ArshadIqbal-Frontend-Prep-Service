import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "nav-icon fas fa-tachometer-alt", // Font Awesome icon
    badge: {
      color: "info",
      text: "NEW"
    }
  },
  {
    name: "Management",
    title: true
  },
  {
    name: "Inventory",
    url: "/base",
    icon: "nav-icon fas fa-boxes", // Inventory icon
    children: [
      {
        name: "Inventory Receiving",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Inventory Tracking",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      },
      {
        name: "Inventory Reporting",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Return",
    url: "/base",
    icon: "nav-icon fas fa-undo-alt", // Return icon
    children: [
      {
        name: "Receiving Returns",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Inventory Tracking",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      },
      {
        name: "Product Reporting",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Customer",
    url: "/base",
    icon: "nav-icon fas fa-user", // Customer icon
    children: [
      {
        name: "Onboarding Forms",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Customer Dashboard",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Investor",
    url: "/base",
    icon: "nav-icon fas fa-money-bill-wave", // Investor icon
    children: [
      {
        name: "Onboarding Forms",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Investor Dashboard",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Product Fulfillment",
    title: true
  },
  {
    name: "Orders",
    url: "/base",
    icon: "nav-icon fas fa-shopping-cart", // Orders icon
    children: [
      {
        name: "Order Placement",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Order Processing",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      },
      {
        name: "Order Fulfillment",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      },
      {
        name: "Shipping Label",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      },
      {
        name: "Invoice Generation",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Shop Link",
    url: "/base",
    icon: "nav-icon fas fa-link", // Shop link icon
    children: [
      {
        name: "Order Sync",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Inventory Sync",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      },
      {
        name: "Fulfillment Updates",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Data Insights",
    url: "/base",
    icon: "nav-icon fas fa-chart-line", // Data insights icon
    children: [
      {
        name: "Customizable Reports",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Dashboard",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      },
      {
        name: "Data Export",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    name: "Manage Hub",
    title: true
  },
  {
    name: "Admin Panel",
    url: "/base",
    icon: "nav-icon fas fa-cogs", // Admin panel icon
    children: [
      {
        name: "User Management",
        url: "/base/accordion",
        icon: "nav-icon-bullet"
      },
      {
        name: "Rate Tariff Management",
        url: "/base/breadcrumbs",
        icon: "nav-icon-bullet"
      },
      {
        name: "System Configuration",
        url: "/base/cards",
        icon: "nav-icon-bullet"
      }
    ]
  }
];
