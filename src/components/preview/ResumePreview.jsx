import { Expand, Download, FileType2, FileText, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResume } from '../../context/ResumeContext';
import { monthLabel } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const templateStyles = {
  modern: 'bg-slate-900 text-slate-100',
  minimal: 'bg-white text-slate-900',
  executive: 'bg-slate-950 text-slate-100',
  creative: 'bg-slate-900 text-slate-50',
  developer: 'bg-[#0b1020] text-slate-100',
  corporate: 'bg-slate-50 text-slate-900',
  dark: 'bg-slate-950 text-white',
  light: 'bg-white text-slate-900'
};

export const ResumePreview = ({ previewRef, previewShellRef, previewScale, onPreviewScaleChange, onFullscreen, onExportPdf, onExportDocx, onExportHtml, onPrint }) => {
  const { resume, selectedTemplate, settings } = useResume();

  return (
    <Card className="sticky top-24 overflow-hidden p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Live Preview</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Professional resume</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
            <span className="uppercase tracking-[0.22em] text-slate-500">Zoom</span>
            <input type="range" min="0.8" max="1.2" step="0.05" value={previewScale} onChange={(e) => onPreviewScaleChange(Number(e.target.value))} />
            <span>{Math.round(previewScale * 100)}%</span>
          </div>
          <Button variant="secondary" onClick={onFullscreen}><span className="inline-flex items-center gap-2"><Expand className="h-4 w-4" /> Fullscreen</span></Button>
          <Button variant="secondary" onClick={onExportPdf}><span className="inline-flex items-center gap-2"><Download className="h-4 w-4" /> PDF</span></Button>
          <Button variant="secondary" onClick={onExportDocx}><span className="inline-flex items-center gap-2"><FileType2 className="h-4 w-4" /> DOCX</span></Button>
          <Button variant="secondary" onClick={onExportHtml}><span className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> HTML</span></Button>
          <Button variant="secondary" onClick={onPrint}><span className="inline-flex items-center gap-2"><Printer className="h-4 w-4" /> Print</span></Button>
        </div>
      </div>
      <div ref={previewShellRef} className="preview-shell max-h-[calc(100vh-15rem)] overflow-auto rounded-[28px] bg-slate-950/80 p-3">
        <motion.div layout ref={previewRef} className={`resume-sheet mx-auto w-full max-w-[860px] rounded-[28px] p-8 shadow-2xl ${templateStyles[selectedTemplate]}`} style={{ fontFamily: settings.fontFamily, borderTop: `4px solid ${settings.accentColor}`, transform: `scale(${previewScale})`, transformOrigin: 'top center' }}>
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            <aside className="space-y-6 rounded-[24px] bg-black/10 p-5">
              <img src={resume.personal.photo} alt={resume.personal.fullName} className="h-24 w-24 rounded-[24px] object-cover ring-1 ring-black/10" />
              <div>
                <span className="inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em] text-white" style={{ backgroundColor: settings.accentColor }}>
                  {resume.personal.jobTitle}
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight">{resume.personal.fullName}</h1>
              </div>
              <div className="space-y-2 text-sm opacity-80">
                <p>{resume.personal.email}</p>
                <p>{resume.personal.phone}</p>
                <p>{resume.personal.address}</p>
                <p>{resume.personal.linkedin}</p>
                <p>{resume.personal.github}</p>
                <p>{resume.personal.portfolio}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.values(resume.skills).flat().map((skill) => (
                    <span key={skill} className="rounded-full border border-black/10 bg-black/10 px-3 py-1 text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Languages</h2>
                <div className="mt-3 space-y-2 text-sm">
                  {resume.languages.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span>{item.language}</span>
                      <span className="opacity-70">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <main className="space-y-6">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Professional Summary</h2>
                <p className="mt-3 text-[15px] leading-7 opacity-85">{resume.summary}</p>
              </section>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Work Experience</h2>
                <div className="mt-4 space-y-4">
                  {resume.experience.map((item) => (
                    <article key={item.id} className="rounded-[22px] border border-black/10 bg-black/5 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">{item.role}</h3>
                          <p className="opacity-70">{item.company} · {item.location}</p>
                        </div>
                        <span className="text-sm opacity-70">{monthLabel(item.startDate)} — {monthLabel(item.endDate)}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 opacity-85">{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Projects</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {resume.projects.map((item) => (
                    <article key={item.id} className="rounded-[22px] border border-black/10 bg-black/5 p-4">
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <p className="mt-2 text-sm opacity-85">{item.description}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] opacity-55">{item.techStack}</p>
                    </article>
                  ))}
                </div>
              </section>
              <section className="grid gap-4 md:grid-cols-2">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Education</h2>
                  <div className="mt-4 space-y-4">
                    {resume.education.map((item) => (
                      <article key={item.id} className="rounded-[22px] border border-black/10 bg-black/5 p-4 text-sm">
                        <h3 className="font-semibold">{item.degree}</h3>
                        <p className="mt-1 opacity-75">{item.college}</p>
                        <p className="mt-1 opacity-75">{item.year} · {item.cgpa}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.28em] opacity-60">Certifications</h2>
                  <div className="mt-4 space-y-4">
                    {resume.certifications.map((item) => (
                      <article key={item.id} className="rounded-[22px] border border-black/10 bg-black/5 p-4 text-sm">
                        <h3 className="font-semibold">{item.certificate}</h3>
                        <p className="mt-1 opacity-75">{item.organization}</p>
                        <p className="mt-1 opacity-75">{item.issueDate}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};
