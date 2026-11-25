import Navbar from '@/components/Navbar';

export default function RoomsLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
    </>
  );
}
