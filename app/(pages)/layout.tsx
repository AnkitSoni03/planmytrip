import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Header/navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default layout;