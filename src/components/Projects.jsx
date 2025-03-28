import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';

import aiPreview from '../assets/AI/Ai (1).jpg';
import ecommercePreview from '../assets/E-commerce/E-commerce (2).png';
import fashionPreview from '../assets/Fashion/Fashion (33).png';
import jewelryPreview from '../assets/Jewelry/Jewelry (1).png';
import manipulationPreview from '../assets/Manipulation/Manipulation (8).png';
import restorationPreview from '../assets/Old Restorations/Old (1).png';
import portraitPreview from '../assets/Portrait/Portrait (7).png';
import realEstatePreview from '../assets/Real State/Real state (1).png';
import weddingPreview from '../assets/Wedding/Wedding (1).png';
import removePreview from '../assets/remove/remove person (1).png';

const projects = [
  {
    id: 'ai',
    title: 'AI Art',
    description: 'Creative AI-generated artwork and designs',
    image: aiPreview,
    folder: 'AI',
    tags: ['AI', 'Digital Art', 'Creative']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Product photography and retouching',
    image: ecommercePreview,
    folder: 'E-commerce',
    tags: ['Product', 'Commercial', 'E-commerce']
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'High-end fashion photography and retouching',
    image: fashionPreview,
    folder: 'Fashion',
    tags: ['Fashion', 'Beauty', 'Editorial']
  },
  {
    id: 'jewelry',
    title: 'Jewelry',
    description: 'Luxury jewelry photography and editing',
    image: jewelryPreview,
    folder: 'Jewelry',
    tags: ['Jewelry', 'Luxury', 'Product']
  },
  {
    id: 'manipulation',
    title: 'Photo Manipulation',
    description: 'Creative photo manipulation and compositing',
    image: manipulationPreview,
    folder: 'Manipulation',
    tags: ['Manipulation', 'Creative', 'Compositing']
  },
  {
    id: 'restoration',
    title: 'Photo Restoration',
    description: 'Old photo restoration and enhancement',
    image: restorationPreview,
    folder: 'Old Restorations',
    tags: ['Restoration', 'Historical', 'Repair']
  },
  {
    id: 'portrait',
    title: 'Portrait',
    description: 'Professional portrait retouching',
    image: portraitPreview,
    folder: 'Portrait',
    tags: ['Portrait', 'Beauty', 'Professional']
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    description: 'Real estate photography enhancement for property listings and architectural showcases.',
    image: realEstatePreview,
    folder: 'Real State',
    tags: ['Real Estate', 'Architecture', 'Interior']
  },
  {
    id: 'wedding',
    title: 'Wedding',
    description: 'Wedding photography retouching',
    image: weddingPreview,
    folder: 'Wedding',
    tags: ['Wedding', 'Events', 'Portrait']
  },
  {
    id: 'remove',
    title: 'Remove and add person',
    description: 'Professional background removal and replacement',
    image: removePreview,
    folder: 'remove',
    tags: ['Background Removal', 'Clipping Path', 'Product']
  }
];

const ProjectsSection = styled.div`
  padding: 6rem 2rem;
  background-color: var(--bg-primary);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  overflow: visible;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem 0;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    pointer-events: none;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
  margin-bottom: 1rem;
  flex: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  background: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionDescription = styled.p`
  text-align: center;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const Projects = () => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>My Projects</SectionTitle>
        <SectionDescription>
          Explore my diverse portfolio of photo editing and retouching work across various categories
        </SectionDescription>
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} loading="lazy" />
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TagsContainer>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
