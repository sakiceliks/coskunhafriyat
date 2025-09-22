import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8425974547:AAG6POpc_siWKEQ-YDcvuBUg31q8CNVpxuk"
const TELEGRAM_CHAT_ID = "905717380"

export async function POST(request: NextRequest) {
  console.log("🚀 API Route: Contact form POST isteği alındı")
  
  try {
    console.log("📥 Request body parse ediliyor...")
    const body = await request.json()
    console.log("📝 Gelen form verileri:", body)
    
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      console.log("❌ Gerekli alanlar eksik:", { name: !!name, email: !!email, phone: !!phone, message: !!message })
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 }
      )
    }

    console.log("✅ Form validasyonu başarılı")

    // Format the message for Telegram
    console.log("📝 Telegram mesajı formatlanıyor...")
    const telegramMessage = formatTelegramMessage({
      name,
      email,
      phone,
      subject: subject || "Genel İletişim",
      message
    })
    console.log("📄 Formatlanmış mesaj:", telegramMessage)

    // Send to Telegram
    console.log("📡 Telegram API'ye istek gönderiliyor...")
    console.log("🔗 Telegram URL:", `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`)
    console.log("💬 Chat ID:", TELEGRAM_CHAT_ID)
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      }
    )

    console.log("📡 Telegram API yanıtı:", {
      status: telegramResponse.status,
      statusText: telegramResponse.statusText,
      ok: telegramResponse.ok
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("❌ Telegram API Hatası:", errorData)
      console.error("❌ Telegram API Hata Detayları:", {
        status: telegramResponse.status,
        statusText: telegramResponse.statusText,
        error: errorData
      })
      return NextResponse.json(
        { error: `Telegram API hatası: ${errorData.description || "Bilinmeyen hata"}` },
        { status: 500 }
      )
    }

    const telegramResult = await telegramResponse.json()
    console.log("✅ Telegram mesajı başarıyla gönderildi:", telegramResult)

    return NextResponse.json(
      { message: "Mesajınız başarıyla gönderildi" },
      { status: 200 }
    )

  } catch (error) {
    console.error("💥 API Route Hatası:", error)
    console.error("💥 Hata Detayları:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace"
    })
    
    return NextResponse.json(
      { error: `Sunucu hatası: ${error instanceof Error ? error.message : "Bilinmeyen hata"}` },
      { status: 500 }
    )
  }
}

function formatTelegramMessage(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  const currentDate = new Date().toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return `
🆕 <b>YENİ İLETİŞİM FORMU</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Müşteri Bilgileri:</b>
• <b>Ad Soyad:</b> ${data.name}
• <b>E-posta:</b> ${data.email}
• <b>Telefon:</b> ${data.phone}

📋 <b>Konu:</b> ${data.subject}

💬 <b>Mesaj:</b>
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 <b>Tarih:</b> ${currentDate}
🌐 <b>Kaynak:</b> Coşkun Hafriyat Web Sitesi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ <i>Bu mesaj otomatik olarak gönderilmiştir.</i>
  `.trim()
}
