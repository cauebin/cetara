import React, { useState, useEffect } from 'react';
import { Logo, LogoText } from './components/Logo';
import { 
  IconInstagram, 
  IconLinkedin, 
  IconWhatsapp, 
  IconMenu, 
  IconClose, 
  IconArrowRight,
  IconMapPin,
  IconHome
} from './components/Icons';

// --- Types ---
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

// --- Constants ---
const LINKS = {
  instagram: "https://instagram.com/cetara.residences",
  linkedin: "https://linkedin.com/company/cetararesidences",
  whatsapp: "https://wa.me/5511996090377?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Cetara%20Residences."
};

// --- Components ---

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="block text-sm tracking-widest uppercase hover:text-gray-500 transition-colors duration-300 py-2 md:py-0"
  >
    {children}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#F3EFE9]/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Logo width={160} height={90} className="transition-transform group-hover:scale-105" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <NavLink href="#conceito">Conceito</NavLink>
          <NavLink href="#projetos">Projetos</NavLink>
          <NavLink href="#contato">Contato</NavLink>
          
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
        <div className="absolute top-full left-0 w-full bg-[#F3EFE9] border-t border-gray-200 shadow-lg p-6 md:hidden flex flex-col space-y-4">
          <NavLink href="#conceito" onClick={() => setIsOpen(false)}>Conceito</NavLink>
          <NavLink href="#projetos" onClick={() => setIsOpen(false)}>Projetos</NavLink>
          <NavLink href="#contato" onClick={() => setIsOpen(false)}>Contato</NavLink>
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
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
         {/* Abstract background line pattern */}
         <svg width="100%" height="100%">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
         </svg>
      </div>

      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        <div className="fade-in-up">
          <Logo width={280} height={160} className="mb-4 md:mb-8 scale-110" />
        </div>
        
        {/* Logo component already includes text now, but we can keep the slogan prominent */}
        
        <div className="w-24 h-[1px] bg-cetara-dark my-8 fade-in-up delay-200"></div>

        <p className="fade-in-up delay-500 font-serif text-xl md:text-3xl italic text-gray-700 tracking-wide">
          "Arquitetura de permanência"
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
    <section id="conceito" className="py-24 md:py-32 bg-[#EBE5DE]">
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
          icon={IconArrowRight} // Using arrow as a placeholder for 'Future/Permanence'
          title="Arquitetura de Permanência"
          description="Construímos não apenas para o agora, mas para o futuro. Materiais nobres e estética atemporal."
        />
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projetos" className="py-24 bg-white">
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
          <div className="group cursor-pointer">
            <div className="overflow-hidden mb-6 relative">
              <img 
                src="https://picsum.photos/1000/800?image=10" 
                alt="Projeto Itupeva" 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <h3 className="font-serif text-2xl mb-2">Casa Horizonte</h3>
            <p className="font-sans text-sm text-gray-500 uppercase tracking-wide">Itupeva, SP</p>
          </div>
          
          <div className="group cursor-pointer mt-12 md:mt-0">
            <div className="overflow-hidden mb-6 relative">
              <img 
                src="https://picsum.photos/1000/800?image=15" 
                alt="Projeto Lago" 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <h3 className="font-serif text-2xl mb-2">Residência Vale</h3>
            <p className="font-sans text-sm text-gray-500 uppercase tracking-wide">Itupeva, SP</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contato" className="py-24 bg-[#1A1A1A] text-[#F3EFE9]">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8 flex justify-center opacity-80">
            <Logo width={120} height={80} className="text-[#F3EFE9]" />
        </div>
        
        <h2 className="font-serif text-3xl md:text-5xl mb-8">Vamos conversar sobre o seu futuro?</h2>
        
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
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#151515] text-gray-600 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Cetara Residences.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-400">Política de Privacidade</a>
          <a href="#" className="hover:text-gray-400">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cetara-bg text-cetara-dark selection:bg-cetara-dark selection:text-cetara-bg">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;