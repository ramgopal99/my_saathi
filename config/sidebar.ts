import { 
  LayoutDashboard, 
  Users, 
  Settings,
} from "lucide-react"
import { LucideIcon } from "lucide-react"

// Type definition for menu items
interface MenuItem {
  groupLabel?: string
  menus?: {
    href: string
    label: string
    icon: LucideIcon
    active?: boolean
  }[]
}

// Export the menu items array
export const menuItems: MenuItem[] = [
  {
    groupLabel: "Main",
    menus: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard
      },
      {
        label: "Users",
        href: "/admin/users",
        icon: Users
      }
    ]
  },
  {
    groupLabel: "Management",
    menus: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings
      }
    ]
  }
] 