import { completionScore, textToTags } from './utils';

const actionVerbs = ['Spearheaded', 'Orchestrated', 'Accelerated', 'Optimized', 'Scaled', 'Launched', 'Mentored'];
const benchmarkSkills = ['React', 'TypeScript', 'Leadership', 'Accessibility', 'Testing', 'Performance', 'SQL', 'Cloud'];

export const generateSummary = (resume) => {
  const focus = Object.values(resume.skills).flat().slice(0, 6).join(', ');
  return `${resume.personal.jobTitle || 'Professional'} with proven experience across ${focus || 'product delivery, stakeholder management, and execution'}. Combines strategic thinking with hands-on delivery to improve business outcomes, collaborate cross-functionally, and build reliable systems that create measurable impact.`;
};

export const improveBullet = (text) => {
  const cleaned = text.replace(/\.$/, '');
  return `${actionVerbs[Math.floor(Math.random() * actionVerbs.length)]} ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}, using metrics, ownership, and outcome-led framing to strengthen recruiter impact.`;
};

export const reviewResume = (resume) => {
  const score = completionScore(resume);
  const text = JSON.stringify(resume).toLowerCase();
  const matchedSkills = benchmarkSkills.filter((skill) => text.includes(skill.toLowerCase()));
  const missingSkills = benchmarkSkills.filter((skill) => !text.includes(skill.toLowerCase()));
  const atsScore = Math.min(99, score + matchedSkills.length * 4);
  const grammarScore = Math.min(98, 74 + Math.min(resume.summary.length / 8, 16));
  const strengthMeter = Math.min(100, Math.round((score + atsScore + grammarScore) / 3));

  return {
    overallScore: score,
    atsScore,
    grammarScore,
    strengthMeter,
    missingSkillsSuggestions: missingSkills.slice(0, 5),
    keywordOptimization: matchedSkills.concat(missingSkills.slice(0, 3)),
    professionalToneImprovement: 'Tighten each bullet to emphasize ownership, scale, and measurable business outcomes.',
    actionVerbSuggestions: actionVerbs,
    bulletPointImprovement: resume.experience.map((item) => ({
      id: item.id,
      company: item.company,
      suggestion: improveBullet(item.description)
    })),
    interviewPreparationTips: [
      'Prepare one story about driving measurable impact with a constrained timeline.',
      'Be ready to explain collaboration with design, PM, and engineering leadership.',
      'Quantify outcomes: revenue, retention, speed, quality, or customer adoption.'
    ],
    careerRecommendations: [
      'Add one more flagship project with scale or leadership scope.',
      'Tailor missing keywords to the target job description before export.',
      'Use more metrics and action verbs in the first two experiences.'
    ]
  };
};

export const parseSkillInput = (value) => textToTags(value);
