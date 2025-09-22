"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, X, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface MobileMenuProps {
  navigationItems: Array<{ name: string; href: string }>
  services: Array<{ title: string; slug: string }>
  onClose: () => void
}

export function MobileMenu({ navigationItems, services, onClose }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full bg-[#252A34] dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-600 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-32 h-32 relative">
            <Image 
              src="/coskunlogo.svg" 
              alt="Coşkun Hafriyat Logo" 
              fill
              className="object-contain"
            />
          </div>
          
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white dark:text-white hover:bg-amber-500/20 dark:hover:bg-amber-500/20">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">Menü</h3>
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-500/20 dark:hover:bg-amber-500/20 transition-colors text-white dark:text-white"
              >
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-400" />
              </a>
            ))}
          </div>

          <Separator className="bg-gray-600 dark:bg-gray-700" />

          {/* Services */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3">Hizmetlerimiz</h3>
            {services.map((service) => (
              <a
                key={service.title}
                href={service.slug}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-500/20 dark:hover:bg-amber-500/20 transition-colors text-gray-200 dark:text-gray-300"
              >
                <span className="text-sm">{service.title}</span>
                <ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-400" />
              </a>
            ))}
          </div>

          <Separator className="bg-gray-600 dark:bg-gray-700" />

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">İletişim</h3>
            <div className="space-y-3">
              <a
                href="tel:+905333239371"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-500/20 dark:hover:bg-amber-500/20 transition-colors text-white dark:text-white"
              >
                <Phone className="h-5 w-5 text-primary dark:text-amber-400" />
                <div>
                  <div className="font-medium">+90 533 323 93 71</div>
                  <div className="text-sm text-gray-400 dark:text-gray-400">Hemen ara</div>
                </div>
              </a>
              <a
                href="mailto:emin@zeminustasi.com.yt"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-500/20 dark:hover:bg-amber-500/20 transition-colors text-white dark:text-white"
              >
                <Mail className="h-5 w-5 text-primary dark:text-amber-400" />
                <div>
                  <div className="font-medium">emin@coskunhafriyat.com</div>
                  <div className="text-sm text-gray-400 dark:text-gray-400">E-posta gönder</div>
                </div>
              </a>
              <div className="flex items-center gap-3 p-3">
                <MapPin className="h-5 w-5 text-primary dark:text-amber-400" />
                <div>
                  <div className="font-medium">İstanbul, Türkiye</div>
                  <div className="text-sm text-gray-400 dark:text-gray-400">Tüm bölgelere hizmet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-600 dark:border-gray-700 bg-gray-800 dark:bg-gray-800">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button className="flex-1 bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white" onClick={onClose}>
              <Phone className="h-4 w-4 mr-2" />
              Ücretsiz Keşif
            </Button>
            <Link href="/teklif-al" onClick={onClose}>
              <Button variant="outline" className="flex-1 border-amber-500 dark:border-amber-400 text-amber-500 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-black dark:hover:text-white bg-transparent dark:bg-transparent">
                Teklif Al
              </Button>
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  )
}