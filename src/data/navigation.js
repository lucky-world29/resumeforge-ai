import {
  LayoutDashboard,
  Sparkles,
  FileEdit,
  Palette,
  BrainCircuit,
  Settings2,
  Download
} from 'lucide-react';

export const dashboardCards = [
  { key: 'create', title: 'Create Resume', icon: FileEdit, description: 'Start a polished new resume with prefilled structure.' },
  { key: 'library', title: 'My Resumes', icon: LayoutDashboard, description: 'Manage drafts, duplicates, and autosaved versions.' },
  { key: 'templates', title: 'Templates', icon: Palette, description: 'Switch styles instantly with premium layouts.' },
  { key: 'ai', title: 'AI Assistant', icon: BrainCircuit, description: 'Generate summary, review tone, and optimize bullets.' },
  { key: 'export', title: 'Export PDF', icon: Download, description: 'Download pixel-sharp files in PDF, DOCX, or HTML.' },
  { key: 'profile', title: 'Profile', icon: Sparkles, description: 'Control fonts, colors, spacing, and profile details.' }
];

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'builder', label: 'Builder', icon: FileEdit },
  { id: 'templates', label: 'Templates', icon: Palette },
  { id: 'ai', label: 'AI Lab', icon: BrainCircuit },
  { id: 'settings', label: 'Settings', icon: Settings2 }
];

export const stepLabels = [
  'Personal',
  'Summary',
  'Experience',
  'Education',
  'Skills',
  'Projects',
  'Certifications',
  'Achievements',
  'Languages'
];
