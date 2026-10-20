import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CampusFeed } from './components/CampusFeed';
import { Marketplace } from './components/Marketplace';
import { PeerTutoring } from './components/PeerTutoring';
import { VerificationCenter } from './components/VerificationCenter';
import { ModeratorQueue } from './components/ModeratorQueue';
import { DirectChat } from './components/DirectChat';
import { MentorsNetwork } from './components/MentorsNetwork';
import { IDVerificationModal } from './components/IDVerificationModal';
import { CAMPUS_BANNER_IMAGE, TOP_COLLEGES } from './data/mockData';
import {
  GraduationCap,
  ShieldCheck,
  Building,
  TrendingUp,
  FileText,
  Users,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    openVerificationModal,
    selectedCollege,
    setSelectedCollege,
    toastMessage,
    isChatDrawerOpen,
    closeChatDrawer,
    conversations,
    openChatWithUser
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Strip with Campus Quad Photography */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src={CAMPUS_BANNER_IMAGE}
            alt="University Campus Quad"
            className="w-full h-full object-cover opacity-25 filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-indigo-950/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2 text-indigo-300 text-xs font-semibold">
                <span className="flex items-center gap-1 bg-indigo-500/20 border border-indigo-400/30 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  ID-Verified Campus Network
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300 font-normal">Authentic Student Community</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Buy Notes, Share Code, Teach Peers & Connect on Campus
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                A student-powered platform where all members upload their student ID cards for verification before posting, listing lecture notes & project repositories, or offering peer tutoring.
              </p>
            </div>

            {/* Quick College Filter Selector */}
            <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shrink-0 w-full md:w-72 shadow-lg">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Filter by Campus</span>
                <Building className="w-3.5 h-3.5 text-indigo-400" />
              </label>
              <select
                value={selectedCollege}
                onChange={e => setSelectedCollege(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-800 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All Colleges">🎓 All University Campuses</option>
                {TOP_COLLEGES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div>
                  <span className="font-mono font-bold text-white text-xs block">3,420+</span>
                  <span className="text-slate-400">Students</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-white text-xs block">840+</span>
                  <span className="text-slate-400">Notes & Code</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-white text-xs block">120+</span>
                  <span className="text-slate-400">Tutors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Primary View (8 Cols on desktop) */}
          <div className="lg:col-span-8">
            {activeTab === 'feed' && <CampusFeed />}
            {activeTab === 'marketplace' && <Marketplace />}
            {activeTab === 'tutors' && <PeerTutoring />}
            {activeTab === 'mentors' && <MentorsNetwork />}
            {activeTab === 'chat' && <DirectChat />}
            {activeTab === 'verification' && <VerificationCenter />}
            {activeTab === 'moderator' && <ModeratorQueue />}
          </div>

          {/* Right Sidebar Widget Column (4 Cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Student ID Verification Card Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Your Student Credentials</h3>
                </div>
                <button
                  onClick={() => setActiveTab('verification')}
                  className="text-[11px] text-indigo-600 font-semibold hover:underline"
                >
                  View Pass
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.college}</p>
                    <span className="text-[10px] font-mono text-slate-400">Roll: {currentUser.rollNumber}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-slate-500 font-medium">Platform Status</span>
                    {currentUser.isVerified ? (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Student
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-700">Unverified (Read-only)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {currentUser.isVerified
                      ? 'All features active: Post to campus feed, sell notes & code, and offer 1-on-1 tutoring.'
                      : 'Upload your student ID card to unlock posting buzz, listing study materials, and tutoring.'}
                  </p>
                </div>

                {!currentUser.isVerified ? (
                  <button
                    onClick={() => openVerificationModal('general')}
                    className="w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Upload ID Card Now</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('verification')}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Open Digital Campus Pass
                  </button>
                )}
              </div>
            </div>

            {/* Trending Campus Topics */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Trending on Campus
              </h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { tag: '#CS201', desc: 'Algorithms & Red-Black trees midterm notes', posts: '48 posts' },
                  { tag: '#CampusHackathon', desc: '42 student teams registered for finals', posts: '135 posts' },
                  { tag: '#LostAndFound', desc: 'iPads, calculators & lab notebooks', posts: '22 items' },
                  { tag: '#PeerTutoring', desc: 'Top seniors offering exam doubt sessions', posts: '31 tutors' },
                  { tag: '#RoommateSearch', desc: 'Off-campus apartments for Fall semester', posts: '19 listings' }
                ].map(item => (
                  <div
                    key={item.tag}
                    onClick={() => setActiveTab('feed')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-600">{item.tag}</span>
                      <span className="text-[10px] font-mono text-slate-400">{item.posts}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Messages Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Student Chats</h3>
                </div>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="text-[11px] text-indigo-600 font-semibold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2">
                {conversations.slice(0, 3).map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => openChatWithUser(conv.peerUser)}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 flex items-start gap-2.5"
                  >
                    <div className="relative shrink-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={conv.peerUser.avatar}
                          alt={conv.peerUser.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white font-mono text-[8px] flex items-center justify-center font-bold">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-xs text-slate-900 truncate">
                          {conv.peerUser.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Demo Mode Helper */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-slate-800 shadow-sm text-xs">
              <span className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider block mb-1">
                Evaluation & Testing Guide
              </span>
              <h4 className="font-bold text-white mb-2">Test ID Card Verification Flow</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                1. Click <strong>"Post Buzz"</strong> or <strong>"List Material"</strong> while unverified to see the verification gate prompt.
                <br />
                2. In the verification modal, click <strong>"Load Sample ID Card"</strong> to test instant OCR scanning and credential activation.
                <br />
                3. Switch roles anytime using the avatar menu in the top bar.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">UniQuad</span>
            <span>· Verified Student Marketplace & Campus Community</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>FERPA Compliant</span>
            <span>·</span>
            <span>Student-to-Student Only</span>
            <span>·</span>
            <span>Encrypted Credential Verification</span>
          </div>
        </div>
      </footer>

      {/* ID Verification Modal */}
      <IDVerificationModal />

      {/* Floating 1-to-1 Chat Modal Drawer */}
      {isChatDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <DirectChat isModal onClose={closeChatDrawer} />
        </div>
      )}

      {/* Interactive Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1 leading-snug">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
