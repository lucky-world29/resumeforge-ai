import { stepLabels } from '../../data/navigation';
import { cn } from '../../lib/utils';

export const StepNavigator = ({ activeStep, completion, onSelectStep }) => (
  <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Progress</p>
        <h3 className="mt-2 text-xl font-semibold text-white">Multi-step builder</h3>
      </div>
      <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{completion}% complete</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/5">
      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all" style={{ width: `${completion}%` }} />
    </div>
    <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-1">
      {stepLabels.map((label, index) => (
        <button
          key={label}
          onClick={() => onSelectStep(index)}
          className={cn(
            'flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition',
            activeStep === index
              ? 'border-blue-400/40 bg-blue-500/10 text-white'
              : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
          )}
        >
          <span className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
            activeStep === index ? 'bg-white text-slate-950' : 'bg-white/10 text-slate-300'
          )}>{index + 1}</span>
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  </div>
);
