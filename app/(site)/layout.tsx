import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <Loader />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
      </Providers>
      <div className="vignette" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  );
}
