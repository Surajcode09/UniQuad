import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Camera,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  FileText,
  Building,
  GraduationCap,
  Hash,
  Mail,
  ScanLine,
  RefreshCw,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_ID_CARD_IMAGE, TOP_COLLEGES } from '../data/mockData';

export const IDVerificationModal: React.FC = () => {
  const {
    isVerificationModalOpen,
    closeVerificationModal,
    verificationTriggerReason,
    currentUser,
    submitIdVerification
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'upload' | 'scanning' | 'confirm' | 'success'>('upload');
  const [idImage, setIdImage] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState('Initializing OCR scanner...');

  // Form Fields
  const [fullName, setFullName] = useState(currentUser.name || 'Eliza Jane Carter');
  const [college, setCollege] = useState(currentUser.college || 'Oakwood University');
  const [rollNumber, setRollNumber] = useState(currentUser.rollNumber || '23140597');
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science');
  const [graduationYear, setGraduationYear] = useState(currentUser.graduationYear || '2027');
  const [studentEmail, setStudentEmail] = useState(currentUser.studentEmail || 'eliza.carter@oakwood.edu');
  const [verificationMode, setVerificationMode] = useState<'instant' | 'moderator'>('instant');

  if (!isVerificationModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setIdImage(reader.result);
          runOcrScan(reader.result, false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSampleCard = () => {
    setIdImage(SAMPLE_ID_CARD_IMAGE);
    // Autofill with the sample ID card data
    setFullName('Eliza Jane Carter');
    setCollege('Oakwood University');
    setRollNumber('23140597');
    setDepartment('Computer Science');
    setGraduationYear('2027');
    setStudentEmail('eliza.carter@oakwood.edu');
    runOcrScan(SAMPLE_ID_CARD_IMAGE, true);
  };

  const runOcrScan = (imageSource: string, isSample: boolean) => {
    setStep('scanning');
    setScanProgress(15);
    setScanStatusText('Detecting student card boundaries and orientation...');

    setTimeout(() => {
      setScanProgress(45);
      setScanStatusText('Locating university emblem crest & security hologram...');
    }, 700);

    setTimeout(() => {
      setScanProgress(75);
      setScanStatusText('Extracting student roll number & department text via OCR...');
    }, 1400);

    setTimeout(() => {
      setScanProgress(100);
      setScanStatusText('Verification scan complete!');
      setTimeout(() => {
        setStep('confirm');
      }, 500);
    }, 2100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idImage) return;

    submitIdVerification({
      fullName,
      college,
      rollNumber,
      department,
      graduationYear,
      studentEmail,
      idCardImageUrl: idImage,
      instantApprove: verificationMode === 'instant'
    });
  };

  const getReasonTitle = () => {
    switch (verificationTriggerReason) {
      case 'post':
        return 'Student ID Verification Required to Post';
      case 'sell':
        return 'Verify Student ID to List Notes & Projects';
      case 'teach':
        return 'Verify Student ID to Become a Peer Tutor';
      default:
        return 'Student ID Verification';
    }
  };

  const getReasonSubtitle = () => {
    switch (verificationTriggerReason) {
      case 'post':
        return 'To prevent spam, harassment, and unverified outside actors, all student voices on UniQuad must authenticate with an active Student ID card.';
      case 'sell':
        return 'All study materials and project repositories require verified student credentials to protect academic integrity and ensure genuine coursework.';
      case 'teach':
        return 'Students rely on authentic peer mentors. Verified tutors receive a trusted badge and higher student bookings.';
      default:
        return 'Upload your college or university student ID card to earn the Verified Student badge and unlock full platform capabilities.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">{getReasonTitle()}</h2>
              <p className="text-xs text-indigo-200/80">Campus Identity & Academic Credential Verification</p>
            </div>
          </div>
          <button
            onClick={closeVerificationModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Reason Notification Banner */}
          {verificationTriggerReason !== 'general' && (
            <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold block mb-0.5">Campus Verification Gate</span>
                {getReasonSubtitle()}
              </div>
            </div>
          )}

          {/* Stepper Progress */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 text-xs font-medium">
            <div className={`flex items-center gap-2 ${step === 'upload' ? 'text-indigo-600 font-semibold' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'upload' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>1</span>
              <span>Upload ID Card</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className={`flex items-center gap-2 ${step === 'scanning' ? 'text-indigo-600 font-semibold' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'scanning' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>2</span>
              <span>OCR Scanner</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className={`flex items-center gap-2 ${step === 'confirm' ? 'text-indigo-600 font-semibold' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'confirm' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>3</span>
              <span>Confirm & Activate</span>
            </div>
          </div>

          {/* Step 1: Upload Card Image */}
          {step === 'upload' && (
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">Upload Student Identity Card (Front)</h3>
                <p className="text-xs text-slate-500">
                  Ensure student photo, college name, student roll/matriculation number, and expiry date are clearly legible.
                </p>
              </div>

              {/* Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/20 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 mx-auto flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-105 transition-all mb-3">
                  <Upload className="w-7 h-7" />
                </div>
                <p className="text-sm font-medium text-slate-800 mb-1">
                  Click to browse or drag and drop student ID image
                </p>
                <p className="text-xs text-slate-400">
                  Supported formats: PNG, JPG, WebP, HEIC up to 10MB
                </p>
              </div>

              {/* One-click Demo Preset Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-9 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-white shadow-xs">
                    <img
                      src={SAMPLE_ID_CARD_IMAGE}
                      alt="Sample ID Card"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">Instant Sample Student ID Card</span>
                    <span className="text-[11px] text-slate-500">Oakwood University · CS Sophomore · Roll #23140597</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleUseSampleCard}
                  className="px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 shadow-xs transition-colors whitespace-nowrap shrink-0"
                >
                  ⚡ Load Sample ID Card
                </button>
              </div>

              {/* Security & Verification Guarantees */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>256-bit encrypted card storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>FERPA/Student privacy compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant badge once authenticated</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Scanning Simulation */}
          {step === 'scanning' && (
            <div className="text-center py-6">
              <div className="relative max-w-sm mx-auto mb-6 rounded-xl overflow-hidden border border-slate-300 shadow-md bg-slate-900">
                {idImage && (
                  <img
                    src={idImage}
                    alt="ID Being Scanned"
                    className="w-full h-48 object-cover opacity-80"
                  />
                )}
                {/* Laser scan line */}
                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] transition-all duration-300"
                  style={{ top: `${scanProgress}%` }}
                />
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs rounded text-[11px] text-emerald-300 font-mono flex items-center justify-between">
                  <span>OCR SCANNING</span>
                  <span>{scanProgress}%</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium text-sm mb-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{scanStatusText}</span>
              </div>
              <p className="text-xs text-slate-500">
                Extracting university crest, optical security markers, and student credentials...
              </p>
            </div>
          )}

          {/* Step 3: Confirm Credentials & Select Activation Mode */}
          {step === 'confirm' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Card Preview Thumbnail */}
              <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                {idImage && (
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-slate-300 shrink-0 shadow-xs">
                    <img
                      src={idImage}
                      alt="Uploaded ID Card"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[9px] text-white text-center py-0.5 font-mono">
                      OCR MATCHED
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Optical Credentials Verified (98.6% match)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    ID card layout recognized. Confirm details below to finalize your verified student registration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('upload')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap"
                >
                  Change Photo
                </button>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    Full Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    placeholder="e.g. Eliza Jane Carter"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    College / University
                  </label>
                  <select
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {TOP_COLLEGES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                    Student Roll / ID Number
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={e => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    placeholder="e.g. 23140597"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Department / Academic Major
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    placeholder="e.g. Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Official College Email (.edu / .ac)
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={e => setStudentEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    placeholder="e.g. eliza.carter@oakwood.edu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={graduationYear}
                    onChange={e => setGraduationYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="2025">Class of 2025 (Senior)</option>
                    <option value="2026">Class of 2026 (Junior)</option>
                    <option value="2027">Class of 2027 (Sophomore)</option>
                    <option value="2028">Class of 2028 (Freshman)</option>
                    <option value="2029">Class of 2029 (Graduate / PhD)</option>
                  </select>
                </div>
              </div>

              {/* Verification Route Selection */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-900 mb-2">
                  Select Verification Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setVerificationMode('instant')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      verificationMode === 'instant'
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-900">Instant AI OCR Match</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.2 rounded">Fast</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Instantly unlocks posting & marketplace rights with verified badge.
                    </p>
                  </div>

                  <div
                    onClick={() => setVerificationMode('moderator')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      verificationMode === 'moderator'
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-4 h-4 text-slate-700" />
                      <span className="text-xs font-bold text-slate-900">Campus Moderator Queue</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Submit to university registrar team for manual approval.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeVerificationModal}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{verificationMode === 'instant' ? 'Verify Now & Unlock' : 'Submit for Review'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
