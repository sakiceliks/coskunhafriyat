"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Star, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { HoverCard } from "@/components/animations/hover-card"

interface Region {
  id: number
  name: string
  slug: string
  short_description: string
  image_url?: string
  is_featured: boolean
}

interface RegionsSectionProps {
  regions: Region[]
}

export default function RegionsSection({ regions }: RegionsSectionProps) {
  return (
    <section className="py-12 md:py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500/20 text-amber-500 rounded-full text-sm font-medium mb-3 md:mb-4">
              Bölgelerimiz
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
              İstanbul Geneli Hizmet
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Modern ekipmanlarımız ve deneyimli ekibimizle İstanbul'un her bölgesinde güvenilir hafriyat hizmetleri sunuyoruz.
            </p>
          </div>
        </FadeIn>

        <StaggerIn direction="up" staggerDelay={0.1}>
        <div className="relative">
  {/* Responsive Grid - 2 columns on mobile, more on larger screens */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
    {regions.length > 0 ? regions.map((region: Region) => (
      <Link key={region.id} href={`/bolgelerimiz/${region.slug}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white dark:bg-gray-700 rounded-xl p-4 h-28 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
          {/* Map Pin Icon */}
          <div className="relative mb-2">
            <MapPin className="h-6 w-6 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
          </div>
          
          {/* Region Name */}
          <h3 className="text-gray-900 dark:text-white font-bold text-center text-xs group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 leading-tight">
            {region.name}
          </h3>
        </motion.div>
      </Link>
    )) : (
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 flex items-center justify-center py-12">
        <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
          <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Bölgelerimiz Yakında</h3>
          <p className="text-gray-300 dark:text-gray-400 text-sm">Hizmet verdiğimiz bölgeler şu anda güncelleniyor. Lütfen daha sonra tekrar kontrol edin.</p>
        </div>
      </div>
    )}
  </div>
</div>

        </StaggerIn>

        <div className="text-center mt-10">
          <Link href="/bolgelerimiz">
            <AnimatedButton
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              hoverEffect="shine"
            >
              Tüm Bölgeleri Görün
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
