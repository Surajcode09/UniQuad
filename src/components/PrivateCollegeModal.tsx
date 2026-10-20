import React, { useState } from 'react';
import {
  X,
  Building2,
  CheckCircle2,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Mail,
  Home,
  Plus,
  Trash2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CollegeConfig } from '../types';

interface CollegePreset {
  name: string;
  shortName: string;
  emailDomain: string;
  campusType: string;
  motto: string;
  pickupSpots: string[];
  departments: string[];
  hostelBlocks: string[];
}

const PRESET_COLLEGES: CollegePreset[] = [
  {
    name: 'Apex Institute of Technology & Sciences',
    shortName: 'AITS',
    emailDomain: 'aits.edu',
    campusType: 'Private Autonomous College',
    motto: 'Knowledge · Innovation · Excellence',
    pickupSpots: [
      'Central Library Ground Floor Lobby',
      'Main Academic Block - Canteen Annex',
      'Boys Hostel A (Block 2 Reception)',
      'Girls Hostel C (Common Lounge)',
      'Engineering Quad Garden Benches',
      'Student Council Desk'
    ],
    departments: [
      'Computer Science & Engineering',
      'Artificial Intelligence & Data Science',
      'Electronics & Communication (ECE)',
      'Information Technology (IT)',
      'Mechanical Engineering',
      'Electrical & Electronics (EEE)',
      'Management Studies (BBA/MBA)'
    ],
    hostelBlocks: [
      'Hostel Block A (Aryabhata)',
      'Hostel Block B (Bhaskara)',
      'Girls Hostel Block C (Kalpana)',
      'Girls Hostel Block D (Gargi)',
      'Day Scholar (Off-Campus Commuter)'
    ]
  },
  {
    name: 'Vellore Institute of Technology',
    shortName: 'VIT',
    emailDomain: 'vitstudent.ac.in',
    campusType: 'Deemed Private University',
    motto: 'A place to learn, a chance to grow',
    pickupSpots: [
      'Anna Auditorium Portico',
      'Main Gate - Gazebo',
      'Men\'s Hostel Block Q Courtyard',
      'Ladies Hostel Block D Lobby',
      'Foodys Canteen Quad'
    ],
    departments: [
      'Scope - Computer Science & Engg',
      'Sense - Electronics & Comm',
      'Select - Electrical Engg',
      'Smec - Mechanical Engg',
      'Biotechnology'
    ],
    hostelBlocks: [
      'Men\'s Hostel Block A to R',
      'Ladies Hostel Block A to F',
      'Day Scholar'
    ]
  },
  {
    name: 'SRM Institute of Science & Technology',
    shortName: 'SRM',
    emailDomain: 'srmist.edu.in',
    campusType: 'Private Deemed University',
    motto: 'Learn · Leap · Lead',
    pickupSpots: [
      'Tech Park Java Green Cafe',
      'University Building Lobby',
      'Oori Hostel Entrance',
      'Arch Gate Plaza'
    ],
    departments: [
      'Computer Science (Core & Specializations)',
      'Software Engineering',
      'Electronics & Communication',
      'Mechanical & Aerospace',
      'Biomedical'
    ],
    hostelBlocks: [
      'Paari Hostel',
      'Kaari Hostel',
      'Oori Hostel',
      'Senbagam Girls Hostel',
      'Day Scholar'
    ]
  },
  {
    name: 'BMS College of Engineering',
    shortName: 'BMSCE',
    emailDomain: 'bmsce.ac.in',
    campusType: 'Private Autonomous College',
    motto: 'Education for Life & Nation Building',
    pickupSpots: [
      'Library & Information Centre',
      'Sports Complex Pavillion',
      'PG Block Canteen',
      'Bull Temple Road Main Gate'
    ],
    departments: [
      'Computer Science',
      'Information Science',
      'Electronics & Telecommunication',
      'Industrial Engineering & Management',
      'Civil Engineering'
    ],
    hostelBlocks: [
      'Unit 1 Boys Hostel',
      'Unit 2 Boys Hostel',
      'Girls Hostel IH Block',
      'Day Scholar'
    ]
  }
];

export const PrivateCollegeModal: React.FC = () => {
  const {
    isCollegeModalOpen,
    closeCollegeModal,
    collegeConfig,
    updateCollegeConfig,
    showToast
  } = useApp();

  const [formData, setFormData] = useState<CollegeConfig>({ ...collegeConfig });
  const [newSpot, setNewSpot] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newHostel, setNewHostel] = useState('');

  if (!isCollegeModalOpen) return null;

  const handleApplyPreset = (preset: CollegePreset) => {
    setFormData({ ...preset });
    showToast(`Loaded preset configuration for ${preset.shortName}!`);
  };

  const handleAddSpot = () => {
    if (!newSpot.trim()) return;
    setFormData(prev => ({
      ...prev,
      pickupSpots: [...prev.pickupSpots, newSpot.trim()]
    }));
    setNewSpot('');
  };

  const handleRemoveSpot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pickupSpots: prev.pickupSpots.filter((_, i) => i !== index)
    }));
  };

  const handleAddDept = () => {
    if (!newDept.trim()) return;
    setFormData(prev => ({
      ...prev,
      departments: [...prev.departments, newDept.trim()]
    }));
    setNewDept('');
  };

  const handleRemoveDept = (index: number) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index)
    }));
  };

  const handleAddHostel = () => {
    if (!newHostel.trim()) return;
    setFormData(prev => ({
      ...prev,
      hostelBlocks: [...prev.hostelBlocks, newHostel.trim()]
    }));
    setNewHostel('');
  };

  const handleRemoveHostel = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hostelBlocks: prev.hostelBlocks.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCollegeConfig(formData);
    closeCollegeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-700 shadow-2xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Configure Your Private College</h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-mono font-bold px-2 py-0.5 rounded-full">
                  Campus Customizer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize the platform to fit your private college's official name, campus pickup spots, departments, and hostel blocks.
              </p>
            </div>
          </div>
          <button
            onClick={closeCollegeModal}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            ⚡ Quick Private College Presets
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {PRESET_COLLEGES.map(preset => (
              <button
                key={preset.shortName}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`p-2 rounded-xl border text-left transition-all ${
                  formData.shortName === preset.shortName
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <span className="font-bold block truncate">{preset.shortName}</span>
                <span className={`text-[10px] block truncate ${formData.shortName === preset.shortName ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {preset.campusType.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                College Official Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Apex Institute of Technology & Sciences"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Short Acronym
              </label>
              <input
                type="text"
                required
                value={formData.shortName}
                onChange={e => setFormData({ ...formData, shortName: e.target.value })}
                placeholder="e.g. AITS"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Campus Email Domain
              </label>
              <div className="flex items-center">
                <span className="px-2.5 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-mono text-xs">
                  @
                </span>
                <input
                  type="text"
                  required
                  value={formData.emailDomain}
                  onChange={e => setFormData({ ...formData, emailDomain: e.target.value })}
                  placeholder="aits.edu or college.ac.in"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-r-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Campus Classification
              </label>
              <select
                value={formData.campusType}
                onChange={e => setFormData({ ...formData, campusType: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Private Autonomous College">Private Autonomous College</option>
                <option value="Deemed Private University">Deemed Private University</option>
                <option value="Affiliated Engineering College">Affiliated Engineering College</option>
                <option value="Private Technical University">Private Technical University</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Campus Motto / Slogan
            </label>
            <input
              type="text"
              value={formData.motto}
              onChange={e => setFormData({ ...formData, motto: e.target.value })}
              placeholder="e.g. Knowledge · Innovation · Excellence"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Campus Handover / Pickup Spots */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Safe Campus Handover Spots (Marketplace)</span>
              </label>
              <span className="text-[10px] text-slate-400">{formData.pickupSpots.length} locations</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
              {formData.pickupSpots.map((spot, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 text-[11px]"
                >
                  <span>{spot}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpot(idx)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newSpot}
                onChange={e => setNewSpot(e.target.value)}
                placeholder="Add custom campus spot (e.g. Mechanical Workshop, Cafe Coffee Day)"
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSpot}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Departments & Hostel Blocks in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Departments */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>College Departments</span>
                </label>
                <span className="text-[10px] text-slate-400">{formData.departments.length}</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {formData.departments.map((d, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 text-[10px]"
                  >
                    <span className="truncate max-w-[140px]">{d}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDept(idx)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={newDept}
                  onChange={e => setNewDept(e.target.value)}
                  placeholder="New department"
                  className="flex-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddDept}
                  className="px-2.5 py-1 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Hostel Blocks */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Hostel & Resident Blocks</span>
                </label>
                <span className="text-[10px] text-slate-400">{formData.hostelBlocks.length}</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {formData.hostelBlocks.map((h, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 text-[10px]"
                  >
                    <span className="truncate max-w-[140px]">{h}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHostel(idx)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={newHostel}
                  onChange={e => setNewHostel(e.target.value)}
                  placeholder="New hostel block"
                  className="flex-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddHostel}
                  className="px-2.5 py-1 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Applied instantly across Feed, Pass & Marketplace</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeCollegeModal}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save Private College Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
