import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Logo, LogoText, FooterLogo } from './components/Logo';
import { 
  IconInstagram, 
  IconLinkedin, 
  IconWhatsapp, 
  IconMenu, 
  IconClose, 
  IconArrowRight,
  IconArrowLeft,
  IconMapPin, 
  IconHome,
  IconBed,
  IconBath,
  IconRuler,
  IconMaximize,
  IconCheck,
  IconMail
} from './components/Icons';

// --- Types ---
interface ProjectData {
  id: string;
  title: string;
  location: string;
  shortDescription: string;
  fullDescription: string[];
  areaConstruida: number;
  areaTerreno: number;
  quartos: number;
  banheiros: number;
  diferenciais: string[];
  mainImage: string;
  gallery: string[];
}

// --- Data ---
const PROJECTS: ProjectData[] = [
  {
    id: 'casa-horizonte',
    title: 'Casa Horizonte',
    location: 'Condomínio Horizon, Itupeva - SP',
    shortDescription: 'Uma obra prima de design moderno integrada à natureza.',
    fullDescription: [
      'A Casa Horizonte foi concebida para quem busca a perfeita harmonia entre a vida moderna e a tranquilidade do campo. Com uma fachada imponente em concreto aparente e madeira, o projeto se destaca pela elegância e sobriedade.',
      'O living com pé-direito duplo proporciona uma sensação única de amplitude, integrando-se completamente à área gourmet e ao deck da piscina. A iluminação natural é protagonista, banhando todos os ambientes através de grandes esquadrias do chão ao teto.',
      'No pavimento superior, a suíte master oferece uma vista panorâmica para a serra, criando um refúgio particular dentro de casa.'
    ],
    areaConstruida: 350,
    areaTerreno: 800,
    quartos: 4,
    banheiros: 6,
    diferenciais: [
      'Piscina com borda infinita e aquecimento solar',
      'Área gourmet completa com churrasqueira a gás',
      'Infraestrutura para automação total (Smart Home)',
      'Paisagismo assinado com espécies nativas',
      'Garagem para 4 veículos com ponto para carro elétrico'
    ],
    mainImage: 'https://picsum.photos/1200/800?image=10',
    gallery: [
      'https://picsum.photos/1200/800?image=10',
      'https://picsum.photos/800/600?image=11',
      'https://picsum.photos/800/600?image=12',
      'https://picsum.photos/800/600?image=13',
      'https://picsum.photos/800/600?image=28',
      'https://picsum.photos/800/600?image=29'
    ]
  },
  {
    id: 'residencia-vale',
    title: 'Residência Vale',
    location: 'Condomínio Fazenda da Grama, Itupeva - SP',
    shortDescription: 'Sofisticação e conforto em um dos condomínios mais exclusivos.',
    fullDescription: [
      'Localizada em um dos terrenos mais privilegiados do condomínio, a Residência Vale redefine o conceito de casa de campo de luxo. A arquitetura horizontal valoriza a privacidade e o convívio familiar.',
      'Os materiais nobres, como a pedra moledo e o cumaru, trazem calor e textura para a composição arquitetônica. A planta foi desenhada para separar a área íntima da social, garantindo silêncio e conforto absoluto.',
      'Um dos grandes destaques é a adega subterrânea climatizada e o fire pit externo, perfeitos para receber amigos em noites frias.'
    ],
    areaConstruida: 420,
    areaTerreno: 1000,
    quartos: 5,
    banheiros: 7,
    diferenciais: [
      'Sauna úmida integrada à piscina',
      'Adega subterrânea para 200 rótulos',
      'Fire pit (praça do fogo) no jardim',
      'Sistema de reuso de água de chuva',
      'Cozinha com ilha central em Mármore Paraná'
    ],
    mainImage: 'https://picsum.photos/1200/800?image=15',
    gallery: [
      'https://picsum.photos/1200/800?image=15',
      'https://picsum.photos/800/600?image=16',
      'https://picsum.photos/800/600?image=17',
      'https://picsum.photos/800/600?image=18',
      'https://picsum.photos/800/600?image=24',
      'https://picsum.photos/800/600?image=25'
    ]
  }
];

const LINKS = {
  instagram: "https://instagram.com/cetara.residences",
  linkedin: "https://linkedin.com/company/cetararesidences",
  whatsapp: "https://wa.me/5511996090377?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Cetara%20Residences.",
  email: "mailto:caue@cetara.com.br"
};

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NavButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="block text-sm tracking-widest uppercase hover:text-gray-500 transition-colors duration-300 py-2 md:py-0 cursor-pointer bg-transparent border-none p-0"
  >
    {children}
  </button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (id: string) => {
    setIsOpen(false);
    
    if (location.pathname === '/') {
      // If we are already home, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we are not home, navigate home and pass the target id
      navigate('/', { state: { targetId: id } });
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#F3EFE9]/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Logo width={200} height={113} className="transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <NavButton onClick={() => handleNavigation('conceito')}>Conceito</NavButton>
          <NavButton onClick={() => handleNavigation('projetos')}>Projetos</NavButton>
          <NavButton onClick={() => handleNavigation('contato')}>Contato</NavButton>
          
          <div className="flex items-center gap-4">
            <a 
              href={LINKS.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-cetara-dark px-6 py-2 text-xs uppercase tracking-widest hover:bg-cetara-dark hover:text-[#F3EFE9] transition-all duration-300"
            >
              Fale Conosco
            </a>
            <a 
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cetara-dark hover:text-gray-600 transition-colors"
              aria-label="WhatsApp"
            >
              <IconWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F3EFE9] border-t border-gray-200 shadow-lg p-6 md:hidden flex flex-col space-y-4 text-center md:text-left">
          <NavButton onClick={() => handleNavigation('conceito')}>Conceito</NavButton>
          <NavButton onClick={() => handleNavigation('projetos')}>Projetos</NavButton>
          <NavButton onClick={() => handleNavigation('contato')}>Contato</NavButton>
          <div className="flex flex-col items-center gap-4 mt-4">
            <a 
              href={LINKS.whatsapp}
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-cetara-dark text-[#F3EFE9] py-3 uppercase text-xs tracking-widest"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        <div className="fade-in-up">
          <Logo width={280} height={160} className="mb-4 md:mb-8 scale-110" />
        </div>
        
        <div className="w-24 h-[1px] bg-cetara-dark my-8 fade-in-up delay-200"></div>

        <p className="fade-in-up delay-500 font-baskerville text-xl md:text-2xl text-gray-700 tracking-wide">
          arquitetura de permanência
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M7 13L12 18L17 13M7 6L12 11L17 6" />
        </svg>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="conceito" className="scroll-mt-32 py-24 md:py-32 bg-[#EBE5DE]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-[500px] w-full bg-gray-300 overflow-hidden rounded-sm">
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Architecture detail" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border border-white/20 m-4"></div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl text-cetara-dark leading-tight">
              A essência do <br/> <span className="italic">bem viver</span>.
            </h2>
            <div className="h-[1px] w-16 bg-cetara-dark"></div>
            <p className="font-sans font-light text-gray-700 leading-relaxed text-lg">
              Na Cetara, acreditamos que uma casa é mais do que um espaço físico; é um legado. 
              Nossa missão é desenvolver residências de luxo que integrem sofisticação, 
              conforto e atemporalidade.
            </p>
            <p className="font-sans font-light text-gray-700 leading-relaxed text-lg">
              Especializados em condomínios fechados em <strong>Itupeva</strong> e região, 
              no interior de São Paulo, criamos projetos que respeitam a paisagem e elevam 
              a experiência de morar.
            </p>
            
            <div className="pt-4">
              <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-cetara-dark pb-1 hover:opacity-60 transition-opacity uppercase text-sm tracking-widest">
                Saiba Mais <IconArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 border border-gray-300 hover:border-cetara-dark transition-colors duration-300 bg-[#F3EFE9]">
    <Icon className="w-8 h-8 mb-6 text-cetara-dark" strokeWidth={1} />
    <h3 className="font-serif text-xl mb-4 text-cetara-dark">{title}</h3>
    <p className="font-sans font-light text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2 block">Diferenciais</span>
        <h2 className="font-serif text-3xl md:text-4xl">Por que Cetara?</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={IconMapPin}
          title="Localização Privilegiada"
          description="Focados em Itupeva e região, selecionamos os melhores condomínios fechados para garantir segurança e qualidade de vida."
        />
        <FeatureCard 
          icon={IconHome}
          title="Design Autoral"
          description="Projetos únicos que unem a arquitetura contemporânea com a funcionalidade necessária para o dia a dia."
        />
        <FeatureCard 
          icon={IconArrowRight} 
          title="Arquitetura de Permanência"
          description="Construímos não apenas para o agora, mas para o futuro. Materiais nobres e estética atemporal."
        />
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projetos" className="scroll-mt-32 py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2 block">Portfolio</span>
            <h2 className="font-serif text-3xl md:text-4xl text-cetara-dark">Breve Lançamento</h2>
          </div>
          <a href={LINKS.whatsapp} className="hidden md:block text-xs uppercase tracking-widest border-b border-gray-300 hover:border-black pb-1 transition-all">
            Ver detalhes
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <Link to={`/projeto/${project.id}`} key={project.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 relative">
                <img 
                  src={project.mainImage} 
                  alt={project.title} 
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                   <div className="bg-white/90 px-6 py-3 uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      Ver Projeto
                   </div>
                </div>
              </div>
              <h3 className="font-serif text-2xl mb-2">{project.title}</h3>
              <p className="font-sans text-sm text-gray-500 uppercase tracking-wide">{project.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contato" className="scroll-mt-20 py-6 bg-[#1A1A1A] text-[#F3EFE9]">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-2 flex justify-center opacity-80">
            <FooterLogo 
              width={300} 
              height={200} 
              className="text-[#F3EFE9] [&_svg]:max-w-full [&_svg]:h-auto" 
            />
        </div>
        
        <h2 className="font-serif text-3xl md:text-5xl mb-6">Vamos conversar sobre o seu futuro?</h2>
        
        <p className="font-sans font-light text-gray-400 mb-12 max-w-xl mx-auto">
          Entre em contato para saber mais sobre nossos projetos em andamento e oportunidades de investimento em Itupeva.
        </p>

        <a 
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#F3EFE9] text-[#1A1A1A] px-8 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
        >
          <IconWhatsapp size={20} />
          Iniciar conversa no WhatsApp
        </a>

        <div className="mt-16 flex justify-center space-x-8 items-center">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white text-gray-500 transition-colors">
            <IconInstagram size={24} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white text-gray-500 transition-colors">
            <IconLinkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white text-gray-500 transition-colors">
            <IconWhatsapp size={24} />
            <span className="sr-only">WhatsApp</span>
          </a>
          <a href={LINKS.email} className="hover:text-white text-gray-500 transition-colors">
            <IconMail size={24} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#151515] text-gray-600 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest">
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start gap-2">
          <span>&copy; {new Date().getFullYear()} Cetara Residences.</span>
          <span className="text-[10px] opacity-50">Bincorp Engenharia e Servicos LTDA - CNPJ 27.459.012/0001-35</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400">Política de Privacidade</a>
          <a href="#" className="hover:text-gray-400">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we have a targetId to scroll to coming from a navigation event
    if (location.state && (location.state as any).targetId) {
      const targetId = (location.state as any).targetId;
      const elem = document.getElementById(targetId);
      
      // Use a small timeout to allow layout to settle if needed, though usually immediate is fine
      setTimeout(() => {
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Features />
      <Projects />
    </>
  );
};

const ProjectPage = () => {
  const { id } = useParams();
  const currentIndex = PROJECTS.findIndex(p => p.id === id);
  const project = PROJECTS[currentIndex];
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close Lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => 
          prev !== null ? (prev + 1) % project.gallery.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => 
          prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Disable body scroll when lightbox is open
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Projeto não encontrado</h2>
          <Link to="/" className="border-b border-cetara-dark">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextProject = PROJECTS[nextIndex];
  const prevProject = PROJECTS[prevIndex];

  const StatBox = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
    <div className="flex flex-col items-center p-6 border border-gray-200 bg-white text-center">
      <Icon className="w-6 h-6 mb-3 text-cetara-dark" strokeWidth={1} />
      <span className="text-xs uppercase tracking-widest text-gray-500 mb-1">{label}</span>
      <span className="font-serif text-xl text-cetara-dark">{value}</span>
    </div>
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => 
      prev !== null ? (prev + 1) % project.gallery.length : null
    );
  };
  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => 
      prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null
    );
  };

  return (
    <div className="pt-40 min-h-screen pb-20">
      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[101]"
            aria-label="Fechar"
          >
            <IconClose size={32} />
          </button>

          <button 
            onClick={prevLightboxImage}
            className="absolute left-4 md:left-8 text-white hover:bg-white/10 p-2 rounded-full transition-colors z-[101]"
            aria-label="Anterior"
          >
            <IconArrowLeft size={40} />
          </button>

          <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
            <img 
              src={project.gallery[lightboxIndex]} 
              alt={`Galeria ${lightboxIndex + 1}`} 
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-widest uppercase bg-black/50 px-4 py-1 rounded-full">
              {lightboxIndex + 1} / {project.gallery.length}
            </div>
          </div>

          <button 
            onClick={nextLightboxImage}
            className="absolute right-4 md:right-8 text-white hover:bg-white/10 p-2 rounded-full transition-colors z-[101]"
            aria-label="Próximo"
          >
            <IconArrowRight size={40} />
          </button>
        </div>
      )}

      {/* Project Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden group z-0">
        <img 
          src={project.mainImage} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-6">
             <span className="block text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Portfólio Cetara</span>
             <h1 className="font-serif text-4xl md:text-6xl mb-4">{project.title}</h1>
             <p className="font-sans font-light text-sm md:text-base uppercase tracking-wide opacity-90">{project.location}</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Link 
          to={`/projeto/${prevProject.id}`} 
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 z-20"
          aria-label="Projeto anterior"
        >
          <IconArrowLeft size={32} />
        </Link>
        <Link 
          to={`/projeto/${nextProject.id}`} 
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 z-20"
          aria-label="Próximo projeto"
        >
          <IconArrowRight size={32} />
        </Link>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-2xl md:text-3xl italic mb-8">
            "{project.shortDescription}"
          </h2>
          <div className="w-16 h-[1px] bg-cetara-dark mx-auto mb-8"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <StatBox icon={IconRuler} label="Área Construída" value={`${project.areaConstruida}m²`} />
          <StatBox icon={IconMaximize} label="Área Terreno" value={`${project.areaTerreno}m²`} />
          <StatBox icon={IconBed} label="Quartos" value={project.quartos} />
          <StatBox icon={IconBath} label="Banheiros" value={project.banheiros} />
        </div>

        {/* Description & Differentials */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          {/* Description */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl mb-6">Sobre o Projeto</h3>
            {project.fullDescription.map((paragraph, idx) => (
              <p key={idx} className="font-sans font-light text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Differentials */}
          <div className="bg-white p-8 md:p-10 border border-gray-200">
            <h3 className="font-serif text-2xl mb-8">Diferenciais</h3>
            <ul className="space-y-4">
              {project.diferenciais.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <IconCheck className="w-5 h-5 text-cetara-dark shrink-0 mt-0.5" strokeWidth={1} />
                  <span className="font-sans font-light text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-24">
          <h3 className="font-serif text-2xl mb-8 text-center">Galeria</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {project.gallery.map((img, idx) => (
              <div 
                key={idx} 
                className="overflow-hidden h-64 group cursor-pointer relative"
                onClick={() => openLightbox(idx)}
              >
                <img 
                  src={img} 
                  alt={`Detalhe ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <IconMaximize className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#EBE5DE] py-16 px-6">
          <h3 className="font-serif text-2xl md:text-3xl mb-4">Interessado neste imóvel?</h3>
          <p className="font-sans text-gray-600 mb-8 max-w-lg mx-auto">
            Entre em contato para receber a planta detalhada e agendar uma visita ao terreno.
          </p>
          <a 
            href={`${LINKS.whatsapp}&text=Olá,%20tenho%20interesse%20no%20projeto%20${project.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cetara-dark text-[#F3EFE9] px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            <IconWhatsapp size={20} />
            Solicitar mais informações
          </a>
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-cetara-bg text-cetara-dark selection:bg-cetara-dark selection:text-cetara-bg flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projeto/:id" element={<ProjectPage />} />
          </Routes>
        </main>
        <Contact />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;