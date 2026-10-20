export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface CollegeConfig {
  name: string;
  shortName: string;
  emailDomain: string;
  campusType: string;
  motto: string;
  pickupSpots: string[];
  departments: string[];
  hostelBlocks: string[];
}

export interface StudentUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  college: string;
  rollNumber: string;
  department: string;
  graduationYear: string;
  studentEmail: string;
  studentType?: 'Hostel Resident' | 'Day Scholar';
  hostelBlock?: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  idCardImageUrl?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  bio?: string;
  reputationScore?: number;
}

export type PostCategory = 'general' | 'news' | 'study' | 'senior_advice' | 'confession' | 'lost_found' | 'events';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  userVotedOptionId?: string;
  totalVotes: number;
}

export interface PostComment {
  id: string;
  author: StudentUser;
  content: string;
  createdAt: string;
  likesCount: number;
  hasLiked?: boolean;
}

export interface Post {
  id: string;
  author: StudentUser;
  content: string;
  category: PostCategory;
  createdAt: string;
  likesCount: number;
  hasLiked?: boolean;
  repostsCount: number;
  hasReposted?: boolean;
  comments: PostComment[];
  mediaUrl?: string;
  poll?: Poll;
  tags: string[];
  pinned?: boolean;
  isOfficialAnnouncement?: boolean;
}

export type MarketplaceCategory = 'notes' | 'projects' | 'textbooks' | 'gear';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: MarketplaceCategory;
  price: number; // 0 for free
  currency: string;
  courseCode?: string;
  department: string;
  seller: StudentUser;
  fileType?: string; // e.g. "PDF (48 pages)", "ZIP (React/Node)", "Hardcover Book"
  previewImages?: string[];
  downloadsCount: number;
  rating: number;
  createdAt: string;
  downloadUrl?: string;
  pickupLocation?: string;
}

export interface TutorProfile {
  id: string;
  student: StudentUser;
  subjects: string[];
  gpaOrGrade: string; // e.g., "GPA 3.96 / A+ in CS201"
  hourlyRate: number;
  currency: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
  availableSlots: string[];
}

export interface TutorBooking {
  id: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  date: string;
  timeSlot: string;
  studentName: string;
  studentEmail: string;
  doubtTopic: string;
  hourlyRate: number;
  currency: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  createdAt: string;
}

export interface VerificationSubmission {
  id: string;
  studentName: string;
  college: string;
  rollNumber: string;
  department: string;
  graduationYear: string;
  studentEmail: string;
  idCardImageUrl: string;
  submittedAt: string;
  status: VerificationStatus;
  ocrConfidence: number;
  extractedData?: {
    nameMatch: boolean;
    collegeMatch: boolean;
    rollMatch: boolean;
  };
  moderatorNotes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  itemContext?: {
    title: string;
    type: 'notes' | 'project' | 'item' | 'tutoring' | 'mentorship';
    price?: number;
    currency?: string;
  };
}

export interface ChatConversation {
  id: string;
  peerUser: StudentUser;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  itemContext?: {
    title: string;
    type: 'notes' | 'project' | 'item' | 'tutoring' | 'mentorship';
    price?: number;
    currency?: string;
  };
  messages: ChatMessage[];
}

export type MentorRole = 'mnc_developer' | 'college_senior' | 'alumni' | 'cross_college_student';

export interface IndustryMentor {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: MentorRole;
  company?: string; // e.g. "Google", "Microsoft", "Amazon", "Adobe", "TCS Digital"
  jobTitle?: string; // e.g. "Software Engineer II", "Senior Backend Engineer", "AI Researcher"
  almaMater: string; // e.g. "Apex Institute ('22)", "Oakwood Univ", "IIT Delhi"
  currentCollege?: string;
  experienceYears?: number;
  techStack: string[];
  mentorshipTopics: string[]; // e.g. ["Mock DSA Interview", "System Design", "Resume Review", "MNC Referral Guidance"]
  hourlyFee: number; // 0 for free student help
  currency: string;
  bio: string;
  isVerified: boolean;
  verificationBadgeText: string; // e.g. "Verified SDE @ Google"
  rating: number;
  sessionsCompleted: number;
  linkedinUrl?: string;
  availableDays: string[];
  availableSlots: string[];
}

export interface MentorshipBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorCompany?: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'completed';
  meetingLink: string;
  createdAt: string;
}


