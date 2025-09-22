import Image from "next/image"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

import { CTASection } from "@/components/cta-section"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Bize Ulaşın | Coşkun Hafriyat",
  description:
    "Coşkun Hafriyat ile hafriyat, yıkım veya peyzaj projeleriniz için iletişime geçin, fiyat teklifi alın veya sorularınızı sorun.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}


      {/* CTA Section 1 */}
    <div className="mt-5">
    <CTASection
        title="Hemen İletişime Geçin"
        description="Projeleriniz için uzman ekibimizle görüşün ve ücretsiz fiyat teklifi alın. Size en uygun çözümü sunmaya hazırız."
        variant="primary"
      />
    </div>

      {/* Contact Information */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
                İletişime Geçin
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Sizden Haber Almaktan Mutluluk Duyarız</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-10 text-base md:text-lg">
                Hizmetlerimizle ilgili bir sorunuz mu var, fiyat teklifi mi almak istiyorsunuz, yoksa projenize başlamaya hazır mısınız? Yardımcı olmak için buradayız.
              </p>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start justify-center md:justify-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Tepeören Şubemiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">Tepeören, Eski Ankara Asfaltı Cad., 34959 Tuzla/İstanbul</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Mudarlı Şubemiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">Mudarlı, 41400 Gebze/Kocaeli</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Telefon Numaramız</h3>
                    <p className="text-gray-700 dark:text-gray-300">0533 323 93 71</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">E-Posta Adresimiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">emin@coskunhafriyat.com</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-start">
                  <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Çalışma Saatlerimiz</h3>
                    <p className="text-gray-700 dark:text-gray-300">7/24 Hizmet</p>
                    <p className="text-gray-700 dark:text-gray-300">Her gün kesintisiz hizmet</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section 2 */}
{/*       <CTASection
        title="Hemen Arayın, Hemen Başlayalım"
        description="Projeleriniz için en uygun çözümü sunmak için hazırız. Hemen arayın ve size özel teklifimizi alın."
        variant="secondary"
      />
 */}



      {/* Maps Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Şubelerimiz</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">İstanbul'un farklı bölgelerinde hizmet veren şubelerimizi ziyaret edebilirsiniz</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Tepeören Şubesi */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tepeören Şubesi</h3>
                  <p className="text-gray-700 dark:text-gray-300">Tepeören, Eski Ankara Asfaltı Cad., 34959 Tuzla/İstanbul</p>
                </div>
                <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-[400px] rounded-2xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d96478.79242069142!2d29.3254412!3d40.9165733!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad9696f4bc093%3A0xa5916071ec5604d6!2zS2lyYWzEsWsgS2Vww6dlIENvxZ9rdW4gSGFmcml5YXQ!5e0!3m2!1str!2str!4v1758570052669!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="Coşkun Hafriyat - Tepeören Mahallesi, Sanayi Caddesi No:123, Tuzla/İstanbul"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
              </div>

              {/* Mudarlı Şubesi */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mudarlı Şubesi</h3>
                  <p className="text-gray-700 dark:text-gray-300">Mudarlı, 41400 Gebze/Kocaeli</p>
                </div>
                <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-[400px] rounded-2xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d96372.73197343168!2d29.4662985!3d40.9891908!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb2d0000837927%3A0xdc380dccf4b2fa78!2za2lyYWzEsWsga2Vww6dl!5e0!3m2!1str!2str!4v1758569938131!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="Coşkun Hafriyat - Tepeören Mahallesi, Sanayi Caddesi No:123, Tuzla/İstanbul"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
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