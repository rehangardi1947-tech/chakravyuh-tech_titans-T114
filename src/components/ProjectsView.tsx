import React, { useState } from 'react';
import { 
  FolderGit2, 
  Heart, 
  ExternalLink, 
  FileCode, 
  Cpu, 
  Plus, 
  X, 
  CheckCircle,
  Building,
  Sparkles
} from 'lucide-react';
import { STUDENT_PROJECTS } from '../data/projectsData';
import { StudentProject } from '../types';

export const ProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<StudentProject[]>(STUDENT_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [inspectedProject, setInspectedProject] = useState<StudentProject | null>(null);

  // New project submission form
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [newCategory, setNewCategory] = useState<'IoT' | 'Telecommunication' | 'Embedded Systems' | 'DSP' | 'Robotics'>('IoT');
  const [newSummary, setNewSummary] = useState('');
  const [newComponents, setNewComponents] = useState('ESP32, DHT22, Solderless Breadboard');
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const categories = ['All', 'Telecommunication', 'Robotics', 'IoT', 'DSP', 'Embedded Systems'];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(projects.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newCollege) return;

    const newProj: StudentProject = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      author: newAuthor,
      college: newCollege,
      category: newCategory,
      summary: newSummary || 'Innovative hardware project built with rented showroom lab gear.',
      description: newSummary || 'Full student engineering capstone documentation.',
      componentsUsed: newComponents.split(',').map((c) => c.trim()),
      schematicSummary: 'Hardware schematic verified with ENTCverse equipment.',
      githubUrl: 'https://github.com/entcverse-student-showcase/community-project',
      likes: 1
    };

    setProjects([newProj, ...projects]);
    setSubmittedSuccessfully(true);
    setTimeout(() => {
      setSubmittedSuccessfully(false);
      setShowSubmitModal(false);
      setNewTitle('');
      setNewAuthor('');
      setNewCollege('');
      setNewSummary('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>STUDENT HARDWARE INNOVATION SHOWCASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built With ENTCverse Lab Gear
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Explore capstone projects, telecommunication prototypes, and robotics built by undergraduate students using equipment rented from our platform.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-cyan-400/20 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Your Project</span>
        </button>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-1.5 px-3.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setInspectedProject(proj)}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-mono font-medium">{proj.category}</span>
                <button
                  onClick={(e) => handleLike(proj.id, e)}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span className="font-mono">{proj.likes}</span>
                </button>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>{proj.author} · <strong className="text-slate-300 font-normal">{proj.college}</strong></span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {proj.summary}
              </p>

              {/* Components Pill List */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 block mb-1.5">Key Rented Components:</span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.componentsUsed.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-cyan-400 font-medium group-hover:underline flex items-center gap-1">
                <span>View Schematics & BOM</span>
                <span>→</span>
              </span>
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-slate-400 hover:text-white"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Inspected Project Blueprint Drawer Modal */}
      {inspectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400">{inspectedProject.category} · Capstone Project</span>
                <h2 className="text-xl font-bold text-white mt-0.5">{inspectedProject.title}</h2>
                <div className="text-xs text-slate-400 mt-1">
                  Built by {inspectedProject.author} ({inspectedProject.college})
                </div>
              </div>
              <button
                onClick={() => setInspectedProject(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Abstract & Architecture</h4>
                <p className="text-slate-300 leading-relaxed mt-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {inspectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Bill of Materials (BOM)</h4>
                <ul className="space-y-1 mt-1 text-slate-300">
                  {inspectedProject.componentsUsed.map((comp, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Hardware Wiring & Circuit Invariant</h4>
                <p className="text-slate-300 leading-relaxed mt-1 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                  {inspectedProject.schematicSummary}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <a
                href={inspectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2"
              >
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>Open GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setInspectedProject(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Project Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Submit Your ENTC Project</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccessfully ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Project Published to Showcase!</h4>
                <p className="text-xs text-slate-400">Other students can now view your schematics and BOM.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProject} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smart Water Quality Buoy with LoRa"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Your Name(s)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Siddharth & Neha"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">College / Institute</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MIT Pune"
                      value={newCollege}
                      onChange={(e) => setNewCollege(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="IoT">IoT</option>
                    <option value="Telecommunication">Telecommunication</option>
                    <option value="Robotics">Robotics</option>
                    <option value="DSP">DSP</option>
                    <option value="Embedded Systems">Embedded Systems</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Short Summary</label>
                  <textarea
                    rows={3}
                    placeholder="Describe problem solved, hardware challenges, and results..."
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Components Used (comma separated)</label>
                  <input
                    type="text"
                    value={newComponents}
                    onChange={(e) => setNewComponents(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-slate-900 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg"
                  >
                    Publish to Showcase
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
