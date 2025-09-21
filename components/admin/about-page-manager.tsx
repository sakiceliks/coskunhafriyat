"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ui/image-upload"

interface AboutPageManagerProps {
  pageContent: any[]
}

export function AboutPageManager({ pageContent }: AboutPageManagerProps) {
  const [editingContent, setEditingContent] = useState<{ [key: string]: string }>({})
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  // Content'i key-value çiftleri olarak organize et
  const content: { [key: string]: string } = {}
  pageContent.forEach((item: any) => {
    content[item.content_key] = item.content_value
  })

  // Default değerler
  const defaultContent = {
    hero_title: "Coşkun Hafriyat Hakkında",
    hero_subtitle: "İnovasyon, kaliteli hizmet ve müşterilerimize sarsılmaz bağlılık ile mükemmeliyeti inşa ediyoruz.",
    hero_image: "/images/hakkimizda-team.png",
    story_title: "Hikayemiz",
    story_subtitle: "Mükemmellik Mirası İnşa Ediyoruz",
    story_content_1: "2000 yılında kurulan Coşkun Hafriyat, iş makinesi kiralama sektörünü yenilikçilik ve kaliteli hizmet anlayışıyla dönüştürme vizyonuyla küçük bir aile şirketi olarak başladı.",
    story_content_2: "Son yirmi yılda, konut, ticari ve endüstriyel sektörlerde 500'den fazla projeyi tamamlayarak lider bir kiralama firması haline geldik. Başarımız, mükemmelliğe, dürüstlüğe ve müşteri memnuniyetine olan bağlılığımız üzerine kurulmuştur.",
    story_content_3: "Bugün, Coşkun Hafriyat olarak, müşterilerimiz için olağanüstü sonuçlar sunmak amacıyla yeni teknolojileri ve sürdürülebilir uygulamaları benimseyerek sektörün sınırlarını zorlamaya devam ediyoruz.",
    story_image: "/images/hakkimizda-story.png",
    values_title: "Değerlerimiz",
    values_subtitle: "Bizi Yönlendiren Şey",
    values_description: "Temel değerlerimiz, müşterilerimizle nasıl etkileşimde bulunduğumuzdan her projeye nasıl yaklaştığımıza kadar yaptığımız her şeye rehberlik eder.",
    mission_title: "Misyonumuz",
    mission_content: "İnovasyon, dürüstlük ve kaliteli hizmet ile müşteri beklentilerini aşan olağanüstü iş makinesi kiralama hizmetleri sunmak.",
    vision_title: "Vizyonumuz", 
    vision_content: "İş makinesi kiralama sektöründe en güvenilir ve yenilikçi şirket olmak, makine kalitesi, güvenliği ve müşteri memnuniyetinde yeni standartlar belirlemek.",
    approach_title: "Yaklaşımımız",
    approach_content: "Başarılı bir projenin temelinde işbirliği, yenilik ve detaylara gösterilen özen olduğuna inanıyoruz. Kaliteli hizmet anlayışını, son teknolojiye sahip makinelerimizle birleştirerek zamana meydan okuyan sonuçlar sunuyoruz."
  }

  const getContent = (key: string) => editingContent[key] || content[key] || defaultContent[key as keyof typeof defaultContent] || ""

  const handleContentChange = (key: string, value: string) => {
    setEditingContent(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updates = Object.entries(editingContent).map(([key, value]) => ({
        page_name: "about",
        section_name: "content",
        content_key: key,
        content_value: value,
        content_type: "text"
      }))

      for (const update of updates) {
        await fetch("/api/admin/page-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(update)
        })
      }

      setEditingContent({})
      router.refresh()
    } catch (error) {
      console.error("Error saving content:", error)
      alert("İçerik kaydedilirken bir hata oluştu")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hakkımızda Sayfası Yönetimi</CardTitle>
          <CardDescription>Hakkımızda sayfasının tüm içeriklerini düzenleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Hero Section */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Hero Bölümü</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="hero_title">Başlık</Label>
                <Input
                  id="hero_title"
                  value={getContent("hero_title")}
                  onChange={(e) => handleContentChange("hero_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero_subtitle">Alt Başlık</Label>
                <Textarea
                  id="hero_subtitle"
                  value={getContent("hero_subtitle")}
                  onChange={(e) => handleContentChange("hero_subtitle", e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label>Hero Görsel</Label>
                <ImageUpload
                  value={getContent("hero_image")}
                  onChange={(value) => handleContentChange("hero_image", value)}
                  onRemove={() => handleContentChange("hero_image", "")}
                />
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Hikaye Bölümü</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="story_title">Bölüm Başlığı</Label>
                <Input
                  id="story_title"
                  value={getContent("story_title")}
                  onChange={(e) => handleContentChange("story_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="story_subtitle">Ana Başlık</Label>
                <Input
                  id="story_subtitle"
                  value={getContent("story_subtitle")}
                  onChange={(e) => handleContentChange("story_subtitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="story_content_1">İçerik 1</Label>
                <Textarea
                  id="story_content_1"
                  value={getContent("story_content_1")}
                  onChange={(e) => handleContentChange("story_content_1", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="story_content_2">İçerik 2</Label>
                <Textarea
                  id="story_content_2"
                  value={getContent("story_content_2")}
                  onChange={(e) => handleContentChange("story_content_2", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="story_content_3">İçerik 3</Label>
                <Textarea
                  id="story_content_3"
                  value={getContent("story_content_3")}
                  onChange={(e) => handleContentChange("story_content_3", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label>Hikaye Görseli</Label>
                <ImageUpload
                  value={getContent("story_image")}
                  onChange={(value) => handleContentChange("story_image", value)}
                  onRemove={() => handleContentChange("story_image", "")}
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Değerler Bölümü</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="values_title">Bölüm Başlığı</Label>
                <Input
                  id="values_title"
                  value={getContent("values_title")}
                  onChange={(e) => handleContentChange("values_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="values_subtitle">Ana Başlık</Label>
                <Input
                  id="values_subtitle"
                  value={getContent("values_subtitle")}
                  onChange={(e) => handleContentChange("values_subtitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="values_description">Açıklama</Label>
                <Textarea
                  id="values_description"
                  value={getContent("values_description")}
                  onChange={(e) => handleContentChange("values_description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Misyon ve Vizyon</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="mission_title">Misyon Başlığı</Label>
                <Input
                  id="mission_title"
                  value={getContent("mission_title")}
                  onChange={(e) => handleContentChange("mission_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="mission_content">Misyon İçeriği</Label>
                <Textarea
                  id="mission_content"
                  value={getContent("mission_content")}
                  onChange={(e) => handleContentChange("mission_content", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="vision_title">Vizyon Başlığı</Label>
                <Input
                  id="vision_title"
                  value={getContent("vision_title")}
                  onChange={(e) => handleContentChange("vision_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="vision_content">Vizyon İçeriği</Label>
                <Textarea
                  id="vision_content"
                  value={getContent("vision_content")}
                  onChange={(e) => handleContentChange("vision_content", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Approach */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Yaklaşım Bölümü</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="approach_title">Başlık</Label>
                <Input
                  id="approach_title"
                  value={getContent("approach_title")}
                  onChange={(e) => handleContentChange("approach_title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="approach_content">İçerik</Label>
                <Textarea
                  id="approach_content"
                  value={getContent("approach_content")}
                  onChange={(e) => handleContentChange("approach_content", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isSaving || Object.keys(editingContent).length === 0}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
