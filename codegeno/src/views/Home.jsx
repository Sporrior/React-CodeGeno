import Landing from "../views/Landing";
import "../css/Home.css";
import Abbonement from "./Abbonementen";
import Footer from "../components/footer";
import SpinComponent from "../components/spin-info";


const Homescreen = () => {
    return (
        <div className="container">
      <section id="section-1">
        <Landing />
      </section>
      <section id="section-2">
        <SpinComponent />
      </section>
      <section id="section-3">
        <Abbonement />
      </section>
      <section id="section-4">
        <Footer />
      </section>
    </div>
    );
}

export default Homescreen;