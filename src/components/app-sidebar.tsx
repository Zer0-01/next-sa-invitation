"use client"

import Link from "next/link"
import * as React from "react"
import {
  IconConfetti,
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconLogout,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin",
    email: "Firebase Auth",
    avatar: "",
  },
  navMain: [
    {
      title: "Home",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Guest",
      url: "/admin/dashboard/guest",
      icon: IconUsers,
    },
    {
      title: "Messages",
      url: "/admin/dashboard/messages",
      icon: IconMessageCircle,
    },
  ],
  navSecondary: [
    {
      title: "Public Site",
      url: "/",
      icon: IconConfetti,
    },
    {
      title: "Admin Login",
      url: "/admin/login",
      icon: IconLogout,
    },
    {
      title: "Search",
      url: "/admin/dashboard",
      icon: IconSearch,
    },
    {
      title: "Settings",
      url: "/admin/dashboard",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "/admin/dashboard",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/admin/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">SA Invitation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
