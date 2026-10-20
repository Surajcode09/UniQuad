import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileCheck,
  Building,
  UserCheck,
  AlertTriangle,
  Settings,
  Save,
  Plus,
  Trash2,
  School,
  MapPin,
  Home
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VerificationSubmission } from '../types';

export const ModeratorQueue: React.FC = () => {
  const { submissions, approveSubmission, rejectSubmission, collegeConfig, updateCollegeConfig, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'queue' | 'college_settings'>('queue');
  const [selectedSub, setSelectedSub] = useState<VerificationSubmission | null>(
    submissions[0] || null
  );
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  // Private College Settings Local Form State
  const [collegeName, setCollegeName] = useState(collegeConfig.name);
  const [shortName, setShortName] = useState(collegeConfig.shortName);
  const [emailDomain, setEmailDomain] = useState(collegeConfig.emailDomain);
  const [campusType, setCampusType] = useState(collegeConfig.campusType);
  const [motto, setMotto] = useState(collegeConfig.motto);
  const [newPickupSpot, setNewPickupSpot] = useState('');
  const [pickupSpots, setPickupSpots] = useState<string[]>(collegeConfig.pickupSpots);
  const [newDepartment, setNewDepartment] = useState('');
  const [departments, setDepartments] = useState<string[]>(collegeConfig.departments);

  const handleSaveCollegeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCollegeConfig({
      name: collegeName.trim(),
      shortName: shortName.trim().toUpperCase(),
      emailDomain: emailDomain.trim().toLowerCase(),
      campusType: campusType.trim(),
      motto: motto.trim(),
      pickupSpots,
      departments
    });
  };

  const handleAddPickupSpot = () => {
    if (!newPickupSpot.trim()) return;
    setPickupSpots(prev => [...prev, newPickupSpot.trim()]);
    setNewPickupSpot('');
  };

  const handleRemovePickupSpot = (index: number) => {
    setPickupSpots(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDepartment = () => {
    if (!newDepartment.trim()) return;
    setDepartments(prev => [...prev, newDepartment.trim()]);
    setNewDepartment('');
  };

  const handleRemoveDepartment = (index: number) => {
    setDepartments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-indigo-500/30 text-indigo-300 font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
              Campus Registrar Desk
            </span>
            <span className="text-xs text-slate-400">· Private College Administrator</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">
            {collegeConfig.name} ({collegeConfig.shortName})
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Admin console for your private college: verify student ID cards, configure campus departments & handover spots, and manage student credentials.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => setActiveSubTab('queue')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 ${
              activeSubTab === 'queue'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>ID Review ({submissions.filter(s => s.status === 'pending').length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('college_settings')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 ${
              activeSubTab === 'college_settings'
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>College Setup</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: ID Card Review Queue */}
      {activeSubTab === 'queue' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Submissions List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold uppercase tracking-wider">
              <span>Submitted Student ID Cards</span>
              <span className="font-mono tabular-nums">{submissions.length} total</span>
            </div>

            <div className="space-y-2.5">
              {submissions.map(sub => {
                const isSelected = selectedSub?.id === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSub(sub);
                      setShowRejectBox(false);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-600'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{sub.studentName}</h4>
                        <p className="text-[11px] text-slate-500">{sub.college}</p>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          sub.status === 'verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : sub.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-mono text-slate-700">Roll: {sub.rollNumber}</span>
                      <span className="text-[10px] text-slate-400">{sub.submittedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspection Panel (7 Cols) */}
          <div className="lg:col-span-7">
            {selectedSub ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Submission ID: {selectedSub.id}</span>
                    <h3 className="text-base font-bold text-slate-900">{selectedSub.studentName}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">AI OCR Match Confidence</span>
                    <span className="text-sm font-bold text-emerald-600 font-mono tabular-nums">
                      {selectedSub.ocrConfidence}% Confidence
                    </span>
                  </div>
                </div>

                {/* ID Card Image Inspection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    Uploaded Student ID Card Image
                  </label>
                  <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-900 max-h-72 flex items-center justify-center shadow-inner group">
                    <img
                      src={selectedSub.idCardImageUrl}
                      alt="Uploaded ID for verification"
                      className="max-h-72 w-full object-contain"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-xs text-[10px] text-white font-mono rounded">
                      REGISTRAR HIGH-RES AUDIT
                    </div>
                  </div>
                </div>

                {/* Extracted Details Grid */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">College</span>
                    <span className="font-semibold text-slate-800">{selectedSub.college}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Roll / ID</span>
                    <span className="font-mono font-bold text-slate-800">{selectedSub.rollNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Department</span>
                    <span className="text-slate-700">{selectedSub.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Graduation Class</span>
                    <span className="text-slate-700">Class of {selectedSub.graduationYear}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px]">Official Student Email</span>
                    <span className="font-mono text-indigo-700">{selectedSub.studentEmail}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    Status: <strong className="text-slate-700 uppercase font-mono">{selectedSub.status}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowRejectBox(prev => !prev)}
                      className="px-3.5 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject / Rescan</span>
                    </button>

                    <button
                      onClick={() => approveSubmission(selectedSub.id)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Grant Badge</span>
                    </button>
                  </div>
                </div>

                {showRejectBox && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                    <span className="font-semibold text-rose-900 block">Specify Rejection Reason:</span>
                    <input
                      type="text"
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                      placeholder="e.g. Student ID expired or photo unreadable..."
                      className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowRejectBox(false)}
                        className="px-3 py-1 text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          rejectSubmission(selectedSub.id, rejectReason);
                          setShowRejectBox(false);
                          setRejectReason('');
                        }}
                        className="px-3 py-1 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 text-xs text-slate-400">
                Select a student from the queue to inspect their ID card.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Private College Configuration & Branding */}
      {activeSubTab === 'college_settings' && (
        <form onSubmit={handleSaveCollegeSettings} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-indigo-600" />
              Private College Campus Configuration
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Customize this app for your exact private college or autonomous institution. These settings dictate the university name on student digital ID cards, acceptable email domains, and campus meetup spots.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Private College / Institution Name
              </label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={e => setCollegeName(e.target.value)}
                placeholder="e.g. Apex Institute of Technology & Sciences"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                College Short Name / Abbreviation
              </label>
              <input
                type="text"
                required
                value={shortName}
                onChange={e => setShortName(e.target.value)}
                placeholder="e.g. AITS"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Official Student Email Domain (e.g. college.edu / college.ac.in)
              </label>
              <input
                type="text"
                required
                value={emailDomain}
                onChange={e => setEmailDomain(e.target.value)}
                placeholder="e.g. aits.edu or mycollege.ac.in"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Institution Status & Campus Type
              </label>
              <select
                value={campusType}
                onChange={e => setCampusType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Private Autonomous Engineering College">Private Autonomous Engineering College</option>
                <option value="Private Deemed-to-be University">Private Deemed-to-be University</option>
                <option value="Affiliated Private Degree College">Affiliated Private Degree College</option>
                <option value="Private Business / Management School">Private Business / Management School</option>
                <option value="Private Medical / Pharmacy Institute">Private Medical / Pharmacy Institute</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">
                Institution Motto / Academic Creed
              </label>
              <input
                type="text"
                value={motto}
                onChange={e => setMotto(e.target.value)}
                placeholder="e.g. Knowledge · Innovation · Excellence"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 italic"
              />
            </div>
          </div>

          {/* Designated Campus Handover Spots */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Designated On-Campus Handover & Study Spots
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Locations in your campus where students can safely hand over notes, textbooks, and gear:
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {pickupSpots.map((spot, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-800"
                >
                  <span>{spot}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePickupSpot(i)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="Add new campus spot (e.g. Library 2nd Floor, Canteen Lobby)..."
                value={newPickupSpot}
                onChange={e => setNewPickupSpot(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddPickupSpot}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Spot</span>
              </button>
            </div>
          </div>

          {/* Academic Departments */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-indigo-600" />
              Academic Departments in Your College
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {departments.map((dept, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900"
                >
                  <span>{dept}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDepartment(i)}
                    className="text-indigo-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="Add department (e.g. Civil Engineering, BBA)..."
                value={newDepartment}
                onChange={e => setNewDepartment(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddDepartment}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Department</span>
              </button>
            </div>
          </div>

          {/* Submit Save */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Private College Configuration</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
