import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Building2,
  Calendar,
  Clock,
  Video,
  Star,
  CheckCircle2,
  Search,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Code2,
  Globe2,
  X,
  FileCheck2,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IndustryMentor, MentorRole } from '../types';

export const MentorsNetwork: React.FC = () => {
  const {
    mentors,
    mentorshipBookings,
    bookMentorshipSession,
    addMentor,
    openChatWithUser,
    collegeConfig
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'mnc' | 'seniors' | 'other_colleges'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<IndustryMentor | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('This Saturday');
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [studentNotes, setStudentNotes] = useState<string>('');

  // Register as Mentor State
  const [showAddMentorModal, setShowAddMentorModal] = useState(false);
  const [newMentorName, setNewMentorName] = useState('');
  const [newMentorRole, setNewMentorRole] = useState<MentorRole>('college_senior');
  const [newMentorCompany, setNewMentorCompany] = useState('');
  const [newMentorJobTitle, setNewMentorJobTitle] = useState('');
  const [newMentorAlmaMater, setNewMentorAlmaMater] = useState(collegeConfig.name);
  const [newMentorExperience, setNewMentorExperience] = useState(1);
  const [newMentorTech, setNewMentorTech] = useState('');
  const [newMentorTopics, setNewMentorTopics] = useState('');
  const [newMentorFee, setNewMentorFee] = useState(0);
  const [newMentorBio, setNewMentorBio] = useState('');
  const [newMentorBadge, setNewMentorBadge] = useState('');

  const handleOpenBooking = (mentor: IndustryMentor) => {
    setSelectedMentorForBooking(mentor);
    setSelectedTopic(mentor.mentorshipTopics[0] || 'General Career & Technical Guidance');
    setBookingSlot(mentor.availableSlots[0] || '10:00 AM - 11:00 AM');
    setStudentNotes('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentorForBooking) return;

    bookMentorshipSession(
      selectedMentorForBooking.id,
      selectedTopic,
      bookingDate,
      bookingSlot
    );
    setSelectedMentorForBooking(null);
  };

  const handleRegisterMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentorName.trim()) return;

    const parsedTech = newMentorTech
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const parsedTopics = newMentorTopics
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const defaultAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    ];

    addMentor({
      name: newMentorName.trim(),
      username: newMentorName.toLowerCase().replace(/\s+/g, '_'),
      avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
      role: newMentorRole,
      company: newMentorCompany.trim() || undefined,
      jobTitle: newMentorJobTitle.trim() || (newMentorRole === 'college_senior' ? 'Final Year Senior' : 'Software Engineer'),
      almaMater: newMentorAlmaMater.trim() || collegeConfig.name,
      experienceYears: Number(newMentorExperience) || 1,
      techStack: parsedTech.length > 0 ? parsedTech : ['DSA', 'Web Tech', 'Problem Solving'],
      mentorshipTopics: parsedTopics.length > 0 ? parsedTopics : ['Interview Guidance', 'Resume Review', 'Career Q&A'],
      hourlyFee: Number(newMentorFee) || 0,
      currency: '$',
      bio: newMentorBio.trim() || `Experienced in technical development and happy to mentor fellow students at ${collegeConfig.shortName}.`,
      verificationBadgeText: newMentorBadge.trim() || (newMentorCompany ? `Verified @ ${newMentorCompany}` : `Senior @ ${collegeConfig.shortName}`),
      availableDays: ['Fri', 'Sat', 'Sun'],
      availableSlots: ['11:00 AM - 12:00 PM', '4:00 PM - 5:00 PM', '7:00 PM - 8:00 PM']
    });

    setShowAddMentorModal(false);
    // Reset form
    setNewMentorName('');
    setNewMentorCompany('');
    setNewMentorJobTitle('');
    setNewMentorTech('');
    setNewMentorTopics('');
    setNewMentorBio('');
    setNewMentorBadge('');
    setNewMentorFee(0);
  };

  const filteredMentors = mentors.filter(mentor => {
    if (activeFilter === 'mnc' && mentor.role !== 'mnc_developer') return false;
    if (activeFilter === 'seniors' && mentor.role !== 'college_senior' && mentor.role !== 'alumni') return false;
    if (activeFilter === 'other_colleges' && mentor.role !== 'cross_college_student') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = mentor.name.toLowerCase().includes(q);
      const matchCompany = mentor.company?.toLowerCase().includes(q);
      const matchRole = mentor.jobTitle?.toLowerCase().includes(q);
      const matchTech = mentor.techStack.some(t => t.toLowerCase().includes(q));
      const matchTopic = mentor.mentorshipTopics.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchCompany && !matchRole && !matchTech && !matchTopic) return false;
    }
    return true;
  });

  const getRoleBadge = (role: MentorRole, company?: string) => {
    switch (role) {
      case 'mnc_developer':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
            <Briefcase className="w-3 h-3 text-blue-600" />
            <span>MNC Engineer {company ? `@ ${company}` : ''}</span>
          </span>
        );
      case 'college_senior':
      case 'alumni':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
            <GraduationCap className="w-3 h-3 text-emerald-600" />
            <span>Campus Senior & Alumni</span>
          </span>
        );
      case 'cross_college_student':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-md">
            <Globe2 className="w-3 h-3 text-purple-600" />
            <span>Cross-Campus Student</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Career & Campus Network
            </span>
            <span className="text-xs text-slate-400">· {collegeConfig.shortName} Senior & Alumni Bridge</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Connect with Seniors, Other Colleges & MNC Developers
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Get 1-on-1 mentorship, resume teardowns, and mock coding interviews directly from working software engineers at Google, Microsoft, Amazon, high-scoring final year seniors, and students from top global campuses.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="font-mono font-bold text-slate-900 text-sm block">45+</span>
            <span className="text-[10px] text-slate-400">MNC Leads</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="font-mono font-bold text-slate-900 text-sm block">120+</span>
            <span className="text-[10px] text-slate-400">Alumni</span>
          </div>
          <button
            type="button"
            onClick={() => setShowAddMentorModal(true)}
            className="py-2.5 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Join as Mentor</span>
          </button>
        </div>
      </div>

      {/* Active Mentorship Bookings if any */}
      {mentorshipBookings.length > 0 && (
        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
          <h4 className="text-xs font-bold text-indigo-950 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            Your Scheduled Industry & Senior Mentorships ({mentorshipBookings.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mentorshipBookings.map(b => (
              <div key={b.id} className="bg-white p-3.5 rounded-xl border border-indigo-100 text-xs shadow-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{b.topic}</span>
                  <span className="text-indigo-600 font-mono text-[11px]">{b.mentorCompany || 'Senior'}</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Mentor: <strong>{b.mentorName}</strong> · {b.date} at {b.timeSlot}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={b.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 font-semibold hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Join Video Room
                  </a>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Segmented Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All Mentors & Seniors' },
            { id: 'mnc', label: '🏢 MNC Developers' },
            { id: 'seniors', label: '🎓 College Seniors & Alumni' },
            { id: 'other_colleges', label: '🌐 Other Colleges' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Google, DSA, React, Placement..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Mentors Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map(mentor => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all p-5 flex flex-col justify-between"
          >
            <div>
              {/* Profile Header */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{mentor.name}</h3>
                    {getRoleBadge(mentor.role, mentor.company)}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">
                    {mentor.jobTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {mentor.almaMater} · {mentor.experienceYears}y exp
                  </p>
                </div>

                <div className="text-right shrink-0">
                  {mentor.hourlyFee === 0 ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md block">
                      Free Guidance
                    </span>
                  ) : (
                    <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                      {mentor.currency}{mentor.hourlyFee}
                      <span className="text-[10px] font-normal text-slate-400">/hr</span>
                    </div>
                  )}
                  <div className="text-[11px] text-amber-600 font-medium flex items-center justify-end gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{mentor.rating} ({mentor.sessionsCompleted})</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                {mentor.bio}
              </p>

              {/* Mentorship Focus Topics */}
              <div className="mb-3.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Mentorship & Interview Offerings
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.mentorshipTopics.map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 text-[11px] bg-slate-50 border border-slate-200 text-slate-700 rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Core Skills & Tech Stack
                </span>
                <div className="flex flex-wrap gap-1 text-[10px] font-mono text-indigo-700">
                  {mentor.techStack.map(t => (
                    <span key={t} className="bg-indigo-50/70 border border-indigo-100/80 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px]">{mentor.availableDays.join(', ')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    openChatWithUser(
                      {
                        id: mentor.id,
                        name: mentor.name,
                        username: mentor.username,
                        avatar: mentor.avatar,
                        college: mentor.almaMater,
                        rollNumber: 'ALUMNI',
                        department: mentor.jobTitle || 'Tech',
                        graduationYear: '2022',
                        studentEmail: `${mentor.username}@alumni.edu`,
                        isVerified: true,
                        verificationStatus: 'verified'
                      },
                      {
                        title: `Career Guidance: ${mentor.company || mentor.jobTitle}`,
                        type: 'mentorship',
                        price: mentor.hourlyFee,
                        currency: mentor.currency
                      },
                      `Hi ${mentor.name.split(' ')[0]}! I'm a student at ${collegeConfig.shortName}. I saw your background at ${mentor.company || mentor.almaMater} and would love to ask a quick question about tech career preparation.`
                    )
                  }
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => handleOpenBooking(mentor)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book 1-on-1 Session</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedMentorForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider block">
                  {selectedMentorForBooking.company || selectedMentorForBooking.role}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Book Session with {selectedMentorForBooking.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedMentorForBooking.hourlyFee === 0
                    ? 'Free Community Mentorship'
                    : `Fee: ${selectedMentorForBooking.currency}${selectedMentorForBooking.hourlyFee}/hr`}
                </p>
              </div>
              <button
                onClick={() => setSelectedMentorForBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Mentorship Topic</label>
                <select
                  value={selectedTopic}
                  onChange={e => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {selectedMentorForBooking.mentorshipTopics.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Date</label>
                  <select
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="This Friday">This Friday</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                    <option value="Next Weekday">Next Weekday</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Available Slot</label>
                  <select
                    value={bookingSlot}
                    onChange={e => setBookingSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {selectedMentorForBooking.availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  What specific questions or resume links do you want to share?
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Preparing for Google cloud SDE internship online assessment. Want advice on graph problems and resume bullet points..."
                  value={studentNotes}
                  onChange={e => setStudentNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
                <p>• 1-on-1 private video call room automatically generated</p>
                <p>• Verified mentor credentials from company institutional domain</p>
                <p>• Connect directly to ask for internship referrals after review</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentorForBooking(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Confirm Mentorship Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register as Senior / MNC Developer / Other College Mentor Modal */}
      {showAddMentorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-1">
                  Community Network
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Register as a Mentor / Senior / MNC Developer
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Connect with students at {collegeConfig.shortName} to offer technical mentorship, mock interviews, or placement preparation.
                </p>
              </div>
              <button
                onClick={() => setShowAddMentorModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterMentor} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Mehta"
                    value={newMentorName}
                    onChange={e => setNewMentorName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mentor Category</label>
                  <select
                    value={newMentorRole}
                    onChange={e => setNewMentorRole(e.target.value as MentorRole)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="college_senior">🎓 Campus Senior (3rd/Final Year)</option>
                    <option value="mnc_developer">🏢 MNC Software Engineer / Lead</option>
                    <option value="alumni">🏛️ College Alumni Working in Industry</option>
                    <option value="cross_college_student">🌐 Student from Another College</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Google, Microsoft, Amazon, Oracle, TCS"
                    value={newMentorCompany}
                    onChange={e => setNewMentorCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Job Title / Major
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer II / Placed Senior"
                    value={newMentorJobTitle}
                    onChange={e => setNewMentorJobTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    College / Alma Mater
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={`e.g. ${collegeConfig.shortName} or IIT Delhi`}
                    value={newMentorAlmaMater}
                    onChange={e => setNewMentorAlmaMater(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={newMentorExperience}
                    onChange={e => setNewMentorExperience(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Core Skills & Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Java, Spring Boot, DSA, React, System Design, LeetCode"
                  value={newMentorTech}
                  onChange={e => setNewMentorTech(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mentorship Offerings (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mock Coding Rounds, Resume Teardown, MNC Referral Strategy"
                  value={newMentorTopics}
                  onChange={e => setNewMentorTopics(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Hourly Fee ($ / USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newMentorFee}
                    onChange={e => setNewMentorFee(Number(e.target.value))}
                    placeholder="0 for free guidance"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Enter 0 to offer free student help</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Custom Verified Badge Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SDE @ Google or Placed @ Oracle"
                    value={newMentorBadge}
                    onChange={e => setNewMentorBadge(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Bio & Message to Students
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tell students about your journey, college background, and how you can help them achieve their goals..."
                  value={newMentorBio}
                  onChange={e => setNewMentorBio(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMentorModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Network as Mentor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
