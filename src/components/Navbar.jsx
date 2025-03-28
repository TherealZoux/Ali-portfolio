import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background-color: ${props => props.scrolled ? '#0a192f' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.scrolled ? 'var(--text-primary)' : '#ffffff'};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  span {
    background: ${props => props.scrolled ? 
      'linear-gradient(45deg, var(--primary-color), var(--accent-color))' : 
      'linear-gradient(45deg, #ffffff, var(--accent-color))'};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.scrolled ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.9)'};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.scrolled ? 
      'linear-gradient(45deg, var(--primary-color), var(--accent-color))' : 
      'rgba(255, 255, 255, 0.9)'};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${props => props.scrolled ? 'var(--accent-color)' : '#ffffff'};
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 12, 16, 0.95);
  backdrop-filter: blur(10px);
  padding: 5rem 2rem;
  z-index: 1000;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const SocialLink = styled(motion.a)`
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.includes('/project/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (isProjectPage) {
      navigate('/home');
      setTimeout(() => {
        const element = document.querySelector(target.replace('#', '#section-'));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(target.replace('#', '#section-'));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About Me" },
    { href: "#projects", text: "Projects" },
    { href: "#feedback", text: "Feedback" },
    { href: "#contact", text: "Contact" }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/Omar-Ref3y' },
    { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/omar-refay-b20081253' }
  ];

  return (
    <NavContainer scrolled={scrolled}>
      <NavContent>
        <Logo
          href="#home"
          scrolled={scrolled}
          onClick={(e) => handleNavClick(e, '#home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Ali's</span> Portfolio
        </Logo>

        <NavLinks>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              scrolled={scrolled}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.text}
            </NavLink>
          ))}
          <SocialLinks>
            {socialLinks.map((link) => (
              <SocialLink
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </SocialLink>
            ))}
          </SocialLinks>
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas fa-${isOpen ? 'times' : 'bars'}`}></i>
        </MobileMenuButton>

        <MobileMenu
          isOpen={isOpen}
          initial={false}
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              scrolled={true}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.text}
            </NavLink>
          ))}
          <SocialLinks>
            {socialLinks.map((link) => (
              <SocialLink
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </SocialLink>
            ))}
          </SocialLinks>
        </MobileMenu>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
