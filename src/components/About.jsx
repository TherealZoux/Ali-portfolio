import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MdPhotoCamera, MdEdit } from 'react-icons/md';
import { FaCamera, FaPaintBrush, FaPhotoVideo, FaCrop } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobelightroom } from 'react-icons/si';
import { optimizeImage, preloadImage } from '../utils/imageLoader';
import 'aos/dist/aos.css';

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  
  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AboutText = styled.div`
  flex: 1;
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const LeadText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const ImageContainer = styled(motion.div)`
  flex: 0.8;
  position: relative;
  max-width: 400px;
  width: 100%;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(
      45deg,
      rgba(var(--primary-rgb), 0.2),
      rgba(var(--accent-rgb), 0.2)
    );
  }

  @media (max-width: 968px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
`;

const SkillInfo = styled.div`
  text-align: center;
  width: 100%;
`;

const SkillTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
`;

const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
`;

const skills = [
  {
    icon: <MdEdit />,
    title: 'Photo Retoucher',
    description: 'Professional retouching and color grading'
  },
  {
    icon: <SiAdobephotoshop />,
    title: 'Photoshop Expert',
    description: 'Advanced manipulation and compositing'
  },
  {
    icon: <SiAdobelightroom />,
    title: 'Lightroom Expert',
    description: 'Color correction and batch processing'
  },
  {
    icon: <FaCamera />,
    title: 'AI Generated & Retouch',
    description: 'Composition and lighting techniques'
  }
];

const About = () => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 968);
  const isInView = useInView(ref, { 
    margin: "-10%",
    amount: 0.2,
    once: false
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.005;
      const moveY = (clientY - window.innerHeight / 2) * 0.005;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const profileImage = '/profile.jpg';

  useEffect(() => {
    preloadImage(profileImage, { width: 600 });
  }, []);

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <AboutContent
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isInView ? 1 : 0,
            transition: {
              duration: .8,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        >
          <AboutText>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 50
              }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              About Me
            </motion.h2>
            <motion.div 
              initial={{ 
                opacity: 0,
                x: isMobile ? 0 : -100,
                y: isMobile ? 50 : 0
              }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : (isMobile ? 0 : -100),
                y: isInView ? 0 : (isMobile ? 50 : 0)
              }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              <LeadText>
                I'm Ali, a Photoshop Expert and Retouching Specialist with over 10 years of experience in image editing and AI-generated visuals. I have worked with clients worldwide, delivering high-quality results with precision and efficiency
              </LeadText>
            </motion.div>
            
            <motion.div 
              initial={{ 
                opacity: 0,
                x: isMobile ? 0 : -100,
                y: isMobile ? 50 : 0
              }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : (isMobile ? 0 : -100),
                y: isInView ? 0 : (isMobile ? 50 : 0)
              }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
            >
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    as={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : 30
                    }}
                    transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.8 + (index * 0.1) }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.5 }
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <SkillInfo>
                      <SkillTitle>{skill.title}</SkillTitle>
                      <SkillDescription>{skill.description}</SkillDescription>
                    </SkillInfo>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </motion.div>
          </AboutText>
          
          <motion.div 
            initial={{ 
              opacity: 0,
              x: isMobile ? 0 : 100,
              y: isMobile ? 50 : 0
            }}
            animate={{ 
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : (isMobile ? 0 : 100),
              y: isInView ? 0 : (isMobile ? 50 : 0)
            }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          >
            <ImageContainer>
              <motion.img 
                src={optimizeImage(profileImage, { 
                  width: 600,
                  quality: 85
                })}
                alt="Ali's Profile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.95
                }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.5 }
                }}
                loading="eager"
              />
            </ImageContainer>
          </motion.div>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
