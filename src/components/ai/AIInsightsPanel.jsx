import { Sparkles, Target, ShieldCheck, BadgeCheck, Wand2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressRing } from '../ui/ProgressRing';

export const AIInsightsPanel = () => {
  const { aiInsights, runAIReview, applyImprovedBullet } = useResume();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">AI Features</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Resume intelligence console</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Run local AI heuristics for resume review, ATS compatibility, grammar guidance, and keyword optimization.</p>
          </div>
          <Button onClick={runAIReview}><span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Resume Review</span></Button>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 text-center"><ProgressRing value={aiInsights.overallScore} label="Overall" /></Card>
        <Card className="p-6 text-center"><ProgressRing value={aiInsights.atsScore} label="ATS" /></Card>
        <Card className="p-6 text-center"><ProgressRing value={aiInsights.strengthMeter} label="Strength" /></Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3 text-white"><Target className="h-5 w-5 text-blue-300" /><h4 className="text-lg font-semibold">Keyword Optimization</h4></div>
          <div className="flex flex-wrap gap-2">
            {aiInsights.keywordOptimization.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">{item}</span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">Missing Skills Suggestions: {aiInsights.missingSkillsSuggestions.join(', ') || 'Great coverage so far.'}</p>
        </Card>
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3 text-white"><ShieldCheck className="h-5 w-5 text-violet-300" /><h4 className="text-lg font-semibold">Tone + Grammar Checker</h4></div>
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">{aiInsights.professionalToneImprovement}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {aiInsights.actionVerbSuggestions.map((item) => (
              <span key={item} className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-blue-100">{item}</span>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3 text-white"><Wand2 className="h-5 w-5 text-fuchsia-300" /><h4 className="text-lg font-semibold">Bullet Point Improvement</h4></div>
          <div className="space-y-4">
            {aiInsights.bulletPointImprovement.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{item.company}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.suggestion}</p>
                <Button className="mt-4" variant="secondary" onClick={() => applyImprovedBullet(item.id, item.suggestion)}>Apply Suggestion</Button>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3 text-white"><BadgeCheck className="h-5 w-5 text-emerald-300" /><h4 className="text-lg font-semibold">Interview + Career Recommendations</h4></div>
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-slate-500">Interview Preparation Tips</p>
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                {aiInsights.interviewPreparationTips.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-slate-500">Career Recommendations</p>
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                {aiInsights.careerRecommendations.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
