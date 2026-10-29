import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; role: 'student' | 'owner' }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [role, setRole] = useState<'student' | 'owner'>('student');
  const [name, setName] = useState('Arjun Mehta');
  const [email, setEmail] = useState('arjun.mehta@coep.ac.in');
  const [college, setCollege] = useState('COEP Technological University');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: role === 'student' ? (name || 'Arjun Mehta') : 'Prof. Suresh Kulkarni',
      role
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              {mode === 'signin' ? 'AUTHENTICATION' : 'LABORATORY REGISTRATION'}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {mode === 'signin' ? 'Sign In to ENTCverse Hub' : 'Create an Account'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector: Student vs Equipment Owner */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setRole('student');
              setName('Arjun Mehta');
              setEmail('arjun.mehta@coep.ac.in');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              role === 'student'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student / Maker</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('owner');
              setName('Prof. Suresh Kulkarni');
              setEmail('suresh.kulkarni@labgears.in');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              role === 'owner'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Equipment Owner</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Academic or Business Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                defaultValue="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>
          </div>

          {role === 'student' && mode === 'register' && (
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">College / Institute Name</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>
          )}

          <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-cyan-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>
              {role === 'student'
                ? 'College ID unlocks instant 15% discount and waived verification fees.'
                : 'Consignment dashboard gives direct access to weekly bank settlements.'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-cyan-400/20"
          >
            {mode === 'signin' ? `Sign In as ${role === 'student' ? 'Student' : 'Owner'}` : 'Complete Registration'}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center text-xs text-slate-400">
          {mode === 'signin' ? (
            <span>
              New to ENTCverse Hub?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Register free account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
