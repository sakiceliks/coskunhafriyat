import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8425974547:AAG6POpc_siWKEQ-YDcvuBUg31q8CNVpxuk"
const TELEGRAM_CHAT_ID = "905717380"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 }
      )
    }

    // Format the message for Telegram
    const telegramMessage = formatTelegramMessage({
      name,
      email,
      phone,
      subject: subject || "Genel İletişim",
      message
    })

    // Send to Telegram
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

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Telegram API Error:", errorData)
      return NextResponse.json(
        { error: "Mesaj gönderilirken hata oluştu" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Mesajınız başarıyla gönderildi" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
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
