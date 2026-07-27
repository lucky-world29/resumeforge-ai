import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, hover = false, ...props }) => (
  <motion.div
    whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
    className={cn(
      'rounded-3xl border border-white/10 bg-white/[0.06] bg-panel-gradient backdrop-blur-xl shadow-glass',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);
