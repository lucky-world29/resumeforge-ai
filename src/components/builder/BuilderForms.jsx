import { GripVertical, Plus, Trash2, Sparkles, ArrowDown, ArrowUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Label, Select, Textarea } from '../ui/Fields';
import { tagsToText } from '../../lib/utils';

const SectionHeader = ({ eyebrow, title, description, action }) => (
  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
    <div>
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
    {action}
  </div>
);

const Panel = ({ children }) => <Card className="p-6">{children}</Card>;

const ExperienceCard = ({ item, index, total, updateItem, removeItem, reorderItems }) => {
  const onDragStart = (event) => event.dataTransfer.setData('text/plain', String(index));
  const onDrop = (event) => {
    event.preventDefault();
    const startIndex = Number(event.dataTransfer.getData('text/plain'));
    reorderItems('experience', startIndex, index);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm text-slate-300">
          <GripVertical className="h-4 w-4 text-slate-500" /> Experience {index + 1}
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white" onClick={() => reorderItems('experience', index, Math.max(0, index - 1))}>
            <ArrowUp className="h-4 w-4" />
          </button>
          <button className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white" onClick={() => reorderItems('experience', index, Math.min(total - 1, index + 1))}>
            <ArrowDown className="h-4 w-4" />
          </button>
          <button className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-2 text-rose-300 hover:bg-rose-500/20" onClick={() => removeItem('experience', item.id)}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Company</Label><Input value={item.company} onChange={(e) => updateItem('experience', item.id, 'company', e.target.value)} /></div>
        <div><Label>Role</Label><Input value={item.role} onChange={(e) => updateItem('experience', item.id, 'role', e.target.value)} /></div>
        <div><Label>Location</Label><Input value={item.location} onChange={(e) => updateItem('experience', item.id, 'location', e.target.value)} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Start Date</Label><Input type="month" value={item.startDate} onChange={(e) => updateItem('experience', item.id, 'startDate', e.target.value)} /></div>
          <div><Label>End Date</Label><Input value={item.endDate} onChange={(e) => updateItem('experience', item.id, 'endDate', e.target.value)} placeholder="Present" /></div>
        </div>
      </div>
      <div className="mt-4"><Label>Description</Label><Textarea value={item.description} onChange={(e) => updateItem('experience', item.id, 'description', e.target.value)} /></div>
    </div>
  );
};

const ArrayEditor = ({ title, section, fields, addLabel }) => {
  const { resume, updateItem, addItem, removeItem } = useResume();
  return (
    <Panel>
      <SectionHeader eyebrow={title} title={title} description={`Add and manage ${title.toLowerCase()} details.`} action={<Button onClick={() => addItem(section)}><span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> {addLabel}</span></Button>} />
      <div className="space-y-4">
        {resume[section].map((item, index) => (
          <div key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">{title} {index + 1}</p>
              <button className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-2 text-rose-300 hover:bg-rose-500/20" onClick={() => removeItem(section, item.id)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.full ? 'md:col-span-2' : ''}>
                  <Label>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea value={item[field.key]} onChange={(e) => updateItem(section, item.id, field.key, e.target.value)} />
                  ) : field.type === 'select' ? (
                    <Select value={item[field.key]} onChange={(e) => updateItem(section, item.id, field.key, e.target.value)}>
                      {field.options.map((option) => <option key={option}>{option}</option>)}
                    </Select>
                  ) : (
                    <Input type={field.type || 'text'} value={item[field.key]} onChange={(e) => updateItem(section, item.id, field.key, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export const BuilderForms = () => {
  const {
    activeStep,
    resume,
    skillCategories,
    updatePersonal,
    updateSummary,
    updateItem,
    addItem,
    removeItem,
    reorderItems,
    updateSkillCategory,
    generateAISummary
  } = useResume();

  if (activeStep === 0) {
    return (
      <Panel>
        <SectionHeader eyebrow="Step 1" title="Personal Information" description="Add your core contact details and profile links." />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Photo Upload</Label>
            <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-4 md:flex-row md:items-center">
              <img src={resume.personal.photo} alt="Profile" className="h-20 w-20 rounded-3xl object-cover ring-1 ring-white/10" />
              <div className="flex-1">
                <Input type="file" accept="image/*" onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => updatePersonal('photo', reader.result);
                  reader.readAsDataURL(file);
                }} />
                <p className="mt-2 text-xs text-slate-500">Upload a square headshot for the premium profile block.</p>
              </div>
            </div>
          </div>
          {[
            ['fullName', 'Full Name'],
            ['jobTitle', 'Job Title'],
            ['email', 'Email'],
            ['phone', 'Phone'],
            ['address', 'Address'],
            ['linkedin', 'LinkedIn'],
            ['github', 'GitHub'],
            ['portfolio', 'Portfolio']
          ].map(([key, label]) => (
            <div key={key} className={key === 'address' ? 'md:col-span-2' : ''}>
              <Label>{label}</Label>
              <Input value={resume.personal[key]} onChange={(e) => updatePersonal(key, e.target.value)} />
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (activeStep === 1) {
    return (
      <Panel>
        <SectionHeader
          eyebrow="Step 2"
          title="Professional Summary"
          description="Generate a professional summary based on your skills, then edit it to match your target role."
          action={<Button onClick={generateAISummary}><span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Generate</span></Button>}
        />
        <Label>Prompt</Label>
        <div className="mb-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">Generate a professional summary based on my skills.</div>
        <Label>Editable text area</Label>
        <Textarea value={resume.summary} onChange={(e) => updateSummary(e.target.value)} className="min-h-[220px]" />
      </Panel>
    );
  }

  if (activeStep === 2) {
    return (
      <Panel>
        <SectionHeader eyebrow="Work Experience" title="Dynamic cards" description="Add, refine, delete, and drag to reorder experience blocks." action={<Button onClick={() => addItem('experience')}><span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Add Experience</span></Button>} />
        <div className="space-y-4">
          {resume.experience.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} total={resume.experience.length} updateItem={updateItem} removeItem={removeItem} reorderItems={reorderItems} />
          ))}
        </div>
      </Panel>
    );
  }

  if (activeStep === 3) {
    return <ArrayEditor title="Education" section="education" addLabel="Add Education" fields={[
      { key: 'college', label: 'College' },
      { key: 'degree', label: 'Degree' },
      { key: 'cgpa', label: 'CGPA' },
      { key: 'year', label: 'Year' },
      { key: 'achievements', label: 'Achievements', type: 'textarea', full: true }
    ]} />;
  }

  if (activeStep === 4) {
    return (
      <Panel>
        <SectionHeader eyebrow="Skills" title="Animated skill chips" description="Separate categories with commas to power templates and smart AI insights." />
        <div className="grid gap-5 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category}>
              <Label>{category}</Label>
              <Input value={tagsToText(resume.skills[category])} onChange={(e) => updateSkillCategory(category, e.target.value)} placeholder="Comma separated skills" />
              <div className="mt-3 flex flex-wrap gap-2">
                {resume.skills[category].map((tag) => (
                  <span key={tag} className="animate-float rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (activeStep === 5) {
    return <ArrayEditor title="Projects" section="projects" addLabel="Add Project" fields={[
      { key: 'name', label: 'Project Name' },
      { key: 'techStack', label: 'Tech Stack' },
      { key: 'githubLink', label: 'GitHub Link' },
      { key: 'liveDemo', label: 'Live Demo' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'achievements', label: 'Achievements', type: 'textarea', full: true }
    ]} />;
  }

  if (activeStep === 6) {
    return <ArrayEditor title="Certifications" section="certifications" addLabel="Add Certification" fields={[
      { key: 'certificate', label: 'Certificate' },
      { key: 'organization', label: 'Organization' },
      { key: 'issueDate', label: 'Issue Date', type: 'month' },
      { key: 'credentialId', label: 'Credential ID' }
    ]} />;
  }

  if (activeStep === 7) {
    return <ArrayEditor title="Achievements" section="achievements" addLabel="Add Achievement" fields={[
      { key: 'category', label: 'Category', type: 'select', options: ['Awards', 'Hackathons', 'Competitions', 'Publications'] },
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', type: 'textarea', full: true }
    ]} />;
  }

  return <ArrayEditor title="Languages" section="languages" addLabel="Add Language" fields={[
    { key: 'language', label: 'Language' },
    { key: 'level', label: 'Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Native'] }
  ]} />;
};
