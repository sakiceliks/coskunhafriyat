import "./globals.css"
import { getServices } from "@/lib/database"
import ClientLayout from "./client-layout"

export const metadata = {
  title: "Coşkun Hafriyat",
  description: "Profesyonel hafriyat, kazı ve yıkım hizmetleri",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const services = await getServices()

  return (
    <ClientLayout services={services}>
      {children}
    </ClientLayout>
  )
}
