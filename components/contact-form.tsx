"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({
        type: "error",
        message: "Lütfen tüm gerekli alanları doldurun."
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Lütfen geçerli bir e-posta adresi girin."
      })
      return
    }

    setStatus({ type: "loading", message: "Mesajınız gönderiliyor..." })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız."
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        })
      } else {
        setStatus({
          type: "error",
          message: result.error || "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin."
      })
    }
  }

  return (
    <div className="w-full">
      <div id="quote-form" className="scroll-mt-24">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center md:text-left">
          Ücretsiz Fiyat Teklifi Alın
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center md:text-left">
          İş makinesi kiralama projeniz için detaylı ve taahhütsüz bir fiyat teklifi almak için formu doldurun. 
          Ekibimiz ihtiyaçlarınızı analiz edecek ve kapsamlı bir teklif sunacaktır.
        </p>
        
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm w-full">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center md:text-left">
            Bize Bir Mesaj Gönderin
          </h3>
          
          {/* Status Message */}
          {status.type !== "idle" && (
            <div className={`mb-6 p-4 rounded-lg flex items-center ${
              status.type === "success" 
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
                : status.type === "error"
                ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            }`}>
              {status.type === "success" && <CheckCircle className="h-5 w-5 mr-2" />}
              {status.type === "error" && <AlertCircle className="h-5 w-5 mr-2" />}
              {status.type === "loading" && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800 mr-2"></div>
              )}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adınız Soyadınız <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ahmet Yılmaz"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-Posta Adresiniz <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="ahmet@ornek.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Telefon Numaranız <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="(5xx) xxx-xx-xx"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Konu
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Fiyat Teklifi Talebi"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mesajınız <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Hafriyat, yıkım, kanal kazısı gibi projenizin detaylarını anlatın..."
            ></textarea>
          </div>
          
          <Button 
            type="submit" 
            disabled={status.type === "loading"}
            className="w-full bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.type === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
