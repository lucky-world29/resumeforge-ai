import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = ({ onCreate, onDemo }) => {
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / 560) * 100;
    event.currentTarget.style.setProperty('--mx', `${x}%`);
    event.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <section
      className="hero-mesh relative overflow-hidden border-b border-white/10"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-hero-grid bg-[size:180px_180px,28px_28px,28px_28px] opacity-60" />
      <div className="hero-spotlight absolute inset-0" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-blue-400" /> Premium Resume Intelligence
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build Your Dream Resume with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Generate professional resumes in minutes using intelligent suggestions, premium templates, instant feedback,
            and export-ready formatting.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button onClick={onCreate} className="group px-6 py-3 text-base">
              <span className="inline-flex items-center gap-2">
                Create Resume <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Button>
            <Button onClick={onDemo} variant="secondary" className="px-6 py-3 text-base">
              <span className="inline-flex items-center gap-2">
                <Play className="h-4 w-4" /> Watch Demo
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
