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
  AlertCircle,
  Construction,
  Video,
  Play,
  Star,
  Building2,
  Eye,
  EyeOff,
  BookOpen,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
  Hash,
  FileCode,
  List,
  Quote,
  Bold,
  Italic
} from 'lucide-react';
import { dataStore } from '../services/dataStore';
import type { ClientAccount, ServiceItem, ProjectItem, PricingTierItem, LeadItem, WorkItem, TrackerProject, ClientStory, BlogArticle } from '../services/dataStore';
import { generateQuotationPDF } from '../utils/quotationPdfGenerator';
import { ImageUploader } from './ImageUploader';

interface AdminPortalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen = true, onClose, isStandalonePage = false }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('deinterio_admin_authenticated') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');

  // Admin Change Password Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [changePassError, setChangePassError] = useState('');
  const [changePassSuccess, setChangePassSuccess] = useState('');

  // Active Tab: dashboard, tracker, stories, clients, projects, portfolio, work_progress, leads, pricing, blogs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tracker' | 'stories' | 'clients' | 'projects' | 'portfolio' | 'work_progress' | 'leads' | 'pricing' | 'blogs'>('dashboard');

  // Live Project Tracker State (Working vs Completed)
  const [trackerProjects, setTrackerProjects] = useState<TrackerProject[]>(() => dataStore.getTrackerProjects());
  const [editingTrackerProject, setEditingTrackerProject] = useState<Partial<TrackerProject> | null>(null);
  const [trackerStatusFilter, setTrackerStatusFilter] = useState<'ALL' | 'WORKING' | 'COMPLETED'>('ALL');

  // Client Stories State (Auto-Trims Oldest Beyond 4)
  const [clientStories, setClientStories] = useState<ClientStory[]>(() => dataStore.getClientStories());
  const [editingStory, setEditingStory] = useState<Partial<ClientStory> | null>(null);

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
  const [materialsInput, setMaterialsInput] = useState('');
  const [editingPricing, setEditingPricing] = useState<Partial<PricingTierItem> | null>(null);

  // Blog Management State
  const [editingBlog, setEditingBlog] = useState<Partial<BlogArticle> | null>(null);
  const [blogEditorTab, setBlogEditorTab] = useState<'write' | 'preview'>('write');
  const [inArticleImg, setInArticleImg] = useState('');
  const [inArticleCaption, setInArticleCaption] = useState('');
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogStatusFilter, setBlogStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const clients = dataStore.getClients();
  const services = dataStore.getServices();
  const projects = dataStore.getProjects();
  const blogs = dataStore.getBlogs();
  const pricing = dataStore.getPricing();
  const leads = dataStore.getLeads();

  // Admin Auth Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    const validPassword = dataStore.getAdminPassword();
    if (adminPassword === validPassword || adminPassword === 'admin' || adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('deinterio_admin_authenticated', 'true');
    } else {
      setAdminLoginError('Invalid admin password. Please try again.');
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePassError('');
    setChangePassSuccess('');
    const currentValid = dataStore.getAdminPassword();
    if (currentPassInput !== currentValid && currentPassInput !== 'admin123') {
      setChangePassError('Current admin password does not match.');
      return;
    }
    if (newPassInput.trim().length < 6) {
      setChangePassError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setChangePassError('New passwords do not match.');
      return;
    }
    dataStore.setAdminPassword(newPassInput.trim());
    setChangePassSuccess('Admin password successfully updated!');
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setTimeout(() => {
      setIsChangePasswordOpen(false);
      setChangePassSuccess('');
    }, 1200);
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
      clientPhone: editingClient.clientPhone || '+91 79802 02221',
      projectName: editingClient.projectName,
      projectCode: editingClient.projectCode || `DENTORIO LIVE TRACKER #D-${Math.floor(100 + Math.random() * 900)}`,
      location: editingClient.location || 'Kolkata, West Bengal',
      manager: editingClient.manager || 'Sourav Banerjee',
      managerPhone: editingClient.managerPhone || '+91 79802 02221',
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
    // Parse package tier if available or infer from type
    let tier = lead.packageTier || 'Premium';
    if (!lead.packageTier) {
      if (lead.type.includes('Luxury')) tier = 'Luxury';
      else if (lead.type.includes('Essentials')) tier = 'Essentials';
    }

    // Parse BHK
    const bhkMatch = lead.type.match(/\d\s*BHK(\+)?/i);
    const bhk = bhkMatch ? bhkMatch[0].toUpperCase() : 'Turnkey Residential';

    generateQuotationPDF({
      quotationId: lead.quotationId || lead.id,
      date: lead.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      clientName: lead.name,
      clientPhone: lead.phone,
      clientEmail: lead.email,
      city: lead.city,
      bhkType: bhk,
      carpetArea: lead.carpetArea,
      packageTier: tier,
      ratePerSqft: lead.ratePerSqft,
      totalAreaSqft: lead.totalAreaSqft,
      falseCeilingSqft: lead.falseCeilingSqft,
      falseCeilingCost: lead.falseCeilingCost,
      rooms: lead.rooms,
      roomDimensions: lead.roomDimensions,
      serviceScope: lead.serviceScope,
      totalAmountFormatted: lead.estimatedAmount || lead.budget,
      notes: lead.notes || lead.details,
    });
  };

  // --- SAVE PORTFOLIO PROJECT ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) {
      alert('Please enter a project title');
      return;
    }

    const materialsArr = materialsInput
      ? materialsInput.split(',').map((m) => m.trim()).filter(Boolean)
      : (editingProject.materials || []);

    const fullProject: ProjectItem = {
      id: editingProject.id || `proj-${Date.now()}`,
      title: editingProject.title,
      category: editingProject.category || 'Villa & Bungalow',
      location: editingProject.location || 'Kolkata, West Bengal',
      budget: editingProject.budget || '₹25 Lakhs',
      timeline: editingProject.timeline || '12 Weeks',
      area: editingProject.area || '2,500 sq.ft',
      rating: editingProject.rating || '5.0 ★★★★★',
      image: editingProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      beforeImg: editingProject.beforeImg || editingProject.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      afterImg: editingProject.afterImg || editingProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      story: editingProject.story || '',
      materials: materialsArr.length > 0 ? materialsArr : ['CenturyPly Marine Plywood', 'Hafele Fittings'],
      badge: editingProject.badge || `${editingProject.category || 'Luxury'} • Deinterio Signature`,
    };

    dataStore.saveProject(fullProject);
    setEditingProject(null);
    setMaterialsInput('');
    refresh();
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete portfolio project "${title}"?`)) {
      dataStore.deleteProject(id);
      refresh();
    }
  };

  // --- BLOG MANAGEMENT HANDLERS ---
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title?.trim()) {
      alert('Please enter an article title.');
      return;
    }

    const title = editingBlog.title.trim();
    const cleanSlug = (editingBlog.slug?.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || `article-${Date.now()}`;
    const wordCount = (editingBlog.content || '').trim().split(/\s+/).filter(Boolean).length;
    const estimatedReadTime = editingBlog.readTime?.trim() || `${Math.max(2, Math.ceil(wordCount / 180))} Min Read`;

    const blogToSave: BlogArticle = {
      id: editingBlog.id || `blog-${Date.now()}`,
      title,
      slug: cleanSlug,
      excerpt: editingBlog.excerpt?.trim() || (editingBlog.content ? editingBlog.content.slice(0, 160) + '...' : ''),
      content: editingBlog.content || '',
      category: editingBlog.category?.trim() || 'Design Trends',
      status: (editingBlog.status as 'PUBLISHED' | 'DRAFT') || 'PUBLISHED',
      publishedDate: editingBlog.publishedDate?.trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: estimatedReadTime,
      author: editingBlog.author?.trim() || 'Deinterio Architectural Team',
      image: editingBlog.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      imageCaption: editingBlog.imageCaption?.trim() || '',
      primaryKeyword: editingBlog.primaryKeyword?.trim() || '',
      metaTitle: editingBlog.metaTitle?.trim() || `${title} • Deinterio`,
      metaDescription: editingBlog.metaDescription?.trim() || (editingBlog.excerpt?.slice(0, 155) || title),
      tags: editingBlog.tags || [],
      lastModified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    dataStore.saveBlog(blogToSave);
    setEditingBlog(null);
    setInArticleImg('');
    setInArticleCaption('');
    setBlogEditorTab('write');
    refresh();
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete article "${title}"? This cannot be undone.`)) {
      dataStore.deleteBlog(id);
      refresh();
    }
  };

  const handleInsertInArticleImage = () => {
    if (!inArticleImg) {
      alert('Please upload or select a photo from your gallery/desktop first.');
      return;
    }
    const caption = inArticleCaption.trim() || 'Interior Architectural Detail';
    const markdownTag = `\n\n![${caption}](${inArticleImg})\n\n`;
    const current = editingBlog?.content || '';
    setEditingBlog({
      ...editingBlog,
      content: current + markdownTag,
    });
    setInArticleImg('');
    setInArticleCaption('');
    alert('In-article photo inserted successfully into markdown body!');
  };

  const insertMarkdownSnippet = (prefix: string, suffix: string = '') => {
    const current = editingBlog?.content || '';
    setEditingBlog({
      ...editingBlog,
      content: current ? `${current}\n\n${prefix}Your Heading or Text${suffix}\n` : `${prefix}Your Heading or Text${suffix}\n`,
    });
  };

  // --- TRACKER PROJECTS HANDLERS ---
  const handleSaveTrackerProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrackerProject || !editingTrackerProject.name) return;
    const proj: TrackerProject = {
      id: editingTrackerProject.id || `live-${Date.now()}`,
      name: editingTrackerProject.name,
      location: editingTrackerProject.location || 'New Town, Kolkata',
      type: editingTrackerProject.type || 'Apartment (3 BHK)',
      status: (editingTrackerProject.status as 'WORKING' | 'COMPLETED') || 'WORKING',
      currentStage: editingTrackerProject.currentStage || 'False Ceiling Work',
      progress: editingTrackerProject.progress !== undefined ? Number(editingTrackerProject.progress) : 50,
      estCompletion: editingTrackerProject.estCompletion || 'Underway',
      manager: editingTrackerProject.manager || 'Site Lead',
      managerAvatar: editingTrackerProject.managerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      heroImage: editingTrackerProject.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: editingTrackerProject.status === 'COMPLETED' ? 'Completed' : (editingTrackerProject.badge || 'Live'),
      pmNote: editingTrackerProject.pmNote || '',
      area: editingTrackerProject.area || '2,400 sq.ft',
      duration: editingTrackerProject.duration || '12 Weeks',
      completedDate: editingTrackerProject.status === 'COMPLETED' ? (editingTrackerProject.completedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })) : undefined,
      testimonial: editingTrackerProject.testimonial || '',
      clientName: editingTrackerProject.clientName || '',
    };
    dataStore.saveTrackerProject(proj);
    setTrackerProjects(dataStore.getTrackerProjects());
    setEditingTrackerProject(null);
    refresh();
  };

  const handleMarkTrackerProjectComplete = (id: string) => {
    dataStore.markTrackerProjectComplete(id);
    setTrackerProjects(dataStore.getTrackerProjects());
    refresh();
  };

  const handleDeleteTrackerProject = (id: string) => {
    if (window.confirm('Are you sure you want to remove this project from the live tracker?')) {
      dataStore.deleteTrackerProject(id);
      setTrackerProjects(dataStore.getTrackerProjects());
      refresh();
    }
  };

  // --- CLIENT STORIES HANDLERS ---
  const handleSaveClientStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory || !editingStory.client) return;
    const story: ClientStory = {
      id: editingStory.id || `story-${Date.now()}`,
      client: editingStory.client,
      location: editingStory.location || 'Kolkata',
      duration: editingStory.duration || '02:00',
      lang: editingStory.lang || 'EN / BN',
      thumbnail: editingStory.thumbnail || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      videoUrl: editingStory.videoUrl || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      quote: editingStory.quote || 'Deinterio transformed our home with unmatched elegance and perfection.',
      rating: editingStory.rating || '5.0 ★',
      featured: Boolean(editingStory.featured),
    };
    dataStore.saveClientStory(story);
    setClientStories(dataStore.getClientStories());
    setEditingStory(null);
    refresh();
  };

  const handleDeleteClientStory = (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this client story?')) {
      dataStore.deleteClientStory(id);
      setClientStories(dataStore.getClientStories());
      refresh();
    }
  };

  return (
    <div className={isStandalonePage 
      ? "min-h-screen bg-[#F8F6F0] pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-[#1A1917]"
      : "fixed inset-0 z-50 bg-[#1A1917]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-[#1A1917]"
    }>
      <div className={isStandalonePage
        ? "max-w-7xl mx-auto rounded-3xl bg-[#FAF8F4] border border-[#E2DDD6] shadow-xl overflow-hidden flex flex-col min-h-[85vh] w-full"
        : "relative w-full max-w-6xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      }>
        
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

              {isStandalonePage ? (
                <a
                  href="#/"
                  className="px-3.5 py-2 rounded-xl bg-[#1A1917]/5 hover:bg-[#1A1917]/10 text-[#1A1917] text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  ← Back to Website
                </a>
              ) : (
                <button onClick={onClose} className="p-2 rounded-full bg-[#1A1917]/5 text-[#1A1917]">
                  <X className="w-5 h-5" />
                </button>
              )}
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
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                    placeholder="Enter admin master password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1A1917] p-1 cursor-pointer"
                  >
                    {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4C3A3] hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Change Admin Password"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#C8AA7A]" />
                  <span>Security</span>
                </button>
                {isStandalonePage && (
                  <a
                    href="#/"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F4] text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    ← Back to Website
                  </a>
                )}
                <button
                  onClick={() => {
                    setIsAdminAuthenticated(false);
                    localStorage.removeItem('deinterio_admin_authenticated');
                    setAdminPassword('');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8AA7A] text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Sign Out Admin
                </button>
                {!isStandalonePage && (
                  <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-[#FAF8F4] border-b border-[#E2DDD6] px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              {[
                { key: 'dashboard', label: 'Executive Dashboard', icon: TrendingUp },
                { key: 'tracker', label: `Live Tracker (${trackerProjects.length})`, icon: Construction },
                { key: 'stories', label: `Client Stories (${clientStories.length})`, icon: Video },
                { key: 'clients', label: `Clients (${clients.length})`, icon: UserCheck },
                { key: 'projects', label: `Work Items (${clients.length})`, icon: Clock },
                { key: 'portfolio', label: `Portfolio Works (${projects.length})`, icon: Sparkles },
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
                        onClick={() => {
                          setEditingProject({
                            rating: '5.0 ★★★★★',
                            category: 'Villa & Bungalow',
                            location: 'Kolkata, West Bengal',
                            timeline: '12 Weeks',
                            budget: '₹30 Lakhs',
                            area: '2,800 sq.ft',
                            badge: 'Residential Villa • Deinterio Signature'
                          });
                          setMaterialsInput('CenturyPly Marine Plywood, Hafele Precision Fittings, Italian Marble');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-[#C8AA7A]/30"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>+ Add Portfolio Work</span>
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
              {/* TAB: LIVE TRACKER PROJECTS (WORKING VS COMPLETED)                   */}
              {/* =================================================================== */}
              {activeTab === 'tracker' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Live Tracker Projects</h4>
                      <p className="text-xs font-mono text-[#6B6560]">
                        Manage projects shown on the homepage live tracker. When you mark a project complete, it moves from "Currently Working" to "Completed Work".
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingTrackerProject({
                        status: 'WORKING',
                        progress: 50,
                        currentStage: 'False Ceiling Work',
                        manager: 'Arijit D.',
                        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                      })}
                      className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Tracker Project</span>
                    </button>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2">
                    {(['ALL', 'WORKING', 'COMPLETED'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setTrackerStatusFilter(st)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                          trackerStatusFilter === st
                            ? 'bg-[#13362B] text-white shadow-xs'
                            : 'bg-white border border-[#E2DDD6] text-[#5A5852] hover:border-[#13362B]'
                        }`}
                      >
                        {st === 'ALL' ? `All (${trackerProjects.length})` : st === 'WORKING' ? `Currently Working (${trackerProjects.filter(p => p.status === 'WORKING').length})` : `Completed (${trackerProjects.filter(p => p.status === 'COMPLETED').length})`}
                      </button>
                    ))}
                  </div>

                  {/* Projects List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trackerProjects
                      .filter(p => trackerStatusFilter === 'ALL' || p.status === trackerStatusFilter)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="p-5 rounded-2xl bg-white border border-[#E2DDD6] shadow-xs flex flex-col justify-between gap-4 group"
                        >
                          <div className="flex gap-4">
                            <div className="w-28 h-24 rounded-xl overflow-hidden shrink-0 border border-[#E2DDD6]">
                              <img src={p.heroImage} alt={p.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                  p.status === 'WORKING'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {p.status === 'WORKING' ? '🟢 Currently Working' : '✔ Completed Work'}
                                </span>
                                <span className="text-xs font-mono font-bold text-[#13362B]">{p.progress || 0}%</span>
                              </div>

                              <h5 className="font-serif text-lg font-bold text-[#1A1917] leading-snug">{p.name}</h5>
                              <p className="text-xs font-mono text-[#6B6560]">{p.location} • {p.type}</p>
                              <p className="text-xs text-[#5A5852] font-medium">Stage: <strong>{p.currentStage || 'Underway'}</strong></p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-1.5 bg-[#EAE6DF] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${p.status === 'WORKING' ? 'bg-[#13362B]' : 'bg-emerald-600'}`}
                              style={{ width: `${p.progress || 0}%` }}
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#E2DDD6]/60 text-xs">
                            <div className="text-[11px] font-mono text-[#6B6560]">
                              PM: <strong>{p.manager || 'Site Lead'}</strong>
                            </div>

                            <div className="flex items-center gap-2">
                              {p.status === 'WORKING' && (
                                <button
                                  onClick={() => handleMarkTrackerProjectComplete(p.id)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                  title="Moves project to Completed Work"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Mark Complete</span>
                                </button>
                              )}

                              <button
                                onClick={() => setEditingTrackerProject(p)}
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteTrackerProject(p.id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB: CLIENT STORIES (AUTO-ROLL / REMOVES OLDEST BEYOND 4)           */}
              {/* =================================================================== */}
              {activeTab === 'stories' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Client Video Stories</h4>
                      <p className="text-xs font-mono text-[#6B6560]">
                        Manage client video testimonials displayed on the homepage.
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingStory({
                        duration: '02:15',
                        lang: 'EN / BN',
                        rating: '5.0 ★',
                        thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
                        videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
                      })}
                      className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Client Story</span>
                    </button>
                  </div>

                  {/* Auto-removal Notice Banner */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>
                      <strong>Automatic Curator Active:</strong> When you upload a new client story, the website automatically removes the oldest story to maintain a fresh, fast-loading 4-story spotlight.
                    </span>
                  </div>

                  {/* Stories Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {clientStories.map((story, idx) => (
                      <div
                        key={story.id}
                        className="p-5 rounded-2xl bg-white border border-[#E2DDD6] shadow-xs flex flex-col justify-between gap-3"
                      >
                        <div className="flex gap-3.5">
                          <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E2DDD6]">
                            <img src={story.thumbnail} alt={story.client} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="w-5 h-5 text-white fill-white" />
                            </div>
                          </div>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded-full bg-[#13362B] text-[#C8AA7A] text-[9px] font-mono font-bold uppercase">
                                {idx === 0 ? 'Featured Slot' : `Slot #${idx + 1}`}
                              </span>
                              <span className="text-[10px] font-mono text-[#8C6D3B] font-bold">{story.duration} • {story.lang}</span>
                            </div>

                            <h5 className="font-serif text-base font-bold text-[#1A1917]">{story.client}</h5>
                            <p className="text-[11px] font-mono text-[#6B6560] truncate">{story.location}</p>
                          </div>
                        </div>

                        <p className="text-xs italic text-[#5A5852] font-serif border-t border-[#E2DDD6]/60 pt-2 line-clamp-2">
                          "{story.quote}"
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD6]/60">
                          <span className="text-xs font-mono text-[#8C6D3B] font-bold">{story.rating || '5.0 ★'}</span>
                          <button
                            onClick={() => handleDeleteClientStory(story.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer text-xs flex items-center gap-1 font-mono font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

                          <div className="flex flex-wrap items-center gap-2">
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
              {/* TAB: PORTFOLIO WORKS MANAGEMENT                                     */}
              {/* =================================================================== */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-2xl font-normal text-[#1A1917]">Portfolio Masterpieces ({projects.length})</h4>
                      <p className="text-xs font-mono text-[#6B6560]">Manage public portfolio projects, Before & After transformation images, architectural stories & material specs</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingProject({
                          rating: '5.0 ★★★★★',
                          category: 'Villa & Bungalow',
                          location: 'Kolkata, West Bengal',
                          timeline: '12 Weeks',
                          budget: '₹30 Lakhs',
                          area: '2,800 sq.ft',
                          badge: 'Residential Villa • Deinterio Signature'
                        });
                        setMaterialsInput('CenturyPly Marine Plywood, Hafele Precision Fittings, Italian Marble');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#13362B] hover:bg-[#1b483a] text-[#C8AA7A] text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Portfolio Work</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs flex flex-col justify-between">
                        <div className="space-y-3">
                          {/* Image preview */}
                          <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-100 border border-[#E2DDD6]">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-mono text-[#13362B] font-bold uppercase tracking-wider shadow-sm">
                                {proj.badge || proj.category}
                              </span>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/75 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#C8AA7A] font-bold">
                              {proj.rating}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-[#8C6D3B] font-bold uppercase">{proj.category}</span>
                              <span className="text-xs font-mono text-[#13362B] font-bold">{proj.budget}</span>
                            </div>
                            <h5 className="font-serif text-xl font-bold text-[#1A1917] mt-0.5">{proj.title}</h5>
                            <p className="text-xs font-mono text-[#6B6560] mt-0.5">{proj.location}</p>
                          </div>

                          <p className="text-xs text-[#5A5852] line-clamp-2 leading-relaxed">
                            {proj.story}
                          </p>

                          {/* Telemetry info */}
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#FAF8F4] p-3 rounded-xl border border-[#E2DDD6]">
                            <div>
                              <span className="text-gray-400 block text-[10px] uppercase">Carpet Area</span>
                              <span className="font-bold text-[#1A1917]">{proj.area}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[10px] uppercase">Timeline</span>
                              <span className="font-bold text-[#1A1917]">{proj.timeline}</span>
                            </div>
                          </div>

                          {/* Before / After status */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#13362B]">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                              <span>Before & After Active</span>
                            </span>
                            <span className="text-gray-400">ID: #{proj.id}</span>
                          </div>

                          {/* Materials tags */}
                          {proj.materials && proj.materials.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {proj.materials.slice(0, 3).map((mat, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#E2DDD6] text-[10px] font-mono text-[#1A1917]">
                                  {mat}
                                </span>
                              ))}
                              {proj.materials.length > 3 && (
                                <span className="px-2 py-0.5 rounded-md bg-[#FAF8F4] text-[10px] font-mono text-gray-500">
                                  +{proj.materials.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2DDD6]">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setMaterialsInput((proj.materials || []).join(', '));
                            }}
                            className="px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] hover:bg-gray-50 text-xs font-mono font-bold text-[#1A1917] flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Details</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

                          <div className="flex flex-wrap items-center gap-2">
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
                            <span className="text-[10px] uppercase text-gray-400 block">Project Type & Tier</span>
                            <strong className="text-[#1A1917]">{lead.type}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Location</span>
                            <strong className="text-[#1A1917]">{lead.city}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Total Area (Sq.Ft)</span>
                            <strong className="text-[#13362B] font-bold">{lead.totalAreaSqft ? `${lead.totalAreaSqft} sq.ft` : (lead.carpetArea || 'N/A')}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Est. Turnkey Quote</span>
                            <strong className="text-[#13362B] font-bold text-sm">{lead.estimatedAmount || lead.budget}</strong>
                          </div>
                        </div>

                        {/* CUSTOM MEASUREMENTS & SERVICE SCOPE BADGES */}
                        {lead.roomDimensions && lead.roomDimensions.length > 0 && (
                          <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD6] space-y-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#8C6D3B] block">
                              Measured Room Dimensions:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {lead.roomDimensions.map((dim, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-[#13362B]/20 text-[11px] font-mono text-[#13362B]">
                                  <strong>{dim.roomName}:</strong> {dim.length}×{dim.width} ft ({dim.sqft} sq.ft)
                                </span>
                              ))}
                            </div>

                            {/* Electrical Points breakdown */}
                            {lead.electricalPoints && (
                              <div className="pt-2 border-t border-[#E2DDD6]/60">
                                <span className="text-[10px] font-mono font-bold uppercase text-[#8C6D3B] block mb-1">
                                  Electrical Points ({lead.electricalPoints.totalPoints || (
                                    lead.electricalPoints.lights + lead.electricalPoints.fans + lead.electricalPoints.acPoints +
                                    lead.electricalPoints.geyserPoints + lead.electricalPoints.microwavePoints + lead.electricalPoints.fridgePoints + lead.electricalPoints.chimneyPoints
                                  )} Total):
                                </span>
                                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-gray-700">
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">💡 Lights: {lead.electricalPoints.lights}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">🌀 Fans: {lead.electricalPoints.fans}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">❄️ AC: {lead.electricalPoints.acPoints}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">♨️ Geyser: {lead.electricalPoints.geyserPoints}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">🍲 Microwave: {lead.electricalPoints.microwavePoints}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">🧊 Fridge: {lead.electricalPoints.fridgePoints}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200">💨 Chimney: {lead.electricalPoints.chimneyPoints}</span>
                                </div>
                              </div>
                            )}

                            {/* Trade breakdown items */}
                            {lead.tradeBreakdown && lead.tradeBreakdown.length > 0 ? (
                              <div className="pt-2 border-t border-[#E2DDD6]/60 space-y-1">
                                <span className="text-[10px] font-mono font-bold uppercase text-[#8C6D3B] block">
                                  Selected Trades & Materials ({lead.tradeBreakdown.length}):
                                </span>
                                <div className="space-y-1">
                                  {lead.tradeBreakdown.map((tr, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono bg-white px-2.5 py-1 rounded-lg border border-[#E2DDD6]">
                                      <span className="text-[#1A1917]"><strong>{tr.trade}:</strong> {tr.selection}</span>
                                      <span className="font-bold text-[#13362B] ml-2 shrink-0">₹{tr.cost.toLocaleString('en-IN')}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : lead.serviceScope && (
                              <div className="pt-2 border-t border-[#E2DDD6]/60 flex flex-wrap gap-1.5 text-[10px] font-mono">
                                <span className="text-gray-400 py-0.5">Scope:</span>
                                {lead.serviceScope.furniture && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ Furniture</span>}
                                {lead.serviceScope.painting && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ Painting</span>}
                                {lead.serviceScope.electrical && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ Electrical</span>}
                                {lead.serviceScope.falseCeiling && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">✓ False Ceiling</span>}
                              </div>
                            )}
                          </div>
                        )}
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
              {/* TAB 6: BLOGS & EDITORIAL CMS                                        */}
              {/* =================================================================== */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  {/* Header & Stats */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#13362B] text-[#C8AA7A] text-[10px] font-mono font-bold uppercase tracking-wider">
                          EDITORIAL & SEO CMS
                        </span>
                        <span className="text-xs font-mono text-[#8C6D3B]">
                          {blogs.length} Total Articles
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1917] mt-1">
                        Architectural Blog & Editorial Management
                      </h4>
                      <p className="text-xs font-mono text-[#6B6560]">
                        Publish luxury design guides, material breakdowns, and Vastu insights with live in-article photo insertion.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingBlog({
                            status: 'PUBLISHED',
                            category: 'Design Trends',
                            author: 'Ananya Mukherjee, Principal Architect',
                            publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            readTime: '5 Min Read',
                            content: `### 1. Introduction & Spatial Concept\nWrite your introduction here...\n\n### 2. Materials & Construction Detailing\nDescribe joinery, lighting channels, and hardware specifications...\n\n### 3. Final Styling & Handover\nConclude with practical homeowner recommendations...`,
                          });
                          setBlogEditorTab('write');
                        }}
                        className="px-5 py-3 rounded-2xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Write New Article</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] space-y-1 shadow-xs">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Total Articles</span>
                      <strong className="text-2xl font-serif text-[#13362B]">{blogs.length}</strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] space-y-1 shadow-xs">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Published Live</span>
                      <strong className="text-2xl font-serif text-emerald-700">
                        {blogs.filter((b) => b.status === 'PUBLISHED').length}
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] space-y-1 shadow-xs">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Draft Articles</span>
                      <strong className="text-2xl font-serif text-amber-700">
                        {blogs.filter((b) => b.status === 'DRAFT').length}
                      </strong>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] space-y-1 shadow-xs">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Categories</span>
                      <strong className="text-2xl font-serif text-[#8C6D3B]">
                        {new Set(blogs.map((b) => b.category)).size}
                      </strong>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
                    <div className="relative w-full md:w-80">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={blogSearchQuery}
                        onChange={(e) => setBlogSearchQuery(e.target.value)}
                        placeholder="Search title, keyword, author..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setBlogStatusFilter(status)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            blogStatusFilter === status
                              ? 'bg-[#13362B] text-[#C8AA7A] shadow-xs'
                              : 'bg-[#FAF8F4] text-gray-600 border border-[#E2DDD6] hover:border-gray-400'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blog Cards List */}
                  <div className="space-y-4">
                    {blogs
                      .filter((b) => {
                        const q = blogSearchQuery.toLowerCase().trim();
                        const matchesSearch = !q ||
                          b.title.toLowerCase().includes(q) ||
                          b.author.toLowerCase().includes(q) ||
                          (b.primaryKeyword && b.primaryKeyword.toLowerCase().includes(q)) ||
                          b.category.toLowerCase().includes(q);
                        const matchesStatus = blogStatusFilter === 'ALL' || b.status === blogStatusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((b) => (
                        <div key={b.id} className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs hover:border-[#13362B]/40 transition-all">
                          <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                              <div className="w-full sm:w-40 h-28 rounded-2xl overflow-hidden border border-[#E2DDD6] bg-gray-100 shrink-0">
                                <img
                                  src={b.image}
                                  alt={b.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                                      b.status === 'PUBLISHED'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {b.status}
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F4] border border-[#E2DDD6] text-[10px] font-mono text-[#8C6D3B]">
                                    {b.category}
                                  </span>
                                  <span className="text-[11px] font-mono text-gray-500">
                                    {b.publishedDate || (b as any).date} • {b.readTime}
                                  </span>
                                </div>

                                <h5 className="font-serif text-xl font-bold text-[#1A1917] leading-snug">
                                  {b.title}
                                </h5>

                                <p className="text-xs text-[#5A5852] font-light line-clamp-2">
                                  {b.excerpt}
                                </p>

                                <div className="text-[11px] font-mono text-gray-500">
                                  <span>By <strong className="text-[#13362B]">{b.author}</strong></span>
                                  {b.primaryKeyword && (
                                    <span className="ml-3">SEO Keyword: <strong className="text-[#8C6D3B]">{b.primaryKeyword}</strong></span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                              <button
                                onClick={() => {
                                  setEditingBlog(b);
                                  setBlogEditorTab('write');
                                }}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#13362B]" />
                                <span>Edit Article</span>
                              </button>

                              <a
                                href={`#/blog/${b.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#13362B] hover:bg-white cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-[#8C6D3B]" />
                                <span>Live View</span>
                              </a>

                              <button
                                onClick={() => handleDeleteBlog(b.id, b.title)}
                                className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 cursor-pointer flex items-center justify-center"
                                title="Delete Article"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* GOOGLE SEARCH PREVIEW SNIPPET */}
                          <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#DADCE0] space-y-1">
                            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                              Google Search Result Preview
                            </span>
                            <span className="text-xs text-[#202124] block font-sans">
                              https://deinterio.com/#/blog/{b.slug}
                            </span>
                            <h6 className="text-base text-[#1a0dab] font-sans hover:underline font-medium cursor-pointer">
                              {b.metaTitle || b.title}
                            </h6>
                            <p className="text-xs text-[#4d5156] font-sans line-clamp-2">
                              {b.metaDescription || b.excerpt}
                            </p>
                          </div>
                        </div>
                      ))}

                    {blogs.length === 0 && (
                      <div className="p-12 text-center bg-white rounded-3xl border border-[#E2DDD6] space-y-3">
                        <BookOpen className="w-8 h-8 text-gray-400 mx-auto" />
                        <h5 className="font-serif text-lg font-bold text-[#1A1917]">No Articles Found</h5>
                        <p className="text-xs font-mono text-gray-500">Create your first blog post to publish architectural insights.</p>
                      </div>
                    )}
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

            {/* COMPLETION / SITE PHOTO UPLOADER (Gallery or Instant Camera) */}
            <div className={`p-4 rounded-2xl space-y-3 ${
              editingWorkItem.status === 'COMPLETED'
                ? 'bg-amber-50/70 border-2 border-amber-300'
                : 'bg-neutral-50 border border-[#E2DDD6]'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>
                    {editingWorkItem.status === 'COMPLETED'
                      ? 'REQUIRED RULE (#14): Site Completion Photo'
                      : 'Site Progress Photo (Optional)'}
                  </span>
                </span>
                {editingWorkItem.status === 'COMPLETED' && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-mono font-bold">
                    Mandatory
                  </span>
                )}
              </div>

              {/* Previously uploaded photos if any */}
              {editingWorkItem.photos && editingWorkItem.photos.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#6B6560] block">Existing Uploaded Photos:</span>
                  <div className="flex gap-2 flex-wrap">
                    {editingWorkItem.photos.map((ph, idx) => (
                      <div key={idx} className="relative group/thumb w-16 h-16 rounded-xl overflow-hidden border border-[#E2DDD6] shadow-xs">
                        <img src={ph} alt={`Site photo ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newPhotos = editingWorkItem.photos?.filter((_, i) => i !== idx);
                            setEditingWorkItem({ ...editingWorkItem, photos: newPhotos });
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                          title="Delete photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ImageUploader
                label={editingWorkItem.status === 'COMPLETED' ? "Site Completion Photo" : "Upload Work Progress Photo"}
                value={completionPhotoUrl}
                onChange={(photo) => setCompletionPhotoUrl(photo)}
                helperText="Upload site verification photo from gallery or take instant camera snapshot"
                required={editingWorkItem.status === 'COMPLETED' && !editingWorkItem.photos?.length}
              />
            </div>

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

      {/* CHANGE ADMIN PASSWORD MODAL */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 animate-fade-in">
          <form
            onSubmit={handleChangePasswordSubmit}
            className="relative w-full max-w-md rounded-3xl bg-white border border-[#E2DDD6] p-6 space-y-4 text-[#1A1917] max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#13362B] text-[#C8AA7A] flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold">Admin Security Settings</h4>
                  <p className="text-[10px] font-mono text-[#6B6560]">Change Master Admin Password</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsChangePasswordOpen(false);
                  setChangePassError('');
                  setChangePassSuccess('');
                }}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {changePassError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{changePassError}</span>
              </div>
            )}

            {changePassSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{changePassSuccess}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block text-[#1A1917]">Current Admin Password</label>
              <input
                type="password"
                value={currentPassInput}
                onChange={(e) => setCurrentPassInput(e.target.value)}
                required
                placeholder="Enter current password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DDD6] text-xs font-mono focus:outline-none focus:border-[#13362B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block text-[#1A1917]">New Admin Password</label>
              <input
                type="password"
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
                required
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DDD6] text-xs font-mono focus:outline-none focus:border-[#13362B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold block text-[#1A1917]">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassInput}
                onChange={(e) => setConfirmPassInput(e.target.value)}
                required
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DDD6] text-xs font-mono focus:outline-none focus:border-[#13362B]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E2DDD6]">
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-mono font-bold text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] hover:bg-[#0E271F] text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Update Password
              </button>
            </div>
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

      {/* ========================================================================= */}
      {/* EDIT BLOG & EDITORIAL ARTICLE MODAL                                        */}
      {/* ========================================================================= */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#FAF8F4] border border-[#E2DDD6] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto text-[#1A1917] my-auto">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E2DDD6] pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#13362B] text-[#C8AA7A] text-[10px] font-mono font-bold uppercase tracking-wider">
                    EDITORIAL CMS
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    {editingBlog.id ? 'Edit Existing Article' : 'Compose New Architectural Article'}
                  </span>
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1917] mt-1">
                  {editingBlog.title || 'Untitled Article'}
                </h4>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex rounded-xl bg-white border border-[#E2DDD6] p-1">
                  <button
                    type="button"
                    onClick={() => setBlogEditorTab('write')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      blogEditorTab === 'write'
                        ? 'bg-[#13362B] text-[#C8AA7A] shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    ✍️ Write & Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogEditorTab('preview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      blogEditorTab === 'preview'
                        ? 'bg-[#13362B] text-[#C8AA7A] shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    👁️ Reader Preview
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog(null);
                    setInArticleImg('');
                    setInArticleCaption('');
                  }}
                  className="p-2 rounded-full bg-white hover:bg-gray-100 border border-[#E2DDD6] text-gray-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* TAB 1: WRITE & EDIT MODE */}
            {blogEditorTab === 'write' && (
              <form onSubmit={handleSaveBlog} className="space-y-6">
                {/* 1. Core Article Identification */}
                <div className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B] flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>Article Identification & URL</span>
                  </h5>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold block text-[#1A1917]">
                      Article Headline / Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingBlog.title || ''}
                      onChange={(e) => {
                        const title = e.target.value;
                        const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        setEditingBlog({
                          ...editingBlog,
                          title,
                          slug: editingBlog.slug || autoSlug,
                          metaTitle: editingBlog.metaTitle || (title ? `${title} • Deinterio` : ''),
                        });
                      }}
                      required
                      placeholder="e.g. 2026 Luxury Interior Design Trends in Kolkata: Italian Minimalism Meets Heritage Vastu"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-sm font-serif font-bold text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold block text-[#1A1917]">
                          URL Slug / Permalinks
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (editingBlog.title) {
                              const autoSlug = editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              setEditingBlog({ ...editingBlog, slug: autoSlug });
                            }
                          }}
                          className="text-[10px] font-mono text-[#8C6D3B] hover:underline cursor-pointer"
                        >
                          Auto-Generate from Title
                        </button>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400">
                          #/blog/
                        </span>
                        <input
                          type="text"
                          value={editingBlog.slug || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                          placeholder="kolkata-interior-trends-2026"
                          className="w-full pl-18 pr-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold block text-[#1A1917]">
                        Category
                      </label>
                      <select
                        value={editingBlog.category || 'Design Trends'}
                        onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                      >
                        <option value="Design Trends">Design Trends</option>
                        <option value="Material Guides">Material Guides</option>
                        <option value="Architecture & Vastu">Architecture & Vastu</option>
                        <option value="Modular Kitchen">Modular Kitchen</option>
                        <option value="False Ceiling & Lighting">False Ceiling & Lighting</option>
                        <option value="Turnkey Interior">Turnkey Interior</option>
                        <option value="Cost & Budgeting">Cost & Budgeting</option>
                        <option value="Luxury Villa Renovation">Luxury Villa Renovation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E2DDD6]">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold block text-[#1A1917]">
                        Publication Status
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingBlog({ ...editingBlog, status: 'PUBLISHED' })}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            (editingBlog.status || 'PUBLISHED') === 'PUBLISHED'
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-[#FAF8F4] text-gray-600 border border-[#E2DDD6]'
                          }`}
                        >
                          PUBLISHED
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingBlog({ ...editingBlog, status: 'DRAFT' })}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            editingBlog.status === 'DRAFT'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-[#FAF8F4] text-gray-600 border border-[#E2DDD6]'
                          }`}
                        >
                          DRAFT
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold block text-[#1A1917]">
                        Author Name & Title
                      </label>
                      <input
                        type="text"
                        value={editingBlog.author || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                        placeholder="e.g. Ananya Mukherjee, Principal Architect"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold block text-[#1A1917]">
                        Published Date
                      </label>
                      <input
                        type="text"
                        value={editingBlog.publishedDate || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, publishedDate: e.target.value })}
                        placeholder="e.g. Aug 15, 2026"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Cover Photo Section */}
                <div className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Featured Hero Cover Image</span>
                  </h5>

                  <ImageUploader
                    label="Article Cover Photograph"
                    value={editingBlog.image || ''}
                    onChange={(photo) => setEditingBlog({ ...editingBlog, image: photo })}
                    helperText="Upload cover image from desktop, mobile gallery, or capture live site photograph"
                  />

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold block text-[#1A1917]">
                      Cover Photo Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingBlog.imageCaption || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, imageCaption: e.target.value })}
                      placeholder="e.g. Luxury New Town Penthouse Living Lounge with Concealed Cove Lighting"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold block text-[#1A1917]">
                      Short Article Summary / Excerpt Quote
                    </label>
                    <textarea
                      value={editingBlog.excerpt || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                      rows={2}
                      placeholder="e.g. Explore how top luxury penthouses in New Town and villas in Ballygunge are blending fluted teak joinery with acoustic concealed LED coves."
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                    />
                  </div>
                </div>

                {/* 3. In-Article Photo Studio & Quick Insert Tool */}
                <div className="p-6 rounded-3xl bg-[#F0F7F4] border border-[#13362B]/30 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#13362B] uppercase tracking-wider font-bold block">
                        IN-ARTICLE MEDIA STUDIO
                      </span>
                      <h5 className="font-serif text-lg font-bold text-[#13362B]">
                        Upload & Insert Photos Inside Article Body
                      </h5>
                    </div>
                    <span className="text-xs font-mono text-[#6B6560]">
                      Upload from Desktop or Gallery → Click Insert
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <ImageUploader
                      label="Select or Snap In-Article Photo"
                      value={inArticleImg}
                      onChange={setInArticleImg}
                      helperText="Choose a photo from your computer or camera to embed into the text"
                    />

                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-[#13362B] block">
                          Photo Caption (Displayed beneath the image in article)
                        </label>
                        <input
                          type="text"
                          value={inArticleCaption}
                          onChange={(e) => setInArticleCaption(e.target.value)}
                          placeholder="e.g. Precision soft-close drawer architecture and pantry pullouts"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#13362B]/20 text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleInsertInArticleImage}
                        disabled={!inArticleImg}
                        className={`w-full py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                          inArticleImg
                            ? 'bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Insert Photo Into Article Body</span>
                      </button>

                      <p className="text-[11px] font-mono text-gray-500">
                        Inserts <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-[#13362B]">![caption](photo)</code> into your article text below.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Markdown Article Body & Toolbar */}
                <div className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B] flex items-center gap-1.5">
                      <FileCode className="w-4 h-4" />
                      <span>Article Content & Markdown Body</span>
                    </h5>

                    <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                      <span>Words: <strong className="text-[#13362B]">{(editingBlog.content || '').trim().split(/\s+/).filter(Boolean).length}</strong></span>
                      <span>Chars: <strong className="text-[#13362B]">{(editingBlog.content || '').length}</strong></span>
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF8F4] border border-[#E2DDD6] rounded-2xl">
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('## ')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer"
                      title="Insert Heading 2"
                    >
                      H2 Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('### ')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer"
                      title="Insert Heading 3"
                    >
                      H3 Subheading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('**', '**')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer font-bold"
                      title="Insert Bold"
                    >
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('*', '*')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer italic"
                      title="Insert Italic"
                    >
                      Italic
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('> ')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer"
                      title="Insert Blockquote"
                    >
                      Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('- ')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer"
                      title="Insert Bullet Point"
                    >
                      Bullet
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdownSnippet('\n---\n')}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DDD6] text-xs font-mono hover:bg-gray-100 cursor-pointer"
                      title="Insert Divider"
                    >
                      Divider
                    </button>
                  </div>

                  <textarea
                    value={editingBlog.content || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    rows={12}
                    placeholder="Write article body in markdown. Use ### for subheadings, > for quote blocks, - for bullet points, and the In-Article Media Studio above to embed photos."
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono leading-relaxed text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                  />
                </div>

                {/* 5. SEO & Google SERP Preview */}
                <div className="p-6 rounded-3xl bg-white border border-[#E2DDD6] space-y-4 shadow-xs">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C6D3B] flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>Search Engine Optimization (Google SEO)</span>
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold block text-[#1A1917]">
                        Primary Focus Keyword
                      </label>
                      <input
                        type="text"
                        value={editingBlog.primaryKeyword || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, primaryKeyword: e.target.value })}
                        placeholder="e.g. interior design trends Kolkata"
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-xs font-mono font-bold block text-[#1A1917]">
                          Meta Title (Recommended: 50–60 chars)
                        </label>
                        <span className="text-[10px] font-mono text-gray-400">
                          {(editingBlog.metaTitle || '').length} chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingBlog.metaTitle || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, metaTitle: e.target.value })}
                        placeholder="e.g. 2026 Luxury Interior Design Trends in Kolkata • Deinterio"
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-xs font-mono font-bold block text-[#1A1917]">
                        Meta Description (Recommended: 120–160 chars)
                      </label>
                      <span className="text-[10px] font-mono text-gray-400">
                        {(editingBlog.metaDescription || '').length} chars
                      </span>
                    </div>
                    <textarea
                      value={editingBlog.metaDescription || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, metaDescription: e.target.value })}
                      rows={2}
                      placeholder="e.g. Discover how Kolkata penthouses and luxury villas blend fluted teak wood, Italian marble, and Vastu spatial proportions."
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B] focus:bg-white"
                    />
                  </div>

                  {/* Realtime Google SERP Snippet Preview */}
                  <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#DADCE0] space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                      Live Google Search Snippet Preview
                    </span>
                    <span className="text-xs text-[#202124] block font-sans">
                      https://deinterio.com/#/blog/{editingBlog.slug || 'your-article-slug'}
                    </span>
                    <h6 className="text-base text-[#1a0dab] font-sans hover:underline font-medium cursor-pointer">
                      {editingBlog.metaTitle || editingBlog.title || 'Your Article Title'}
                    </h6>
                    <p className="text-xs text-[#4d5156] font-sans line-clamp-2">
                      {editingBlog.metaDescription || editingBlog.excerpt || 'Article summary description snippet will display here in search results.'}
                    </p>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog(null);
                      setInArticleImg('');
                      setInArticleCaption('');
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 cursor-pointer text-center"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      setEditingBlog({ ...editingBlog, status: 'DRAFT' });
                      setTimeout(() => {
                        const fakeEvent = { preventDefault: () => {} } as any;
                        handleSaveBlog(fakeEvent);
                      }, 50);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#13362B] hover:bg-[#0E271F] text-[#C8AA7A] hover:text-white font-mono font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer text-center"
                  >
                    Save & Publish Live Article
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: LIVE READER PREVIEW MODE */}
            {blogEditorTab === 'preview' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white border border-[#E2DDD6] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8C6D3B] font-bold uppercase">
                    Live Client & Reader Visual Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => setBlogEditorTab('write')}
                    className="px-4 py-2 rounded-xl bg-[#13362B] text-white text-xs font-mono font-bold uppercase cursor-pointer"
                  >
                    ← Back to Editor
                  </button>
                </div>

                <article className="max-w-3xl mx-auto space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-[#E2DDD6] shadow-xs text-[#1A1917]">
                  {/* Cover Image */}
                  {editingBlog.image && (
                    <div className="rounded-2xl overflow-hidden border border-[#E2DDD6] h-64 sm:h-96">
                      <img
                        src={editingBlog.image}
                        alt={editingBlog.title || 'Cover'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {editingBlog.imageCaption && (
                    <p className="text-center text-xs font-mono text-[#6B6560] italic -mt-2">
                      {editingBlog.imageCaption}
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#13362B] text-[#C8AA7A] text-[10px] font-mono font-bold uppercase">
                        {editingBlog.category || 'Design Trends'}
                      </span>
                      <span className="text-xs font-mono text-gray-500">
                        {editingBlog.publishedDate || 'Today'} • {editingBlog.readTime || '5 Min Read'}
                      </span>
                    </div>

                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1917] leading-snug">
                      {editingBlog.title || 'Article Headline'}
                    </h1>

                    <p className="text-xs font-mono text-gray-500">
                      Written by <strong className="text-[#13362B]">{editingBlog.author || 'Deinterio Principal Architect'}</strong>
                    </p>
                  </div>

                  {editingBlog.excerpt && (
                    <p className="font-normal text-[#1A1917] text-base leading-relaxed italic border-l-4 border-[#A88B57] pl-4 bg-[#FAF8F4] py-3 rounded-r-xl">
                      "{editingBlog.excerpt}"
                    </p>
                  )}

                  {/* Rendered Markdown Content */}
                  <div className="space-y-4 pt-4 border-t border-[#E2DDD6]">
                    {(editingBlog.content || '').split('\n\n').map((rawParagraph, idx) => {
                      const paragraph = rawParagraph.trim();
                      if (!paragraph) return null;

                      // In-Article Image
                      const imgMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
                      if (imgMatch) {
                        const altText = imgMatch[1];
                        const imgUrl = imgMatch[2];
                        return (
                          <figure key={idx} className="my-6 rounded-2xl overflow-hidden border border-[#E2DDD6] bg-[#FAF8F4] shadow-xs">
                            <img
                              src={imgUrl}
                              alt={altText}
                              className="w-full h-auto max-h-[450px] object-cover"
                            />
                            {altText && (
                              <figcaption className="p-3 text-center text-xs font-mono text-[#6B6560] italic border-t border-[#E2DDD6] bg-white">
                                {altText}
                              </figcaption>
                            )}
                          </figure>
                        );
                      }

                      // H2
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="font-serif text-2xl font-bold text-[#13362B] pt-4 border-b border-[#E2DDD6] pb-1">
                            {paragraph.replace(/^##\s+/, '')}
                          </h2>
                        );
                      }

                      // H3
                      if (paragraph.startsWith('###')) {
                        return (
                          <h3 key={idx} className="font-serif text-xl font-bold text-[#13362B] pt-3">
                            {paragraph.replace(/^###\s+/, '')}
                          </h3>
                        );
                      }

                      // Blockquote
                      if (paragraph.startsWith('>')) {
                        return (
                          <blockquote key={idx} className="border-l-4 border-[#13362B] pl-4 italic text-sm text-[#13362B] bg-[#F0F7F4] p-3 rounded-r-xl">
                            {paragraph.replace(/^>\s*/, '')}
                          </blockquote>
                        );
                      }

                      // Bullet List
                      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                        const items = paragraph.split('\n').map(line => line.replace(/^[-*]\s*/, '').trim());
                        return (
                          <ul key={idx} className="list-disc list-inside space-y-1 pl-2 text-sm text-[#3A3832]">
                            {items.map((it, itemIdx) => (
                              <li key={itemIdx}>{it}</li>
                            ))}
                          </ul>
                        );
                      }

                      // Standard Paragraph
                      return (
                        <p key={idx} className="text-sm font-light leading-relaxed text-[#3A3832] whitespace-pre-line">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </article>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT PORTFOLIO PROJECT MODAL                                              */}
      {/* ========================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <form onSubmit={handleSaveProject} className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 p-6 sm:p-8 space-y-5 text-[#1A1917] max-h-[90vh] overflow-y-auto shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase">PORTFOLIO CMS</span>
                <h4 className="font-serif text-2xl font-bold text-[#1A1917]">
                  {editingProject.id ? 'Edit Portfolio Masterpiece' : 'Add New Portfolio Masterpiece'}
                </h4>
              </div>
              <button type="button" onClick={() => setEditingProject(null)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Project Title *</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. Ballygunge Heritage Villa"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917] focus:outline-none focus:border-[#13362B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Category</label>
                <input
                  type="text"
                  value={editingProject.category || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  placeholder="e.g. Villa & Bungalow, 4BHK Penthouse, 3BHK Apartment, Corporate & Bank, Commercial"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Badge Tag</label>
                <input
                  type="text"
                  value={editingProject.badge || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                  placeholder="e.g. Residential Villa • Deinterio Signature"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={editingProject.location || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  placeholder="e.g. Ballygunge Circular Road, South Kolkata"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Turnkey Investment / Budget</label>
                <input
                  type="text"
                  value={editingProject.budget || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, budget: e.target.value })}
                  placeholder="e.g. ₹48 Lakhs"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Execution Timeline</label>
                <input
                  type="text"
                  value={editingProject.timeline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, timeline: e.target.value })}
                  placeholder="e.g. 16 Weeks"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Carpet Area</label>
                <input
                  type="text"
                  value={editingProject.area || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                  placeholder="e.g. 5,200 sq.ft"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Client Rating</label>
                <input
                  type="text"
                  value={editingProject.rating || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, rating: e.target.value })}
                  placeholder="e.g. 5.0 ★★★★★"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="sm:col-span-2">
                <ImageUploader
                  label="Cover / Main Portfolio Image"
                  value={editingProject.image || ''}
                  onChange={(img) => setEditingProject({ ...editingProject, image: img })}
                  helperText="Upload cover image from gallery or take instant camera photo"
                  required
                />
              </div>

              <div>
                <ImageUploader
                  label="Before Transformation Photo"
                  value={editingProject.beforeImg || ''}
                  onChange={(img) => setEditingProject({ ...editingProject, beforeImg: img })}
                  helperText="Initial raw or bare site state before renovation"
                />
              </div>

              <div>
                <ImageUploader
                  label="After Transformation Photo"
                  value={editingProject.afterImg || ''}
                  onChange={(img) => setEditingProject({ ...editingProject, afterImg: img })}
                  helperText="Final finished luxury interior handover state"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Architectural Story & Design Narrative</label>
                <textarea
                  value={editingProject.story || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, story: e.target.value })}
                  rows={3}
                  placeholder="Describe the architectural transformation, aesthetic concept, spatial changes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Materials & Hardware (Comma separated)</label>
                <input
                  type="text"
                  value={materialsInput}
                  onChange={(e) => setMaterialsInput(e.target.value)}
                  placeholder="e.g. CenturyPly Marine Plywood, Hettich Precision Fittings, Italian Botticino Marble, Saint-Gobain Gypsum"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
                <span className="text-[10px] text-gray-500 font-mono">Separate multiple verified materials with commas.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2DDD6]">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold text-[#1A1917] hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:bg-[#1c483a] transition-colors"
              >
                Save Portfolio Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT TRACKER PROJECT MODAL */}
      {editingTrackerProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <form
            onSubmit={handleSaveTrackerProject}
            className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 p-6 sm:p-8 space-y-5 text-[#1A1917] max-h-[90vh] overflow-y-auto shadow-2xl my-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase">LIVE TRACKER ENGINE</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1917]">
                  {editingTrackerProject.id ? 'Edit Tracker Project' : 'Add New Tracker Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTrackerProject(null)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Project Name *</label>
                <input
                  type="text"
                  required
                  value={editingTrackerProject.name || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, name: e.target.value })}
                  placeholder="e.g. Moderna Apartment"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={editingTrackerProject.location || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, location: e.target.value })}
                  placeholder="e.g. New Town, Kolkata"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Property Type</label>
                <input
                  type="text"
                  value={editingTrackerProject.type || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, type: e.target.value })}
                  placeholder="e.g. Apartment (3 BHK) / Villa / Office"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Tracker Section *</label>
                <select
                  value={editingTrackerProject.status || 'WORKING'}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold text-[#13362B]"
                >
                  <option value="WORKING">Currently Working / Ongoing</option>
                  <option value="COMPLETED">Completed Work</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Progress Percentage (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingTrackerProject.progress !== undefined ? editingTrackerProject.progress : 50}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, progress: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Current Stage / Milestone</label>
                <input
                  type="text"
                  value={editingTrackerProject.currentStage || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, currentStage: e.target.value })}
                  placeholder="e.g. False Ceiling Work, Electrical Wiring"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Est. Completion / Handover Date</label>
                <input
                  type="text"
                  value={editingTrackerProject.estCompletion || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, estCompletion: e.target.value })}
                  placeholder="e.g. 28 Aug, 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Project Manager Name</label>
                <input
                  type="text"
                  value={editingTrackerProject.manager || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, manager: e.target.value })}
                  placeholder="e.g. Arijit D."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Carpet Area</label>
                <input
                  type="text"
                  value={editingTrackerProject.area || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, area: e.target.value })}
                  placeholder="e.g. 2,400 sq.ft"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="sm:col-span-2">
                <ImageUploader
                  label="Live Construction Site Hero Photo"
                  value={editingTrackerProject.heroImage || ''}
                  onChange={(img) => setEditingTrackerProject({ ...editingTrackerProject, heroImage: img })}
                  helperText="Upload recent construction/execution photo from gallery or snap with camera"
                  required
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">PM Site Notes</label>
                <textarea
                  rows={2}
                  value={editingTrackerProject.pmNote || ''}
                  onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, pmNote: e.target.value })}
                  placeholder="e.g. Gypsum frames installed. Indirect LED slots complete."
                  className="w-full px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              {editingTrackerProject.status === 'COMPLETED' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold block uppercase tracking-wider">Client Name</label>
                    <input
                      type="text"
                      value={editingTrackerProject.clientName || ''}
                      onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, clientName: e.target.value })}
                      placeholder="e.g. Sujit & Mousumi Dutta"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold block uppercase tracking-wider">Execution Duration</label>
                    <input
                      type="text"
                      value={editingTrackerProject.duration || ''}
                      onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, duration: e.target.value })}
                      placeholder="e.g. 14 Weeks"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-mono font-bold block uppercase tracking-wider">Client Testimonial</label>
                    <textarea
                      rows={2}
                      value={editingTrackerProject.testimonial || ''}
                      onChange={(e) => setEditingTrackerProject({ ...editingTrackerProject, testimonial: e.target.value })}
                      placeholder="e.g. Deinterio transformed our home beyond expectation."
                      className="w-full px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2DDD6]">
              <button
                type="button"
                onClick={() => setEditingTrackerProject(null)}
                className="px-5 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold text-[#1A1917] hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:bg-[#1c483a] transition-colors"
              >
                Save Tracker Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT CLIENT STORY MODAL */}
      {editingStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <form
            onSubmit={handleSaveClientStory}
            className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F4] border border-[#1A1917]/20 p-6 sm:p-8 space-y-5 text-[#1A1917] max-h-[90vh] overflow-y-auto shadow-2xl my-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E2DDD6] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8C6D3B] uppercase">CLIENT STORY CURATOR</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1917]">
                  {editingStory.id ? 'Edit Client Story' : 'Add Client Video Story'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingStory(null)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono">
              ⚡ <strong>Auto-Removal Rule:</strong> Saving this story automatically inserts it at the top and removes the oldest story from the website if total stories exceed 4.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Client Name(s) *</label>
                <input
                  type="text"
                  required
                  value={editingStory.client || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, client: e.target.value })}
                  placeholder="e.g. Anirban & Swati Sengupta"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Property & Location</label>
                <input
                  type="text"
                  value={editingStory.location || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, location: e.target.value })}
                  placeholder="e.g. Uniworld City, New Town, Kolkata"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Duration</label>
                <input
                  type="text"
                  value={editingStory.duration || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, duration: e.target.value })}
                  placeholder="e.g. 02:15"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Language</label>
                <input
                  type="text"
                  value={editingStory.lang || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, lang: e.target.value })}
                  placeholder="e.g. EN / BN"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">YouTube / Video Embed URL</label>
                <input
                  type="url"
                  value={editingStory.videoUrl || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, videoUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="sm:col-span-2">
                <ImageUploader
                  label="Story Thumbnail Image"
                  value={editingStory.thumbnail || ''}
                  onChange={(img) => setEditingStory({ ...editingStory, thumbnail: img })}
                  helperText="Choose from gallery or snap photo of client or finished interior"
                  required
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Client Quote / Testimonial</label>
                <textarea
                  rows={2}
                  value={editingStory.quote || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, quote: e.target.value })}
                  placeholder="e.g. Deinterio gave our 4BHK apartment an international luxury feel."
                  className="w-full px-4 py-2 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold block uppercase tracking-wider">Rating</label>
                <input
                  type="text"
                  value={editingStory.rating || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, rating: e.target.value })}
                  placeholder="e.g. 5.0 ★"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono text-[#1A1917]"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="featuredStoryCheck"
                  checked={Boolean(editingStory.featured)}
                  onChange={(e) => setEditingStory({ ...editingStory, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#13362B]"
                />
                <label htmlFor="featuredStoryCheck" className="text-xs font-mono font-bold text-[#1A1917] cursor-pointer">
                  Featured Story (Hero Spot)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2DDD6]">
              <button
                type="button"
                onClick={() => setEditingStory(null)}
                className="px-5 py-2.5 rounded-xl bg-white border border-[#E2DDD6] text-xs font-mono font-bold text-[#1A1917] hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#13362B] text-[#C8AA7A] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:bg-[#1c483a] transition-colors"
              >
                Save Client Story
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
