import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ArrowRight, Briefcase, Users, Star } from 'lucide-react';

const slides = [
    {
        headline: 'Connecting Skilled Workers to Trusted Employers',
        subtext:
            'SkillBridge is your one-stop platform for finding verified blue-collar professionals and meaningful job opportunities.',
        bg: 'from-primary-900 via-primary-700 to-accent-600',
        accent: 'from-cyan-500/20 to-violet-500/20',
        badge: { icon: Users, text: '10,000+ Workers', color: 'bg-emerald-500' },
    },
    {
        headline: 'Find the Right Talent, Fast',
        subtext:
            'Browse thousands of skilled workers — from electricians to carpenters — vetted and ready to work on your projects.',
        bg: 'from-slate-900 via-primary-900 to-accent-600',
        accent: 'from-amber-500/20 to-rose-500/20',
        badge: { icon: Briefcase, text: '5,000+ Jobs', color: 'bg-amber-500' },
    },
    {
        headline: 'Build Your Career with SkillBridge',
        subtext:
            'Discover job opportunities that match your skills. Get hired by trusted employers who value your craftsmanship.',
        bg: 'from-violet-900 via-primary-800 to-emerald-700',
        accent: 'from-emerald-500/20 to-primary-500/20',
        badge: { icon: Star, text: '95% Success', color: 'bg-violet-500' },
    },
];

function HeroSection() {
    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`relative bg-gradient-to-br ${slide.bg} min-h-[620px] lg:min-h-[720px] flex items-center`}
                        >
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className={`absolute top-20 left-10 w-80 h-80 bg-gradient-to-br ${slide.accent} rounded-full blur-3xl`} />
                                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                                {/* Grid Pattern */}
                                <div className="absolute inset-0 opacity-5"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                        backgroundSize: '30px 30px',
                                    }}
                                />
                            </div>

                            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                                <div className="max-w-3xl">
                                    {/* Floating Badge */}
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                                        <span className={`w-2 h-2 ${slide.badge.color} rounded-full animate-pulse`} />
                                        <slide.badge.icon size={14} className="text-white/80" />
                                        <span className="text-sm text-white/80 font-medium">{slide.badge.text}</span>
                                    </div>

                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                        {slide.headline}
                                    </h1>
                                    <p className="text-base sm:text-lg text-gray-200/90 leading-relaxed mb-10 max-w-2xl">
                                        {slide.subtext}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            to="/services"
                                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                                        >
                                            Find Jobs
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                                        >
                                            Post a Job
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Swiper Pagination Styles */}
            <style>{`
                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.4);
                    opacity: 1;
                    transition: all 0.3s;
                }
                .swiper-pagination-bullet-active {
                    background: white;
                    width: 32px;
                    border-radius: 6px;
                }
            `}</style>
        </section>
    );
}

export default HeroSection;
