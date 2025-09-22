"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  title: string
  description: string
  variant?: "primary" | "secondary" | "minimal"
  className?: string
}

export function CTASection({ 
  title, 
  description, 
  variant = "primary", 
  className = "" 
}: CTASectionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-amber-500 dark:bg-amber-600 text-black dark:text-white"
      case "secondary":
        return "bg-gray-900 dark:bg-gray-800 text-white dark:text-white"
      case "minimal":
        return "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      default:
        return "bg-amber-500 dark:bg-amber-600 text-black dark:text-white"
    }
  }

  const getButtonStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      case "secondary":
        return "bg-amber-500 dark:bg-amber-600 text-black dark:text-white hover:bg-amber-600 dark:hover:bg-amber-700"
      case "minimal":
        return "bg-amber-500 dark:bg-amber-600 text-black dark:text-white hover:bg-amber-600 dark:hover:bg-amber-700"
      default:
        return "bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    }
  }

  return (
    <section className={`py-12 md:py-20 ${getVariantStyles()} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            {title}
          </h2>
          <p className="text-base md:text-lg mb-8 md:mb-10 opacity-90">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+905333239371">
              <Button size="lg" className={`${getButtonStyles()} px-8 py-3`}>
                <Phone className="mr-2 h-5 w-5" />
                Hemen Ara
              </Button>
            </a>
            <Link href="/teklif-al">
              <Button 
                size="lg" 
                variant="outline" 
                className={`border-white dark:border-gray-300 text-white dark:text-white hover:bg-white/10 dark:hover:bg-gray-700 px-8 py-3`}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fiyat Teklifi Al
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
