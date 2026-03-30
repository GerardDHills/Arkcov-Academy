import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata = {
  title: 'Arkcov Academy — Medical Entertainment That Builds Health Literacy',
  description: 'Streaming. Courses. Games. Mentorship. Scholarships. Arkcov Academy re-presents medicine as art — because it\'s cool to be smart.',
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
