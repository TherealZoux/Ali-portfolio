import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Feedback from './components/Feedback';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

gsap.registerPlugin(ScrollTrigger);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
`;

const StyledFooter = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const HomePage = () => {
  return (
    <>
      <div id="section-home">
        <Hero />
      </div>
      <div id="section-about">
        <About />
      </div>
      <div id="section-projects">
        <Projects />
      </div>
      <div id="section-feedback">
        <Feedback />
      </div>
      <div id="section-contact">
        <Contact />
      </div>
    </>
  );
};

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();

    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const id = section.getAttribute('id');
          if (id) {
            window.history.replaceState(null, '', `#${id}`);
          }
        }
      });
    });

    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <Router>
      <AppWrapper>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </MainContent>
        <StyledFooter>
          {new Date().getFullYear()} | Developed by omarrefay2004@gmail.com
        </StyledFooter>
      </AppWrapper>
    </Router>
  );
}

export default App;
