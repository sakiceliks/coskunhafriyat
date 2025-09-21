"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { HoverButton } from "@/components/ui/hover-button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface HeroSlide {
  id: number
  title: string
  subtitle?: string
  description?: string
  image_url: string
  button_text?: string
  button_link?: string
  button_text_2?: string
  button_link_2?: string
  is_active: boolean
  display_order: number
}

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Filter active slides and sort by display order
  const activeSlides = slides
    .filter(slide => slide.is_active)
    .sort((a, b) => a.display_order - b.display_order)

  useEffect(() => {
    // Show loading for a minimum time to ensure smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [slides])

  // Auto-advance slides
  useEffect(() => {
    if (activeSlides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [activeSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  if (isLoading || slides.length === 0 || activeSlides.length === 0) {
    return (
      <section className="relative w-full overflow-hidden h-[600px] md:h-[700px] lg:h-[800px] bg-gray-800">
        {/* Skeleton Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50"></div>
        </div>

        {/* Skeleton Content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Skeleton Subtitle */}
              <div className="inline-block px-4 py-2 bg-gray-600/50 rounded-full mb-4 animate-pulse">
                <div className="h-4 w-48 bg-gray-500/50 rounded"></div>
              </div>

              {/* Skeleton Title */}
              <div className="space-y-3 mb-6">
                <div className="h-12 md:h-16 bg-gray-600/50 rounded-lg animate-pulse"></div>
                <div className="h-12 md:h-16 bg-gray-600/50 rounded-lg animate-pulse w-3/4 mx-auto"></div>
              </div>

              {/* Skeleton Description */}
              <div className="space-y-2 mb-8">
                <div className="h-4 bg-gray-600/50 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-600/50 rounded animate-pulse w-5/6 mx-auto"></div>
                <div className="h-4 bg-gray-600/50 rounded animate-pulse w-4/6 mx-auto"></div>
              </div>

              {/* Skeleton Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <div className="h-12 w-48 bg-gray-600/50 rounded-lg animate-pulse"></div>
                <div className="h-12 w-48 bg-gray-600/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-600/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-gray-600/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-gray-600/50 animate-pulse"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlides[currentSlide].image_url}
              alt={activeSlides[currentSlide].title}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto text-center"
            >
              {activeSlides[currentSlide].subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-block px-4 py-2 bg-amber-500/90 text-white rounded-full text-sm font-medium mb-4"
                >
                  {activeSlides[currentSlide].subtitle}
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-md"
                dangerouslySetInnerHTML={{
                  __html: activeSlides[currentSlide].title.replace(
                    /<span class="text-amber-400">(.*?)<\/span>/g,
                    '<span class="text-amber-400">$1</span>'
                  )
                }}
              />

              {activeSlides[currentSlide].description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-xl md:max-w-2xl mx-auto drop-shadow-md"
                >
                  {activeSlides[currentSlide].description}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              >
                {activeSlides[currentSlide].button_text && activeSlides[currentSlide].button_link && (
                  <Link href={activeSlides[currentSlide].button_link!} className="w-full sm:w-auto">
                    <AnimatedButton
                      size="lg"
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 sm:px-8 w-full sm:w-auto"
                      hoverEffect="lift"
                      iconAnimation={true}
                    >
                      {activeSlides[currentSlide].button_text}
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                )}
                {activeSlides[currentSlide].button_text_2 && activeSlides[currentSlide].button_link_2 && (
                  <Link href={activeSlides[currentSlide].button_link_2!} className="w-full sm:w-auto">
                    <HoverButton
                      size="lg"
                      variant="outline"
                      className="text-white border-white bg-black/30 hover:bg-black/40 hover:text-white font-semibold px-6 sm:px-8 w-full sm:w-auto backdrop-blur-sm"
                      hoverEffect="glow"
                      rippleColor="rgba(255, 255, 255, 0.3)"
                    >
                      {activeSlides[currentSlide].button_text_2}
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </HoverButton>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex space-x-2">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-amber-500 scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
