import React, { useState } from 'react';
import {
  FileText,
  Code2,
  BookOpen,
  Package,
  Search,
  Plus,
  Download,
  Star,
  ShieldCheck,
  Check,
  X,
  CreditCard,
  Building,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IDCardBadge } from './IDCardBadge';
import { MarketplaceItem, MarketplaceCategory } from '../types';

export const Marketplace: React.FC = () => {
  const {
    currentUser,
    marketplaceItems,
    createMarketplaceItem,
    openVerificationModal,
    showToast,
    openChatWithUser
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [selectedItemForView, setSelectedItemForView] = useState<MarketplaceItem | null>(null);

  // New Listing Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MarketplaceCategory>('notes');
  const [price, setPrice] = useState('0');
  const [courseCode, setCourseCode] = useState('');
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science');
  const [fileType, setFileType] = useState('PDF Document');

  const handleOpenSellModal = () => {
    if (!currentUser.isVerified) {
      openVerificationModal('sell');
      return;
    }
    setIsListingModalOpen(true);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const success = createMarketplaceItem({
      title: title.trim(),
      description: description.trim(),
      category,
      price: parseFloat(price) || 0,
      currency: '$',
      courseCode: courseCode.trim().toUpperCase(),
      department: department.trim(),
      fileType: fileType.trim()
    });

    if (success) {
      setIsListingModalOpen(false);
      setTitle('');
      setDescription('');
      setPrice('0');
      setCourseCode('');
    }
  };

  const handleDownloadOrBuy = (item: MarketplaceItem) => {
    if (item.price === 0) {
      showToast(`📥 Downloading "${item.title}"... Free student resource.`);
    } else {
      showToast(`💳 Payment of ${item.currency}${item.price} confirmed to ${item.seller.name}! Download unlocked.`);
    }
    setSelectedItemForView(null);
  };

  const filteredItems = marketplaceItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (priceFilter === 'free' && item.price > 0) return false;
    if (priceFilter === 'paid' && item.price === 0) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCourse = item.courseCode?.toLowerCase().includes(q);
      const matchDept = item.department.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCourse && !matchDept && !matchDesc) return false;
    }
    return true;
  });

  const getCategoryIcon = (cat: MarketplaceCategory) => {
    switch (cat) {
      case 'notes':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'projects':
        return <Code2 className="w-4 h-4 text-emerald-600" />;
      case 'textbooks':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'gear':
        return <Package className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sell CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Student Academic Marketplace</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Buy & sell handwritten lecture notes, verified project repositories & code, course textbooks, and lab gear directly with peers.
          </p>
        </div>

        <button
          onClick={handleOpenSellModal}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{currentUser.isVerified ? 'List Material / Code' : 'Verify ID to Sell'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'notes', label: 'Lecture Notes' },
            { id: 'projects', label: 'Projects & Code' },
            { id: 'textbooks', label: 'Textbooks' },
            { id: 'gear', label: 'Lab & Gear' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === tab.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Price & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-2.5 py-1 rounded-lg ${priceFilter === 'all' ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-500'}`}
            >
              All
            </button>
            <button
              onClick={() => setPriceFilter('free')}
              className={`px-2.5 py-1 rounded-lg ${priceFilter === 'free' ? 'bg-slate-100 font-semibold text-emerald-700' : 'text-slate-500'}`}
            >
              Free
            </button>
            <button
              onClick={() => setPriceFilter('paid')}
              className={`px-2.5 py-1 rounded-lg ${priceFilter === 'paid' ? 'bg-slate-100 font-semibold text-indigo-700' : 'text-slate-500'}`}
            >
              Paid
            </button>
          </div>

          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search course code (e.g. CS201)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all flex flex-col justify-between p-5 group"
          >
            <div>
              {/* Top Meta Line: Unboxed text metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <div className="flex items-center gap-1.5 font-medium">
                  {getCategoryIcon(item.category)}
                  <span className="uppercase tracking-wider text-[11px] font-semibold text-slate-700">
                    {item.courseCode || item.department}
                  </span>
                </div>
                <span className="font-mono tabular-nums text-slate-400">{item.createdAt}</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-slate-100">
              {/* Seller info */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={item.seller.avatar}
                      alt={item.seller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-800 truncate">{item.seller.name}</span>
                </div>
                <IDCardBadge status={item.seller.verificationStatus} size="sm" showLabel={false} />
              </div>

              {/* Price and Download Button */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  {item.price === 0 ? (
                    <span className="text-sm font-bold text-emerald-600">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xs text-slate-400 font-mono">{item.currency}</span>
                      <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                        {item.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400">
                    {item.downloadsCount} downloads · ★ {item.rating}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      openChatWithUser(item.seller, {
                        title: item.title,
                        type: item.category === 'notes' ? 'notes' : item.category === 'projects' ? 'project' : 'item',
                        price: item.price,
                        currency: item.currency
                      })
                    }
                    title={`Chat with seller ${item.seller.name}`}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedItemForView(item)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{item.price === 0 ? 'Get Free' : 'View & Buy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Listing Modal */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900">List Study Material or Project</h3>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS201 Midterm Complete Cheat Sheet & Solved Proofs"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as MarketplaceCategory)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="notes">Lecture Notes (PDF)</option>
                    <option value="projects">Project & Source Code (ZIP)</option>
                    <option value="textbooks">Textbook (Book)</option>
                    <option value="gear">Lab Equipment / Gear</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Price ($ USD, 0 for Free)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS 201"
                    value={courseCode}
                    onChange={e => setCourseCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">File Format / Pickup Location</label>
                <input
                  type="text"
                  placeholder="e.g. PDF Document (48 Pages) or Campus Handover"
                  value={fileType}
                  onChange={e => setFileType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Description & Topic Outline</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what topics are covered, professor name, exam coverage..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsListingModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item View / Checkout Modal */}
      {selectedItemForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block">
                  {selectedItemForView.courseCode || selectedItemForView.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedItemForView.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItemForView(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed text-slate-700">{selectedItemForView.description}</p>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">File Specification:</span>
                  <span className="font-medium text-slate-800">{selectedItemForView.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-medium text-slate-800">{selectedItemForView.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Verified Student Seller:</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-800">
                    <span>{selectedItemForView.seller.name}</span>
                    <IDCardBadge status={selectedItemForView.seller.verificationStatus} size="sm" showLabel={false} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                  {selectedItemForView.price === 0 ? (
                    <span className="text-lg font-bold text-emerald-600">Free Download</span>
                  ) : (
                    <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                      {selectedItemForView.currency}{selectedItemForView.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const item = selectedItemForView;
                      setSelectedItemForView(null);
                      openChatWithUser(item.seller, {
                        title: item.title,
                        type: item.category === 'notes' ? 'notes' : item.category === 'projects' ? 'project' : 'item',
                        price: item.price,
                        currency: item.currency
                      });
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span>Chat with Seller</span>
                  </button>

                  <button
                    onClick={() => handleDownloadOrBuy(selectedItemForView)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>{selectedItemForView.price === 0 ? 'Download File Now' : 'Complete Purchase & Download'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
