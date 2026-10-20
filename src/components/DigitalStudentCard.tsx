import React from 'react';
import { ShieldCheck, CheckCircle2, GraduationCap, Building2, QrCode, Sparkles, Download } from 'lucide-react';
import { StudentUser } from '../types';
import { SAMPLE_ID_CARD_IMAGE } from '../data/mockData';

interface DigitalStudentCardProps {
  user: StudentUser;
  onOpenVerification?: () => void;
}

export const DigitalStudentCard: React.FC<DigitalStudentCardProps> = ({
  user,
  onOpenVerification
}) => {
  if (!user.isVerified) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-indigo-800/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Digital Campus Pass: Unverified</h3>
            <p className="text-xs text-indigo-200/70">Upload Student ID to issue your official digital credentials</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Verified students gain full access to the campus community: posting to Quad Feed, selling lecture notes & project repositories, and offering paid peer tutoring.
        </p>

        <button
          onClick={onOpenVerification}
          className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          <span>Upload Student ID Card Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
      {/* Collegiate Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-5 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-blue-200" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold block">Official Student Credential</span>
            <span className="text-sm font-bold text-white tracking-tight">{user.college}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
          <CheckCircle2 className="w-3 h-3" />
          <span>VERIFIED</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          {/* Student Photo */}
          <div className="relative w-20 h-24 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 shrink-0 shadow-xs">
            <img
              src={user.idCardImageUrl || user.avatar || SAMPLE_ID_CARD_IMAGE}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-blue-900/90 text-white text-[8px] text-center font-mono py-0.5">
              PASS #{user.rollNumber.slice(-4) || '2026'}
            </div>
          </div>

          {/* Student Details */}
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-bold text-slate-900 truncate">{user.name}</h4>
            <p className="text-xs text-indigo-700 font-medium">{user.department}</p>
            
            <div className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block">Roll / Student ID</span>
                <span className="font-mono font-medium text-slate-800">{user.rollNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Class of</span>
                <span className="font-medium text-slate-800">{user.graduationYear}</span>
              </div>
              <div className="col-span-2 mt-1">
                <span className="text-[10px] text-slate-400 block">Campus Email</span>
                <span className="text-slate-700 truncate block font-mono">{user.studentEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Barcode & QR Code Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="text-[10px] text-slate-500">
              <span className="block font-medium text-slate-700">Cryptographically Signed</span>
              <span>Issued: {user.verifiedAt || 'Active Session'}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-mono text-slate-400 block uppercase">Auth ID</span>
            <span className="text-[10px] font-mono text-slate-700 font-semibold">UNI-Q-{user.rollNumber.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
