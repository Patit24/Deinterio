import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  Download, 
  ThumbsUp, 
  X, 
  Sparkles, 
  User, 
  Lock, 
  LogOut, 
  KeyRound, 
  ArrowRight,
  Camera,
  Calendar,
  MapPin,
  ShieldCheck,
  MessageSquare,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { dataStore } from '../services/dataStore';
import type { ClientAccount, WorkItem } from '../services/dataStore';

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ isOpen, onClose }) => {
  const [activeAccount, setActiveAccount] = useState<ClientAccount | null>(null);

  // Login Form State
  const [username, setUsername] = useState('client');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Dashboard Tabs & Filter States
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'photos' | 'documents' | 'chat'>('overview');
  const [workStatusFilter, setWorkStatusFilter] = useState<'ALL' | 'COMPLETED' | 'IN_PROGRESS' | 'PENDING'>('ALL');
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<'ALL' | 'Before Work' | 'During Work' | 'Completed Work'>('ALL');
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  
  // Chat Message Input
  const [newMessage, setNewMessage] = useState('');
  const [approvedItems, setApprovedItems] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const account = dataStore.authenticateClient(username, password);
    if (account) {
      setActiveAccount(account);
    } else {
      setLoginError('Invalid credentials. Please contact your Deinterio Project Manager for portal access.');
    }
  };

  const handleQuickDemoLogin = (userKey: string) => {
    const account = dataStore.authenticateClient(userKey, 'password123');
    if (account) {
      setActiveAccount(account);
      setLoginError('');
    }
  };

  const handleLogout = () => {
    setActiveAccount(null);
    setUsername('client');
    setPassword('password123');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeAccount) return;

    const updatedAccount = { ...activeAccount };
    updatedAccount.chatMessages.push({
      sender: activeAccount.clientName,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isClient: true,
    });

    dataStore.saveClient(updatedAccount);
    setActiveAccount(updatedAccount);
    setNewMessage('');
  };

  const handleApprove = (title: string) => {
    if (!approvedItems.includes(title)) {
      setApprovedItems([...approvedItems, title]);
    }
  };

  // Helper counts
  const workItems = activeAccount?.workItems || [];
  const completedCount = workItems.filter((w) => w.status === 'COMPLETED').length;
  const inProgressCount = workItems.filter((w) => w.status === 'IN_PROGRESS').length;
  const pendingCount = workItems.filter((w) => w.status === 'PENDING').length;

  const filteredWorkItems = workItems.filter((w) => {
    if (workStatusFilter === 'ALL') return true;
    return w.status === workStatusFilter;
  });

  const dailyPhotos = activeAccount?.dailyPhotos || [];
  const filteredPhotos = dailyPhotos.filter((p) => {
    if (photoCategoryFilter === 'ALL') return true;
    return (p.category || 'During Work') === photoCategoryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1917]/80 backdrop-blur-md overflow-y-auto overscroll-contain p-3 sm:p-6 flex justify-center items-start animate-fade-in text-[#1A1917]">
      <div className="relative w-full max-w-5xl my-4 sm:my-8 rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 shadow-2xl overflow-hidden flex flex-col">
        
        {/* ========================================================================= */}
        {/* STEP 1: CLIENT LOGIN FORM                                                */}
        {/* ========================================================================= */}
        {!activeAccount ? (
          <div className="p-8 sm:p-12 max-w-lg mx-auto space-y-8 my-auto w-full">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#13362B] flex items-center justify-center text-[#C8AA7A] shadow-md">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Client Portal Sign In</h3>
                  <p className="text-xs text-[#8C6D3B] font-mono">Deinterio Live Telemetry Tracker</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#1A1917]/5 hover:bg-[#1A1917]/10 text-[#1A1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                  Client Username / Phone
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    placeholder="e.g. client"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                  Portal Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#13362B] text-[#C8AA7A] hover:bg-[#0E271F] font-mono font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ACCESS MY PROJECT TRACKER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Access Switcher */}
            <div className="pt-4 border-t border-[#E2DDD6] space-y-3">
              <span className="text-[11px] font-mono text-[#6B6560] block text-center uppercase tracking-wider font-semibold">
                Quick Demo Accounts
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleQuickDemoLogin('client')}
                  className="p-3 rounded-xl bg-white border border-[#E2DDD6] hover:border-[#13362B] text-left transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#13362B] block">Rahul & Priya Verma</span>
                  <span className="text-[10px] font-mono text-[#6B6560] block">New Town • 72% Active</span>
                </button>

                <button
                  onClick={() => handleQuickDemoLogin('ballygunge')}
                  className="p-3 rounded-xl bg-white border border-[#E2DDD6] hover:border-[#13362B] text-left transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#13362B] block">Dr. Debabrata Roy</span>
                  <span className="text-[10px] font-mono text-[#6B6560] block">Ballygunge • 100% Done</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 2: AUTHENTICATED CLIENT DASHBOARD                                    */
          /* ========================================================================= */
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Top Navigation Header */}
            <div className="p-6 bg-white border-b border-[#E2DDD6] flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#13362B] flex items-center justify-center text-[#C8AA7A] shadow-md font-serif font-bold text-lg">
                  {activeAccount.clientName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#1A1917]">{activeAccount.clientName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#13362B]/10 text-[10px] font-mono font-bold text-[#13362B] uppercase">
                      {activeAccount.projectCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#6B6560] mt-0.5">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#A88B57]" />{activeAccount.location}</span>
                    <span>•</span>
                    <span>PM: <strong>{activeAccount.manager}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#E2DDD6] hover:bg-rose-50 hover:text-rose-700 text-xs font-mono text-[#5A5852] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-[#1A1917]/5 hover:bg-[#1A1917]/10 text-[#1A1917] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dashboard Tabs Bar */}
            <div className="bg-[#FAF8F4] border-b border-[#E2DDD6] px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              {[
                { key: 'overview', label: 'Project Overview', icon: LayoutDashboard },
                { key: 'progress', label: `Work Items (${workItems.length})`, icon: Clock },
                { key: 'photos', label: `Photo Gallery (${dailyPhotos.length})`, icon: Camera },
                { key: 'documents', label: `Documents (${activeAccount.documents.length})`, icon: FileText },
                { key: 'chat', label: `Messages & Requests (${activeAccount.chatMessages.length})`, icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      activeTab === tab.key
                        ? 'bg-[#13362B] text-[#C8AA7A] shadow-md'
                        : 'text-[#5A5852] hover:bg-white hover:text-[#1A1917]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dashboard Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* =================================================================== */}
              {/* TAB 1: OVERVIEW & VISUAL TIMELINE                                   */}
              {/* =================================================================== */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  
                  {/* Top Progress Summary Banner */}
                  <div className="p-6 rounded-3xl bg-[#13362B] text-white space-y-4 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AA7A] block font-bold">
                          LIVE PROJECT OVERVIEW
                        </span>
                        <h2 className="font-serif text-3xl font-normal text-white mt-1">
                          {activeAccount.projectName}
                        </h2>
                        <p className="text-xs text-[#D4C3A3] font-mono mt-0.5">
                          Current Stage: <strong className="text-white">{activeAccount.currentPhase}</strong>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-5xl font-bold text-[#C8AA7A]">{activeAccount.progress}%</span>
                        <span className="text-[10px] font-mono text-[#D4C3A3] block uppercase tracking-wider">Overall Completion</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C8AA7A] to-emerald-400 rounded-full transition-all duration-1000"
                        style={{ width: `${activeAccount.progress}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10 text-xs font-mono text-[#D4C3A3]">
                      <div>
                        <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Start Date</span>
                        <strong className="text-white">{activeAccount.startDate || 'Jun 10, 2026'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Est. Handover</span>
                        <strong className="text-white">{activeAccount.expectedCompletionDate || 'Sep 10, 2026'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Paid Milestone</span>
                        <strong className="text-emerald-400">{activeAccount.paidMilestone} / {activeAccount.totalMilestone}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Last Updated</span>
                        <strong className="text-white">{activeAccount.lastUpdatedDate || 'Today'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* 3 Work Categories Summary Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                          ✓
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-900 block">COMPLETED</span>
                          <span className="text-[11px] font-mono text-emerald-700">{completedCount} Verified Work Items</span>
                        </div>
                      </div>
                      <span className="font-serif text-2xl font-bold text-emerald-800">{completedCount}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                          ●
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-900 block">IN PROGRESS</span>
                          <span className="text-[11px] font-mono text-amber-700">{inProgressCount} Active On Site</span>
                        </div>
                      </div>
                      <span className="font-serif text-2xl font-bold text-amber-800">{inProgressCount}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-400 text-white flex items-center justify-center font-bold">
                          ○
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-800 block">PENDING</span>
                          <span className="text-[11px] font-mono text-slate-600">{pendingCount} Upcoming Phases</span>
                        </div>
                      </div>
                      <span className="font-serif text-2xl font-bold text-slate-700">{pendingCount}</span>
                    </div>
                  </div>

                  {/* VISUAL PROJECT TIMELINE */}
                  <div className="bg-white rounded-3xl p-6 border border-[#E2DDD6] space-y-6 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">VISUAL EXECUTION TIMELINE</span>
                        <h4 className="font-serif text-2xl font-normal text-[#1A1917] mt-0.5">Project Phases & Milestones</h4>
                      </div>
                      <span className="text-xs font-mono text-[#6B6560]">Updated by Site PM</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeAccount.phases.map((phase, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border transition-all ${
                            phase.status === 'Completed'
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : phase.status === 'In Progress'
                              ? 'bg-amber-50/60 border-amber-300 shadow-md ring-2 ring-amber-400/30'
                              : 'bg-[#FAF8F4] border-[#E2DDD6]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-lg bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold flex items-center justify-center">
                              {phase.phase}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                phase.status === 'Completed'
                                  ? 'bg-emerald-600 text-white'
                                  : phase.status === 'In Progress'
                                  ? 'bg-amber-500 text-white animate-pulse'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {phase.status}
                            </span>
                          </div>
                          <h5 className="font-serif text-base font-bold text-[#1A1917] leading-snug">{phase.title}</h5>
                          <span className="text-[11px] font-mono text-[#6B6560] block mt-1">{phase.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 2: DETAILED WORK ITEMS (COMPLETED, IN PROGRESS, PENDING)         */}
              {/* =================================================================== */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  
                  {/* Category Filter Pills */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Detailed Work Progress Items</h4>
                      <p className="text-xs font-mono text-[#6B6560]">Real-time site verification log</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {(['ALL', 'COMPLETED', 'IN_PROGRESS', 'PENDING'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setWorkStatusFilter(st)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            workStatusFilter === st
                              ? 'bg-[#13362B] text-[#C8AA7A] font-bold shadow-md'
                              : 'bg-white border border-[#E2DDD6] text-[#1A1917] hover:border-[#13362B]'
                          }`}
                        >
                          {st === 'ALL' ? 'All Items' : st.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Work Items Cards */}
                  <div className="space-y-4">
                    {filteredWorkItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border transition-all bg-white shadow-xs ${
                          item.status === 'COMPLETED'
                            ? 'border-emerald-200 hover:border-emerald-400'
                            : item.status === 'IN_PROGRESS'
                            ? 'border-amber-300 ring-1 ring-amber-400/20'
                            : 'border-[#E2DDD6]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DDD6] pb-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                                item.status === 'COMPLETED'
                                  ? 'bg-emerald-600 text-white'
                                  : item.status === 'IN_PROGRESS'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-slate-300 text-slate-700'
                              }`}
                            >
                              {item.status === 'COMPLETED' ? '✓' : item.status === 'IN_PROGRESS' ? '●' : '○'}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-[#FAF8F4] border border-[#E2DDD6] text-[10px] font-mono text-[#8C6D3B] font-bold">
                                  {item.category}
                                </span>
                                <span className="text-xs font-mono font-bold text-[#13362B]">
                                  {item.progressPercent}% Done
                                </span>
                              </div>
                              <h5 className="font-serif text-lg font-bold text-[#1A1917] mt-0.5">{item.title}</h5>
                            </div>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider w-fit ${
                              item.status === 'COMPLETED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'IN_PROGRESS'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="pt-3 space-y-3">
                          <p className="text-xs text-[#5A5852] font-light leading-relaxed">{item.description}</p>

                          {item.notes && (
                            <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917]">
                              <strong>PM Site Note:</strong> {item.notes}
                            </div>
                          )}

                          {/* Completion Photos */}
                          {item.photos && item.photos.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] font-mono font-bold text-[#8C6D3B] uppercase tracking-wider block">
                                Verified Work Photos ({item.photos.length})
                              </span>
                              <div className="flex items-center gap-3">
                                {item.photos.map((ph, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => setLightboxPhoto(ph)}
                                    className="w-20 h-20 rounded-xl overflow-hidden border border-[#E2DDD6] cursor-pointer group relative"
                                  >
                                    <img src={ph} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                      <Maximize2 className="w-4 h-4" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] font-mono text-[#6B6560] pt-2 border-t border-[#E2DDD6]/60">
                            <span>Start: {item.startDate || 'N/A'}</span>
                            <span>{item.status === 'COMPLETED' ? `Completed: ${item.completedDate}` : `Est. Finish: ${item.estCompletionDate}`}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 3: PHOTO GALLERY                                               */}
              {/* =================================================================== */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Site Photo Gallery</h4>
                      <p className="text-xs font-mono text-[#6B6560]">Organized by project execution stage</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {(['ALL', 'Before Work', 'During Work', 'Completed Work'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setPhotoCategoryFilter(cat)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            photoCategoryFilter === cat
                              ? 'bg-[#13362B] text-[#C8AA7A] font-bold shadow-md'
                              : 'bg-white border border-[#E2DDD6] text-[#1A1917] hover:border-[#13362B]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxPhoto(photo.img)}
                        className="group bg-white rounded-2xl overflow-hidden border border-[#E2DDD6] shadow-xs hover:shadow-xl transition-all cursor-pointer"
                      >
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img src={photo.img} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-6 h-6" />
                          </div>
                          <span className="absolute top-3 left-3 bg-[#13362B]/90 backdrop-blur-md text-[#C8AA7A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                            {photo.category || 'During Work'}
                          </span>
                        </div>
                        <div className="p-4 space-y-1">
                          <h5 className="font-serif text-base font-bold text-[#1A1917]">{photo.title}</h5>
                          <span className="text-[11px] font-mono text-[#6B6560] block">{photo.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 4: CLIENT DOCUMENTS                                            */}
              {/* =================================================================== */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Project Documents & BOQs</h4>
                    <p className="text-xs font-mono text-[#6B6560]">Download verified contracts, invoices, and digital 10-year warranty</p>
                  </div>

                  <div className="space-y-3">
                    {activeAccount.documents.map((doc, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2DDD6] flex items-center justify-between gap-4 hover:border-[#13362B] transition-all shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#13362B]/10 text-[#13362B] flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-serif text-base font-bold text-[#1A1917]">{doc.title}</h5>
                              <span className="px-2 py-0.5 rounded-full bg-[#FAF8F4] border border-[#E2DDD6] text-[10px] font-mono text-[#8C6D3B]">
                                {doc.type || 'Document'}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#6B6560] block mt-0.5">{doc.size} • Uploaded {doc.date}</span>
                          </div>
                        </div>

                        <a
                          href="#/calculator"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading verified document: ${doc.title}`);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 5: MESSAGES & REQUEST SUBMISSION                                */}
              {/* =================================================================== */}
              {activeTab === 'chat' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Project Communication Thread</h4>
                    <p className="text-xs font-mono text-[#6B6560]">Direct message link to Principal Architect & Site PM</p>
                  </div>

                  {/* Chat Messages Log */}
                  <div className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 max-h-[380px] overflow-y-auto">
                    {activeAccount.chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${msg.isClient || msg.sender === 'You' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed space-y-1 ${
                            msg.isClient || msg.sender === 'You'
                              ? 'bg-[#13362B] text-white rounded-br-none'
                              : 'bg-[#FAF8F4] border border-[#E2DDD6] text-[#1A1917] rounded-bl-none'
                          }`}
                        >
                          <span className={`text-[10px] font-mono font-bold block ${msg.isClient || msg.sender === 'You' ? 'text-[#C8AA7A]' : 'text-[#8C6D3B]'}`}>
                            {msg.sender}
                          </span>
                          <p>{msg.text}</p>
                          <span className={`text-[9px] font-mono block text-right ${msg.isClient || msg.sender === 'You' ? 'text-[#D4C3A3]/70' : 'text-gray-400'}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Send Question / Request Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your question or site request to PM..."
                      className="flex-1 px-4 py-3.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>SEND</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxPhoto(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
