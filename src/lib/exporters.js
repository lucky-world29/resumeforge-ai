import { downloadBlob, monthLabel, slugify } from './utils';

const buildHTML = (resume, template, settings) => {
  const accent = settings.accentColor || '#6366f1';
  const skills = Object.entries(resume.skills)
    .map(([key, values]) => `<section><h3>${key}</h3><p>${values.join(' · ')}</p></section>`)
    .join('');
  const experience = resume.experience
    .map(
      (item) => `
      <article>
        <header>
          <h3>${item.role} · ${item.company}</h3>
          <span>${monthLabel(item.startDate)} — ${monthLabel(item.endDate)}</span>
        </header>
        <p>${item.location}</p>
        <p>${item.description}</p>
      </article>`
    )
    .join('');

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${resume.personal.fullName} Resume</title>
      <style>
        body { font-family: ${settings.fontFamily}; background: #0b1120; color: #e2e8f0; padding: 40px; }
        .sheet { max-width: 900px; margin: 0 auto; background: ${template === 'light' ? '#ffffff' : '#0f172a'}; color: ${template === 'light' ? '#0f172a' : '#e2e8f0'}; border-radius: 24px; padding: 32px; border: 1px solid rgba(148,163,184,0.2); }
        .hero { display:flex; justify-content:space-between; gap:24px; align-items:center; border-bottom:1px solid rgba(148,163,184,0.18); padding-bottom:24px; }
        .pill { display:inline-block; background:${accent}; color:white; padding:6px 12px; border-radius:999px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; }
        h1 { margin:0; font-size:40px; }
        h2 { margin-top:24px; font-size:18px; text-transform:uppercase; letter-spacing:0.08em; color:${accent}; }
        h3 { margin:0 0 6px 0; font-size:16px; }
        p { line-height:1.6; color: inherit; opacity: 0.86; }
        article, section { margin-top: 16px; }
        .grid { display:grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="hero">
          <div>
            <span class="pill">${resume.personal.jobTitle}</span>
            <h1>${resume.personal.fullName}</h1>
            <p>${resume.personal.email} · ${resume.personal.phone} · ${resume.personal.address}</p>
          </div>
          <div>
            <p>${resume.personal.linkedin}</p>
            <p>${resume.personal.github}</p>
            <p>${resume.personal.portfolio}</p>
          </div>
        </div>
        <div class="grid">
          <main>
            <h2>Professional Summary</h2>
            <p>${resume.summary}</p>
            <h2>Work Experience</h2>
            ${experience}
            <h2>Projects</h2>
            ${resume.projects
              .map(
                (item) => `<article><h3>${item.name}</h3><p>${item.description}</p><p><strong>Tech Stack:</strong> ${item.techStack}</p></article>`
              )
              .join('')}
          </main>
          <aside>
            <h2>Skills</h2>
            ${skills}
            <h2>Education</h2>
            ${resume.education
              .map(
                (item) => `<article><h3>${item.degree}</h3><p>${item.college} · ${item.year}</p><p>${item.achievements}</p></article>`
              )
              .join('')}
            <h2>Certifications</h2>
            ${resume.certifications
              .map(
                (item) => `<article><h3>${item.certificate}</h3><p>${item.organization}</p><p>${item.issueDate}</p></article>`
              )
              .join('')}
          </aside>
        </div>
      </div>
    </body>
  </html>`;
};

export const exportHTML = (resume, template, settings) => {
  const blob = new Blob([buildHTML(resume, template, settings)], { type: 'text/html;charset=utf-8' });
  downloadBlob(blob, `${slugify(resume.personal.fullName || 'resume')}.html`);
};

export const exportPDF = async (previewElement, resume) => {
  if (!previewElement) return;
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf')
  ]);
  const canvas = await html2canvas(previewElement, { scale: 2, backgroundColor: null });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const width = 210;
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  pdf.save(`${slugify(resume.personal.fullName || 'resume')}.pdf`);
};

export const exportDOCX = async (resume) => {
  const [{ Document, HeadingLevel, Packer, Paragraph, TextRun }, { saveAs }] = await Promise.all([
    import('docx'),
    import('file-saver')
  ]);

  const heading = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 260, after: 120 } });
  const line = (text, bold = false) => new Paragraph({ children: [new TextRun({ text, bold, size: 22 })], spacing: { after: 80 } });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [new TextRun({ text: resume.personal.fullName, bold: true, size: 34 })] }),
          line(resume.personal.jobTitle),
          line(`${resume.personal.email} · ${resume.personal.phone} · ${resume.personal.address}`),
          heading('Professional Summary'),
          line(resume.summary),
          heading('Work Experience'),
          ...resume.experience.flatMap((item) => [
            line(`${item.role} · ${item.company}`, true),
            line(`${monthLabel(item.startDate)} — ${monthLabel(item.endDate)} · ${item.location}`),
            line(item.description)
          ]),
          heading('Education'),
          ...resume.education.flatMap((item) => [
            line(`${item.degree} · ${item.college}`, true),
            line(`${item.year} · CGPA ${item.cgpa}`),
            line(item.achievements)
          ]),
          heading('Skills'),
          ...Object.entries(resume.skills).map(([key, values]) => line(`${key}: ${values.join(', ')}`)),
          heading('Projects'),
          ...resume.projects.flatMap((item) => [
            line(item.name, true),
            line(item.description),
            line(`Tech Stack: ${item.techStack}`)
          ])
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${slugify(resume.personal.fullName || 'resume')}.docx`);
};

export const printResume = (resume, template, settings) => {
  const html = buildHTML(resume, template, settings);
  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1024,height=900');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};
