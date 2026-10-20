import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IDCardBadge } from './IDCardBadge';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    openVerificationModal,
    switchUserPreset,
    userPreset,
    totalUnreadMessages,
    collegeConfig,
    openCollegeModal
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-900 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            UniQuad
          </span>
        </div>

        {/* Zone 2: 4-5 Nav Links (Concise single-line text with active/hover states) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('feed')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'feed'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            Campus Feed
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'marketplace'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            Notes & Projects
          </button>
          <button
            onClick={() => setActiveTab('tutors')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'tutors'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            Peer Tutors
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'mentors'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Seniors & MNC Mentors</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Messages</span>
            {totalUnreadMessages > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-mono text-[9px] flex items-center justify-center font-bold">
                {totalUnreadMessages}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'verification'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            My Campus Pass
          </button>
          <button
            onClick={() => setActiveTab('moderator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'moderator'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            Registrar Desk
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action & Profile Status */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            title="Open 1-to-1 Direct Messages"
            className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 relative transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            {totalUnreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white font-mono text-[9px] flex items-center justify-center font-bold">
                {totalUnreadMessages}
              </span>
            )}
          </button>

          {!currentUser.isVerified ? (
            <button
              onClick={() => openVerificationModal('general')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verify Student ID</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-semibold">Verified Student</span>
            </div>
          )}

          {/* Quick User Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                <div className="pb-2.5 mb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900 block truncate">{currentUser.name}</span>
                  <span className="text-slate-500 text-[11px] block truncate">{currentUser.college}</span>
                  <div className="mt-1.5">
                    <IDCardBadge status={currentUser.verificationStatus} />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block px-2 py-1">
                    Demo Mode Switcher
                  </span>
                  <button
                    onClick={() => {
                      switchUserPreset('unverified');
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      userPreset === 'unverified' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Unverified Student (Alex)</span>
                    {!currentUser.isVerified && <span className="text-[10px]">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchUserPreset('verified_eliza');
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      userPreset === 'verified_eliza' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Verified Student (Eliza)</span>
                    {currentUser.isVerified && <span className="text-[10px]">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchUserPreset('moderator');
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      activeTab === 'moderator' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Registrar Desk (Admin)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-white px-2 py-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-2 py-1 rounded-md ${activeTab === 'feed' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-2 py-1 rounded-md ${activeTab === 'marketplace' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          Notes
        </button>
        <button
          onClick={() => setActiveTab('tutors')}
          className={`px-2 py-1 rounded-md ${activeTab === 'tutors' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          Tutors
        </button>
        <button
          onClick={() => setActiveTab('mentors')}
          className={`px-2 py-1 rounded-md ${activeTab === 'mentors' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          Mentors
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-2 py-1 rounded-md relative ${activeTab === 'chat' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          Chat
          {totalUnreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white font-mono text-[8px] flex items-center justify-center font-bold">
              {totalUnreadMessages}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-2 py-1 rounded-md ${activeTab === 'verification' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          ID Pass
        </button>
        <button
          onClick={() => setActiveTab('moderator')}
          className={`px-2 py-1 rounded-md ${activeTab === 'moderator' ? 'text-indigo-600 font-bold bg-indigo-50' : ''}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
