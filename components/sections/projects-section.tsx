"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, HardHat, Hammer } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { HoverCard } from "@/components/animations/hover-card"

interface Project {
  id: number
  title: string
  slug: string
  short_description: string
  image_url?: string
  location?: string
  project_type?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="py-12 md:py-20 bg-[#252A34]">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-500/20 text-amber-500 rounded-full text-sm font-medium mb-3 md:mb-4">
              Projelerimiz
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
              Başarılı Projelerimiz
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              Uzmanlığımızı ve mükemmellik taahhüdümüzü sergileyen başarılı projelerimizi keşfedin.
            </p>
          </div>
        </FadeIn>

        <StaggerIn direction="up" staggerDelay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {projects.length > 0 ? projects.slice(0, 6).map((project: Project) => (
              <HoverCard key={project.id}>
                <div className="bg-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-600">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={project.image_url || "/images/hero-4.png"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">
                      {project.short_description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {project.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{project.location}</span>
                        </div>
                      )}
                      {project.project_type && (
                        <div className="flex items-center">
                          <HardHat className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{project.project_type}</span>
                        </div>
                      )}
                    </div>

                    <Link href={`/projeler/${project.slug || project.id}`}>
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
                <div className="bg-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                  <Hammer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Projelerimiz Yakında</h3>
                  <p className="text-gray-300 text-sm">Başarılı projelerimiz şu anda güncelleniyor. Lütfen daha sonra tekrar kontrol edin.</p>
                </div>
              </div>
            )}
          </div>
        </StaggerIn>

        <div className="text-center mt-10">
          <Link href="/projeler">
            <AnimatedButton
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              hoverEffect="shine"
            >
              Tüm Projeleri Görün
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
