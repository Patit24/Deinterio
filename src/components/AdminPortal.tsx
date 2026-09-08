import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  X, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  UserCheck, 
  Layers, 
  LayoutGrid, 
  DollarSign, 
  KeyRound, 
  Sparkles,
  FileSpreadsheet,
  FileText,
  Download,
  UserPlus,
  Search,
  SlidersHorizontal,
  Clock,
  Camera,
  MessageSquare,
  Globe,
  ExternalLink,
  Lock,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { dataStore } from '../services/dataStore';
import type { ClientAccount, ServiceItem, ProjectItem, PricingTierItem, LeadItem, WorkItem } from '../services/dataStore';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(true);
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Active Tab: dashboard, clients, projects, work_progress, leads, pricing, blogs, documents, messages
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'projects' | 'work_progress' | 'leads' | 'pricing' | 'blogs'>('dashboard');

  // Re-render tick
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');

  // Editing Modals State
  const [editingClient, setEditingClient] = useState<Partial<ClientAccount> | null>(null);
  const [editingWorkItemsClient, setEditingWorkItemsClient] = useState<ClientAccount | null>(null);
  const [editingWorkItem, setEditingWorkItem] = useState<Partial<WorkItem> | null>(null);
  const [completionPhotoUrl, setCompletionPhotoUrl] = useState('');
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingPricing, setEditingPricing] = useState<Partial<PricingTierItem> | null>(null);

  // Blog Management State
  const [blogs, setBlogs] = useState([
    {
      id: 'blog-1',
      title: '2026 Interior Design Trends in Kolkata: Italian Minimalism Meets Heritage Vastu',
      slug: 'kolkata-interior-trends-2026',
      excerpt: 'Discover why Alipore & New Town homeowners are combining Italian Statuario marble with warm fluted teak wood and concealed LED cove ceilings.',
      category: 'Interior Design',
      status: 'PUBLISHED',
      publishedDate: 'Aug 15, 2026',
      readTime: '6 Min Read',
      primaryKeyword: 'interior design trends Kolkata',
      metaTitle: '2026 Interior Design Trends in Kolkata • Deinterio',
      metaDescription: 'Complete 2026 Kolkata home interior trend guide: Italian Statuario marble, fluted teak louvers, and Vastu spatial proportions.',
      author: 'Ananya Mukherjee, Principal Architect',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'blog-2',
      title: 'The Ultimate Modular Kitchen Buyer’s Guide: Plywood Grades, Hardware & Countertops',
      slug: 'modular-kitchen-buyers-guide',
      excerpt: 'Avoid bubbling laminates and rusting hinges. A complete technical breakdown of CenturyPly BWP 710 marine plywood and Hafele tandem boxes.',
      category: 'Modular Kitchen',
      status: 'PUBLISHED',
      publishedDate: 'Jul 28, 2026',
      readTime: '8 Min Read',
      primaryKeyword: 'modular kitchen buying guide India',
      metaTitle: 'Modular Kitchen Buyer Guide: Plywood & Fittings • Deinterio',
      metaDescription: 'Technical breakdown of marine plywood BWP 710, Hafele soft-close hardware, and quartz heat-resistant countertops for Indian kitchens.',
      author: 'Siddharth Banerjee, Joinery Director',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    },
  ]);

  const [editingBlog, setEditingBlog] = useState<any | null>(null);

  if (!isOpen) return null;

  const clients = dataStore.getClients();
  const services = dataStore.getServices();
  const projects = dataStore.getProjects();
  const pricing = dataStore.getPricing();
  const leads = dataStore.getLeads();

  // Admin Auth Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    if (adminPassword === 'admin' || adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
    } else {
      setAdminLoginError('Invalid admin password. Default password is admin123');
    }
  };

  // --- SAVE CLIENT ---
  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient?.username || !editingClient?.password || !editingClient?.projectName) {
      alert('Please enter username, password, and project name');
      return;
    }

    const fullClient: ClientAccount = {
      id: editingClient.id || `client-${Date.now()}`,
      username: editingClient.username,
      password: editingClient.password,
      clientName: editingClient.clientName || 'Valued Homeowner',
      clientEmail: editingClient.clientEmail || 'client@example.com',
      clientPhone: editingClient.clientPhone || '+91 98300 00000',
      projectName: editingClient.projectName,
      projectCode: editingClient.projectCode || `DENTORIO LIVE TRACKER #D-${Math.floor(100 + Math.random() * 900)}`,
      location: editingClient.location || 'Kolkata, West Bengal',
      manager: editingClient.manager || 'Sourav Banerjee',
      managerPhone: editingClient.managerPhone || '+91 98300 11223',
      progress: Number(editingClient.progress) || 10,
      currentPhase: editingClient.currentPhase || 'Discovery Consultation & Site Measurement',
      paidMilestone: editingClient.paidMilestone || '₹0',
      totalMilestone: editingClient.totalMilestone || '₹24,00,000',
      nextStageTitle: editingClient.nextStageTitle || 'Pay Stage 1 Booking Advance',
      startDate: editingClient.startDate || 'Jun 10, 2026',
      expectedCompletionDate: editingClient.expectedCompletionDate || 'Sep 10, 2026',
      lastUpdatedDate: 'Just now',
      phases: editingClient.phases || [
        { phase: '01', title: 'Discovery Consultation & Site Measurement', status: 'In Progress', date: 'Active' },
        { phase: '02', title: 'Space Planning & 3D Visualization', status: 'Upcoming', date: 'Upcoming' },
        { phase: '03', title: 'Material Selection & Quotation Approval', status: 'Upcoming', date: 'Upcoming' },
        { phase: '04', title: 'Modular Woodworking & Assembly', status: 'Upcoming', date: 'Upcoming' },
        { phase: '05', title: 'False Ceiling, Painting & Styling', status: 'Upcoming', date: 'Upcoming' },
        { phase: '06', title: 'Quality Inspection & Final Handover', status: 'Upcoming', date: 'Upcoming' },
      ],
      workItems: editingClient.workItems || [],
      dailyPhotos: editingClient.dailyPhotos || [],
      approvals: editingClient.approvals || [],
      documents: editingClient.documents || [],
      chatMessages: editingClient.chatMessages || [],
    };

    dataStore.saveClient(fullClient);
    setEditingClient(null);
    refresh();
  };

  // --- SAVE WORK ITEM (With Completion Photo Requirement logic #14) ---
  const handleSaveWorkItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkItemsClient || !editingWorkItem?.title) return;

    if (editingWorkItem.status === 'COMPLETED' && !editingWorkItem.photos?.length && !completionPhotoUrl.trim()) {
      alert('REQUIRED BUSINESS RULE (#14): When marking a work item as COMPLETED, admin MUST confirm and upload a completion photo!');
      return;
    }

    const updatedPhotos = editingWorkItem.photos ? [...editingWorkItem.photos] : [];
    if (completionPhotoUrl.trim()) {
      updatedPhotos.push(completionPhotoUrl.trim());
    }

    const updatedItems = [...editingWorkItemsClient.workItems];
    const itemIdx = updatedItems.findIndex((w) => w.id === editingWorkItem.id);

    const newItem: WorkItem = {
      id: editingWorkItem.id || `w-${Date.now()}`,
      title: editingWorkItem.title,
      category: editingWorkItem.category || 'General Execution',
      description: editingWorkItem.description || '',
      status: editingWorkItem.status || 'PENDING',
      startDate: editingWorkItem.startDate || 'Today',
      estCompletionDate: editingWorkItem.estCompletionDate || 'Next Week',
      completedDate: editingWorkItem.status === 'COMPLETED' ? (editingWorkItem.completedDate || 'Today') : undefined,
      progressPercent: editingWorkItem.status === 'COMPLETED' ? 100 : (editingWorkItem.progressPercent || (editingWorkItem.status === 'IN_PROGRESS' ? 50 : 0)),
      notes: editingWorkItem.notes || '',
      photos: updatedPhotos,
    };

    if (itemIdx >= 0) {
      updatedItems[itemIdx] = newItem;
    } else {
      updatedItems.push(newItem);
    }

    // Auto calculate overall completion % (#15)
    const totalCount = updatedItems.length;
    const completedCount = updatedItems.filter((w) => w.status === 'COMPLETED').length;
    const autoProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const updatedClient: ClientAccount = {
      ...editingWorkItemsClient,
      workItems: updatedItems,
      progress: autoProgress,
      lastUpdatedDate: 'Just now',
    };

    dataStore.saveClient(updatedClient);
    setEditingWorkItemsClient(updatedClient);
    setEditingWorkItem(null);
    setCompletionPhotoUrl('');
    refresh();
  };

  // --- CONVERT LEAD TO CLIENT (#25) ---
  const handleConvertLead = (leadId: string) => {
    const newClient = dataStore.convertLeadToClient(leadId);
    if (newClient) {
      alert(`🎉 Lead successfully converted! New client account created for ${newClient.clientName} (Username: ${newClient.username}, Password: password123).`);
      setActiveTab('clients');
      refresh();
    }
  };

  // --- EXPORT LEADS TO EXCEL / CSV (#24) ---
  const handleExportExcel = () => {
    const currentLeads = dataStore.getLeads();
    if (currentLeads.length === 0) {
      alert('No quotation leads available to export.');
      return;
    }

    const headers = ['Quotation ID', 'Customer Name', 'Email', 'Phone', 'Project Type', 'Location', 'Budget', 'Estimated Amount', 'Status', 'Submission Date', 'Details'];
    const rows = currentLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.type}"`,
      `"${l.city}"`,
      `"${l.budget}"`,
      `"${l.estimatedAmount || l.budget}"`,
      `"${l.status}"`,
      `"${l.date}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Deinterio_Quotation_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- DOWNLOAD PDF QUOTATION (#22) ---
  const handleDownloadQuotationPDF = (lead: LeadItem) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popup windows to download Quotation PDF.');
      return;
    }

    const pdfHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Deinterio Estimated Interior Quotation #${lead.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1A1917; background: #FFF; }
          .header { display: flex; justify-content: space-between; align-items: center; border-b: 2px solid #13362B; padding-bottom: 20px; margin-bottom: 30px; }
          .brand { font-size: 24px; font-weight: bold; color: #13362B; letter-spacing: 2px; }
          .sub { font-size: 11px; color: #8C6D3B; text-transform: uppercase; letter-spacing: 3px; font-family: monospace; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .info-table td { padding: 8px 12px; border: 1px solid #E2DDD6; font-size: 12px; }
          .info-table th { padding: 10px 12px; background: #F9F6F0; border: 1px solid #E2DDD6; font-size: 12px; text-align: left; color: #13362B; }
          .summary { background: #13362B; color: #FFF; padding: 20px; border-radius: 12px; margin-top: 30px; }
          .summary h3 { margin: 0 0 10px 0; color: #C8AA7A; font-size: 18px; }
          .disclaimer { font-size: 10px; color: #6B6560; margin-top: 30px; border-t: 1px solid #E2DDD6; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">DEINTERIO INTERIOR GROUP</div>
            <div class="sub">A Unit of All In One Contractual Services Pvt Ltd</div>
            <p style="font-size: 11px; color: #5A5852; margin: 4px 0 0 0;">South Kolkata HQ • Rajarhat Factory • New Town Studio</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; color: #13362B;">ESTIMATED QUOTATION</h2>
            <p style="font-size: 11px; font-family: monospace; margin: 4px 0 0 0;">Quotation ID: #${lead.id}</p>
            <p style="font-size: 11px; font-family: monospace; margin: 2px 0 0 0;">Date: ${lead.date}</p>
          </div>
        </div>

        <table class="info-table">
          <tr>
            <th colspan="2">CUSTOMER DETAILS</th>
            <th colspan="2">PROJECT SPECIFICATIONS</th>
          </tr>
          <tr>
            <td><strong>Client Name:</strong></td><td>${lead.name}</td>
            <td><strong>Project Type:</strong></td><td>${lead.type}</td>
          </tr>
          <tr>
            <td><strong>Phone / WhatsApp:</strong></td><td>${lead.phone}</td>
            <td><strong>Location:</strong></td><td>${lead.city}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td><td>${lead.email}</td>
            <td><strong>Selected Budget Tier:</strong></td><td>${lead.budget}</td>
          </tr>
        </table>

        <table class="info-table">
          <thead>
            <tr>
              <th>Scope Item</th>
              <th>Specification Grade</th>
              <th>Warranty</th>
              <th style="text-align: right;">Est. Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Turnkey Interior Architecture</td>
              <td>CenturyPly Club Prime 710 BWP Marine Plywood & Hafele Soft-Close Hardware</td>
              <td>10 Years Digital Warranty</td>
              <td style="text-align: right; font-weight: bold;">${lead.estimatedAmount || lead.budget}</td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3>TOTAL ESTIMATED INVESTMENT</h3>
              <p style="font-size: 11px; color: #D4C3A3; margin: 0;">Includes 3D VR simulation, material delivery, installation & site supervision.</p>
            </div>
            <div style="font-size: 28px; font-weight: bold; color: #C8AA7A;">
              ${lead.estimatedAmount || lead.budget}
            </div>
          </div>
        </div>

        <div class="disclaimer">
          <p><strong>IMPORTANT QUOTATION DISCLAIMER (#21):</strong></p>
          <p>This is an automated preliminary estimated quotation. Final pricing may vary after 3D laser site measurement, exact material selection, design approval, and structural project assessment. Valid for 30 days from date of issuance.</p>
        </div>

        <script>window.print();</script>
      </body>
      </html>
    `;

    printWindow.document.write(pdfHtml);
    printWindow.document.close();
  };

  // --- SAVE BLOG (#16) ---
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title) return;

    const newBlog = {
      id: editingBlog.id || `blog-${Date.now()}`,
      title: editingBlog.title,
      slug: editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: editingBlog.excerpt || '',
      category: editingBlog.category || 'Interior Design',
      status: editingBlog.status || 'PUBLISHED',
      publishedDate: editingBlog.publishedDate || 'Today',
      readTime: editingBlog.readTime || '5 Min Read',
      primaryKeyword: editingBlog.primaryKeyword || '',
      metaTitle: editingBlog.metaTitle || editingBlog.title,
      metaDescription: editingBlog.metaDescription || editingBlog.excerpt,
      author: editingBlog.author || 'Deinterio Architectural Team',
      image: editingBlog.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    };

    const updated = [...blogs];
    const idx = updated.findIndex((b) => b.id === newBlog.id);
    if (idx >= 0) {
      updated[idx] = newBlog;
    } else {
      updated.unshift(newBlog);
    }

    setBlogs(updated);
    setEditingBlog(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1917]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#1A1917]">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* ========================================================================= */}
        {/* STEP 1: ADMIN LOGIN FORM                                                 */}
        {/* ========================================================================= */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto space-y-8 my-auto w-full">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#13362B] flex items-center justify-center text-[#C8AA7A] shadow-md">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1917]">Admin Management Panel</h3>
                  <p className="text-xs text-[#8C6D3B] font-mono">Deinterio Executive Management</p>
                </div>
              </div>

              <button onClick={onClose} className="p-2 rounded-full bg-[#1A1917]/5 text-[#1A1917]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-5">
              {adminLoginError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{adminLoginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1A1917] block uppercase tracking-wider">
                  Admin System Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C6D3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    placeholder="Enter password (default: admin123)"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#13362B] text-[#C8AA7A] hover:bg-[#0E271F] font-mono font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>SIGN IN TO ADMIN PANEL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* STEP 2: AUTHENTICATED ADMIN SYSTEM B                                     */
          /* ========================================================================= */
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Admin Header */}
            <div className="p-6 bg-[#13362B] text-white flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8AA7A] text-[#13362B] flex items-center justify-center font-bold shadow-md">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-white">Deinterio Master Admin CMS</h3>
                  <p className="text-xs font-mono text-[#D4C3A3]">Role-Based Access Control • Executive Operations</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAdminAuthenticated(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8AA7A] text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Sign Out Admin
                </button>
                <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-[#FAF8F4] border-b border-[#E2DDD6] px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              {[
                { key: 'dashboard', label: 'Executive Dashboard', icon: TrendingUp },
                { key: 'clients', label: `Clients (${clients.length})`, icon: UserCheck },
                { key: 'projects', label: `Projects & Work Items (${clients.length})`, icon: Clock },
                { key: 'leads', label: `Quotation Leads (${leads.length})`, icon: FileSpreadsheet },
                { key: 'pricing', label: `Pricing Engine (${pricing.length})`, icon: DollarSign },
                { key: 'blogs', label: `Blogs & SEO (${blogs.length})`, icon: Globe },
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

            {/* Admin Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* =================================================================== */}
              {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW                                 */}
              {/* =================================================================== */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[#8C6D3B]">
                        <span>TOTAL CLIENTS</span>
                        <UserCheck className="w-4 h-4 text-[#13362B]" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#1A1917] block">{clients.length}</span>
                      <span className="text-[10px] font-mono text-emerald-600 block font-bold">100% Portal Telemetry Active</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[#8C6D3B]">
                        <span>ACTIVE PROJECTS</span>
                        <Clock className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#1A1917] block">
                        {clients.filter((c) => c.progress < 100).length}
                      </span>
                      <span className="text-[10px] font-mono text-amber-600 block font-bold">Currently On Site</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[#8C6D3B]">
                        <span>QUOTATION LEADS</span>
                        <FileSpreadsheet className="w-4 h-4 text-[#C8AA7A]" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#1A1917] block">{leads.length}</span>
                      <span className="text-[10px] font-mono text-[#13362B] block font-bold">Convertible to Client</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#E2DDD6] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[#8C6D3B]">
                        <span>PUBLISHED ARTICLES</span>
                        <Globe className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#1A1917] block">
                        {blogs.filter((b) => b.status === 'PUBLISHED').length}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 block font-bold">Google Index Optimized</span>
                    </div>
                  </div>

                  {/* Quick Action Bar */}
                  <div className="p-6 rounded-3xl bg-[#13362B] text-white flex flex-wrap items-center justify-between gap-4 shadow-xl">
                    <div>
                      <h4 className="font-serif text-2xl font-normal">System Administration & Operations</h4>
                      <p className="text-xs text-[#D4C3A3] font-mono mt-0.5">
                        Manage client access, create work item lists, export leads, and update pricing rules.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setEditingClient({})}
                        className="px-5 py-2.5 rounded-xl bg-[#C8AA7A] hover:bg-[#B89A6A] text-[#13362B] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>+ Add New Client Account</span>
                      </button>

                      <button
                        onClick={handleExportExcel}
                        className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-[#C8AA7A]/30"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export Leads CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Leads Preview */}
                  <div className="bg-white rounded-3xl p-6 border border-[#E2DDD6] space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
                      <h4 className="font-serif text-xl font-bold text-[#1A1917]">Recent Public Quotation Enquiries</h4>
                      <button
                        onClick={() => setActiveTab('leads')}
                        className="text-xs font-mono font-bold text-[#13362B] hover:underline"
                      >
                        View All Leads ({leads.length}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {leads.slice(0, 3).map((lead) => (
                        <div key={lead.id} className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-serif text-base font-bold text-[#1A1917]">{lead.name}</h5>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                                {lead.status}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#6B6560] block mt-0.5">{lead.type} • {lead.city} • Est: <strong>{lead.estimatedAmount || lead.budget}</strong></span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDownloadQuotationPDF(lead)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono text-[#13362B] flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </button>

                            <button
                              onClick={() => handleConvertLead(lead.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-1 cursor-pointer"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              <span>Convert to Client</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 2: CLIENT MANAGEMENT                                            */}
              {/* =================================================================== */}
              {activeTab === 'clients' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Client Accounts & Access</h4>
                      <p className="text-xs font-mono text-[#6B6560]">Create and manage client portal access credentials</p>
                    </div>

                    <button
                      onClick={() => setEditingClient({})}
                      className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>+ Create Client Account</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD6] pb-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <h5 className="font-serif text-xl font-bold text-[#1A1917]">{client.clientName}</h5>
                              <span className="px-3 py-1 rounded-full bg-[#13362B]/10 text-xs font-mono font-bold text-[#13362B]">
                                {client.projectCode}
                              </span>
                            </div>
                            <p className="text-xs font-mono text-[#6B6560] mt-0.5">
                              {client.projectName} • {client.location}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingWorkItemsClient(client)}
                              className="px-4 py-2 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                            >
                              <Clock className="w-4 h-4" />
                              <span>Manage Work Items ({client.workItems?.length || 0})</span>
                            </button>

                            <button
                              onClick={() => setEditingClient(client)}
                              className="p-2.5 rounded-xl bg-white border border-[#E2DDD6] hover:bg-gray-50 text-[#1A1917] cursor-pointer"
                              title="Edit Client Settings"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete client account for ${client.clientName}?`)) {
                                  dataStore.deleteClient(client.id);
                                  refresh();
                                }
                              }}
                              className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 cursor-pointer"
                              title="Delete Client"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#5A5852]">
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Username</span>
                            <strong className="text-[#1A1917]">{client.username}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Password</span>
                            <strong className="text-[#1A1917]">{client.password}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Progress</span>
                            <strong className="text-emerald-700 font-bold">{client.progress}% Complete</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Assigned PM</span>
                            <strong className="text-[#1A1917]">{client.manager}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 3: PROJECTS & WORK ITEM MANAGEMENT (#13 & #14)                  */}
              {/* =================================================================== */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Project Work Item Manager</h4>
                    <p className="text-xs font-mono text-[#6B6560]">Create 15–20 step work lists per project and upload completion photos</p>
                  </div>

                  <div className="space-y-6">
                    {clients.map((c) => (
                      <div key={c.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
                          <div>
                            <h5 className="font-serif text-xl font-bold text-[#1A1917]">{c.projectName}</h5>
                            <span className="text-xs font-mono text-[#6B6560]">Client: <strong>{c.clientName}</strong> • {c.location}</span>
                          </div>

                          <button
                            onClick={() => setEditingWorkItemsClient(c)}
                            className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Edit Work List ({c.workItems?.length || 0})</span>
                          </button>
                        </div>

                        {/* Work Items Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                            ✓ Completed: <strong>{c.workItems?.filter((w) => w.status === 'COMPLETED').length || 0}</strong>
                          </div>
                          <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                            ● In Progress: <strong>{c.workItems?.filter((w) => w.status === 'IN_PROGRESS').length || 0}</strong>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-200">
                            ○ Pending: <strong>{c.workItems?.filter((w) => w.status === 'PENDING').length || 0}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 4: QUOTATION LEADS & CONVERSION (#23, #24, #25)                 */}
              {/* =================================================================== */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Public Quotation Leads ({leads.length})</h4>
                      <p className="text-xs font-mono text-[#6B6560]">Saved lead submissions from public cost calculator form</p>
                    </div>

                    <button
                      onClick={handleExportExcel}
                      className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Export Excel / CSV</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD6] pb-3">
                          <div>
                            <div className="flex items-center gap-3">
                              <h5 className="font-serif text-xl font-bold text-[#1A1917]">{lead.name}</h5>
                              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase">
                                {lead.status}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#6B6560] block mt-0.5">
                              {lead.email} • {lead.phone} • Submitted {lead.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDownloadQuotationPDF(lead)}
                              className="px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold text-[#13362B] flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download PDF</span>
                            </button>

                            <button
                              onClick={() => handleConvertLead(lead.id)}
                              className="px-4 py-2 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                            >
                              <UserPlus className="w-4 h-4" />
                              <span>Convert to Client</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#5A5852]">
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Project Type</span>
                            <strong className="text-[#1A1917]">{lead.type}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Location</span>
                            <strong className="text-[#1A1917]">{lead.city}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Selected Budget</span>
                            <strong className="text-[#13362B] font-bold">{lead.budget}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Est. Calculation</span>
                            <strong className="text-[#13362B] font-bold">{lead.estimatedAmount || lead.budget}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 5: PRICING ENGINE (#21)                                         */}
              {/* =================================================================== */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Quotation Pricing Rules</h4>
                    <p className="text-xs font-mono text-[#6B6560]">Configure base sq.ft prices for cost estimator calculations</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pricing.map((tier) => (
                      <div key={tier.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="px-3 py-1 rounded-full bg-[#13362B]/10 text-xs font-mono font-bold text-[#13362B] uppercase">
                            {tier.tag}
                          </span>
                          <h5 className="font-serif text-2xl font-bold text-[#1A1917]">{tier.name}</h5>
                          <span className="font-serif text-3xl font-bold text-[#13362B] block">
                            {tier.price} <span className="text-xs font-mono font-normal text-gray-500">{tier.unit}</span>
                          </span>
                          <p className="text-xs text-[#5A5852] font-light leading-relaxed">{tier.desc}</p>
                        </div>

                        <button
                          onClick={() => setEditingPricing(tier)}
                          className="w-full py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold text-[#13362B] hover:bg-[#FAF8F4] cursor-pointer"
                        >
                          Edit Rate Card
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 6: BLOGS & SEO (#16 & #17)                                       */}
              {/* =================================================================== */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Blog & SEO Article Management</h4>
                      <p className="text-xs font-mono text-[#6B6560]">Publish architectural articles with live Google search preview</p>
                    </div>

                    <button
                      onClick={() => setEditingBlog({})}
                      className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Create New Article</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase">
                              {b.status}
                            </span>
                            <h5 className="font-serif text-xl font-bold text-[#1A1917]">{b.title}</h5>
                          </div>

                          <button
                            onClick={() => setEditingBlog(b)}
                            className="px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Article</span>
                          </button>
                        </div>

                        {/* GOOGLE SEARCH PREVIEW SNIPPET (#17) */}
                        <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#DADCE0] space-y-1">
                          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Google Search Preview</span>
                          <span className="text-xs text-[#202124] block font-sans">https://deinterio.com/#/blog/{b.slug}</span>
                          <h6 className="text-base text-[#1a0dab] font-sans hover:underline font-medium cursor-pointer">{b.metaTitle}</h6>
                          <p className="text-xs text-[#4d5156] font-sans line-clamp-2">{b.metaDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* EDIT WORK ITEMS MODAL FOR CLIENT                                          */}
      {/* ========================================================================= */}
      {editingWorkItemsClient && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 shadow-2xl p-6 sm:p-8 space-y-6 my-auto text-[#1A1917]">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase">WORK LIST EDITOR</span>
                <h3 className="font-serif text-2xl font-bold">{editingWorkItemsClient.projectName}</h3>
              </div>
              <button onClick={() => setEditingWorkItemsClient(null)} className="p-2 rounded-full bg-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-[#13362B]">
                Total Items: {editingWorkItemsClient.workItems?.length || 0}
              </span>
              <button
                onClick={() => setEditingWorkItem({ status: 'PENDING', progressPercent: 0 })}
                className="px-4 py-2 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Work Item</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {editingWorkItemsClient.workItems.map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-white border border-[#E2DDD6] flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#FAF8F4] border border-[#E2DDD6] text-[10px] font-mono text-[#8C6D3B]">
                        {w.category}
                      </span>
                      <strong className="text-sm font-serif text-[#1A1917]">{w.title}</strong>
                    </div>
                    <span className="text-xs font-mono text-gray-500 block mt-0.5">
                      Status: <strong>{w.status}</strong> ({w.progressPercent}%)
                    </span>
                  </div>

                  <button
                    onClick={() => setEditingWorkItem(w)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase cursor-pointer"
                  >
                    Edit / Update
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT SINGLE WORK ITEM MODAL (With required completion photo #14) */}
      {editingWorkItem && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <form onSubmit={handleSaveWorkItem} className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E2DDD6] p-6 space-y-4 text-[#1A1917]">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
              <h4 className="font-serif text-xl font-bold">Update Work Item Status</h4>
              <button type="button" onClick={() => setEditingWorkItem(null)} className="p-1.5 rounded-full bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block">Work Title</label>
              <input
                type="text"
                value={editingWorkItem.title || ''}
                onChange={(e) => setEditingWorkItem({ ...editingWorkItem, title: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block">Category</label>
                <input
                  type="text"
                  value={editingWorkItem.category || ''}
                  onChange={(e) => setEditingWorkItem({ ...editingWorkItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block">Status</label>
                <select
                  value={editingWorkItem.status || 'PENDING'}
                  onChange={(e) => setEditingWorkItem({ ...editingWorkItem, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono font-bold text-[#13362B]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>

            {/* COMPLETION PHOTO REQUIREMENT RULE #14 */}
            {editingWorkItem.status === 'COMPLETED' && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>REQUIRED RULE (#14): Upload Site Completion Photo</span>
                </span>
                <input
                  type="url"
                  value={completionPhotoUrl}
                  onChange={(e) => setCompletionPhotoUrl(e.target.value)}
                  placeholder="Paste Image URL e.g. https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-xs font-mono"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block">Client Notes / Update</label>
              <textarea
                value={editingWorkItem.notes || ''}
                onChange={(e) => setEditingWorkItem({ ...editingWorkItem, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
            >
              Save Work Item Status
            </button>
          </form>
        </div>
      )}

      {/* EDIT CLIENT MODAL */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <form onSubmit={handleSaveClient} className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E2DDD6] p-6 space-y-4 text-[#1A1917] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
              <h4 className="font-serif text-xl font-bold">Edit Client Credentials & Project</h4>
              <button type="button" onClick={() => setEditingClient(null)} className="p-1 rounded-full bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block">Client Full Name</label>
              <input
                type="text"
                value={editingClient.clientName || ''}
                onChange={(e) => setEditingClient({ ...editingClient, clientName: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block">Username</label>
                <input
                  type="text"
                  value={editingClient.username || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, username: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block">Password</label>
                <input
                  type="text"
                  value={editingClient.password || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, password: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block">Project Name</label>
              <input
                type="text"
                value={editingClient.projectName || ''}
                onChange={(e) => setEditingClient({ ...editingClient, projectName: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
            >
              Save Client Account
            </button>
          </form>
        </div>
      )}

      {/* EDIT BLOG MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <form onSubmit={handleSaveBlog} className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E2DDD6] p-6 space-y-4 text-[#1A1917] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
              <h4 className="font-serif text-xl font-bold">Blog Article Editor</h4>
              <button type="button" onClick={() => setEditingBlog(null)} className="p-1 rounded-full bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block">Article Title</label>
              <input
                type="text"
                value={editingBlog.title || ''}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block">Meta Description (SEO)</label>
              <textarea
                value={editingBlog.metaDescription || ''}
                onChange={(e) => setEditingBlog({ ...editingBlog, metaDescription: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-[#E2DDD6] text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
            >
              Save & Publish Article
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
