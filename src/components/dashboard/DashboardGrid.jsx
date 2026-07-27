import { motion } from 'framer-motion';
import { dashboardCards } from '../../data/navigation';
import { Card } from '../ui/Card';

export const DashboardGrid = ({ onAction, savedResumes, onLoadResume }) => (
  <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dashboardCards.map(({ key, title, icon: Icon, description }) => (
        <motion.button key={key} whileHover={{ y: -4 }} onClick={() => onAction(key)} className="text-left">
          <Card hover className="h-full p-5">
            <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-blue-300">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
          </Card>
        </motion.button>
      ))}
    </div>
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">My Resumes</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Autosaved Library</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{savedResumes.length} files</span>
      </div>
      <div className="space-y-3">
        {savedResumes.map((item) => (
          <button
            key={item.id}
            onClick={() => onLoadResume(item.id)}
            className="flex w-full items-start justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.08]"
          >
            <div>
              <p className="font-medium text-white">{item.personal.fullName || 'Untitled Resume'}</p>
              <p className="mt-1 text-sm text-slate-400">{item.personal.jobTitle || 'Add a role headline'} · {item.personal.email || 'No email yet'}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Open</span>
          </button>
        ))}
      </div>
    </Card>
  </div>
);
