import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Upload,
  FileText,
  AlertCircle,
  HelpCircle,
  Download,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DigitalStudentCard } from './DigitalStudentCard';
import { IDCardBadge } from './IDCardBadge';

export const VerificationCenter: React.FC = () => {
  const { currentUser, openVerificationModal, showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Student Identity & Campus Pass</h2>
            <IDCardBadge status={currentUser.verificationStatus} />
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            UniQuad relies on genuine student verification. Every verified profile holds an authenticated student ID on file, eliminating bots, commercial spammers, and non-student actors.
          </p>
        </div>

        <button
          onClick={() => openVerificationModal('general')}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>{currentUser.isVerified ? 'Re-upload / Update ID Card' : 'Upload Student ID Card'}</span>
        </button>
      </div>

      {/* Two Column Grid: Digital Pass on Left, Privileges and FAQ on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Digital Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <DigitalStudentCard
            user={currentUser}
            onOpenVerification={() => openVerificationModal('general')}
          />

          {currentUser.isVerified && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-3 shadow-xs">
              <span className="font-bold text-slate-900 block">Credential Audit Information</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Institutional Authority:</span>
                  <span className="font-semibold text-slate-800">{currentUser.college}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Matriculation / Roll:</span>
                  <span className="font-mono text-slate-800">{currentUser.rollNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="text-slate-800">{currentUser.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Campus Email:</span>
                  <span className="font-mono text-slate-800">{currentUser.studentEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Timestamp:</span>
                  <span className="text-emerald-700 font-medium">{currentUser.verifiedAt || 'Active Session'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => showToast('Digital Campus Pass downloaded as high-res PNG.')}
                  className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Pass</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Privileges & Verification Process (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Privilege Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Platform Privilege Matrix</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${currentUser.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Campus Twitter-Style Feed Posting</h4>
                  <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                    Publish campus updates, questions, study groups, and vote in campus polls. Unverified users can only read content.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${currentUser.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Sell Handwritten Notes & Course Code</h4>
                  <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                    List past exam summaries, lab code, project files, and textbooks. Receive student payments safely via UPI or cash.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${currentUser.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Offer Peer Tutoring & Mentorship</h4>
                  <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                    Teach junior students in your best courses, set your hourly rate ($10–$25/hr), and conduct 1-on-1 video sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${currentUser.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Official "Verified Student" Badge</h4>
                  <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                    Displays your verified university credential next to your comments, marketplace products, and tutor listings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Safety FAQ */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-800 block mb-0.5">Why is Student ID verification mandatory?</span>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  College discussion boards and marketplaces are ruined when outsiders, commercial bots, or bad actors infiltrate. Verification ensures 100% authentic student-to-student interactions.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-800 block mb-0.5">What formats of student IDs are accepted?</span>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Physical plastic campus cards, digital university ID apps, library cards with matriculation numbers, or official admission registration receipts.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-800 block mb-0.5">Is my personal data protected?</span>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  Yes. Your raw card photograph is encrypted and only visible to authorized campus moderators. Sensitive information like birthdates or addresses are masked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
