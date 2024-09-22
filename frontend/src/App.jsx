import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import AdminFeatures from "./components/adminfeatures/AdminFeatures";
import Contact from "./components/contact/Contact";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Newsletter from "./components/newsletter/Newsletter";
import Services from "./components/services/Services";
import Topusers from "./components/topusers/Topusers";
import { useUser } from "./context/UseUser";
function App() {
  const { theme } = useUser();
  return (
    <div className={`app ${theme === "dark" ? "dark" : ""}`}>
      <Navbar />
      <Hero />
      <About />
      <Topusers />
      <Services />
      <AdminFeatures />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
