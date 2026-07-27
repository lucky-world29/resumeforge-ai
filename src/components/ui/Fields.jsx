import { cn } from '../../lib/utils';

export const Label = ({ children }) => (
  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{children}</label>
);

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20',
      className
    )}
    {...props}
  />
);

export const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      'min-h-[128px] w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20',
      className
    )}
    {...props}
  />
);

export const Select = ({ className, children, ...props }) => (
  <select
    className={cn(
      'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20',
      className
    )}
    {...props}
  >
    {children}
  </select>
);
