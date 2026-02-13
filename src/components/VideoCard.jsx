import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';

const VideoCard = ({ project }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true); // Load iframe when close to viewport
                }
            },
            { rootMargin: "200px" } // Load 200px before visible
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    // Helper to extract video ID and create autoplay/mute URL
    const getVideoUrl = (src) => {
        try {
            const url = new URL(src);
            let videoId = "";

            if (url.hostname.includes("youtube.com")) {
                videoId = url.pathname.split("/").pop();
            } else if (url.hostname.includes("youtu.be")) {
                videoId = url.pathname.slice(1);
            }

            if (!videoId) return src;

            // params: autoplay=1, mute=1 (required for autoplay), controls=0, loop=1, playlist=VIDEO_ID
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0`;
        } catch (e) {
            return src;
        }
    };

    return (
        <motion.div
            ref={videoRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/5 group hover:border-brand-accent/50 transition-all duration-300 hover:shadow-brand-accent/20"
        >
            {!isLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-surface animate-pulse">
                    <span className="text-white/20">Carregando...</span>
                </div>
            ) : (
                <>
                    <iframe
                        className="w-full h-full object-cover pointer-events-none" // pointer-events-none to prevent stealing scroll on mobile
                        src={getEmbedUrl(project.src)}
                        title={project.title}
                        frameBorder="0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    {/* Overlay for interaction */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex gap-2">
                            <span className="text-xs font-medium px-2 py-1 bg-brand-accent/20 text-brand-accent rounded-full border border-brand-accent/20">
                                Edição
                            </span>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
};

// Simple helper to force mute/autoplay params securely
const getEmbedUrl = (url) => {
    if (!url.includes('?')) {
        return `${url}?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&rel=0`;
    }
    return url;
}


export default VideoCard;
