import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { VerificationStatus } from '../types';

interface IDCardBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  college?: string;
}

export const IDCardBadge: React.FC<IDCardBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true,
  college
}) => {
  if (status === 'verified') {
    return (
      <span
        title={`Verified Student ${college ? `at ${college}` : ''}`}
        className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-md px-1.5 py-0.5 text-xs whitespace-nowrap shrink-0"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
        {showLabel && <span>Verified Student</span>}
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span
        title="ID Card submitted. Pending Campus Moderator review"
        className="inline-flex items-center gap-1 font-medium text-amber-700 bg-amber-50 border border-amber-200/80 rounded-md px-1.5 py-0.5 text-xs whitespace-nowrap shrink-0"
      >
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        {showLabel && <span>ID Pending Review</span>}
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span
        title="Verification unconfirmed. Re-upload your student ID card"
        className="inline-flex items-center gap-1 font-medium text-rose-700 bg-rose-50 border border-rose-200/80 rounded-md px-1.5 py-0.5 text-xs whitespace-nowrap shrink-0"
      >
        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
        {showLabel && <span>ID Needs Re-upload</span>}
      </span>
    );
  }

  return (
    <span
      title="Unverified Student. Upload Student ID to unlock posting"
      className="inline-flex items-center gap-1 font-normal text-slate-500 bg-slate-100 border border-slate-200 rounded-md px-1.5 py-0.5 text-xs whitespace-nowrap shrink-0"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
      {showLabel && <span>Unverified</span>}
    </span>
  );
};
