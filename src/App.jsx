import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RefreshCw, Undo2, Redo2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { HeroSection } from './components/layout/HeroSection';
import { Footer } from './components/layout/Footer';
import { TopNav } from './components/layout/TopNav';
import { DashboardGrid } from './components/dashboard/DashboardGrid';
import { BuilderForms } from './components/builder/BuilderForms';
import { StepNavigator } from './components/builder/StepNavigator';
import { ResumePreview } from './components/preview/ResumePreview';
import { AIInsightsPanel } from './components/ai/AIInsightsPanel';
import { TemplateGallery } from './components/templates/TemplateGallery';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { exportDOCX, exportHTML, exportPDF, printResume } from './lib/exporters';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const viewMeta = {
  dashboard: {
    title: 'Beautiful dashboard with cards',
    description: 'Jump into your workflow, manage saved resumes, and launch AI-powered actions.'
  },
  builder: {
    title: 'Resume builder',
    description: 'Craft your resume through a premium multi-step wizard with live preview.'
  },
  templates: {
    title: 'Templates',
    description: 'Switch between modern, minimal, executive, creative, developer, corporate, dark, and light styles.'
  },
  ai: {
    title: 'AI features',
    description: 'Run review scores, ATS checks, bullet refinement, keyword tuning, and career suggestions.'
  },
  settings: {
    title: 'Settings',
    description: 'Fine tune dark mode, accent color, paper sizing, margins, and autosave.'
  }
};

const Workspace = () => {
  const {
    resume,
    activeStep,
    completion,
    selectedTemplate,
    settings,
    savedResumes,
    canUndo,
    canRedo,
    lastSavedAt,
    setStep,
    nextStep,
    previousStep,
    createNewResumeFile,
    loadSavedResume,
    undo,
    redo
  } = useResume();
  const [view, setView] = useState('dashboard');
  const [confettiShown, setConfettiShown] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const previewRef = useRef(null);
  const previewShellRef = useRef(null);
  const workspaceRef = useRef(null);

  useKeyboardShortcuts({ onUndo: undo, onRedo: redo, onNextStep: nextStep, onPreviousStep: previousStep });

  useEffect(() => {
    if (completion < 95 || confettiShown) return;
    setConfettiShown(true);
    requestAnimationFrame(() => {
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.4 } });
    });
  }, [completion, confettiShown]);

  const jumpToWorkspace = (targetView = 'builder') => {
    setView(targetView);
    workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const dashboardAction = (key) => {
    const mapping = {
      create: 'builder',
      library: 'dashboard',
      templates: 'templates',
      ai: 'ai',
      export: 'builder',
      profile: 'settings'
    };
    jumpToWorkspace(mapping[key] || 'builder');
  };

  const content = useMemo(() => {
    if (view === 'dashboard') {
      return <DashboardGrid onAction={dashboardAction} savedResumes={savedResumes} onLoadResume={loadSavedResume} />;
    }
    if (view === 'builder') {
      return (
        <div className="space-y-6">
          <StepNavigator activeStep={activeStep} completion={completion} onSelectStep={setStep} />
          <BuilderForms />
        </div>
      );
    }
    if (view === 'templates') return <TemplateGallery />;
    if (view === 'ai') return <AIInsightsPanel />;
    return <SettingsPanel />;
  }, [activeStep, completion, loadSavedResume, savedResumes, setStep, view]);

  return (
    <div className={settings.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}>
      <HeroSection onCreate={() => jumpToWorkspace('builder')} onDemo={() => jumpToWorkspace('dashboard')} />
      <section ref={workspaceRef} className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <TopNav current={view} onChange={setView} />
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">ResumeForge AI</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{viewMeta[view].title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{viewMeta[view].description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={undo} disabled={!canUndo}><span className="inline-flex items-center gap-2"><Undo2 className="h-4 w-4" /> Undo</span></Button>
            <Button variant="secondary" onClick={redo} disabled={!canRedo}><span className="inline-flex items-center gap-2"><Redo2 className="h-4 w-4" /> Redo</span></Button>
            <Button variant="secondary" onClick={createNewResumeFile}><span className="inline-flex items-center gap-2"><RefreshCw className="h-4 w-4" /> New</span></Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.28 }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
            <Card className="mt-6 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Extras</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Autosave, step indicator, keyboard shortcuts</h3>
                  <p className="mt-2 text-sm text-slate-400">Last saved at {new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Use Alt + arrow keys to move across the wizard.</p>
                </div>
                {view === 'builder' && (
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={previousStep}><span className="inline-flex items-center gap-2"><ChevronLeft className="h-4 w-4" /> Previous</span></Button>
                    <Button onClick={nextStep}><span className="inline-flex items-center gap-2">Next <ChevronRight className="h-4 w-4" /></span></Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <ResumePreview
              previewRef={previewRef}
              previewShellRef={previewShellRef}
              previewScale={previewScale}
              onPreviewScaleChange={setPreviewScale}
              onFullscreen={() => previewShellRef.current?.requestFullscreen?.()}
              onExportPdf={() => exportPDF(previewRef.current, resume)}
              onExportDocx={() => exportDOCX(resume)}
              onExportHtml={() => exportHTML(resume, selectedTemplate, settings)}
              onPrint={() => printResume(resume, selectedTemplate, settings)}
            />
            {/* <Card className="p-5">
              <div className="flex items-center gap-3 text-white"><Sparkles className="h-5 w-5 text-blue-300" /><h3 className="text-xl font-semibold">Premium signals</h3></div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                {['Glassmorphism layout', 'Blue + purple gradients', 'Soft motion interactions', 'Right-side live preview', 'PDF / DOCX / HTML export', 'Confetti on completion'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">{item}</div>
                ))}
              </div>
            </Card> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ResumeProvider>
      <Workspace />
    </ResumeProvider>
  );
}
