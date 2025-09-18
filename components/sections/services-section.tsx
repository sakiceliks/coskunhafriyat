"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, HardHat } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { HoverCard } from "@/components/animations/hover-card"

interface Service {
  id: number
  title: string
  slug: string
  short_description: string
  image_url?: string
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
              Hizmetlerimiz
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
              Profesyonel Hafriyat Hizmetleri
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              İhtiyacınıza özel hafriyat, kazı, yıkım ve nakliye çözümleri ile projelerinizi güvenle tamamlayın.
            </p>
          </div>
        </FadeIn>

        <StaggerIn direction="up" staggerDelay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {services.length > 0 ? services.slice(0, 6).map((service: Service) => (
              <HoverCard key={service.id}>
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={service.image_url || "/images/hero-2.png"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3">
                      {service.short_description}
                    </p>
                    <Link href={`/hizmetler/${service.slug}`}>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">
                        Detayları Görün
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </HoverCard>
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
                  <HardHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Hizmetler Yakında</h3>
                  <p className="text-gray-600 text-sm">Hizmetlerimiz şu anda güncelleniyor. Lütfen daha sonra tekrar kontrol edin.</p>
                </div>
              </div>
            )}
          </div>
        </StaggerIn>

        <div className="text-center mt-10">
          <Link href="/hizmetler">
            <AnimatedButton
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              hoverEffect="shine"
            >
              Tüm Hizmetleri Görün
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
