import {
  Contact,
  Database,
  DiffIcon,
  Flag,
  Grid3X3,
  LayoutDashboard,
  LucideIcon,
  ScrollText,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Slack,
  Store,
  User,
  Users,
} from "lucide-react";

export type Option = {
  isCollapsible?: boolean;
  name: string;
  link?: string;
  icon: LucideIcon;
  dropDownOptions?: Option[];
};

export const options: {
  heading: string;
  options: Option[];
}[] = [
  {
    heading: "Overview",
    options: [
      {
        isCollapsible: true,
        name: "Shop",
        icon: Store,
        dropDownOptions: [
          {
            name: "Products",
            link: "products",
            icon: ShoppingBasket,
          },
          {
            name: "Categories",
            link: "categories",
            icon: Grid3X3,
          },
          {
            name: "Brands",
            link: "brands",
            icon: Slack,
          },
          {
            name: "Settings",
            link: "settings",
            icon: Settings,
          },
        ],
      },
      // {
      //   isCollapsible: false,
      //   name: "Checkout",
      //   link: "checkout",
      //   icon: ShoppingCart,
      // },
      {
        isCollapsible: false,
        name: "Customers",
        link: "customers",
        icon: Contact,
      },
    ],
  },
];
