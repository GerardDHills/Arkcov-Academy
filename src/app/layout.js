import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata = {
  title: 'Arkcov Academy — Your Mission Begins Here',
  description: 'Courses, films, games and mentorship that re-present medicine as art, for curious kids, families, students and future healers. A house of Arkcov Enterprises.',
};

export const viewport = {
  themeColor: '#0E1A3A',
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
