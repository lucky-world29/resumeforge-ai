import { useResume } from '../../context/ResumeContext';
import { Card } from '../ui/Card';
import { Input, Label, Select } from '../ui/Fields';

export const SettingsPanel = () => {
  const { settings, updateSettings } = useResume();

  return (
    <Card className="p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Settings</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Visual + export preferences</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Control dark mode, accent color, font family, paper size, margin density, and autosave behavior.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label>Dark Mode</Label>
          <Select value={settings.darkMode ? 'enabled' : 'disabled'} onChange={(e) => updateSettings('darkMode', e.target.value === 'enabled')}>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </Select>
        </div>
        <div>
          <Label>Accent Color Picker</Label>
          <Input type="color" value={settings.accentColor} onChange={(e) => updateSettings('accentColor', e.target.value)} className="h-14 p-2" />
        </div>
        <div>
          <Label>Font Selector</Label>
          <Select value={settings.fontFamily} onChange={(e) => updateSettings('fontFamily', e.target.value)}>
            <option value="Inter, ui-sans-serif, system-ui">Inter</option>
            <option value="Sora, ui-sans-serif, system-ui">Sora</option>
            <option value="Manrope, ui-sans-serif, system-ui">Manrope</option>
            <option value="DM Sans, ui-sans-serif, system-ui">DM Sans</option>
          </Select>
        </div>
        <div>
          <Label>Paper Size</Label>
          <Select value={settings.paperSize} onChange={(e) => updateSettings('paperSize', e.target.value)}>
            <option>A4</option>
            <option>Letter</option>
            <option>Legal</option>
          </Select>
        </div>
        <div>
          <Label>Margin Settings</Label>
          <Select value={settings.margins} onChange={(e) => updateSettings('margins', e.target.value)}>
            <option>Compact</option>
            <option>Normal</option>
            <option>Comfortable</option>
          </Select>
        </div>
        <div>
          <Label>Auto Save</Label>
          <Select value={settings.autoSave ? 'enabled' : 'disabled'} onChange={(e) => updateSettings('autoSave', e.target.value === 'enabled')}>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </Select>
        </div>
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
        Keyboard shortcuts: <strong>Cmd/Ctrl + Z</strong> Undo, <strong>Cmd/Ctrl + Shift + Z</strong> or <strong>Cmd/Ctrl + Y</strong> Redo, <strong>Alt + ←/→</strong> step navigation.
      </div>
    </Card>
  );
};
