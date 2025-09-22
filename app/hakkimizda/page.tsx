import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Award, Clock, Target, Eye, Lightbulb, Compass, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getPageContent } from "@/lib/database"

export const metadata = {
  title: "Hakkımızda | Coşkun Hafriyat",
  description:
    "Coşkun Hafriyat'nın tarihçesi, değerleri ve uzman ekibimiz hakkında bilgi edinin. Mükemmeliyeti inşa etmeye adanmış bir firmayız.",
}

export default async function AboutPage() {
  // Page content'i veritabanından çek
  const pageContent = await getPageContent("about")
  
  // Content'i key-value çiftleri olarak organize et
  const content: { [key: string]: string } = {}
  pageContent.forEach((item: any) => {
    content[item.content_key] = item.content_value
  })

  // Default değerler (veritabanında yoksa kullanılacak)
  const defaultContent = {
    hero_title: "Coşkun Hafriyat Hakkında",
    hero_subtitle: "İnovasyon, kaliteli hizmet ve müşterilerimize sarsılmaz bağlılık ile mükemmeliyeti inşa ediyoruz.",
    hero_image: "/images/hakkimizda-team.png",
    story_title: "Hikayemiz",
    story_subtitle: "Mükemmellik Mirası İnşa Ediyoruz",
    story_content_1: "2000 yılında kurulan Coşkun Hafriyat, iş makinesi kiralama sektörünü yenilikçilik ve kaliteli hizmet anlayışıyla dönüştürme vizyonuyla küçük bir aile şirketi olarak başladı.",
    story_content_2: "Son yirmi yılda, konut, ticari ve endüstriyel sektörlerde 500'den fazla projeyi tamamlayarak lider bir kiralama firması haline geldik. Başarımız, mükemmelliğe, dürüstlüğe ve müşteri memnuniyetine olan bağlılığımız üzerine kurulmuştur.",
    story_content_3: "Bugün, Coşkun Hafriyat olarak, müşterilerimiz için olağanüstü sonuçlar sunmak amacıyla yeni teknolojileri ve sürdürülebilir uygulamaları benimseyerek sektörün sınırlarını zorlamaya devam ediyoruz.",
    story_image: "https://cm8xsbawnj19nezd.public.blob.vercel-storage.com/1758433013298-23a887d9-dbd8-4f60-9f69-feb1abcdac80.jpeg",
    values_title: "Değerlerimiz",
    values_subtitle: "İşimizi Yönlendiren İlkeler",
    mission_title: "Misyonumuz",
    mission_content: "İnovasyon, dürüstlük ve kaliteli hizmet ile müşteri beklentilerini aşan olağanüstü iş makinesi kiralama hizmetleri sunmak.",
    vision_title: "Vizyonumuz", 
    vision_content: "İş makinesi kiralama sektöründe en güvenilir ve yenilikçi şirket olmak, makine kalitesi, güvenliği ve müşteri memnuniyetinde yeni standartlar belirlemek.",
    approach_title: "Yaklaşımımız",
    approach_content: "Başarılı bir projenin temelinde işbirliği, yenilik ve detaylara gösterilen özen olduğuna inanıyoruz. Kaliteli hizmet anlayışını, son teknolojiye sahip makinelerimizle birleştirerek zamana meydan okuyan sonuçlar sunuyoruz."
  }

  // Veritabanından gelen değerleri kullan, yoksa default değerleri kullan
  const getContent = (key: string) => content[key] || defaultContent[key as keyof typeof defaultContent] || ""
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src={getContent("hero_image")} alt="Uzman ekibimiz" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{getContent("hero_title")}</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {getContent("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
    {/*   <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              Amacımız
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Misyonumuz ve Vizyonumuz</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Temel ilkelerimiz rehberliğinde, iş makinesi kiralama sektörünü dönüştürmeye ve müşterilerimiz için kalıcı değer yaratmaya çalışıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 dark:bg-amber-900 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Target className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Misyonumuz</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                İnovasyon, dürüstlük ve kaliteli hizmet ile müşteri beklentilerini aşan olağanüstü iş makinesi kiralama hizmetleri sunmak.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Müşterilerimizin projelerini güvenli, verimli ve zamanında tamamlamak için en son teknolojiye sahip makineler sunmak.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Ekibimiz arasında sürekli gelişim ve profesyonel büyüme kültürünü teşvik etmek.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Şeffaf iletişim ve etik uygulamalarla müşterilerimiz ve iş ortaklarımızla kalıcı ilişkiler kurmak.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 dark:bg-amber-900 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Eye className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Vizyonumuz</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                İş makinesi kiralama sektöründe en güvenilir ve yenilikçi şirket olmak, şunlarla tanınmak:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Makine kalitesi, güvenliği ve müşteri memnuniyetinde yeni standartlar belirlemek.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Çevresel etkiyi en aza indirirken verimliliği en üst düzeye çıkaran sorumlu kiralama uygulamalarına öncülük etmek.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Sorumlu iş uygulamaları ve anlamlı katılımla çalıştığımız topluluklarda olumlu değişim yaratmak.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-amber-50 dark:bg-amber-900/30 p-8 rounded-2xl max-w-3xl mx-auto">
              <div className="bg-amber-100 dark:bg-amber-900 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Yaklaşımımız</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                Başarılı bir projenin temelinde işbirliği, yenilik ve detaylara gösterilen özen olduğuna inanıyoruz. Kaliteli hizmet anlayışını, son teknolojiye sahip makinelerimizle birleştirerek zamana meydan okuyan sonuçlar sunuyoruz.
              </p>
              <Link href="/iletisim">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Bizimle Ortak Olun
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
                {getContent("story_title")}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{getContent("story_subtitle")}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                {getContent("story_content_1")}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {getContent("story_content_2")}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {getContent("story_content_3")}
              </p>
              <Link href="/iletisim">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  İletişime Geçin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src={getContent("story_image")} alt="Şirket geçmişi" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              {getContent("values_title")}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{getContent("values_subtitle")}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {getContent("values_description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Mükemmeliyet</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Planlamadan uygulamaya ve sonrasına kadar işimizin her alanında mükemmelliği hedefliyoruz.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Dürüstlük</h3>
              <p className="text-gray-700 dark:text-gray-300">
                İşimizi her zaman dürüstlük, şeffaflık ve etik uygulamalarla yürütüyoruz.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Yenilikçilik</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Müşterilerimiz için yenilikçi çözümler sunmak amacıyla yeni teknolojileri ve yöntemleri benimsiyoruz.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Güvenilirlik</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Sözlerimizi tutar, teslim tarihlerine uyar ve beklentileri sürekli olarak aşıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              Ekibimiz
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Yönetim Kadromuzla Tanışın</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Deneyimli yönetim ekibimiz, her projeye onlarca yıllık sektör uzmanlığını katıyor.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-amber-600 dark:text-amber-400 mb-4">{member.position}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {member.social.map((social, idx) => (
                      <Link
                        key={idx}
                        href={social.url}
                        className="text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      >
                        <social.icon className="h-5 w-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-16 bg-amber-500 dark:bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-black dark:text-gray-100 font-medium">Tamamlanan Proje</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <p className="text-black dark:text-gray-100 font-medium">Yıllık Deneyim</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <p className="text-black dark:text-gray-100 font-medium">Uzman Ekip Üyesi</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <p className="text-black dark:text-gray-100 font-medium">Müşteri Memnuniyeti</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Bizimle Çalışmaya Hazır Mısınız?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Proje ihtiyaçlarınızı görüşmek ve Coşkun Hafriyat'nin vizyonunuzu nasıl hayata geçireceğini keşfetmek için bugün bize ulaşın.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/iletisim">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                İletişime Geçin
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projeler">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 font-semibold px-8"
              >
                Projelerimizi Görüntüleyin
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
import { Linkedin, Twitter, Facebook } from "lucide-react"

const teamMembers = [
  {
    name: "Murat Güçlü",
    position: "CEO & Kurucu",
    bio: "İnşaat sektöründeki 30 yılı aşkın deneyimiyle Murat, Coşkun Hafriyat'yi yenilikçilik ve kalite vizyonuyla kurdu.",
    image: "/images/team-1.png",
    social: [
      { icon: Linkedin, url: "#" },
      { icon: Twitter, url: "#" },
      { icon: Facebook, url: "#" },
    ],
  },
  {
    name: "Ayşe Demir",
    position: "Operasyon Müdürü",
    bio: "Ayşe, projelerin zamanında, bütçe dahilinde ve en yüksek kalite standartlarında teslim edilmesini sağlayarak tüm operasyonları denetler.",
    image: "/images/team-2.png",
    social: [
      { icon: Linkedin, url: "#" },
      { icon: Twitter, url: "#" },
    ],
  },
  {
    name: "Mehmet Çelik",
    position: "Lojistik Şefi",
    bio: "Mehmet, makinelerin ve operatörlerin projeler için zamanında ve uygun şekilde hazırlanmasından ve taşınmasından sorumludur.",
    image: "/images/team-3.png",
    social: [
      { icon: Linkedin, url: "#" },
      { icon: Facebook, url: "#" },
    ],
  },
]