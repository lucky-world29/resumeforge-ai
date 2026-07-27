import { motion } from 'framer-motion';
import { navItems } from '../../data/navigation';
import { cn } from '../../lib/utils';

export const TopNav = ({ current, onChange }) => (
  <div className="sticky top-4 z-30 mx-auto mb-6 flex max-w-7xl items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-slate-950/70 p-2 backdrop-blur-2xl lg:px-4">
    {navItems.map(({ id, label, icon: Icon }) => {
      const active = current === id;
      return (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            'relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition',
            active ? 'text-white' : 'text-slate-400 hover:text-slate-100'
          )}
        >
          {active && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-violet-500/30 ring-1 ring-white/10"
            />
          )}
          <span className="relative z-10 inline-flex items-center gap-2">
            <Icon className="h-4 w-4" /> {label}
          </span>
        </button>
      );
    })}
  </div>
);
