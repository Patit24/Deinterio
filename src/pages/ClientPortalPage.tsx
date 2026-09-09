import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  Download, 
  ThumbsUp, 
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
  Maximize2,
  X,
  UserPlus,
  Home,
  Phone,
  Mail,
  Building,
  Eye,
  EyeOff,
  PhoneCall,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { dataStore, type ClientAccount, type WorkItem } from '../services/dataStore';

interface ClientPortalPageProps {
  onOpenBooking?: () => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ onOpenBooking }) => {
  const [activeAccount, setActiveAccount] = useState<ClientAccount | null>(null);

  // Auth Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Sign In Form State
  const [username, setUsername] = useState('client');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regProjectType, setRegProjectType] = useState('Villa & Bungalow');
  const [regLocation, setRegLocation] = useState('Kolkata, West Bengal');
  const [regArea, setRegArea] = useState('3,200 sq.ft');
  const [regSuccess, setRegSuccess] = useState('');

  // Dashboard Tabs & Filter States
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'photos' | 'documents' | 'contact' | 'chat'>('overview');
  const [workStatusFilter, setWorkStatusFilter] = useState<'ALL' | 'COMPLETED' | 'IN_PROGRESS' | 'PENDING'>('ALL');
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<'ALL' | 'Before Work' | 'During Work' | 'Completed Work'>('ALL');
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Chat Message Input
  const [newMessage, setNewMessage] = useState('');
  const [approvedItems, setApprovedItems] = useState<string[]>([]);

  // Load persistent session on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const savedUserId = localStorage.getItem('deinterio_active_client_id');
    if (savedUserId) {
      const clients = dataStore.getClients();
      const found = clients.find((c) => c.id === savedUserId);
      if (found) {
        setActiveAccount(found);
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const account = dataStore.authenticateClient(username, password);
    if (account) {
      setActiveAccount(account);
      localStorage.setItem('deinterio_active_client_id', account.id);
    } else {
      setLoginError('Invalid credentials. Please enter a valid username/email and password (or use a demo account below).');
    }
  };

  const handleQuickDemoLogin = (userKey: string) => {
    const account = dataStore.authenticateClient(userKey, 'password123');
    if (account) {
      setActiveAccount(account);
      setLoginError('');
      localStorage.setItem('deinterio_active_client_id', account.id);
    }
  };

  const handleLogout = () => {
    setActiveAccount(null);
    localStorage.removeItem('deinterio_active_client_id');
    setUsername('client');
    setPassword('password123');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    const cleanUser = (regName.split(' ')[0] || 'client').toLowerCase() + Math.floor(100 + Math.random() * 900);
    const newClient: ClientAccount = {
      id: `client-${Date.now()}`,
      username: cleanUser,
      password: 'password123',
      clientName: regName.trim(),
      clientEmail: regEmail.trim() || `${cleanUser}@example.com`,
      clientPhone: regPhone.trim(),
      projectName: `${regName.trim()}'s ${regProjectType}`,
      projectCode: `DENTORIO LIVE TRACKER #D-${Math.floor(500 + Math.random() * 499)}`,
      location: regLocation.trim(),
      manager: 'Sourav Banerjee',
      managerPhone: '+91 98300 11223',
      progress: 15,
      currentPhase: 'Discovery Consultation & Site Measurement',
      paidMilestone: '₹0',
      totalMilestone: '₹28,00,000',
      nextStageTitle: 'Pay Stage 1 Booking Advance & 3D Spatial Scan',
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expectedCompletionDate: '90 Days from Final Design Signoff',
      lastUpdatedDate: 'Just now',
      phases: [
        { phase: '01', title: 'Discovery Consultation & Site Measurement', status: 'In Progress', date: 'Active' },
        { phase: '02', title: 'Space Planning & 3D Visualization', status: 'Upcoming', date: 'Upcoming' },
        { phase: '03', title: 'Material Selection & Quotation Approval', status: 'Upcoming', date: 'Upcoming' },
        { phase: '04', title: 'Modular Woodworking & Assembly', status: 'Upcoming', date: 'Upcoming' },
        { phase: '05', title: 'False Ceiling, Painting & Styling', status: 'Upcoming', date: 'Upcoming' },
        { phase: '06', title: 'Quality Inspection & Final Handover', status: 'Upcoming', date: 'Upcoming' },
      ],
      workItems: [
        {
          id: `w-${Date.now()}-1`,
          title: '3D Laser Site Measurement & Layout Grid',
          category: 'Site Survey',
          description: 'Precision millimeter-accurate architectural measurement for turnkey joinery planning.',
          status: 'IN_PROGRESS',
          startDate: 'Today',
          estCompletionDate: 'Tomorrow',
          progressPercent: 40,
        },
        {
          id: `w-${Date.now()}-2`,
          title: 'Vastu & Spatial Zoning Blueprint',
          category: 'Architecture',
          description: 'Optimized circulation paths, kitchen placement, and master suite orientation.',
          status: 'PENDING',
          startDate: 'Day 3',
          estCompletionDate: 'Day 7',
          progressPercent: 0,
        }
      ],
      dailyPhotos: [
        {
          title: 'Site Laser Measurement & Survey',
          type: 'Site Inspection',
          time: 'Today',
          img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
          category: 'Before Work',
        }
      ],
      approvals: [
        {
          id: 'app-1',
          title: 'Preliminary Architectural Floor Plan Layout',
          status: 'Pending Review',
          desc: 'Review and confirm spatial arrangement for kitchen, bedrooms and living area.',
        }
      ],
      documents: [
        { title: 'Deinterio Welcome Kit & Onboarding Guide.pdf', size: '1.8 MB', date: 'Today' },
        { title: 'Material Specifications & Plywood Warranty.pdf', size: '3.2 MB', date: 'Today' },
      ],
      chatMessages: [
        {
          sender: 'Sourav Banerjee (Principal Project Manager)',
          text: `Welcome to Deinterio, ${regName}! I will be your dedicated project concierge throughout the entire execution. Feel free to leave messages here anytime.`,
          time: 'Just now',
          isClient: false,
        }
      ],
    };

    dataStore.saveClient(newClient);
    setActiveAccount(newClient);
    localStorage.setItem('deinterio_active_client_id', newClient.id);
    setRegSuccess(`Account successfully created! Your username is "${cleanUser}" and default password is "password123".`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeAccount) return;

    const updatedAccount = { ...activeAccount };
    updatedAccount.chatMessages = updatedAccount.chatMessages || [];
    updatedAccount.chatMessages.push({
      sender: activeAccount.clientName,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isClient: true,
    });

    // Simulated automated response from Project Manager
    setTimeout(() => {
      const pmReply = {
        sender: `${activeAccount.manager} (Project Manager)`,
        text: `Thank you for your update, ${activeAccount.clientName.split(' ')[0]}. Our site supervisor has logged this request and our woodworking team will proceed accordingly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isClient: false,
      };
      const refreshed = dataStore.getClients().find((c) => c.id === activeAccount.id);
      if (refreshed) {
        refreshed.chatMessages.push(pmReply);
        dataStore.saveClient(refreshed);
        setActiveAccount({ ...refreshed });
      }
    }, 1500);

    dataStore.saveClient(updatedAccount);
    setActiveAccount({ ...updatedAccount });
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

  // =========================================================================
  // VIEW 1: SIGN IN / REGISTER PAGE (WHEN NOT LOGGED IN)
  // =========================================================================
  if (!activeAccount) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Top Breadcrumb Header */}
          <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
            <a
              href="#/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#13362B] hover:text-[#8C6D3B] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>← Return to Home</span>
            </a>

            <div className="flex items-center gap-3 text-xs font-mono text-[#6B6560]">
              <Phone className="w-3.5 h-3.5 text-[#C8AA7A]" />
              <span>Client Concierge Desk: <strong className="text-[#1A1917]">+91 98300 00000</strong></span>
            </div>
          </div>

          {/* Hero Banner Intro */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2DDD6] text-xs font-mono text-[#8C6D3B] font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A88B57]" />
              <span>DEINTERIO PRIVATE TELEMETRY PORTAL</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1917]">
              Client Portal & <span className="italic text-[#13362B]">Live Tracker</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed">
              Track your turnkey interior transformation in real time. Inspect daily photo streams, verify milestone progress, review 3D spatial models, and chat directly with your architect.
            </p>
          </div>

          {/* Main Card with Tabs: Sign In / Register */}
          <div className="max-w-xl mx-auto rounded-3xl bg-white border border-[#E2DDD6] shadow-xl overflow-hidden">
            
            {/* Tab Header Selector */}
            <div className="grid grid-cols-2 border-b border-[#E2DDD6] bg-[#FAF8F4]">
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setLoginError('');
                }}
                className={`py-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-white text-[#13362B] border-b-2 border-[#13362B] shadow-xs'
                    : 'text-[#5A5852] hover:text-[#1A1917]'
                }`}
              >
                <KeyRound className="w-4 h-4 text-[#8C6D3B]" />
                <span>Client Sign In</span>
              </button>

              <button
                onClick={() => {
                  setAuthMode('register');
                  setLoginError('');
                }}
                className={`py-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-[#13362B] border-b-2 border-[#13362B] shadow-xs'
                    : 'text-[#5A5852] hover:text-[#1A1917]'
                }`}
              >
                <UserPlus className="w-4 h-4 text-[#8C6D3B]" />
                <span>Register New Project</span>
              </button>
            </div>

            {/* TAB 1: SIGN IN FORM */}
            {authMode === 'signin' && (
              <div className="p-6 sm:p-10 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1A1917]">Welcome Back</h2>
                  <p className="text-xs text-[#6B6560] font-mono mt-0.5">
                    Sign in using your client username, phone number, or registered email.
                  </p>
                </div>

                {loginError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2.5 animate-fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                      Username / Registered Email
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white transition-all"
                        placeholder="e.g. client or rahul@example.com"
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
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A1917]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>ENTER MY PROJECT DASHBOARD</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* 1-Click Quick Demo Accounts */}
                <div className="pt-6 border-t border-[#E2DDD6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8C6D3B] uppercase tracking-wider font-bold">
                      1-Click Instant Demo Portals
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">Click to explore</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleQuickDemoLogin('client')}
                      className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] hover:border-[#13362B] hover:bg-white text-left transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#13362B] group-hover:text-[#8C6D3B] transition-colors block">
                          Rahul & Priya Verma
                        </span>
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      </div>
                      <span className="text-[10px] font-mono text-[#6B6560] block mt-1">
                        New Town Penthouse • <strong>72% Active</strong>
                      </span>
                    </button>

                    <button
                      onClick={() => handleQuickDemoLogin('ballygunge')}
                      className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] hover:border-[#13362B] hover:bg-white text-left transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#13362B] group-hover:text-[#8C6D3B] transition-colors block">
                          Dr. Debabrata Roy
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[10px] font-mono text-[#6B6560] block mt-1">
                        Ballygunge Villa • <strong>100% Handover</strong>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-xs text-[#6B6560] font-light">
                    Need help logging in?{' '}
                    <a href="#/contact" className="text-[#13362B] font-bold underline underline-offset-2">
                      Contact Deinterio Support
                    </a>
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: REGISTER NEW PROJECT FORM */}
            {authMode === 'register' && (
              <div className="p-6 sm:p-10 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1A1917]">Register Your Project</h2>
                  <p className="text-xs text-[#6B6560] font-mono mt-0.5">
                    Initialize your home interior project portal for live telemetry & site updates.
                  </p>
                </div>

                {regSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{regSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                          placeholder="e.g. Sabyasachi & Ananya Mukherjee"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                          placeholder="+91 98300 00000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                        Project Type
                      </label>
                      <select
                        value={regProjectType}
                        onChange={(e) => setRegProjectType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                      >
                        <option value="Villa & Independent Bungalow">Villa & Independent Bungalow</option>
                        <option value="4BHK Luxury Penthouse">4BHK Luxury Penthouse</option>
                        <option value="3BHK Premium Residence">3BHK Premium Residence</option>
                        <option value="2BHK Modern Apartment">2BHK Modern Apartment</option>
                        <option value="Commercial & Corporate Office">Commercial & Corporate Office</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                        Approx Carpet Area
                      </label>
                      <input
                        type="text"
                        value={regArea}
                        onChange={(e) => setRegArea(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                        placeholder="e.g. 2,800 sq.ft"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                        Property Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={regLocation}
                          onChange={(e) => setRegLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                          placeholder="e.g. Alipore / New Town Action Area III / Salt Lake"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>INITIALIZE PORTAL & START TRACKING</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#6B6560] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#13362B] shrink-0" />
                  <span>Includes automatic 10-Year Digital Warranty registration & dedicated Architect PM assignment.</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL-PAGE AUTHENTICATED CLIENT DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8F6F0] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Sticky Header */}
        <div className="rounded-3xl bg-white border border-[#E2DDD6] p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#13362B] flex items-center justify-center text-[#C8AA7A] shadow-md font-serif font-bold text-xl shrink-0">
              {activeAccount.clientName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#1A1917]">{activeAccount.clientName}</h1>
                <span className="px-3 py-0.5 rounded-full bg-[#13362B]/10 text-[11px] font-mono font-bold text-[#13362B] uppercase tracking-wider">
                  {activeAccount.projectCode}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6B6560] mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A88B57]" />
                  {activeAccount.location}
                </span>
                <span>•</span>
                <span>Assigned PM: <strong className="text-[#1A1917]">{activeAccount.manager}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">🟢 Live Telemetry Connected</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#/"
              className="px-4 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#EAE6DF] border border-[#E2DDD6] text-xs font-mono font-bold text-[#1A1917] transition-colors"
            >
              ← Back to Website
            </a>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-mono font-bold text-[#5A5852] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="bg-white rounded-2xl border border-[#E2DDD6] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-xs">
          {[
            { key: 'overview', label: 'Project Overview', icon: LayoutDashboard },
            { key: 'progress', label: `Work Items & Milestones (${workItems.length})`, icon: Clock },
            { key: 'photos', label: `Site Photo Gallery (${dailyPhotos.length})`, icon: Camera },
            { key: 'documents', label: `Blueprints & Documents (${activeAccount.documents.length})`, icon: FileText },
            { key: 'contact', label: 'Direct Call & WhatsApp', icon: PhoneCall },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#13362B] text-[#C8AA7A] shadow-md font-bold'
                    : 'text-[#5A5852] hover:bg-[#FAF8F4] hover:text-[#1A1917]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Main Content Area */}
        <div className="space-y-6">
          
          {/* =================================================================== */}
          {/* TAB 1: OVERVIEW & VISUAL TIMELINE                                   */}
          {/* =================================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Progress Summary Banner */}
              <div className="p-8 rounded-3xl bg-[#13362B] text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8AA7A] block font-bold">
                      LIVE PROJECT HEALTH
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-1">
                      {activeAccount.projectName}
                    </h2>
                    <p className="text-xs text-[#D4C3A3] font-mono mt-1">
                      Current Active Phase: <strong className="text-white">{activeAccount.currentPhase}</strong>
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="font-serif text-5xl sm:text-6xl font-bold text-[#C8AA7A]">{activeAccount.progress}%</span>
                    <span className="text-[10px] font-mono text-[#D4C3A3] block uppercase tracking-wider mt-0.5">Overall Completion</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C8AA7A] to-emerald-400 rounded-full transition-all duration-1000"
                    style={{ width: `${activeAccount.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#D4C3A3]">
                  <div>
                    <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Project Start</span>
                    <strong className="text-white text-sm">{activeAccount.startDate || 'Jun 10, 2026'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Estimated Handover</span>
                    <strong className="text-white text-sm">{activeAccount.expectedCompletionDate || 'Sep 10, 2026'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Disbursed / Total Budget</span>
                    <strong className="text-emerald-400 text-sm">{activeAccount.paidMilestone} / {activeAccount.totalMilestone}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#D4C3A3]/70 block">Last Field Update</span>
                    <strong className="text-white text-sm">{activeAccount.lastUpdatedDate || 'Today'}</strong>
                  </div>
                </div>
              </div>

              {/* Work Items Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-900 block">COMPLETED</span>
                      <span className="text-[11px] font-mono text-emerald-700">{completedCount} Verified Tasks</span>
                    </div>
                  </div>
                  <span className="font-serif text-3xl font-bold text-emerald-800">{completedCount}</span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      ●
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-900 block">IN PROGRESS</span>
                      <span className="text-[11px] font-mono text-amber-700">{inProgressCount} Active On Site</span>
                    </div>
                  </div>
                  <span className="font-serif text-3xl font-bold text-amber-800">{inProgressCount}</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-400 text-white flex items-center justify-center font-bold">
                      ○
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-800 block">PENDING</span>
                      <span className="text-[11px] font-mono text-slate-600">{pendingCount} Upcoming Phases</span>
                    </div>
                  </div>
                  <span className="font-serif text-3xl font-bold text-slate-700">{pendingCount}</span>
                </div>
              </div>

              {/* Execution Roadmap Phases */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD6] space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">
                      VISUAL EXECUTION TIMELINE
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#1A1917] mt-0.5">Project Phases & Milestones</h3>
                  </div>
                  <span className="text-xs font-mono text-[#6B6560]">Updated by Site Architect</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeAccount.phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        phase.status === 'Completed'
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : phase.status === 'In Progress'
                          ? 'bg-amber-50/60 border-amber-300 shadow-md ring-2 ring-amber-400/30'
                          : 'bg-[#FAF8F4] border-[#E2DDD6]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold flex items-center justify-center">
                          {phase.phase}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
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
                      <h4 className="font-serif text-base font-bold text-[#1A1917] leading-snug">{phase.title}</h4>
                      <span className="text-[11px] font-mono text-[#6B6560] block mt-1.5">{phase.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Client Approvals */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD6] space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1A1917]">Pending Approvals & Signoffs</h3>
                  <span className="text-xs font-mono text-[#8C6D3B] font-bold">Immediate Action</span>
                </div>

                <div className="space-y-3">
                  {activeAccount.approvals.map((app) => {
                    const isApproved = approvedItems.includes(app.title) || app.status === 'Approved';
                    return (
                      <div key={app.id} className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
                            {isApproved ? '✓ APPROVED BY CLIENT' : 'ACTION REQUIRED'}
                          </span>
                          <h4 className="font-serif text-base font-bold text-[#1A1917]">{app.title}</h4>
                          <p className="text-xs text-[#5A5852] font-light leading-relaxed">{app.desc}</p>
                        </div>

                        <button
                          onClick={() => handleApprove(app.title)}
                          disabled={isApproved}
                          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                            isApproved
                              ? 'bg-emerald-600 text-white cursor-default'
                              : 'bg-[#13362B] text-[#C8AA7A] hover:bg-[#0E271F] shadow-sm'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{isApproved ? 'Approved' : 'Approve Specification'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 2: DETAILED WORK ITEMS (COMPLETED, IN PROGRESS, PENDING)         */}
          {/* =================================================================== */}
          {activeTab === 'progress' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD6] space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD6] pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Project Work Breakdown ({workItems.length})</h3>
                  <p className="text-xs font-mono text-[#6B6560]">Granular engineering steps and milestone execution logs</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {(['ALL', 'COMPLETED', 'IN_PROGRESS', 'PENDING'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setWorkStatusFilter(filterKey)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        workStatusFilter === filterKey
                          ? 'bg-[#13362B] text-[#C8AA7A] shadow-xs'
                          : 'bg-[#FAF8F4] text-[#5A5852] hover:bg-gray-100'
                      }`}
                    >
                      {filterKey}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredWorkItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] space-y-3 hover:border-[#13362B] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-500'
                              : item.status === 'IN_PROGRESS'
                              ? 'bg-amber-500 animate-pulse'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md bg-white border border-[#E2DDD6] text-[#8C6D3B] font-bold">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#1A1917]">{item.title}</h4>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase self-start sm:self-auto ${
                          item.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'IN_PROGRESS'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {item.status} ({item.progressPercent}%)
                      </span>
                    </div>

                    <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#E2DDD6] text-xs font-mono text-[#6B6560] gap-2">
                      <div className="flex items-center gap-4">
                        <span>Started: <strong>{item.startDate || 'N/A'}</strong></span>
                        <span>Handover Target: <strong>{item.estCompletionDate || 'N/A'}</strong></span>
                      </div>

                      {item.photos && item.photos.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-emerald-700 font-bold uppercase">Completion Photo Attached</span>
                          {item.photos.map((ph, pIdx) => (
                            <img
                              key={pIdx}
                              src={ph}
                              alt="completion"
                              onClick={() => setLightboxPhoto(ph)}
                              className="w-8 h-8 rounded-lg object-cover cursor-pointer border border-[#E2DDD6] hover:scale-110 transition-transform"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 3: DAILY SITE PHOTOS & PHOTO LOGS                               */}
          {/* =================================================================== */}
          {activeTab === 'photos' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD6] space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD6] pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Site Photo Stream</h3>
                  <p className="text-xs font-mono text-[#6B6560]">Daily visual proof uploaded by our site supervisors</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {(['ALL', 'Before Work', 'During Work', 'Completed Work'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPhotoCategoryFilter(cat)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        photoCategoryFilter === cat
                          ? 'bg-[#13362B] text-[#C8AA7A] shadow-xs'
                          : 'bg-[#FAF8F4] text-[#5A5852] hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => setLightboxPhoto(photo.img)}
                    className="group rounded-2xl overflow-hidden border border-[#E2DDD6] bg-[#FAF8F4] space-y-3 p-3 shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="relative h-56 rounded-xl overflow-hidden bg-gray-200">
                      <img
                        src={photo.img}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-1 rounded-md bg-white/95 text-[10px] font-mono text-[#13362B] font-bold uppercase tracking-wider shadow-sm">
                          {photo.category || photo.type}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-bold text-[#1A1917]">{photo.title}</h4>
                      <span className="text-[11px] font-mono text-[#6B6560] block">{photo.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 4: BLUEPRINTS, CONTRACTS & DOCUMENTS                            */}
          {/* =================================================================== */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD6] space-y-6 shadow-xs">
              <div className="border-b border-[#E2DDD6] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Blueprints, Contracts & Digital Warranty</h3>
                <p className="text-xs font-mono text-[#6B6560]">Download architectural drawings, BOQ agreements & verified certificates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeAccount.documents.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] flex items-center justify-between gap-4 hover:border-[#13362B] transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white border border-[#E2DDD6] flex items-center justify-center text-[#13362B] shadow-xs">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#1A1917] leading-snug">{doc.title}</h4>
                        <span className="text-[11px] font-mono text-[#6B6560] block mt-0.5">
                          {doc.size} • Issued {doc.date}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Downloading verified architectural document: ${doc.title}`)}
                      className="p-2.5 rounded-xl bg-white border border-[#E2DDD6] hover:bg-[#13362B] hover:text-[#C8AA7A] hover:border-[#13362B] transition-all text-[#1A1917] cursor-pointer shrink-0"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 5: DIRECT ARCHITECT CONCIERGE CHAT                              */}
          {/* =================================================================== */}
          {/* =================================================================== */}
          {/* TAB 5: DIRECT ARCHITECT CALL & WHATSAPP CONNECT                     */}
          {/* =================================================================== */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD6] space-y-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD6] pb-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Direct Architect & PM Connect</h3>
                  <p className="text-xs font-mono text-[#6B6560]">
                    Direct voice call & WhatsApp hotline to your dedicated project architect {activeAccount.manager}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>PM On Duty (9:00 AM – 8:00 PM)</span>
                </div>
              </div>

              {/* Primary Connect Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Direct Phone Call Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#E2DDD6] flex flex-col justify-between space-y-6 hover:border-[#13362B] transition-all shadow-xs">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#13362B] text-[#C8AA7A] flex items-center justify-center shadow-md">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6D3B] font-bold block">
                        INSTANT VOICE CALL
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-[#1A1917] mt-1">
                        Call Site Architect Directly
                      </h4>
                      <p className="text-xs text-[#5A5852] font-light leading-relaxed mt-2">
                        Speak directly with {activeAccount.manager} regarding on-site carpentry, electrical wiring, Italian marble laying, or material delivery schedules.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Site Lead:</span>
                        <strong className="text-[#13362B] font-bold">{activeAccount.manager}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Direct Number:</span>
                        <strong className="text-[#1A1917] font-bold">{activeAccount.managerPhone || '+91 98300 00000'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Project Code:</span>
                        <span className="text-[#8C6D3B] font-bold">{activeAccount.projectCode}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${(activeAccount.managerPhone || '+919830000000').replace(/\s+/g, '')}`}
                    className="w-full py-4 rounded-2xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {activeAccount.managerPhone || '+91 98300 00000'}</span>
                  </a>
                </div>

                {/* 2. WhatsApp Direct Chat Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F0F7F4] border border-[#13362B]/20 flex flex-col justify-between space-y-6 hover:border-emerald-600 transition-all shadow-xs">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-800 font-bold block">
                        WHATSAPP CHAT
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-[#13362B] mt-1">
                        Chat on WhatsApp
                      </h4>
                      <p className="text-xs text-[#13362B]/80 font-light leading-relaxed mt-2">
                        Share on-site photos, request drawing clarifications, send audio voice notes, or get immediate updates directly on your WhatsApp.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Response Speed:</span>
                        <strong className="text-emerald-700 font-bold">Within 5–15 Minutes</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Media Support:</span>
                        <span className="text-gray-700">Photos, Videos, PDFs, Voice Notes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Official Handle:</span>
                        <span className="text-[#13362B] font-bold">Deinterio Project Desk</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/919830000000?text=${encodeURIComponent(`Hello Sourav, I am contacting you regarding my Deinterio project (${activeAccount.clientName} - ${activeAccount.projectCode}) at ${activeAccount.location}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>

              </div>

              {/* Escalation & Studio Visits Banner */}
              <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#E2DDD6] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B]">
                    <ShieldCheck className="w-4 h-4 text-[#13362B]" />
                    <span>Studio Director Escalation Desk</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917]">Need Immediate Priority Escalation?</h4>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                    Direct access to Deinterio studio partners for critical design reviews or schedule requirements.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                  <a
                    href="tel:+919830000000"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D4C3A3] bg-white hover:bg-[#13362B] text-[#13362B] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all text-center"
                  >
                    Call Partner Hotline: +91 98300 00000
                  </a>
                  <button
                    onClick={() => alert(`Site visit requested for ${activeAccount.projectName}. Project manager ${activeAccount.manager} will call you within 30 minutes to confirm your visit time.`)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
                  >
                    Request Physical Site Visit
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img src={lightboxPhoto} alt="enlarged preview" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/50 text-white hover:bg-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
