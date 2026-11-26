import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata = {
  title: 'Arkcov Academy — Your Mission Begins Here',
  description: 'Courses, films, games and mentorship that re-present medicine as art, for curious kids, families, students and future healers. A house of Arkcov Enterprises.',
  applicationName: 'Arkcov Academy',
  appleWebApp: { capable: true, title: 'Arkcov', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
  other: { 'mobile-web-app-capable': 'yes' },
};

export const viewport = {
  themeColor: '#081027',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
