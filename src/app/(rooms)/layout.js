import Navbar from '@/components/Navbar';
import TabBar from '@/components/TabBar';

export default function RoomsLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <TabBar />
    </>
  );
}
