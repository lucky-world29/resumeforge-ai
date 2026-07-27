import { Check } from 'lucide-react';
import { templates } from '../../data/templates';
import { useResume } from '../../context/ResumeContext';
import { Card } from '../ui/Card';

export const TemplateGallery = () => {
  const { selectedTemplate, setTemplate } = useResume();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => {
        const active = selectedTemplate === template.id;
        return (
          <button key={template.id} onClick={() => setTemplate(template.id)} className="text-left">
            <Card hover className={`p-5 ${active ? 'ring-2 ring-blue-400/50' : ''}`}>
              <div className={`mb-4 h-36 rounded-3xl bg-gradient-to-br ${template.accent} p-5`}>
                <div className="h-full rounded-[20px] border border-white/20 bg-black/20 p-4 backdrop-blur-xl">
                  <div className="mb-3 h-3 w-20 rounded-full bg-white/70" />
                  <div className="mb-2 h-2 w-full rounded-full bg-white/40" />
                  <div className="mb-2 h-2 w-4/5 rounded-full bg-white/30" />
                  <div className="mt-6 grid gap-2 md:grid-cols-2">
                    <div className="h-12 rounded-2xl bg-white/20" />
                    <div className="h-12 rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{template.description}</p>
                </div>
                {active && <span className="rounded-full bg-blue-500/15 p-2 text-blue-200"><Check className="h-4 w-4" /></span>}
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
};
