# Admin Authentication System

Bu klasör, admin paneli için localStorage tabanlı kimlik doğrulama sistemi içerir.

## Özellikler

- ✅ localStorage tabanlı oturum yönetimi
- ✅ 24 saatlik oturum süresi
- ✅ Güvenli giriş/çıkış işlemleri
- ✅ Otomatik oturum kontrolü
- ✅ Responsive login formu
- ✅ Loading states ve error handling

## Kullanım

### Varsayılan Giriş Bilgileri
- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

### Bileşenler

1. **AuthProvider**: Kimlik doğrulama context'ini sağlar
2. **AuthGuard**: Korumalı sayfalar için wrapper
3. **LoginForm**: Giriş formu bileşeni
4. **useAuth**: Kimlik doğrulama hook'u

### Örnek Kullanım

```tsx
import { AuthProvider, AuthGuard, useAuth } from '@/components/auth'

// App seviyesinde provider
<AuthProvider>
  <AuthGuard>
    <AdminDashboard />
  </AuthGuard>
</AuthProvider>

// Hook kullanımı
const { user, login, logout, isAuthenticated } = useAuth()
```

## Güvenlik Notları

- Bu sistem demo amaçlıdır
- Production'da gerçek bir authentication sistemi kullanılmalıdır
- Şifreler hash'lenmeli ve güvenli bir şekilde saklanmalıdır
- API endpoint'leri JWT token ile korunmalıdır

## Oturum Yönetimi

- Oturum bilgileri localStorage'da saklanır
- 24 saat sonra otomatik olarak sona erer
- Sayfa yenilendiğinde oturum kontrol edilir
- Çıkış yapıldığında tüm oturum verileri temizlenir
