import Image from "next/image"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

import { CTASection } from "@/components/cta-section"
import { ContactForm } from "@/components/contact-form"
import ContactInfo from "@/components/ContactList"

export const metadata = {
  title: "Bize Ulaşın | Coşkun Hafriyat",
  description:
    "Coşkun Hafriyat ile hafriyat, yıkım veya peyzaj projeleriniz için iletişime geçin, fiyat teklifi alın veya sorularınızı sorun.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero CTA Section */}
      <div className="pt-16">
        <CTASection
          title="Hemen İletişime Geçin"
          description="Projeleriniz için uzman ekibimizle görüşün ve ücretsiz fiyat teklifi alın. Size en uygun çözümü sunmaya hazırız."
          variant="primary"
        />
      </div>


<ContactInfo/>
      {/* Contact Information */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
  <div className="container mx-auto px-4">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Lokasyonlarımız
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
          İstanbul ve Kocaeli bölgelerinde modern tesislerimizle kaliteli hizmet sunuyoruz
        </p>
      </div>
      
      {/* Locations Grid */}
      <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Tepeören Şubesi */}
        <div className="bg-white dark:bg-gray-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
          <div className="relative">
            <div className="h-[350px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d96478.79242069142!2d29.3254412!3d40.9165733!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad9696f4bc093%3A0xa5916071ec5604d6!2zS2lyYWzEsWsgS2Vww6dlIENvxZ9rdW4gSGFmcml5YXQ!5e0!3m2!1str!2str!4v1758579962860!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coşkun Hafriyat - Tepeören Şubesi"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">
                Ana Şube
              </span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tepeören Şubesi
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-gray-400 mt-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Tepeören, Eski Ankara Asfaltı Cad.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    34959 Tuzla/İstanbul
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Tepeören,+Eski+Ankara+Asfaltı+Cad.,+34959+Tuzla/İstanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 text-center"
                >
                  Yol Tarifi Al
                </a>
                <a 
                  href="tel:+905333239371"
                  className="p-3 border border-gray-300 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-400 rounded-xl transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mudarlı Şubesi */}
        <div className="bg-white dark:bg-gray-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
          <div className="relative">
            <div className="h-[350px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d96372.73197343168!2d29.4662985!3d40.9891908!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb2d0000837927%3A0xdc380dccf4b2fa78!2za2lyYWzEsWsga2Vww6dl!5e0!3m2!1str!2str!4v1758569938131!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coşkun Hafriyat - Mudarlı Şubesi"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
                Bölge Şubesi
              </span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Mudarlı Şubesi
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-gray-400 mt-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Mudarlı
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    41400 Gebze/Kocaeli
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Mudarlı,+41400+Gebze/Kocaeli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 text-center"
                >
                  Yol Tarifi Al
                </a>
                <a 
                  href="tel:+905333239371"
                  className="p-3 border border-gray-300 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-400 rounded-xl transition-colors duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-100 dark:border-amber-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Size En Yakın Şubemizi Bulun
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Profesyonel ekibimiz ve modern donanımımızla her iki lokasyonda da kaliteli hizmet sunuyoruz
          </p>
          <a 
            href="tel:+905333239371"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            İletişime Geçin
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              SSS
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">Hizmetlerimiz ve süreçlerimizle ilgili sıkça sorulan soruların yanıtlarını bulun.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
            <ContactForm/>
          </div>
        </div>
      </section>

      {/* CTA Section 3 */}
      <CTASection
        title="Sorularınız mı Var? Hemen Arayın!"
        description="FAQ bölümünde aradığınızı bulamadınız mı? Uzman ekibimizle doğrudan iletişime geçin ve tüm sorularınızı yanıtlayalım."
        variant="minimal"
      />
    </div>
  )
}

// Sample data
const faqs = [
  {
    question: "Ne tür projeler için kepçe kiralayabilirim?",
    answer:
      "Hafriyat, temel kazısı, kanal açma, peyzaj düzenleme, yıkım ve moloz kaldırma gibi geniş bir yelpazedeki projeleriniz için mini kepçe, beko loder, ekskavatör ve diğer iş makinelerimizi kiralayabilirsiniz.",
  },
  {
    question: "Nasıl fiyat teklifi alabilirim?",
    answer:
      "Web sitemizdeki iletişim formunu doldurarak, bizi arayarak veya e-posta göndererek fiyat teklifi alabilirsiniz. Projenizin detaylarını değerlendirerek size özel en uygun teklifi hazırlayacağız.",
  },
  {
    question: "Kiralama süresi nasıl belirleniyor?",
    answer:
      "İş makinesi kiralama süresi, projenizin kapsamına ve süresine göre saatlik, günlük veya aylık olarak belirlenebilir. İhtiyaçlarınıza en uygun çözümü sunmak için esnek kiralama seçenekleri sunuyoruz.",
  },
  {
    question: "Kiralama ücretine operatör dahil mi?",
    answer:
      "Evet, kiralama hizmetlerimize deneyimli ve belgeli operatör dahildir. Operatörümüz işinizin güvenli ve verimli bir şekilde tamamlanmasını sağlayacaktır.",
  },
  {
    question: "Kepçenizin bakımları düzenli yapılıyor mu?",
    answer:
      "Tüm iş makinelerimiz, projelerinizde herhangi bir aksama yaşanmaması için düzenli olarak bakım ve kontrollerden geçirilmektedir. Filomuz en yeni ve güvenilir makinelerden oluşmaktadır.",
  },
]