import Image from "next/image"
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CTASection } from "@/components/cta-section"

export const metadata = {
  title: "Bize Ulaşın | Coşkun Hafriyat",
  description:
    "Coşkun Hafriyat ile hafriyat, yıkım veya peyzaj projeleriniz için iletişime geçin, fiyat teklifi alın veya sorularınızı sorun.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/contact-hero.png" alt="Bize ulaşın" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bize Ulaşın</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Proje ihtiyaçlarınızı görüşmek veya fiyat teklifi almak için ekibimizle iletişime geçin.
          </p>
        </div>
      </section>

      {/* CTA Section 1 */}
      <CTASection
        title="Hemen İletişime Geçin"
        description="Projeleriniz için uzman ekibimizle görüşün ve ücretsiz fiyat teklifi alın. Size en uygun çözümü sunmaya hazırız."
        variant="primary"
      />

      {/* Contact Information */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
                İletişime Geçin
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Sizden Haber Almaktan Mutluluk Duyarız</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-10 text-lg">
                Hizmetlerimizle ilgili bir sorunuz mu var, fiyat teklifi mi almak istiyorsunuz, yoksa projenize başlamaya hazır mısınız? Yardımcı olmak için buradayız.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Ofis Adresimiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">123 Coşkun Hafriyat Sk, Sanayi Sitesi, İstanbul, 34000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Telefon Numaramız</h3>
                    <p className="text-gray-700 dark:text-gray-300">0536 216 09 92</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">E-Posta Adresimiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">info@guclukepce.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Çalışma Saatlerimiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">Pazartesi - Cuma: 08:00 - 17:00</p>
                    <p className="text-gray-700 dark:text-gray-300">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div id="quote-form" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ücretsiz Fiyat Teklifi Alın</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  İş makinesi kiralama projeniz için detaylı ve taahhütsüz bir fiyat teklifi almak için formu doldurun. Ekibimiz ihtiyaçlarınızı analiz edecek ve kapsamlı bir teklif sunacaktır.
                </p>
                <form className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Bize Bir Mesaj Gönderin</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adınız Soyadınız
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        E-Posta Adresiniz
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="ahmet@ornek.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefon Numaranız
                    </label>
                    <input
                      type="tel"
                      id="phone"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Fiyat Teklifi Talebi"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Hafriyat, yıkım, kanal kazısı gibi projenizin detaylarını anlatın..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white font-medium py-3">
                    Mesajı Gönder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section 2 */}
      <CTASection
        title="Hemen Arayın, Hemen Başlayalım"
        description="Projeleriniz için en uygun çözümü sunmak için hazırız. Hemen arayın ve size özel teklifimizi alın."
        variant="secondary"
      />

      {/* Map Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-300 dark:bg-gray-600 h-[400px] rounded-2xl overflow-hidden relative">
              {/* This would be replaced with an actual map component in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Etkileşimli Harita Buraya Gelecektir</p>
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