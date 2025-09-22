"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Phone, Mail, MapPin, X, ChevronRight, Menu, Instagram, Facebook, Twitter, Linkedin, Star, Clock, Users } from "lucide-react"
import logo from "@/public/coskunlogo.svg"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./mobile-menu"

interface NavbarProps {
  services: Array<{ title: string; slug: string }>
}

export function Navbar({ services }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetler", href: "/hizmetler" },
    { name: "Bölgelerimiz", href: "/bolgelerimiz" },
    { name: "Projeler", href: "/projeler" },
    { name: "İletişim", href: "/iletisim" }
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#252A34]/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-600 dark:border-gray-700 shadow-sm">
      <header className="relative z-20">
        {/* Top Bar */}
  
        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-32 h-12 relative">
                <Image 
                  src={logo}
                  alt="Coşkun Hafriyat Logo" 
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-white dark:text-white hover:bg-amber-500/20 dark:hover:bg-amber-500/20 hover:text-amber-500 dark:hover:text-amber-400 focus:bg-amber-500/20 dark:focus:bg-amber-500/20 focus:text-amber-500 dark:focus:text-amber-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-amber-500/30 dark:data-[active]:bg-amber-500/30 data-[state=open]:bg-amber-500/20 dark:data-[state=open]:bg-amber-500/20">
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/iletisim">
                <Button variant="outline" size="sm" className="border-amber-500 dark:border-amber-400 text-amber-500 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-black dark:hover:text-white bg-transparent dark:bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Hemen Ara
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="sm" className="bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Teklif Al
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white dark:text-white hover:bg-amber-500/20 dark:hover:bg-amber-500/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
                <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
                <MobileMenu 
                  navigationItems={navigationItems}
                  services={services} 
                  onClose={() => setIsMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="flex gap-3">
      <Link href="#" aria-label="Instagram" className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors">
        <Instagram className="h-4 w-4" />
      </Link>
      <Link href="#" aria-label="Facebook" className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors">
        <Facebook className="h-4 w-4" />
      </Link>
      <Link href="#" aria-label="Twitter" className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors">
        <Twitter className="h-4 w-4" />
      </Link>
      <Link href="#" aria-label="LinkedIn" className="text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors">
        <Linkedin className="h-4 w-4" />
      </Link>
    </div>
  )
}
