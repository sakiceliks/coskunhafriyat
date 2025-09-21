"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Edit, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ui/image-upload"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PageContent {
  id: number
  page_name: string
  section_name: string
  content_type: string
  content_key: string
  content_value: string
}

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  image_url: string
  linkedin_url: string
  twitter_url: string
  facebook_url: string
  display_order: number
}

interface CompanyStat {
  id: number
  stat_key: string
  stat_value: string
  stat_label: string
  display_order: number
}

interface Faq {
  id: number
  question: string
  answer: string
  display_order: number
}

interface PageContentManagerProps {
  pageContent: PageContent[]
  teamMembers: TeamMember[]
  companyStats: CompanyStat[]
  faqs: Faq[]
}

export function PageContentManager({ pageContent, teamMembers, companyStats, faqs }: PageContentManagerProps) {
  const [editingContent, setEditingContent] = useState<{ [key: string]: string }>({})
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null)
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null)
  const router = useRouter()

  // Group content by page and section
  const groupedContent = pageContent.reduce(
    (acc, content) => {
      const key = `${content.page_name}_${content.section_name}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(content)
      return acc
    },
    {} as { [key: string]: PageContent[] },
  )

  const handleContentChange = (contentId: number, value: string) => {
    setEditingContent((prev) => ({
      ...prev,
      [contentId]: value,
    }))
  }

  const handleSaveContent = async (content: PageContent) => {
    const newValue = editingContent[content.id] || content.content_value

    try {
      const response = await fetch("https://coskunhafriyat.com/api/admin/page-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_name: content.page_name,
          section_name: content.section_name,
          content_key: content.content_key,
          content_value: newValue,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update content")
      }

      // Remove from editing state
      setEditingContent((prev) => {
        const newState = { ...prev }
        delete newState[content.id]
        return newState
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating content:", error)
      alert("İçerik güncellenirken bir hata oluştu")
    }
  }

  const handleSaveStats = async (formData: FormData) => {
    const updates = []

    for (const stat of companyStats) {
      const value = formData.get(`stat_${stat.stat_key}_value`) as string
      const label = formData.get(`stat_${stat.stat_key}_label`) as string

      updates.push({
        stat_key: stat.stat_key,
        stat_value: value,
        stat_label: label,
      })
    }

    try {
      const response = await fetch("https://coskunhafriyat.com/api/admin/company-stats", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stats: updates }),
      })

      if (!response.ok) {
        throw new Error("Failed to update stats")
      }

      router.refresh()
    } catch (error) {
      console.error("Error updating stats:", error)
      alert("İstatistikler güncellenirken bir hata oluştu")
    }
  }

  const handleTeamMemberSubmit = async (formData: FormData) => {
    const memberData = {
      name: formData.get("name") as string,
      position: formData.get("position") as string,
      bio: formData.get("bio") as string,
      image_url: formData.get("image_url") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      twitter_url: formData.get("twitter_url") as string,
      facebook_url: formData.get("facebook_url") as string,
      display_order: Number.parseInt(formData.get("display_order") as string) || 0,
    }

    try {
      const url = editingTeamMember ? `/api/admin/team-members/${editingTeamMember.id}` : "https://coskunhafriyat.com/api/admin/team-members"

      const response = await fetch(url, {
        method: editingTeamMember ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      })

      if (!response.ok) {
        throw new Error("Failed to save team member")
      }

      setIsTeamDialogOpen(false)
      setEditingTeamMember(null)
      router.refresh()
    } catch (error) {
      console.error("Error saving team member:", error)
      alert("Ekip üyesi kaydedilirken bir hata oluştu")
    }
  }

  const handleFaqSubmit = async (formData: FormData) => {
    const faqData = {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      display_order: Number.parseInt(formData.get("display_order") as string) || 0,
    }

    try {
      const url = editingFaq ? `/api/admin/faqs/${editingFaq.id}` : "https://coskunhafriyat.com/api/admin/faqs"

      const response = await fetch(url, {
        method: editingFaq ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqData),
      })

      if (!response.ok) {
        throw new Error("Failed to save FAQ")
      }

      setIsFaqDialogOpen(false)
      setEditingFaq(null)
      router.refresh()
    } catch (error) {
      console.error("Error saving FAQ:", error)
      alert("SSS kaydedilirken bir hata oluştu")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sayfa İçerik Yönetimi</h2>
        <p className="text-gray-600">Anasayfa, hakkımızda ve iletişim sayfalarının içeriklerini düzenleyin</p>
      </div>

      <Tabs defaultValue="homepage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="homepage">Anasayfa</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
          <TabsTrigger value="team">Ekip</TabsTrigger>
          <TabsTrigger value="stats">İstatistikler</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Anasayfa İçerikleri</CardTitle>
              <CardDescription>Ana sayfa bölümlerinin içeriklerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(groupedContent)
                .filter(([key]) => key.startsWith("homepage_"))
                .map(([sectionKey, contents]) => (
                  <div key={sectionKey} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4 capitalize">
                      {sectionKey.replace("homepage_", "").replace("_", " ")} Bölümü
                    </h3>
                    <div className="grid gap-4">
                      {contents.map((content) => (
                        <div key={content.id} className="flex items-center gap-4">
                          <Label className="min-w-[120px] text-sm font-medium">{content.content_key}:</Label>
                          {content.content_type === "image" ? (
                            <div className="flex-1">
                              <ImageUpload
                                value={editingContent[content.id] || content.content_value}
                                onChange={(value) => handleContentChange(content.id, value)}
                                onRemove={() => handleContentChange(content.id, "")}
                              />
                            </div>
                          ) : (
                            <div className="flex-1">
                              {content.content_key.includes("description") ||
                              content.content_key.includes("subtitle") ? (
                                <Textarea
                                  value={editingContent[content.id] || content.content_value}
                                  onChange={(e) => handleContentChange(content.id, e.target.value)}
                                  rows={3}
                                />
                              ) : (
                                <Input
                                  value={editingContent[content.id] || content.content_value}
                                  onChange={(e) => handleContentChange(content.id, e.target.value)}
                                />
                              )}
                            </div>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleSaveContent(content)}
                            disabled={!editingContent[content.id]}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hakkımızda Sayfası İçerikleri</CardTitle>
              <CardDescription>Hakkımızda sayfası bölümlerinin içeriklerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(groupedContent)
                .filter(([key]) => key.startsWith("about_"))
                .map(([sectionKey, contents]) => (
                  <div key={sectionKey} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4 capitalize">
                      {sectionKey.replace("about_", "").replace("_", " ")} Bölümü
                    </h3>
                    <div className="grid gap-4">
                      {contents.map((content) => (
                        <div key={content.id} className="flex items-center gap-4">
                          <Label className="min-w-[120px] text-sm font-medium">{content.content_key}:</Label>
                          {content.content_type === "image" ? (
                            <div className="flex-1">
                              <ImageUpload
                                value={editingContent[content.id] || content.content_value}
                                onChange={(value) => handleContentChange(content.id, value)}
                                onRemove={() => handleContentChange(content.id, "")}
                              />
                            </div>
                          ) : (
                            <div className="flex-1">
                              {content.content_key.includes("description") ||
                              content.content_key.includes("subtitle") ? (
                                <Textarea
                                  value={editingContent[content.id] || content.content_value}
                                  onChange={(e) => handleContentChange(content.id, e.target.value)}
                                  rows={3}
                                />
                              ) : (
                                <Input
                                  value={editingContent[content.id] || content.content_value}
                                  onChange={(e) => handleContentChange(content.id, e.target.value)}
                                />
                              )}
                            </div>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleSaveContent(content)}
                            disabled={!editingContent[content.id]}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Sayfası İçerikleri</CardTitle>
              <CardDescription>İletişim sayfası bölümlerinin içeriklerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(groupedContent)
                .filter(([key]) => key.startsWith("contact_"))
                .map(([sectionKey, contents]) => (
                  <div key={sectionKey} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4 capitalize">
                      {sectionKey.replace("contact_", "").replace("_", " ")} Bölümü
                    </h3>
                    <div className="grid gap-4">
                      {contents.map((content) => (
                        <div key={content.id} className="flex items-center gap-4">
                          <Label className="min-w-[120px] text-sm font-medium">{content.content_key}:</Label>
                          {content.content_type === "image" ? (
                            <div className="flex-1">
                              <ImageUpload
                                value={editingContent[content.id] || content.content_value}
                                onChange={(value) => handleContentChange(content.id, value)}
                                onRemove={() => handleContentChange(content.id, "")}
                              />
                            </div>
                          ) : (
                            <div className="flex-1">
                              {content.content_key.includes("description") ||
                              content.content_key.includes("subtitle") ? (
                                <Textarea
                                  value={editingContent[content.id] || content.content_value}
                                  onChange={(e) => handleContentChange(content.id, e.target.value)}
                                  rows={3}
                                />
                              ) : (
                                <Input
                                  value={editingContent[content.id] || content.content_value}
                                  onChange={(e) => handleContentChange(content.id, e.target.value)}
                                />
                              )}
                            </div>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleSaveContent(content)}
                            disabled={!editingContent[content.id]}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              {/* FAQ Management */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Sık Sorulan Sorular</h3>
                  <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni SSS
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni SSS Ekle</DialogTitle>
                        <DialogDescription>Yeni bir sık sorulan soru ekleyin</DialogDescription>
                      </DialogHeader>
                      <FaqForm onSubmit={handleFaqSubmit} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{faq.question}</h4>
                        <div className="flex gap-2">
                          <Dialog
                            open={editingFaq?.id === faq.id}
                            onOpenChange={(open) => !open && setEditingFaq(null)}
                          >
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setEditingFaq(faq)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>SSS Düzenle</DialogTitle>
                                <DialogDescription>Sık sorulan soruyu güncelleyin</DialogDescription>
                              </DialogHeader>
                              <FaqForm faq={faq} onSubmit={handleFaqSubmit} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Ekip Üyeleri</CardTitle>
                  <CardDescription>Hakkımızda sayfasındaki ekip üyelerini yönetin</CardDescription>
                </div>
                <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Üye
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Yeni Ekip Üyesi</DialogTitle>
                      <DialogDescription>Yeni bir ekip üyesi ekleyin</DialogDescription>
                    </DialogHeader>
                    <TeamMemberForm onSubmit={handleTeamMemberSubmit} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                      </div>
                      <Dialog
                        open={editingTeamMember?.id === member.id}
                        onOpenChange={(open) => !open && setEditingTeamMember(null)}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setEditingTeamMember(member)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Ekip Üyesini Düzenle</DialogTitle>
                            <DialogDescription>Ekip üyesi bilgilerini güncelleyin</DialogDescription>
                          </DialogHeader>
                          <TeamMemberForm member={member} onSubmit={handleTeamMemberSubmit} />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-gray-700">{member.bio}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Şirket İstatistikleri</CardTitle>
              <CardDescription>Anasayfa ve hakkımızda sayfasındaki istatistikleri düzenleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSaveStats} className="space-y-4">
                {companyStats.map((stat) => (
                  <div key={stat.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`stat_${stat.stat_key}_value`}>Değer</Label>
                      <Input
                        id={`stat_${stat.stat_key}_value`}
                        name={`stat_${stat.stat_key}_value`}
                        defaultValue={stat.stat_value}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`stat_${stat.stat_key}_label`}>Etiket</Label>
                      <Input
                        id={`stat_${stat.stat_key}_label`}
                        name={`stat_${stat.stat_key}_label`}
                        defaultValue={stat.stat_label}
                        required
                      />
                    </div>
                  </div>
                ))}
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  İstatistikleri Kaydet
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TeamMemberForm({ member, onSubmit }: { member?: TeamMember; onSubmit: (formData: FormData) => void }) {
  const [imageUrl, setImageUrl] = useState(member?.image_url || "")

  const handleSubmit = (formData: FormData) => {
    formData.set("image_url", imageUrl)
    onSubmit(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Ad Soyad</Label>
          <Input id="name" name="name" defaultValue={member?.name} required />
        </div>
        <div>
          <Label htmlFor="position">Pozisyon</Label>
          <Input id="position" name="position" defaultValue={member?.position} required />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Biyografi</Label>
        <Textarea id="bio" name="bio" defaultValue={member?.bio} rows={3} required />
      </div>

      <div>
        <ImageUpload
          label="Profil Fotoğrafı"
          value={imageUrl}
          onChange={setImageUrl}
          onRemove={() => setImageUrl("")}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input id="linkedin_url" name="linkedin_url" defaultValue={member?.linkedin_url} />
        </div>
        <div>
          <Label htmlFor="twitter_url">Twitter URL</Label>
          <Input id="twitter_url" name="twitter_url" defaultValue={member?.twitter_url} />
        </div>
        <div>
          <Label htmlFor="facebook_url">Facebook URL</Label>
          <Input id="facebook_url" name="facebook_url" defaultValue={member?.facebook_url} />
        </div>
      </div>

      <div>
        <Label htmlFor="display_order">Sıralama</Label>
        <Input id="display_order" name="display_order" type="number" defaultValue={member?.display_order || 0} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{member ? "Güncelle" : "Oluştur"}</Button>
      </div>
    </form>
  )
}

function FaqForm({ faq, onSubmit }: { faq?: Faq; onSubmit: (formData: FormData) => void }) {
  return (
    <form action={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="question">Soru</Label>
        <Input id="question" name="question" defaultValue={faq?.question} required />
      </div>

      <div>
        <Label htmlFor="answer">Cevap</Label>
        <Textarea id="answer" name="answer" defaultValue={faq?.answer} rows={4} required />
      </div>

      <div>
        <Label htmlFor="display_order">Sıralama</Label>
        <Input id="display_order" name="display_order" type="number" defaultValue={faq?.display_order || 0} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{faq ? "Güncelle" : "Oluştur"}</Button>
      </div>
    </form>
  )
}
