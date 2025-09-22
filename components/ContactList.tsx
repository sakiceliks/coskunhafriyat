import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  const branches = [
    {
      id: 1,
      name: "Tepeören Şubesi",
      type: "Ana Şube",
      address: "Tepeören, Eski Ankara Asfaltı Cad., 34959 Tuzla/İstanbul (Total Benzinlik Yanı )",
      phone: "+90 533 323 93 71",
      phoneLabel: "Ana Hat",
      email: "emin@coskunhafriyat.com"
    },
    {
      id: 2,
      name: "Mudarlı Şubesi", 
      type: "Bölge Şubesi",
      address: "Mudarlı, 41400 Gebze/Kocaeli (Deniz Gıda Yanı)",
      phone: "+90 533 323 93 71",
      phoneLabel: "Ana Hat",
      email: "emin@coskunhafriyat.com"
    }
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold mb-6">
              <Phone className="w-4 h-4" />
              İletişim Bilgileri
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Şubelerimizle İletişime Geçin
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Size en yakın şubemizi seçin ve bizimle iletişime geçin
            </p>
          </div>

          {/* Branches Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600">
                {/* Branch Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {branch.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    branch.id === 1 
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  }`}>
                    {branch.type}
                  </span>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-1">
                        Adres
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {branch.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-1">
                        Telefon
                      </p>
                      <a 
                        href={`tel:${branch.phone}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium block"
                      >
                        {branch.phone}
                      </a>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {branch.phoneLabel}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-1">
                        E-posta
                      </p>
                      <a 
                        href={`mailto:${branch.email}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium break-all"
                      >
                        {branch.email}
                      </a>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Şube E-posta
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <a 
                    href={`tel:${branch.phone}`}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Ara
                  </a>
                  <a 
                    href={`mailto:${branch.email}`}
                    className="flex-1 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    E-posta
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
    {/*       <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <span className="font-semibold text-gray-900 dark:text-white">7/24 Acil Durum Hattı:</span>
              </p>
              <a 
                href="tel:+905321234567" 
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                +90 532 123 45 67
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;