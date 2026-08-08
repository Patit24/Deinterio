import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle2, Clock, FileText, Send, Download, ThumbsUp, X, Sparkles, User, Lock, LogOut, KeyRound, ArrowRight } from 'lucide-react';
import { dataStore } from '../services/dataStore';
import type { ClientAccount } from '../services/dataStore';

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

  // Dashboard Tabs & Interactions
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'approvals' | 'documents' | 'chat'>('overview');
  const [approvedItems, setApprovedItems] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const account = dataStore.authenticateClient(username, password);
    if (account) {
      setActiveAccount(account);
    } else {
      setLoginError('Invalid username or password. Client credentials are created by your Admin in the Admin Panel.');
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

  const handleApprove = (title: string) => {
    if (!approvedItems.includes(title)) {
      setApprovedItems([...approvedItems, title]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeAccount) return;

    const updatedAccount = { ...activeAccount };
    updatedAccount.chatMessages.push({
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    dataStore.saveClient(updatedAccount);
    setActiveAccount(updatedAccount);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1917]/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#1A1917]">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto">
        
        {/* ========================================================================= */}
        {/* STEP 1: CLIENT SIGN IN PAGE                                              */}
        {/* ========================================================================= */}
        {!activeAccount ? (
          <div className="p-8 sm:p-12 max-w-lg mx-auto space-y-8 my-6">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#13362B] flex items-center justify-center text-[#C8AA7A] shadow-md">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Client Sign In</h3>
                  <p className="text-xs text-[#8C6D3B] font-mono">Deinterio Live Telemetry Dashboard</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#1A1917]/5 hover:bg-[#1A1917]/10 text-[#1A1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-600">
                  {loginError}
                </div>
              )}

              <div>
                <label className="text-xs font-mono font-bold uppercase text-[#8C6D3B] block mb-1.5">
                  Client Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A88B57] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Admin-created username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-[#8C6D3B] block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A88B57] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#C8AA7A]" />
              </button>
            </form>

            {/* Quick Demo Credentials (Created from Admin Panel) */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4C3A3] space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C6D3B]">
                <Sparkles className="w-4 h-4 text-[#A88B57]" />
                <span>ADMIN-CREATED CLIENT DEMO ACCOUNTS</span>
              </div>
              <p className="text-[11px] text-[#6B6560] font-light leading-relaxed">
                Accounts are managed in the Admin Panel. Click below to sign in instantly:
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('client')}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] hover:border-[#13362B] text-left text-xs font-mono text-[#13362B] flex items-center justify-between cursor-pointer"
                >
                  <span>1. New Town Residence (#D-402)</span>
                  <span className="text-[10px] text-[#A88B57] font-bold">User: client | Pass: password123</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('ballygunge')}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] hover:border-[#13362B] text-left text-xs font-mono text-[#13362B] flex items-center justify-between cursor-pointer"
                >
                  <span>2. Ballygunge Villa (#D-108)</span>
                  <span className="text-[10px] text-[#A88B57] font-bold">User: ballygunge | Pass: password123</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 2: AUTHENTICATED CLIENT DASHBOARD                                    */
          /* ========================================================================= */
          <>
            {/* Header Strip */}
            <div className="flex items-center justify-between p-6 border-b border-[#1A1917]/10 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A88B57]/15 border border-[#A88B57]/40 flex items-center justify-center text-[#8C6D3B]">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl text-[#1A1917] font-medium">{activeAccount.projectName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#13362B]/10 border border-[#13362B]/30 text-[10px] font-mono text-[#13362B] font-medium">
                      {activeAccount.projectCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5852] font-mono mt-0.5">
                    Project Manager: {activeAccount.manager} • Location: {activeAccount.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8D2C6] bg-[#FAF8F4] text-xs font-mono text-[#6B6560] hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-[#1A1917]/5 border border-[#1A1917]/10 hover:bg-[#1A1917]/10 text-[#1A1917]/70 hover:text-[#1A1917] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-[#1A1917]/10 px-6 gap-6 overflow-x-auto bg-[#F4F0E8]">
              {[
                { id: 'overview', label: 'MILESTONE PROGRESS' },
                { id: 'media', label: 'DAILY PHOTOS & UPDATES' },
                { id: 'approvals', label: 'DESIGN APPROVALS' },
                { id: 'documents', label: 'INVOICES & WARRANTY' },
                { id: 'chat', label: 'CHAT WITH MANAGER' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 text-xs font-mono uppercase tracking-wider relative border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#8C6D3B] text-[#8C6D3B] font-semibold'
                      : 'border-transparent text-[#5A5852] hover:text-[#1A1917]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dashboard Content Container */}
            <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
              
              {/* TAB 1: MILESTONE PROGRESS */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Real-time Progress Banner */}
                  <div className="p-6 rounded-2xl bg-white border border-[#1A1917]/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D3B] block mb-1 font-bold">
                        TRACK YOUR INTERIOR PROJECT IN REAL TIME
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-5xl text-[#1A1917] font-bold">{activeAccount.progress}%</span>
                        <span className="text-xs text-[#13362B] font-mono flex items-center gap-1 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" /> On-Time Project Delivery Guaranteed
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5852] mt-2 font-light">Current Phase: {activeAccount.currentPhase}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-mono text-[#5A5852] block font-bold">PAYMENT MILESTONE</span>
                        <span className="font-serif text-xl text-[#1A1917] font-bold">{activeAccount.paidMilestone} / {activeAccount.totalMilestone}</span>
                      </div>
                      <button className="px-4 py-2.5 rounded-xl bg-[#8C6D3B] hover:bg-[#13362B] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xs">
                        {activeAccount.nextStageTitle}
                      </button>
                    </div>
                  </div>

                  {/* Project Phases */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-[#5A5852] font-bold">PROJECT PHASES</h4>
                    {activeAccount.phases.map((m) => (
                      <div
                        key={m.phase}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                          m.status === 'Completed'
                            ? 'bg-[#13362B]/10 border-[#13362B]/30 text-[#1A1917]'
                            : m.status === 'In Progress'
                            ? 'bg-[#A88B57]/15 border-[#A88B57] text-[#1A1917] font-medium shadow-xs'
                            : 'bg-white border-[#1A1917]/10 text-[#5A5852]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#8C6D3B] font-bold">{m.phase}</span>
                          <span className="text-sm font-medium">{m.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono">{m.date}</span>
                          {m.status === 'Completed' && <CheckCircle2 className="w-4 h-4 text-[#13362B]" />}
                          {m.status === 'In Progress' && <Clock className="w-4 h-4 text-[#8C6D3B] animate-spin" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: DAILY PHOTOS & UPDATES */}
              {activeTab === 'media' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {activeAccount.dailyPhotos.map((item, idx) => (
                    <div key={idx} className="group rounded-2xl bg-white border border-[#1A1917]/10 overflow-hidden relative shadow-xs">
                      <img src={item.img} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="p-4 bg-white">
                        <span className="text-[10px] uppercase font-mono text-[#8C6D3B] block font-bold">{item.type}</span>
                        <h5 className="text-sm text-[#1A1917] font-medium mt-0.5">{item.title}</h5>
                        <span className="text-xs text-[#5A5852] font-mono mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: DESIGN APPROVALS */}
              {activeTab === 'approvals' && (
                <div className="space-y-4">
                  {activeAccount.approvals.map((item) => {
                    const isApproved = approvedItems.includes(item.title) || item.status === 'Approved';
                    return (
                      <div key={item.id} className="p-6 rounded-2xl bg-white border border-[#1A1917]/10 flex items-center justify-between gap-4 shadow-xs">
                        <div>
                          <h5 className="text-base text-[#1A1917] font-medium">{item.title}</h5>
                          <p className="text-xs text-[#5A5852] mt-1 font-light">{item.desc}</p>
                        </div>
                        {isApproved ? (
                          <span className="px-4 py-2 rounded-xl bg-[#13362B]/10 border border-[#13362B] text-xs font-mono text-[#13362B] flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Approved Digitally
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApprove(item.title)}
                            className="px-5 py-2.5 rounded-xl bg-[#8C6D3B] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#13362B] transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <ThumbsUp className="w-4 h-4" /> Approve Swatch
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 4: INVOICES & WARRANTY */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  {activeAccount.documents.map((doc, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#1A1917]/10 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#8C6D3B]" />
                        <div>
                          <h6 className="text-xs text-[#1A1917] font-medium">{doc.title}</h6>
                          <span className="text-[10px] font-mono text-[#5A5852]">{doc.size} • {doc.date}</span>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg bg-[#1A1917]/5 hover:bg-[#1A1917]/10 text-[#1A1917]">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: CHAT WITH MANAGER */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {activeAccount.chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'You'
                              ? 'bg-[#13362B] text-white font-medium rounded-tr-none'
                              : 'bg-white text-[#1A1917] rounded-tl-none border border-[#1A1917]/10 shadow-xs'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono block mb-1 opacity-70 font-bold">{msg.sender}</span>
                          {msg.text}
                        </div>
                        <span className="text-[9px] font-mono text-[#5A5852] mt-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="mt-4 flex gap-3 pt-4 border-t border-[#1A1917]/10">
                    <input
                      type="text"
                      placeholder={`Message Project Manager ${activeAccount.manager}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-3.5 rounded-xl bg-white border border-[#1A1917]/10 text-xs text-[#1A1917] focus:outline-none focus:border-[#8C6D3B]"
                    />
                    <button type="submit" className="px-5 py-3.5 rounded-xl bg-[#8C6D3B] hover:bg-[#13362B] text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Send className="w-4 h-4" /> Send
                    </button>
                  </form>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
