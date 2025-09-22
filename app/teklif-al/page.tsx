import React from 'react'
import { ContactForm } from '@/components/contact-form'
import { CTASection } from '@/components/cta-section'

export const metadata = {
  title: "Ücretsiz Teklif Al | Coşkun Hafriyat",
  description: "Hafriyat, yıkım ve iş makinesi kiralama hizmetleri için ücretsiz fiyat teklifi alın. Uzman ekibimizden detaylı bilgi ve keşif hizmeti.",
}

function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-6">
              Ücretsiz Teklif
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Projeniz İçin Ücretsiz Teklif Alın
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Uzman ekibimizden hafriyat, yıkım ve iş makinesi kiralama hizmetleri için detaylı fiyat teklifi alın. 
              Keşif ve danışmanlık hizmetimiz tamamen ücretsizdir.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Hemen İletişime Geçin"
        description="Projeleriniz için uzman ekibimizle görüşün ve ücretsiz fiyat teklifi alın. Size en uygun çözümü sunmaya hazırız."
        variant="primary"
      />
    </div>
  )
}

export default Page
