import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Button = ({ className, variant = 'primary', children, ...props }) => {
  const styles = {
    primary: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white shadow-glow hover:brightness-110',
    secondary: 'border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10',
    ghost: 'text-slate-300 hover:bg-white/10'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={cn(
        'relative overflow-hidden rounded-2xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400/50',
        styles[variant],
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
