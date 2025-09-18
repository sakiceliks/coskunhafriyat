"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Phone, Mail, MapPin, X, ChevronRight, Menu, Instagram, Facebook, Twitter, Linkedin, Star, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

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
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 shadow-sm">
      <header className="relative z-20">
        {/* Top Bar */}
  
        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">CH</span>
              </div>
              <div className="hidden sm:block">
                <h3 className="text-xs font-bold text-white">Coşkun Hafriyat</h3>
                <p className="text-[8px] text-gray-300">Profesyonel Hafriyat Hizmetleri</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors text-white hover:bg-amber-500 hover:text-black focus:bg-amber-500 focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-amber-500 data-[state=open]:bg-amber-500">
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
                <Button variant="outline" size="sm" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black">
                  <Phone className="h-4 w-4 mr-2" />
                  Hemen Ara
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Mail className="h-4 w-4 mr-2" />
                  Teklif Al
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
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
      <Link href="#" aria-label="Instagram" className="text-amber-400 hover:text-amber-300 transition-colors">
        <Instagram className="h-4 w-4" />
      </Link>
      <Link href="#" aria-label="Facebook" className="text-amber-400 hover:text-amber-300 transition-colors">
        <Facebook className="h-4 w-4" />
      </Link>
      <Link href="#" aria-label="Twitter" className="text-amber-400 hover:text-amber-300 transition-colors">
        <Twitter className="h-4 w-4" />
      </Link>
      <Link href="#" aria-label="LinkedIn" className="text-amber-400 hover:text-amber-300 transition-colors">
        <Linkedin className="h-4 w-4" />
      </Link>
    </div>
  )
}

interface MobileMenuProps {
  navigationItems: Array<{ name: string; href: string }>
  services: Array<{ title: string; slug: string }>
  onClose: () => void
}

function MobileMenu({ navigationItems, services, onClose }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">CH</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Coşkun Hafriyat</h1>
            <p className="text-sm text-gray-300">Profesyonel Hafriyat Hizmetleri</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Menü</h3>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-500 hover:text-black transition-colors text-white"
              >
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>

          <Separator className="bg-gray-700" />

          {/* Services */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Hizmetlerimiz</h3>
            {services.map((service) => (
              <Link
                key={service.title}
                href={`/hizmetler/${service.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-500 hover:text-black transition-colors text-gray-300"
              >
                <span className="text-sm">{service.title}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>

          <Separator className="bg-gray-700" />

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">İletişim</h3>
            <div className="space-y-3">
              <Link
                href="tel:+905312812958"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-500 hover:text-black transition-colors text-white"
              >
                <Phone className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="font-medium">+90 531 281 29 58</div>
                  <div className="text-sm text-gray-400">Hemen ara</div>
                </div>
              </Link>
              <Link
                href="mailto:info@coskunhafriyat.com.tr"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-500 hover:text-black transition-colors text-white"
              >
                <Mail className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="font-medium">info@coskunhafriyat.com.tr</div>
                  <div className="text-sm text-gray-400">E-posta gönder</div>
                </div>
              </Link>
              <div className="flex items-center gap-3 p-3">
                <MapPin className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="font-medium text-white">İstanbul, Türkiye</div>
                  <div className="text-sm text-gray-400">Tüm bölgelere hizmet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 bg-gray-800">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Link href="/iletisim" className="flex-1" onClick={onClose}>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                <Phone className="h-4 w-4 mr-2" />
                Ücretsiz Keşif
              </Button>
            </Link>
            <Link href="/iletisim" className="flex-1" onClick={onClose}>
              <Button variant="outline" className="w-full border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black">
                <Mail className="h-4 w-4 mr-2" />
                Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}