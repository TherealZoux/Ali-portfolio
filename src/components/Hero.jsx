import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  background: var(--bg-primary);
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 0 1rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TypedText = styled(TypeAnimation)`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 4vw, 1.2rem);
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

const Button = styled(motion.a)`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
  
  &.primary {
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    color: white;
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
`;

const ScrollText = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid var(--text-secondary);
  border-radius: 25px;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: var(--text-secondary);
    border-radius: 50%;
    animation: scrollDown 2s infinite;
  }

  @keyframes scrollDown {
    0% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Hero = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const handleScrollClick = () => {
    const aboutSection = document.querySelector('#section-about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
      const colors = ['var(--primary-color)', 'var(--accent-color)', '#ffffff'];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <HeroSection>
      <Canvas ref={canvasRef} />
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, I'm Ali
        </Title>
        <TypedText
          sequence={[
            'Photoshop Expert',
            1500,
            'High-End Image Retouching',
            1500,
            'AI-Generated Visuals',
            1500,
            'Background Removal & Object Isolation',
            1500,
            'Photo Restoration & Colorization',
            1500,
            'Lighting & Shadow Adjustments',
            1500,
            'Fast & High-Quality Delivery',
            1500,
          ]}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
        />
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A passionate creative professional delivering stunning visual experiences
        </Subtitle>
        <CTAButtons
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            href="#projects"
            className="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              const projectsSection = document.querySelector('#section-projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            View My Work
          </Button>
          <Button
            href="#contact"
            className="secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.querySelector('#section-contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get in Touch
          </Button>
        </CTAButtons>
      </HeroContent>
      <ScrollIndicator
        onClick={handleScrollClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ y: 5 }}
      >
        <ScrollText>Scroll Down</ScrollText>
        <ScrollIcon />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
