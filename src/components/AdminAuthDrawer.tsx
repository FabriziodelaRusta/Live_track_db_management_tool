import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  X,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { adminAuthService, DEFAULT_ADMIN_PASSWORD } from '../services/adminAuth';

interface AdminAuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  isAuthenticated: boolean;
  onAuthenticate: (authenticated: boolean) => void;
  onAddToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}

export const AdminAuthDrawer: React.FC<AdminAuthDrawerProps> = ({
  isOpen,
  onClose,
  onToggle,
  isAuthenticated,
  onAuthenticate,
  onAddToast,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Settings / Change Password State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPwInput, setCurrentPwInput] = useState('');
  const [newPwInput, setNewPwInput] = useState('');
  const [confirmPwInput, setConfirmPwInput] = useState('');
  const [changePwError, setChangePwError] = useState<string | null>(null);
  const [changePwSuccess, setChangePwSuccess] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    if (!passwordInput.trim()) {
      setAuthError('Please enter the admin password.');
      return;
    }

    if (adminAuthService.verifyPassword(passwordInput)) {
      adminAuthService.setSessionAuthState(true);
      onAuthenticate(true);
      setPasswordInput('');
      setAuthError(null);
      onAddToast('success', 'Authenticated', 'Delete permissions are now unlocked.');
    } else {
      setAuthError('Incorrect password. Default is "admin".');
      onAddToast('error', 'Authentication Failed', 'Incorrect password entered.');
    }
  };

  const handleLogout = () => {
    adminAuthService.setSessionAuthState(false);
    onAuthenticate(false);
    onAddToast('info', 'Locked', 'Delete permissions have been locked.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePwError(null);
    setChangePwSuccess(null);

    if (!adminAuthService.verifyPassword(currentPwInput)) {
      setChangePwError('Current password is not correct.');
      return;
    }

    if (!newPwInput.trim()) {
      setChangePwError('New password cannot be empty.');
      return;
    }

    if (newPwInput !== confirmPwInput) {
      setChangePwError('New passwords do not match.');
      return;
    }

    adminAuthService.setPassword(newPwInput);
    setCurrentPwInput('');
    setNewPwInput('');
    setConfirmPwInput('');
    setChangePwSuccess('Password successfully updated!');
    onAddToast('success', 'Password Updated', 'Your new admin password has been saved.');
  };

  return (
    <>
      {/* 
        HANDLE ON THE RIGHT SIDE OF THE SCREEN
        Can be clicked to open or close the security window at any time
      */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-slate-50 border-y border-l border-slate-300 shadow-xl rounded-l-xl px-2 py-3.5 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:shadow-2xl group"
          title={
            isAuthenticated
              ? 'Admin Unlocked: Click handle to open security window'
              : 'Admin Locked: Click handle to authenticate and allow delete'
          }
          aria-label="Toggle admin security panel"
        >
          {isAuthenticated ? (
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-emerald-600 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          ) : (
            <div className="relative">
              <Lock className="w-4 h-4 text-amber-600 group-hover:text-rose-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
            </div>
          )}

          <span className="text-[10px] font-bold tracking-widest text-slate-700 [writing-mode:vertical-rl] rotate-180 uppercase select-none">
            {isAuthenticated ? 'Unlocked' : 'Security'}
          </span>

          <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Backdrop overlay when open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* 
        SLIDING WINDOW ON THE RIGHT SIDE OF THE SCREEN
      */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-84 sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Admin Security Drawer"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                isAuthenticated ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
              }`}
            >
              {isAuthenticated ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">Admin Security</h3>
              <p className="text-[11px] text-slate-500">Delete Authorization Window</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close window"
            aria-label="Close"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Status banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
              isAuthenticated
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            {isAuthenticated ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold text-xs uppercase tracking-wider block">
                {isAuthenticated ? 'Status: Unlocked' : 'Status: Locked'}
              </span>
              <p className="text-[11px] leading-relaxed opacity-90">
                {isAuthenticated
                  ? 'You are authenticated. Deletion of single dates, monthly batches, and individual trackers is enabled.'
                  : 'All delete operations are locked. Please provide the password below to authorize deletions.'}
              </p>
            </div>
          </div>

          {/* Authentication Section */}
          {!isAuthenticated ? (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <KeyRound className="w-4 h-4 text-indigo-600" />
                <span>Enter Admin Password</span>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white pr-9 font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {authError && (
                  <div className="text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Deletion</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center">
                  Default password is <code className="font-mono font-bold text-slate-600">admin</code>
                </p>
              </form>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Active Admin Session</span>
                <p className="text-[11px] text-slate-500">
                  You can now safely click any trash icon in the calendar or the "Delete Month Entries" button.
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lock & Deauthorize Now</span>
                </button>
              </div>
            </div>
          )}

          {/* Change Password Collapsible Section */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setShowChangePassword((prev) => !prev)}
              className="w-full p-3 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Change Admin Password</span>
              </div>
              <span className="text-[11px] text-indigo-600 font-semibold">
                {showChangePassword ? 'Hide' : 'Configure'}
              </span>
            </button>

            {showChangePassword && (
              <form onSubmit={handleChangePassword} className="p-3.5 pt-1 space-y-3 border-t border-slate-100">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPwInput}
                    onChange={(e) => setCurrentPwInput(e.target.value)}
                    placeholder="Current password (default 'admin')"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPwInput}
                    onChange={(e) => setNewPwInput(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPwInput}
                    onChange={(e) => setConfirmPwInput(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                {changePwError && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{changePwError}</span>
                  </p>
                )}

                {changePwSuccess && (
                  <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3 shrink-0" />
                    <span>{changePwSuccess}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-1.5 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors cursor-pointer"
                >
                  Save New Password
                </button>
              </form>
            )}
          </div>

          {/* Explanation / Protected Actions List */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-xs">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>What is protected?</span>
            </div>
            <ul className="text-[11px] space-y-1 pl-4 list-disc text-slate-600">
              <li>Individual day deletion (trash can on calendar cell)</li>
              <li>Global batch deletion ("Delete Month Entries" in toolbar)</li>
              <li>Date & tracker deletions inside the detail inspector</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Live_track DB Security</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 cursor-pointer"
          >
            Close Handle
          </button>
        </div>
      </aside>
    </>
  );
};
