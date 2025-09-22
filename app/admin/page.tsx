import { AuthProvider } from '@/components/auth/auth-context'
import { AuthGuard } from '@/components/auth/auth-guard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export const metadata = {
  title: "Yönetim Paneli | Coşkun Hafriyat",
  description: "Coşkun Hafriyat yönetim paneli - hizmetler, projeler ve blog yönetimi",
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AuthGuard>
        <AdminDashboard />
      </AuthGuard>
    </AuthProvider>
  )
}
