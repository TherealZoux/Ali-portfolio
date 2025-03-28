import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const ContactSection = styled.section`
  padding: 8rem 2rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(var(--primary-color-rgb), 0.1) 0%,
      rgba(var(--primary-color-rgb), 0) 70%
    );
    z-index: 0;
    animation: float 20s infinite ease-in-out;
  }

  &::before {
    top: -100px;
    left: -100px;
    animation-delay: -5s;
  }

  &::after {
    bottom: -100px;
    right: -100px;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(50px, 50px);
    }
    50% {
      transform: translate(0, 100px);
    }
    75% {
      transform: translate(-50px, 50px);
    }
  }
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem;
  background: linear-gradient(
    145deg,
    rgba(var(--bg-secondary-rgb), 0.8),
    rgba(var(--bg-secondary-rgb), 0.4)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.1),
    0 2px 8px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
`;

const ContactLinksContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LinkText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LinkTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.3px;
  transition: transform 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const LinkDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--bg-secondary-rgb), 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  color: var(--text-primary);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(var(--primary-color-rgb), 0.03),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(var(--primary-color-rgb), 0.1) 0%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    background: rgba(var(--bg-secondary-rgb), 0.7);
    box-shadow: 
      0 10px 20px -5px rgba(0, 0, 0, 0.1),
      0 4px 8px -2px rgba(0, 0, 0, 0.06);

    &::before {
      transform: translateX(100%);
    }

    &::after {
      opacity: 1;
    }

    ${LinkTitle} {
      transform: translateX(8px);
      color: var(--primary-color);
    }

    ${LinkDescription} {
      transform: translateX(8px);
    }

    svg {
      transform: scale(1.1) rotate(5deg);
    }
  }

  svg {
    font-size: 2rem;
    color: var(--primary-color);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;

    svg {
      font-size: 1.75rem;
    }
  }
`;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty('--mouse-x', `${x}%`);
    element.style.setProperty('--mouse-y', `${y}%`);
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 100
        }
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const linkVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const contactLinks = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "Professional inquiries welcome",
      href: "mailto:ali.sa3dawy2024@gmail.com"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "Direct communication for quick responses",
      href: "https://wa.me/+201000870099"
    },
    {
      icon: <SiUpwork />,
      title: "Upwork",
      description: "View my freelance portfolio and reviews",
      href: "https://www.upwork.com/freelancers/alim486?mp_source=share"
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      description: "Connect professionally and explore opportunities",
      href: "https://www.linkedin.com/in/ali-saadawy-abb071303/"
    }
  ];

  return (
    <ContactSection id="contact" ref={ref}>
      <Container
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionTitle variants={titleVariants}>
          Let's Connect
        </SectionTitle>
        <SectionSubtitle variants={titleVariants}>
          Ready to discuss your project? Choose your preferred method of communication below.
        </SectionSubtitle>
        
        <ContactLinksContainer
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
        >
          {contactLinks.map((link, index) => (
            <ContactLink
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariants}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--mouse-x', '50%');
                e.currentTarget.style.setProperty('--mouse-y', '50%');
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                {link.icon}
              </motion.div>
              <LinkText>
                <LinkTitle>{link.title}</LinkTitle>
                <LinkDescription>{link.description}</LinkDescription>
              </LinkText>
            </ContactLink>
          ))}
        </ContactLinksContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact;
