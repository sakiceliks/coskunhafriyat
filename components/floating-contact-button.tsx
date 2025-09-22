"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MessageCircle, Mail, X, Plus } from "lucide-react"
import { useReducedMotion } from "framer-motion"

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const contactOptions = [
    {
      icon: Phone,
      label: "Ara",
      href: "tel:+905333239371",
      color: "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/905333239371",
      color: "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800",
    },
    {
      icon: Mail,
      label: "E-posta",
      href: "mailto:info@coskunhafriyat.com",
      color: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="mb-4 space-y-3 bg-gray-800 dark:bg-gray-900 p-3 rounded-2xl shadow-2xl border border-gray-700 dark:border-gray-600"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.label}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : "_self"}
                rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0 : 0.2,
                  delay: index * 0.1 
                }}
                className={`flex items-center gap-3 ${option.color} text-white dark:text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 min-w-[140px]`}
                onClick={() => setIsOpen(false)}
              >
                <option.icon className="h-5 w-5" />
                <span className="font-medium">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen 
            ? "bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" 
            : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        }`}
        aria-label={isOpen ? "Kapat" : "İletişim seçenekleri"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white dark:text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white dark:text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
