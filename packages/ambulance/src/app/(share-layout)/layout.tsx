import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import MobileNav from '@/components/ui/mobile-nav';
import TransparentHeader from '@/components/header/transparent';
import TransparentHeader2 from '@/components/header/transparent2';

export default function ListingLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <TransparentHeader2 />
      <main className="flex-grow">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
