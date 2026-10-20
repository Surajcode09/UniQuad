import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  Star,
  BookOpen,
  DollarSign,
  Plus,
  X,
  CheckCircle2,
  Video,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IDCardBadge } from './IDCardBadge';
import { TutorProfile } from '../types';

export const PeerTutoring: React.FC = () => {
  const {
    currentUser,
    tutors,
    bookings,
    bookTutorSession,
    openVerificationModal,
    showToast,
    openChatWithUser
  } = useApp();

  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<TutorProfile | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('Tomorrow');
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [doubtTopic, setDoubtTopic] = useState<string>('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleOpenBooking = (tutor: TutorProfile) => {
    setSelectedTutorForBooking(tutor);
    setSelectedSubject(tutor.subjects[0] || 'General Tutoring');
    setBookingSlot(tutor.availableSlots[0] || '5:00 PM - 6:00 PM');
    setDoubtTopic('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTutorForBooking) return;

    bookTutorSession(
      selectedTutorForBooking.id,
      selectedSubject,
      bookingDate,
      bookingSlot,
      doubtTopic
    );
    setSelectedTutorForBooking(null);
  };

  const handleOpenBecomeTutor = () => {
    if (!currentUser.isVerified) {
      openVerificationModal('teach');
      return;
    }
    setIsApplyModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Peer-to-Peer Campus Tutoring</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Learn directly from high-scoring seniors and course TAs who aced your exact subjects. Student-friendly hourly rates ($12–$20/hr) with direct 1-on-1 doubt clearing.
          </p>
        </div>

        <button
          onClick={handleOpenBecomeTutor}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>{currentUser.isVerified ? 'Teach & Earn as Peer Tutor' : 'Verify ID to Become Tutor'}</span>
        </button>
      </div>

      {/* Active Bookings Banner if any */}
      {bookings.length > 0 && (
        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
          <h4 className="text-xs font-bold text-indigo-950 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            Your Scheduled Study Sessions ({bookings.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookings.map(b => (
              <div key={b.id} className="bg-white p-3 rounded-xl border border-indigo-100 text-xs shadow-xs">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>{b.subject}</span>
                  <span className="text-emerald-700 font-mono">{b.currency}{b.hourlyRate}/hr</span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p>Tutor: {b.tutorName} · {b.date} at {b.timeSlot}</p>
                  <p className="text-slate-700 font-medium truncate">Topic: "{b.doubtTopic || 'General Exam Prep'}"</p>
                </div>
                {b.meetingLink && (
                  <a
                    href={b.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-indigo-600 font-semibold mt-2 hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Join Video Room
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutors.map(tutor => (
          <div
            key={tutor.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-200 transition-all p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={tutor.student.avatar}
                    alt={tutor.student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{tutor.student.name}</h3>
                    <IDCardBadge status={tutor.student.verificationStatus} size="sm" showLabel={false} />
                  </div>
                  <p className="text-xs text-indigo-600 font-medium mt-0.5">{tutor.gpaOrGrade}</p>
                  <p className="text-[11px] text-slate-400">{tutor.student.department} · {tutor.student.college}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    {tutor.currency}{tutor.hourlyRate}
                    <span className="text-[11px] font-normal text-slate-400">/hr</span>
                  </div>
                  <div className="text-[11px] text-amber-600 font-medium flex items-center justify-end gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{tutor.rating} ({tutor.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {tutor.bio}
              </p>

              {/* Subjects tags */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Courses Taught
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.subjects.map(s => (
                    <span
                      key={s}
                      className="px-2 py-0.5 text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability & Book Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{tutor.availableDays.join(', ')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    openChatWithUser(tutor.student, {
                      title: `Tutoring: ${tutor.subjects.join(', ')}`,
                      type: 'tutoring',
                      price: tutor.hourlyRate,
                      currency: tutor.currency
                    })
                  }
                  title={`Message tutor ${tutor.student.name}`}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => handleOpenBooking(tutor)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
                >
                  Book 1-on-1 Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedTutorForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Book Session with {selectedTutorForBooking.student.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Student Rate: {selectedTutorForBooking.currency}{selectedTutorForBooking.hourlyRate}/hr
                </p>
              </div>
              <button
                onClick={() => setSelectedTutorForBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Course / Topic</label>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {selectedTutorForBooking.subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
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
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="Next Monday">Next Monday</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Available Time Slot</label>
                  <select
                    value={bookingSlot}
                    onChange={e => setBookingSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {selectedTutorForBooking.availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">What doubt or topic do you want to cover?</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Need help understanding dynamic programming transition states and 2D arrays before midterm..."
                  value={doubtTopic}
                  onChange={e => setDoubtTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
                <p>• 1-on-1 direct video call via Google Meet</p>
                <p>• Fee payable directly via UPI, campus card, or cash</p>
                <p>• Free cancellation up to 2 hours before scheduled time</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTutorForBooking(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Confirm Peer Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Become a Tutor Drawer/Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Become a Verified Peer Tutor</h3>
                <p className="text-xs text-slate-500">Teach junior students and earn flexible income</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                setIsApplyModalOpen(false);
                showToast('Tutor profile activated! You can now receive student booking requests.');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-medium text-slate-700 mb-1">Subjects You Excel At (comma separated)</label>
                <input
                  type="text"
                  required
                  defaultValue="Data Structures, Calculus I, Python"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Hourly Fee ($ USD)</label>
                  <input
                    type="number"
                    defaultValue="14"
                    min="5"
                    max="50"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">GPA / Course Grade</label>
                  <input
                    type="text"
                    defaultValue="GPA 3.90 · A in CS101"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Tutor Bio & Teaching Style</label>
                <textarea
                  rows={3}
                  defaultValue="Senior student willing to help with problem sets, exam revision, and code debugging in simple terms."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Save Tutor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
