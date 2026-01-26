import { BrowserRouter as Router } from "react-router-dom";
import Hero from "./components/hero";
import FrontendLayout from "./components/frontendLayout";
import EducationalCards from "./components/EducationalCards";
import { FirstAddsSection, FourthAddsSection, SecondAddsSection, ThirdAddsSection } from "./components/adds";
import Report from "./components/Report";
import Blog from "./components/Blog";
import AloPaloBlog from "./components/AloPaloBlog";

export default function App() {
  return (
    <Router>
      <FrontendLayout>
        <Hero />
        <FirstAddsSection/>
        <EducationalCards/>        
        <SecondAddsSection/>
        <Report/>
        <ThirdAddsSection/>
        <Blog/>
        <FourthAddsSection/>
        <AloPaloBlog/>

      </FrontendLayout>
    </Router>
  );
}
