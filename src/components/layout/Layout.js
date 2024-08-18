import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { Toaster } from "react-hot-toast";

function Layout({ children }) {
  const style = { minHeight: "700px" };
  return (
    <>
      <Header />
      <div style={style}>{children}</div>
      <Toaster />
      <Footer />
    </>
  );
}

export default Layout;
