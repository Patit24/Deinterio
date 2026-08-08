import React, { useState } from 'react';
import { Shield, Plus, X, Trash2, Edit3, CheckCircle2, UserCheck, Layers, LayoutGrid, DollarSign, KeyRound, Sparkles } from 'lucide-react';
import { dataStore } from '../services/dataStore';
import type { ClientAccount, ServiceItem, ProjectItem, PricingTierItem, LeadItem } from '../services/dataStore';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(true);
  const [adminPassword, setAdminPassword] = useState('admin');
  const [activeTab, setActiveTab] = useState<'clients' | 'services' | 'projects' | 'pricing' | 'leads'>('clients');

  // Trigger re-renders when data updates
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  // Forms Modal State for Adding/Editing Items
  const [editingClient, setEditingClient] = useState<Partial<ClientAccount> | null>(null);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingPricing, setEditingPricing] = useState<Partial<PricingTierItem> | null>(null);

  if (!isOpen) return null;

  const clients = dataStore.getClients();
  const services = dataStore.getServices();
  const projects = dataStore.getProjects();
  const pricing = dataStore.getPricing();
  const leads = dataStore.getLeads();

  // --- SAVE HANDLERS ---
  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient?.username || !editingClient?.password || !editingClient?.projectName) {
      alert('Please fill username, password, and project name');
      return;
    }
    const fullClient: ClientAccount = {
      id: editingClient.id || `client-${Date.now()}`,
      username: editingClient.username,
      password: editingClient.password,
      clientName: editingClient.clientName || 'Valued Homeowner',
      projectName: editingClient.projectName,
      projectCode: editingClient.projectCode || `DENTORIO LIVE TRACKER #D-${Math.floor(100 + Math.random() * 900)}`,
      location: editingClient.location || 'Kolkata',
      manager: editingClient.manager || 'Sourav Banerjee',
      progress: Number(editingClient.progress) || 50,
      currentPhase: editingClient.currentPhase || 'German Modular Woodworking Production',
      paidMilestone: editingClient.paidMilestone || '₹12,00,000',
      totalMilestone: editingClient.totalMilestone || '₹24,00,000',
      nextStageTitle: editingClient.nextStageTitle || 'Pay Stage 3',
      phases: editingClient.phases || [
        { phase: '01', title: 'Discovery & Measurement', status: 'Completed', date: 'Jul 01, 2026' },
        { phase: '02', title: 'German Modular Joinery Assembly', status: 'In Progress', date: 'Aug 05, 2026 (Active)' },
        { phase: '03', title: 'Lighting & Handover', status: 'Upcoming', date: 'Sep 01, 2026' },
      ],
      dailyPhotos: editingClient.dailyPhotos || [
        { title: 'Site Unboxing Photo', type: 'Site Update', time: 'Today', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      ],
      approvals: editingClient.approvals || [],
      documents: editingClient.documents || [],
      chatMessages: editingClient.chatMessages || [],
    };
    dataStore.saveClient(fullClient);
    setEditingClient(null);
    refresh();
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.tagline) return;
    const fullService: ServiceItem = {
      id: editingService.id || editingService.title.toLowerCase().replace(/\s+/g, '-'),
      title: editingService.title,
      tagline: editingService.tagline,
      category: editingService.category || 'Architecture',
      image: editingService.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      deliverables: typeof editingService.deliverables === 'string'
        ? (editingService.deliverables as string).split(',').map(s => s.trim())
        : (editingService.deliverables || ['3D VR Walkthrough', '10-Year Warranty']),
      highlights: editingService.highlights || 'Penalty backed handover timeline guarantee.',
      problem: editingService.problem || 'Generic unbranded fittings fail under humidity.',
      solution: editingService.solution || 'CenturyPly BWP 710 marine plywood and Hafele German soft-close fittings.',
      materials: ['CenturyPly Marine Plywood', 'Hettich German Hardware'],
      process: ['3D Scan', 'CNC Joinery', 'Handover'],
    };
    dataStore.saveService(fullService);
    setEditingService(null);
    refresh();
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;
    const fullProj: ProjectItem = {
      id: editingProject.id || editingProject.title.toLowerCase().replace(/\s+/g, '-'),
      title: editingProject.title,
      category: editingProject.category || 'Luxury Residence',
      location: editingProject.location || 'Kolkata',
      budget: editingProject.budget || '₹35 Lakhs',
      timeline: editingProject.timeline || '14 Weeks',
      area: editingProject.area || '3,500 sq.ft',
      rating: '5.0 ★★★★★',
      image: editingProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      beforeImg: editingProject.beforeImg || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      afterImg: editingProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      story: editingProject.story || 'Complete architectural interior transformation featuring Italian marble and teak fluting.',
      materials: typeof editingProject.materials === 'string'
        ? (editingProject.materials as string).split(',').map(s => s.trim())
        : (editingProject.materials || ['CenturyPly Plywood', 'Hafele Hardware']),
      badge: editingProject.badge || `${editingProject.category} • Kolkata`,
    };
    dataStore.saveProject(fullProj);
    setEditingProject(null);
    refresh();
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing?.name || !editingPricing?.price) return;
    const fullPricing: PricingTierItem = {
      id: editingPricing.id || editingPricing.name.toLowerCase().replace(/\s+/g, '-'),
      name: editingPricing.name,
      price: editingPricing.price,
      unit: editingPricing.unit || '/ sq.ft',
      tag: editingPricing.tag || 'Package Tier',
      desc: editingPricing.desc || 'Turnkey architectural interior package.',
      features: typeof editingPricing.features === 'string'
        ? (editingPricing.features as string).split(',').map(s => s.trim())
        : (editingPricing.features || ['CenturyPly Marine Plywood', 'Hettich Hardware']),
    };
    dataStore.savePricingTier(fullPricing);
    setEditingPricing(null);
    refresh();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1917]/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#1A1917]">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#F9F8F3] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1917]/10 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#13362B] flex items-center justify-center text-[#C8AA7A] shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1917]">Deinterio Admin CMS & Client Portal Creator</h3>
              <p className="text-xs text-[#8C6D3B] font-mono">Lead Architect Workspace • Confidential Internal CMS</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#1A1917]/5 border border-[#1A1917]/10 hover:bg-[#1A1917]/10 text-[#1A1917]/70 hover:text-[#1A1917] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#1A1917]/10 px-6 gap-6 overflow-x-auto bg-[#F4F0E8]">
          {[
            { id: 'clients', label: `Client Accounts & Live Tracker (${clients.length})` },
            { id: 'services', label: `Services CMS (${services.length})` },
            { id: 'projects', label: `Projects CMS (${projects.length})` },
            { id: 'pricing', label: `Pricing Tiers (${pricing.length})` },
            { id: 'leads', label: `Inbound Leads (${leads.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 text-xs font-mono uppercase tracking-wider relative border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#8C6D3B] text-[#8C6D3B] font-bold'
                  : 'border-transparent text-[#5A5852] hover:text-[#1A1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Tab Area */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: CLIENT ACCOUNTS CREATOR */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2DDD6] shadow-xs">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917]">Create & Manage Client Accounts</h4>
                  <p className="text-xs text-[#6B6560] font-light">
                    Usernames and passwords created here allow clients to log in to their Live Project Dashboard.
                  </p>
                </div>
                <button
                  onClick={() => setEditingClient({ username: '', password: '', projectName: '', progress: 50 })}
                  className="px-4 py-2.5 rounded-xl bg-[#13362B] text-white text-xs font-mono uppercase font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-[#C8AA7A]" /> Create New Client Credentials
                </button>
              </div>

              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="p-5 rounded-2xl bg-white border border-[#E2DDD6] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-bold text-[#1A1917]">{client.projectName}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#13362B]/10 text-[10px] font-mono font-bold text-[#13362B]">
                          {client.projectCode}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6560] font-mono">
                        Client: <strong className="text-[#1A1917]">{client.clientName}</strong> | PM: {client.manager} | Location: {client.location}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-xs font-mono text-[#8C6D3B]">
                        <span>Username: <strong>{client.username}</strong></span>
                        <span>Password: <strong>{client.password}</strong></span>
                        <span>Progress: <strong>{client.progress}%</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingClient(client)}
                        className="px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#D4C3A3] text-xs font-mono text-[#13362B] flex items-center gap-1 hover:bg-[#13362B] hover:text-white transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Credentials & Telemetry
                      </button>
                      <button
                        onClick={() => { dataStore.deleteClient(client.id); refresh(); }}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES CMS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-[#E2DDD6]">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917]">Services CMS Management</h4>
                  <p className="text-xs text-[#6B6560] font-light">Add or edit services shown on `/services` and `/services/:slug`.</p>
                </div>
                <button
                  onClick={() => setEditingService({ title: '', tagline: '', category: 'Architecture', deliverables: ['3D Scan', '10-Yr Warranty'] })}
                  className="px-4 py-2.5 rounded-xl bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-[#C8AA7A]" /> Add New Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#8C6D3B]">{srv.category}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingService(srv)}
                          className="p-1.5 rounded-lg bg-[#FAF8F4] border border-[#D4C3A3] text-xs text-[#13362B] hover:bg-[#13362B] hover:text-white transition-all cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { dataStore.deleteService(srv.id); refresh(); }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h5 className="font-serif text-lg font-medium text-[#1A1917]">{srv.title}</h5>
                    <p className="text-xs text-[#5A5852] font-light">{srv.tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS CMS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-[#E2DDD6]">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917]">Projects & Case Studies CMS</h4>
                  <p className="text-xs text-[#6B6560] font-light">Add or edit projects shown on `/projects` and `/projects/:slug`.</p>
                </div>
                <button
                  onClick={() => setEditingProject({ title: '', category: 'Villa', location: 'Kolkata', budget: '₹40 Lakhs' })}
                  className="px-4 py-2.5 rounded-xl bg-[#13362B] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-[#C8AA7A]" /> Add New Project Case Study
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#8C6D3B]">{proj.category} • {proj.budget}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 rounded-lg bg-[#FAF8F4] border border-[#D4C3A3] text-xs text-[#13362B] hover:bg-[#13362B] hover:text-white transition-all cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { dataStore.deleteProject(proj.id); refresh(); }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h5 className="font-serif text-lg font-medium text-[#1A1917]">{proj.title}</h5>
                    <p className="text-xs text-[#5A5852] font-mono">{proj.location} • Area: {proj.area}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRICING CMS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-[#E2DDD6]">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1917]">Pricing Tiers CMS</h4>
                  <p className="text-xs text-[#6B6560] font-light">Edit package rates and deliverables on `/pricing`.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricing.map((tier) => (
                  <div key={tier.id} className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-3 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#8C6D3B]">{tier.tag}</span>
                      <h5 className="font-serif text-xl font-bold text-[#1A1917]">{tier.name}</h5>
                      <span className="font-serif text-2xl font-bold text-[#13362B] block mt-1">{tier.price} <span className="text-xs font-mono font-normal">{tier.unit}</span></span>
                      <p className="text-xs text-[#5A5852] font-light mt-2">{tier.desc}</p>
                    </div>

                    <button
                      onClick={() => setEditingPricing(tier)}
                      className="w-full py-2.5 rounded-xl bg-[#FAF8F4] border border-[#D4C3A3] text-xs font-mono font-bold text-[#13362B] hover:bg-[#13362B] hover:text-white transition-all cursor-pointer"
                    >
                      Edit Package Rates & Deliverables →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INBOUND LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-[#8C6D3B]">Inbound Inquiries & Calculator Leads</h4>
              {leads.map((lead) => (
                <div key={lead.id} className="p-5 rounded-2xl bg-white border border-[#E2DDD6] flex items-center justify-between gap-4 shadow-xs">
                  <div>
                    <span className="text-xs text-[#8C6D3B] font-mono block font-bold">{lead.city} • Est. Budget: {lead.budget}</span>
                    <h5 className="text-base font-serif text-[#1A1917] font-medium">{lead.name} ({lead.email} | {lead.phone})</h5>
                    <span className="text-xs text-[#5A5852] font-mono">{lead.type} • Submitted: {lead.date}</span>
                    {lead.details && <p className="text-xs text-[#6B6560] font-light mt-1">{lead.details}</p>}
                  </div>
                  <a href={`tel:${lead.phone}`} className="px-4 py-2 rounded-xl bg-[#13362B] text-white text-xs font-mono uppercase font-bold tracking-wider">
                    Call Client
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* MODAL FORM: CREATE / EDIT CLIENT ACCOUNT */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1A1917]">
                {editingClient.id ? 'Edit Client Account' : 'Create New Client Account'}
              </h3>
              <button onClick={() => setEditingClient(null)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1">Assign Username *</label>
                  <input
                    type="text"
                    required
                    value={editingClient.username || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, username: e.target.value })}
                    placeholder="e.g. client or newtown402"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
                <div>
                  <label className="font-mono font-bold block mb-1">Assign Password *</label>
                  <input
                    type="text"
                    required
                    value={editingClient.password || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, password: e.target.value })}
                    placeholder="e.g. password123"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={editingClient.projectName || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, projectName: e.target.value })}
                  placeholder="e.g. New Town Residence — Kolkata"
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingClient.clientName || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, clientName: e.target.value })}
                    placeholder="e.g. Rahul & Priya Verma"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
                <div>
                  <label className="font-mono font-bold block mb-1">Tracker Code</label>
                  <input
                    type="text"
                    value={editingClient.projectCode || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, projectCode: e.target.value })}
                    placeholder="e.g. DENTORIO LIVE TRACKER #D-402"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1">Project Manager Name</label>
                  <input
                    type="text"
                    value={editingClient.manager || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, manager: e.target.value })}
                    placeholder="e.g. Sourav Banerjee"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
                <div>
                  <label className="font-mono font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={editingClient.location || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, location: e.target.value })}
                    placeholder="e.g. Action Area I, New Town"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1">Progress Percentage (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingClient.progress || 50}
                    onChange={(e) => setEditingClient({ ...editingClient, progress: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
                <div>
                  <label className="font-mono font-bold block mb-1">Paid / Total Milestone</label>
                  <input
                    type="text"
                    value={editingClient.paidMilestone || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, paidMilestone: e.target.value })}
                    placeholder="e.g. ₹18,50,000 / ₹24,00,000"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Current Active Phase</label>
                <input
                  type="text"
                  value={editingClient.currentPhase || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, currentPhase: e.target.value })}
                  placeholder="e.g. Modular Kitchen Assembly & Master Bedroom Wardrobe Fitting"
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#13362B] text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Save Client Account & Telemetry →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM: CREATE / EDIT SERVICE */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1A1917]">
                {editingService.id ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setEditingService(null)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="font-mono font-bold block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. German Modular Kitchens"
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Tagline / Short Description *</label>
                <input
                  type="text"
                  required
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  placeholder="e.g. Custom acrylic kitchens with Hafele fittings"
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingService.image || ''}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#13362B] text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Save Service CMS →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM: CREATE / EDIT PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1A1917]">
                {editingProject.id ? 'Edit Project Case Study' : 'Add New Project Case Study'}
              </h3>
              <button onClick={() => setEditingProject(null)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <div>
                <label className="font-mono font-bold block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. Ballygunge Heritage Villa"
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    placeholder="e.g. South Kolkata"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
                <div>
                  <label className="font-mono font-bold block mb-1">Budget</label>
                  <input
                    type="text"
                    value={editingProject.budget || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, budget: e.target.value })}
                    placeholder="e.g. ₹48 Lakhs"
                    className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Story / Description</label>
                <textarea
                  value={editingProject.story || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, story: e.target.value })}
                  placeholder="Project transformation details..."
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6] h-20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#13362B] text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Save Project Case Study →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM: CREATE / EDIT PRICING TIER */}
      {editingPricing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1A1917]">Edit Pricing Package Tier</h3>
              <button onClick={() => setEditingPricing(null)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-3 text-xs">
              <div>
                <label className="font-mono font-bold block mb-1">Tier Name *</label>
                <input
                  type="text"
                  required
                  value={editingPricing.name || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Price Rate (e.g. ₹1,850) *</label>
                <input
                  type="text"
                  required
                  value={editingPricing.price || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, price: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6]"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1">Description</label>
                <textarea
                  value={editingPricing.desc || ''}
                  onChange={(e) => setEditingPricing({ ...editingPricing, desc: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#E2DDD6] h-16"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#13362B] text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Save Pricing Rates →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
