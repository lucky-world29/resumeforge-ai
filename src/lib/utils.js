import { clsx } from 'clsx';

export const cn = (...inputs) => clsx(inputs);

export const clone = (value) => JSON.parse(JSON.stringify(value));

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const completionScore = (resume) => {
  const fields = [
    resume.personal.fullName,
    resume.personal.jobTitle,
    resume.personal.email,
    resume.summary,
    resume.experience.length,
    resume.education.length,
    resume.projects.length,
    resume.certifications.length,
    resume.achievements.length,
    resume.languages.length
  ];

  const skillsCount = Object.values(resume.skills).flat().filter(Boolean).length;
  const filled = fields.filter(Boolean).length + Math.min(skillsCount / 2, 5);
  return Math.min(100, Math.round((filled / 15) * 100));
};

export const monthLabel = (value) => {
  if (!value || value === 'Present') return value || 'Present';
  const [year, month] = value.split('-');
  return new Date(`${year}-${month}-01`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

export const textToTags = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const tagsToText = (value) => (Array.isArray(value) ? value.join(', ') : '');

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
