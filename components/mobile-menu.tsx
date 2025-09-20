"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, X, ChevronRight } from "lucide-react"
import Image from "next/image"

interface MobileMenuProps {
  navigationItems: Array<{ name: string; href: string }>
  services: Array<{ title: string; slug: string }>
  onClose: () => void
}

export function MobileMenu({ navigationItems, services, onClose }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full bg-[#252A34]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">CH</span>
          </div>
<Image src="/logo.png" alt="Logo" width={200} height={200} />           
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Menü</h3>
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-500/20 transition-colors text-white"
              >
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </a>
            ))}
          </div>

          <Separator className="bg-gray-600" />

          {/* Services */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Hizmetlerimiz</h3>
            {services.map((service) => (
              <a
                key={service.title}
                href={service.slug}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-500/20 transition-colors text-gray-200"
              >
                <span className="text-sm">{service.title}</span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </a>
            ))}
          </div>

          <Separator className="bg-gray-600" />

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">İletişim</h3>
            <div className="space-y-3">
              <a
                href="tel:+905362160992"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-500/20 transition-colors text-white"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">+90 536 216 09 92</div>
                  <div className="text-sm text-gray-400">Hemen ara</div>
                </div>
              </a>
              <a
                href="mailto:info@zeminustasi.com.yt"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-500/20 transition-colors text-white"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">info@coskunhafriyat.com.tr</div>
                  <div className="text-sm text-gray-400">E-posta gönder</div>
                </div>
              </a>
              <div className="flex items-center gap-3 p-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">İstanbul, Türkiye</div>
                  <div className="text-sm text-gray-400">Tüm bölgelere hizmet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-600 bg-gray-800">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button className="flex-1" onClick={onClose}>
              <Phone className="h-4 w-4 mr-2" />
              Ücretsiz Keşif
            </Button>
            <Button variant="outline" className="flex-1 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black bg-transparent" onClick={onClose}>
              Teklif Al
            </Button>
          </div>
         
        </div>
      </div>
    </div>
  )
}