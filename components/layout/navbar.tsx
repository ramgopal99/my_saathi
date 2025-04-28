'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { siteConfig } from '@/config/site'
import { useSession } from 'next-auth/react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { LucideIcon, Menu, X } from 'lucide-react'
import React, { useState } from 'react'

type NavItem = {
  title: string
  href?: string
  icon?: LucideIcon
  items?: {
    title: string
    href: string
    description: string
    icon?: LucideIcon
  }[]
}

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 shadow-sm pr-[var(--removed-body-scroll-bar-size)]">
      <div className="flex h-16 items-center px-4 sm:px-6 container mx-auto">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/" className="font-bold text-xl text-primary">
            {title || siteConfig.name}
          </Link>
          
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {siteConfig.mainNav.map((item: NavItem) => (
                <NavigationMenuItem key={item.href || `menu-item-${item.title}`}>
                  {item.items ? (
                    <NavigationMenuTrigger className="h-9 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black data-[active]:bg-gray-100 data-[active]:text-black data-[state=open]:bg-gray-100">
                      <span className="flex items-center gap-2">
                        {item?.icon && <item.icon className="w-4 h-4" />}
                        {item.title}
                      </span>
                    </NavigationMenuTrigger>
                  ) : (
                    <Link href={item.href || '#'} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        "h-9 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
                      )}>
                        <span className="flex items-center gap-2">
                          {item?.icon && <item.icon className="w-4 h-4" />}
                          {item.title}
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  )}

                  {item.items && (
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                        {item.items.map((subItem) => (
                          <li key={subItem.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
                              >
                                <div className="flex items-center gap-2">
                                  {subItem.icon && <subItem.icon className="h-4 w-4 text-black" />}
                                  <span className="text-sm font-medium text-black">{subItem.title}</span>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <Button
              variant="outline"
              onClick={() => {
                const dashboardPath = session.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
                window.location.href = dashboardPath;
              }}
              className="hidden sm:inline-flex"
            >
              {session.user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
            </Button>
          ) : (
            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="outline">
                Sign In
              </Button>
            </Link>
          )}
          
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 top-16 bg-white z-50 transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 space-y-4">
          {siteConfig.mainNav.map((item: NavItem) => (
            <div key={item.href || `mobile-menu-item-${item.title}`}>
              {item.items ? (
                <div className="space-y-2">
                  <div className="font-medium text-black py-2">
                    <span className="flex items-center gap-2">
                      {item?.icon && <item.icon className="w-4 h-4" />}
                      {item.title}
                    </span>
                  </div>
                  <div className="pl-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-2 text-sm text-gray-600 hover:text-black"
                      >
                        <div className="flex items-center gap-2">
                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                          {subItem.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="block py-2 text-black hover:text-gray-600"
                >
                  <span className="flex items-center gap-2">
                    {item?.icon && <item.icon className="w-4 h-4" />}
                    {item.title}
                  </span>
                </Link>
              )}
            </div>
          ))}
          
          {!session && (
            <div className="pt-4 border-t">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}