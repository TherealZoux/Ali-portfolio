import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';

const imageModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,gif}', { eager: true });

const ProjectDetailsContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 6rem 2rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--accent-color);
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover img {
    transform: scale(1.05);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const projectData = projects.find(p => p.id === id);
    if (!projectData) {
      navigate('/');
      return;
    }
    setProject(projectData);

    const projectImages = Object.entries(imageModules)
      .filter(([path]) => path.includes(`/${projectData.folder}/`))
      .map(([path, module]) => ({
        path,
        url: module.default
      }));

    setGalleryImages(projectImages);

    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!project) {
    return null;
  }

  return (
    <ProjectDetailsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Container>
        <BackButton onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i> Back
        </BackButton>
        {project && (
          <>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <Gallery>
              {galleryImages.map((image, index) => (
                <GalleryItem
                  key={index}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <GalleryImage src={image.url} alt={`Project image ${index + 1}`} />
                </GalleryItem>
              ))}
            </Gallery>
            <ImageModal
              isOpen={!!selectedImage}
              imageUrl={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          </>
        )}
      </Container>
    </ProjectDetailsContainer>
  );
};

const projects = [
  {
    id: 'ai',
    title: 'AI Art',
    description: 'Creative AI-generated artwork and designs showcasing the possibilities of artificial intelligence in digital art creation.',
    folder: 'AI'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Professional product photography and retouching for online stores and e-commerce platforms.',
    folder: 'E-commerce'
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'High-end fashion photography retouching and color grading for magazines and fashion brands.',
    folder: 'Fashion'
  },
  {
    id: 'jewelry',
    title: 'Jewelry',
    description: 'Luxury jewelry photography enhancement and retouching for premium brands.',
    folder: 'Jewelry'
  },
  {
    id: 'manipulation',
    title: 'Photo Manipulation',
    description: 'Creative photo manipulation and compositing for unique artistic expressions.',
    folder: 'Manipulation'
  },
  {
    id: 'restoration',
    title: 'Photo Restoration',
    description: 'Restoration and enhancement of old or damaged photographs, bringing memories back to life.',
    folder: 'Old Restorations'
  },
  {
    id: 'portrait',
    title: 'Portrait',
    description: 'Professional portrait retouching for headshots, modeling portfolios, and personal photos.',
    folder: 'Portrait'
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    description: 'Real estate photography enhancement for property listings and architectural showcases.',
    folder: 'Real State'
  },
  {
    id: 'wedding',
    title: 'Wedding',
    description: 'Wedding photography retouching to make those special moments even more beautiful.',
    folder: 'Wedding'
  },
  {
    id: 'remove',
    title: 'Background Removal',
    description: 'Professional background removal and replacement for product photos and portraits.',
    folder: 'remove'
  }
];

export default ProjectDetails;
