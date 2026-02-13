import RevealOnScroll from './RevealOnScroll';
import VideoCard from './VideoCard';
import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Edição Dinâmica",
        src: "https://www.youtube.com/embed/GGuzcLaSrqA"
    },
    {
        id: 6,
        title: "Edição Impactante",
        src: "https://www.youtube.com/embed/cxTJsL4ykDA"
    },
    {
        id: 7,
        title: "VFX Showcase",
        src: "https://www.youtube.com/embed/481-Zvh8ROY"
    },
    {
        id: 8,
        title: "Edição Cinematic",
        src: "https://www.youtube.com/embed/BuNZxzD-P-g"
    },
    {
        id: 4,
        title: "Edição Criativa",
        src: "https://www.youtube.com/embed/dKvzlmju_Sc"
    },
    {
        id: 5,
        title: "Motion Graphics",
        src: "https://www.youtube.com/embed/aW3pl6_WlTA"
    },
    {
        id: 2,
        title: "Cortes Rápidos",
        src: "https://www.youtube.com/embed/gMDAMt-tFo4"
    },
    {
        id: 3,
        title: "VFX & Motion",
        src: "https://www.youtube.com/embed/bfkqtuUz0bY"
    }
];

const Portfolio = () => {
    return (
        <section className="py-20 bg-brand-dark text-white" id="portfolio">
            <div className="container mx-auto px-4">
                <RevealOnScroll>
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        Trabalhos Selecionados
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <RevealOnScroll key={project.id} delay={index * 0.1}>
                            <VideoCard project={project} />
                        </RevealOnScroll>
                    ))}
                </div>

                <RevealOnScroll delay={0.4}>
                    <div className="text-center mt-12 text-blue-200/50 text-sm">
                        <p>Role para ver mais</p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Portfolio;
