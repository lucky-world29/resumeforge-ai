import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createResume, defaultSettings, skillCategories } from '../data/defaultResume';
import { templates } from '../data/templates';
import { reviewResume, generateSummary, improveBullet, parseSkillInput } from '../lib/ai';
import { clone, completionScore } from '../lib/utils';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ResumeContext = createContext(null);

const blankFactories = {
  experience: () => ({ id: crypto.randomUUID(), company: '', role: '', location: '', startDate: '', endDate: '', description: '' }),
  education: () => ({ id: crypto.randomUUID(), college: '', degree: '', cgpa: '', year: '', achievements: '' }),
  projects: () => ({ id: crypto.randomUUID(), name: '', description: '', techStack: '', githubLink: '', liveDemo: '', achievements: '' }),
  certifications: () => ({ id: crypto.randomUUID(), certificate: '', organization: '', issueDate: '', credentialId: '' }),
  achievements: () => ({ id: crypto.randomUUID(), category: 'Awards', title: '', description: '' }),
  languages: () => ({ id: crypto.randomUUID(), language: '', level: 'Intermediate' })
};

const initialState = {
  resume: createResume(),
  selectedTemplate: templates[0].id,
  settings: defaultSettings,
  activeStep: 0,
  aiInsights: reviewResume(createResume())
};

export const ResumeProvider = ({ children }) => {
  const [state, setState] = useLocalStorage('resumeforge-ai-state', initialState);
  const [savedResumes, setSavedResumes] = useLocalStorage('resumeforge-ai-library', [initialState.resume]);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [lastSavedAt, setLastSavedAt] = useState(new Date().toISOString());

  const commit = useCallback((updater) => {
    setState((current) => {
      const previous = clone(current);
      const next = typeof updater === 'function' ? updater(clone(current)) : updater;
      setPast((items) => [previous, ...items].slice(0, 40));
      setFuture([]);
      setSavedResumes((library) => [next.resume, ...library.filter((item) => item.id !== next.resume.id)].slice(0, 8));
      setLastSavedAt(new Date().toISOString());
      return next;
    });
  }, [setSavedResumes, setState]);

  const updatePersonal = (field, value) =>
    commit((current) => {
      current.resume.personal[field] = value;
      return current;
    });

  const updateSummary = (value) =>
    commit((current) => {
      current.resume.summary = value;
      return current;
    });

  const updateItem = (section, id, field, value) =>
    commit((current) => {
      const target = current.resume[section].find((item) => item.id === id);
      if (target) target[field] = value;
      return current;
    });

  const addItem = (section) =>
    commit((current) => {
      current.resume[section].push(blankFactories[section]());
      return current;
    });

  const removeItem = (section, id) =>
    commit((current) => {
      current.resume[section] = current.resume[section].filter((item) => item.id !== id);
      return current;
    });

  const reorderItems = (section, startIndex, endIndex) =>
    commit((current) => {
      const items = [...current.resume[section]];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      current.resume[section] = items;
      return current;
    });

  const updateSkillCategory = (category, value) =>
    commit((current) => {
      current.resume.skills[category] = parseSkillInput(value);
      return current;
    });

  const setStep = (value) =>
    setState((current) => ({ ...current, activeStep: Math.max(0, Math.min(8, value)) }));

  const nextStep = () => setStep(state.activeStep + 1);
  const previousStep = () => setStep(state.activeStep - 1);

  const setTemplate = (templateId) =>
    setState((current) => ({ ...current, selectedTemplate: templateId }));

  const updateSettings = (field, value) =>
    setState((current) => ({ ...current, settings: { ...current.settings, [field]: value } }));

  const generateAISummary = () => updateSummary(generateSummary(state.resume));

  const applyImprovedBullet = (id, text) => updateItem('experience', id, 'description', text);

  const runAIReview = () => {
    const insights = reviewResume(state.resume);
    setState((current) => ({ ...current, aiInsights: insights }));
  };

  const createNewResumeFile = () => {
    const fresh = createResume();
    setState((current) => ({ ...current, resume: fresh, activeStep: 0, aiInsights: reviewResume(fresh) }));
    setSavedResumes((library) => [fresh, ...library].slice(0, 8));
    setPast([]);
    setFuture([]);
  };

  const loadSavedResume = (id) => {
    const selected = savedResumes.find((item) => item.id === id);
    if (!selected) return;
    setState((current) => ({ ...current, resume: selected, aiInsights: reviewResume(selected) }));
  };

  const undo = () => {
    if (!past.length) return;
    const [previous, ...rest] = past;
    setFuture((items) => [clone(state), ...items].slice(0, 40));
    setPast(rest);
    setState(previous);
  };

  const redo = () => {
    if (!future.length) return;
    const [next, ...rest] = future;
    setPast((items) => [clone(state), ...items].slice(0, 40));
    setFuture(rest);
    setState(next);
  };

  const computed = useMemo(() => ({
    completion: completionScore(state.resume),
    templateMeta: templates.find((item) => item.id === state.selectedTemplate),
    skillCategories,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    lastSavedAt
  }), [future.length, lastSavedAt, past.length, state.resume, state.selectedTemplate]);

  return (
    <ResumeContext.Provider
      value={{
        ...state,
        ...computed,
        savedResumes,
        updatePersonal,
        updateSummary,
        updateItem,
        addItem,
        removeItem,
        reorderItems,
        updateSkillCategory,
        setStep,
        nextStep,
        previousStep,
        setTemplate,
        updateSettings,
        generateAISummary,
        applyImprovedBullet,
        runAIReview,
        createNewResumeFile,
        loadSavedResume,
        undo,
        redo
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const value = useContext(ResumeContext);
  if (!value) throw new Error('useResume must be used inside ResumeProvider');
  return value;
};
