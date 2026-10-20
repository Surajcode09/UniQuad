import { StudentUser, Post, MarketplaceItem, TutorProfile, VerificationSubmission } from '../types';

export const SAMPLE_ID_CARD_IMAGE = '/src/assets/images/sample_student_id_card_1792475132065.jpg';
export const CAMPUS_BANNER_IMAGE = '/src/assets/images/campus_quad_banner_1792475131036.jpg';
export const AVATAR_MARCUS = '/src/assets/images/student_avatar_marcus_1792475131708.jpg';
export const AVATAR_ELENA = '/src/assets/images/student_avatar_elena_1792475131798.jpg';

export const DEFAULT_COLLEGE_CONFIG: import('../types').CollegeConfig = {
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
    'Student Council Centre'
  ],
  departments: [
    'Computer Science & Engineering',
    'Electronics & Communication (ECE)',
    'Mechanical Engineering',
    'Electrical & Electronics (EEE)',
    'Information Technology (IT)',
    'Biotechnology',
    'Business Administration (BBA/MBA)'
  ],
  hostelBlocks: [
    'Hostel Block A (Aryabhata)',
    'Hostel Block B (Bhaskara)',
    'Girls Hostel Block C (Kalpana)',
    'Girls Hostel Block D (Gargi)',
    'Day Scholar (Off-Campus)'
  ]
};

export const TOP_COLLEGES = [
  'Apex Institute of Technology & Sciences',
  'Oakwood University',
  'Stanford University',
  'UC Berkeley',
  'MIT',
  'IIT Delhi',
  'Custom Private College'
];

export const INITIAL_CURRENT_USER: StudentUser = {
  id: 'current_user_1',
  name: 'Alex Rivera',
  username: 'alex_r',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  college: 'Oakwood University',
  rollNumber: '2023-CS-8842',
  department: 'Computer Science & Engineering',
  graduationYear: '2026',
  studentEmail: 'arivera@oakwood.edu',
  isVerified: false, // Starts unverified so the ID card upload component can be immediately tested and used!
  verificationStatus: 'unverified',
  bio: 'Junior CS student passionate about distributed systems, peer study, and algorithms.',
  reputationScore: 4.8
};

export const VERIFIED_DEMO_USER: StudentUser = {
  id: 'verified_user_eliza',
  name: 'Eliza Jane Carter',
  username: 'eliza_carter',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  college: 'Oakwood University',
  rollNumber: '23140597',
  department: 'Computer Science',
  graduationYear: '2027',
  studentEmail: 'eliza.carter@oakwood.edu',
  isVerified: true,
  verificationStatus: 'verified',
  idCardImageUrl: SAMPLE_ID_CARD_IMAGE,
  verifiedAt: '15 Aug 2023',
  bio: 'Sophomore CS major · Dean\'s Honor List · Algo & Data Structures tutor',
  reputationScore: 4.95
};

export const MOCK_USERS: Record<string, StudentUser> = {
  eliza: VERIFIED_DEMO_USER,
  marcus: {
    id: 'user_marcus',
    name: 'Marcus Chen',
    username: 'marcus_codes',
    avatar: AVATAR_MARCUS,
    college: 'Oakwood University',
    rollNumber: '2022-EE-4192',
    department: 'Electrical Engineering',
    graduationYear: '2025',
    studentEmail: 'mchen@oakwood.edu',
    isVerified: true,
    verificationStatus: 'verified',
    bio: 'Senior EE & Embedded Systems. Senior IEEE chapter lead. Building open-source drone autopilot.',
    reputationScore: 4.9
  },
  elena: {
    id: 'user_elena',
    name: 'Elena Rostova',
    username: 'elena_thermo',
    avatar: AVATAR_ELENA,
    college: 'Oakwood University',
    rollNumber: '2024-ME-1029',
    department: 'Mechanical Engineering',
    graduationYear: '2026',
    studentEmail: 'erostova@oakwood.edu',
    isVerified: true,
    verificationStatus: 'verified',
    bio: 'Junior ME · Fluid mechanics, thermodynamics & finite element modeling enthusiast.',
    reputationScore: 4.92
  },
  tariq: {
    id: 'user_tariq',
    name: 'Tariq Al-Mansoor',
    username: 'tariq_econ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    college: 'Oakwood University',
    rollNumber: '2023-EC-5510',
    department: 'Economics & Statistics',
    graduationYear: '2026',
    studentEmail: 'talmansoor@oakwood.edu',
    isVerified: true,
    verificationStatus: 'verified',
    bio: 'Econometrics & Game Theory TA. Peer tutor available on weekday evenings.',
    reputationScore: 4.88
  },
  priya: {
    id: 'user_priya',
    name: 'Priya Sharma',
    username: 'priya_cloud',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    college: 'Apex Institute (Alumni \'22) · SDE @ Google',
    rollNumber: 'ALUMNI-2022',
    department: 'Computer Science (Distributed Systems)',
    graduationYear: '2022',
    studentEmail: 'priya@alumni.aits.edu',
    isVerified: true,
    verificationStatus: 'verified',
    bio: 'SDE II @ Google Cloud. College alumni dedicated to helping juniors crack product MNCs.',
    reputationScore: 4.99
  },
  kavya: {
    id: 'user_kavya',
    name: 'Kavya Nair',
    username: 'kavya_senior',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    college: 'Apex Institute · Senior Year (Placed @ Oracle)',
    rollNumber: '2021-CS-3312',
    department: 'Computer Science & Engineering',
    graduationYear: '2025',
    studentEmail: 'knair@aits.edu',
    isVerified: true,
    verificationStatus: 'verified',
    bio: 'Senior Year CS. Placed at Oracle during Day 1 recruitment. Mentoring 2nd/3rd years on placement prep.',
    reputationScore: 4.96
  }
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_senior_1',
    author: MOCK_USERS.priya,
    content: '📢 To all college juniors aiming for Google, Microsoft & top MNC drives this year: Here is the unfiltered roadmap that helped me crack Google off-campus from our college:\n\n1. Do NOT try to solve 1000 LeetCode problems blindly. Master the Blind 75 and Striver SDE sheet thoroughly.\n2. In tech interviews, MNC interviewers care 60% about your problem-solving thought process and communication, and 40% about syntax.\n3. Build 2 production projects with Docker, Redis caching, and real unit tests rather than generic todo-list clones.\n\nI have free 1-on-1 mentorship and resume review slots open this weekend under the "Seniors & MNC Mentors" tab. Drop me a chat if you need advice! 🚀',
    category: 'senior_advice',
    createdAt: '12m ago',
    likesCount: 84,
    hasLiked: false,
    repostsCount: 37,
    hasReposted: false,
    tags: ['#MNCGuidance', '#GoogleCareers', '#SeniorsBridge', '#InterviewPrep'],
    comments: [
      {
        id: 'cp1',
        author: MOCK_USERS.marcus,
        content: 'Thank you Priya di! This is gold for our batch. Just booked a slot for Saturday!',
        createdAt: '8m ago',
        likesCount: 12
      }
    ]
  },
  {
    id: 'post_senior_2',
    author: MOCK_USERS.kavya,
    content: '🎓 Final Year Placement Drive Updates:\nI just compiled our college\'s On-Campus Placement Drive question bank: covers all aptitude formulas, technical MCQs for OS, DBMS, Computer Networks, and the exact 20 SQL query questions asked during Day 1 drives.\n\nUploaded the full PDF for FREE in the Notes & Projects Marketplace. Best of luck juniors, you\'ve got this! Feel free to DM me with any doubts.',
    category: 'senior_advice',
    createdAt: '45m ago',
    likesCount: 65,
    hasLiked: false,
    repostsCount: 29,
    hasReposted: false,
    tags: ['#CampusPlacements', '#Oracle', '#SeniorAdvice', '#PlacementNotes'],
    comments: []
  },
  {
    id: 'post_1',
    author: MOCK_USERS.eliza,
    content: 'Just uploaded complete handwritten lecture notes with annotated diagrams for CS201 (Algorithms & Data Structures - Weeks 1 to 10) in the Marketplace! Includes all proofs for Dijkstra, Bellman-Ford, and dynamic programming memoization. Free for Oakwood CS juniors 📚✨',
    category: 'study',
    createdAt: '22m ago',
    likesCount: 38,
    hasLiked: false,
    repostsCount: 12,
    hasReposted: false,
    tags: ['#CS201', '#Algorithms', '#NotesShare', '#FinalsWeek'],
    comments: [
      {
        id: 'c1',
        author: MOCK_USERS.marcus,
        content: 'Your diagrams on red-black tree rotations saved my midterm last semester. Downloading this now!',
        createdAt: '15m ago',
        likesCount: 6
      },
      {
        id: 'c2',
        author: MOCK_USERS.elena,
        content: 'Thank you Eliza! Does this also include the segment tree implementation exercises from Week 8?',
        createdAt: '9m ago',
        likesCount: 2
      }
    ]
  },
  {
    id: 'post_2',
    author: MOCK_USERS.marcus,
    content: 'Quick poll for anyone preparing for tech placement interviews or summer internships this semester: Which topic are you finding most challenging right now?',
    category: 'study',
    createdAt: '1h ago',
    likesCount: 54,
    hasLiked: false,
    repostsCount: 19,
    hasReposted: false,
    poll: {
      question: 'Which topic are you finding most challenging?',
      options: [
        { id: 'opt1', text: 'Dynamic Programming & Graphs', votes: 142 },
        { id: 'opt2', text: 'System Design & Scalability', votes: 89 },
        { id: 'opt3', text: 'Operating Systems & Concurrency', votes: 34 },
        { id: 'opt4', text: 'Behavioral & Portfolio Review', votes: 21 }
      ],
      totalVotes: 286
    },
    tags: ['#Internships', '#InterviewPrep', '#CareerHub', '#OakwoodEng'],
    comments: []
  },
  {
    id: 'post_3',
    author: MOCK_USERS.elena,
    content: '🚨 LOST & FOUND: Found a gray Apple iPad Air with an engineering drafting stylus in the Science Library 3rd floor quiet study zone around 4:30 PM. The lock screen has a photo of an orange tabby cat. Handed it over to the 1st floor front desk supervisor!',
    category: 'lost_found',
    createdAt: '3h ago',
    likesCount: 46,
    hasLiked: false,
    repostsCount: 24,
    hasReposted: false,
    tags: ['#LostAndFound', '#ScienceLibrary', '#CampusWatch'],
    comments: [
      {
        id: 'c3',
        author: MOCK_USERS.tariq,
        content: 'Boosted! Hope whoever lost it gets it before finals start.',
        createdAt: '2h ago',
        likesCount: 4
      }
    ]
  },
  {
    id: 'post_4',
    author: MOCK_USERS.tariq,
    content: 'Opening up 4 new 1-on-1 peer tutoring slots this weekend for ECON 210 (Microeconomic Theory) and STAT 150! Student-friendly rate of $14/hour. We will review past exam problems, utility maximization, and consumer surplus curves. Book directly through the Tutors tab 📈',
    category: 'news',
    createdAt: '5h ago',
    likesCount: 29,
    hasLiked: false,
    repostsCount: 7,
    hasReposted: false,
    tags: ['#PeerTutoring', '#Econ210', '#DoubtClearing', '#StudyGroup'],
    comments: []
  },
  {
    id: 'post_5',
    author: MOCK_USERS.marcus,
    content: 'Campus Notice: The Annual Hackathon registration closes tomorrow at midnight. We already have 42 student teams registered. Remember all team leads must verify their student ID card on UniQuad to claim hardware kits from the lab!',
    category: 'events',
    createdAt: '8h ago',
    likesCount: 93,
    hasLiked: false,
    repostsCount: 41,
    hasReposted: false,
    tags: ['#CampusHackathon', '#StudentInnovators', '#OakwoodTech'],
    comments: []
  }
];

export const INITIAL_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'item_1',
    title: 'Complete CS201 Data Structures & Algorithms Handwritten Notes',
    description: 'Comprehensive 64-page hand-annotated PDF guide covering Asymptotic Analysis, Hash Tables, Balanced Trees (AVL, Red-Black), Heaps, Graph BFS/DFS, Shortest Paths, Dynamic Programming, and Amortized Analysis with code snippets in C++ and Python.',
    category: 'notes',
    price: 0, // Free!
    currency: '$',
    courseCode: 'CS 201',
    department: 'Computer Science',
    seller: MOCK_USERS.eliza,
    fileType: 'PDF Document (64 Pages · 18.4 MB)',
    downloadsCount: 342,
    rating: 4.95,
    createdAt: '3 days ago'
  },
  {
    id: 'item_2',
    title: 'Autonomous Drone Flight Controller - Complete Final Year Project',
    description: 'Full hardware schematic (KiCad), PCB layout, C++ firmware for STM32, and ROS2 companion node. Includes comprehensive 85-page project report, presentation slides, and sensor calibration scripts for IMU and barometer.',
    category: 'projects',
    price: 15,
    currency: '$',
    courseCode: 'EE 495',
    department: 'Electrical Engineering',
    seller: MOCK_USERS.marcus,
    fileType: 'ZIP Archive (Firmware + Schematics + Docs · 142 MB)',
    downloadsCount: 88,
    rating: 4.9,
    createdAt: '1 week ago'
  },
  {
    id: 'item_3',
    title: 'ME 202 Thermodynamics Formula Sheet & Solved Midterm Archive',
    description: 'High-yield 12-page summary of 1st and 2nd Law of Thermo, Carnot efficiency, Rankine & Brayton cycles, psychrometric charts, and 5 years of step-by-step solved past midterm exam questions.',
    category: 'notes',
    price: 4,
    currency: '$',
    courseCode: 'ME 202',
    department: 'Mechanical Engineering',
    seller: MOCK_USERS.elena,
    fileType: 'PDF Document (12 Pages · 6.2 MB)',
    downloadsCount: 176,
    rating: 4.88,
    createdAt: '5 days ago'
  },
  {
    id: 'item_4',
    title: 'TI-84 Plus CE Color Graphing Calculator (Like New)',
    description: 'Lightly used for one semester of Multivariable Calculus. Includes original rechargeable battery, slide cover, USB charging cable, and pre-loaded math utility apps. In perfect working condition.',
    category: 'gear',
    price: 45,
    currency: '$',
    courseCode: 'MATH 104',
    department: 'Mathematics',
    seller: MOCK_USERS.tariq,
    fileType: 'Physical Campus Pickup (Science Quad)',
    downloadsCount: 14,
    rating: 5.0,
    createdAt: '2 days ago'
  },
  {
    id: 'item_5',
    title: 'Principles of Economics (N. Gregory Mankiw, 9th Edition)',
    description: 'Hardcover textbook in excellent condition. No highlighting or marks. Perfect for ECON 101/102. Can deliver anywhere on campus or hostel commons.',
    category: 'textbooks',
    price: 25,
    currency: '$',
    courseCode: 'ECON 101',
    department: 'Economics',
    seller: MOCK_USERS.tariq,
    fileType: 'Hardcover Book (Campus Handover)',
    downloadsCount: 9,
    rating: 4.9,
    createdAt: '4 days ago'
  },
  {
    id: 'item_6',
    title: 'Full-Stack Campus Food Ordering App (React + Node.js + SQL)',
    description: 'Production-ready academic term project featuring student authentication, food vendor dashboard, cart management, simulated Stripe payment, and live order tracking with WebSockets.',
    category: 'projects',
    price: 18,
    currency: '$',
    courseCode: 'CS 330',
    department: 'Software Engineering',
    seller: MOCK_USERS.eliza,
    fileType: 'ZIP Repository (Full Codebase + Setup Guide)',
    downloadsCount: 65,
    rating: 4.85,
    createdAt: '2 weeks ago'
  }
];

export const INITIAL_TUTORS: TutorProfile[] = [
  {
    id: 'tutor_1',
    student: MOCK_USERS.eliza,
    subjects: ['Data Structures (CS 201)', 'Algorithms (CS 301)', 'Python & C++', 'Discrete Math'],
    gpaOrGrade: 'GPA 3.98 · A+ in Algorithms',
    hourlyRate: 15,
    currency: '$',
    bio: 'Hi! I am a junior CS major. I specialize in breaking down complex recursion, tree traversals, and dynamic programming into intuitive step-by-step visual mental models. Over 60+ hours of peer tutoring experience.',
    rating: 4.96,
    reviewsCount: 38,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['4:00 PM - 5:00 PM', '5:30 PM - 6:30 PM', '7:00 PM - 8:00 PM']
  },
  {
    id: 'tutor_2',
    student: MOCK_USERS.marcus,
    subjects: ['Circuit Analysis (EE 101)', 'Digital Logic Design', 'Embedded Systems (ARM/STM32)', 'C Programming'],
    gpaOrGrade: 'GPA 3.91 · A+ in Microcontrollers',
    hourlyRate: 18,
    currency: '$',
    bio: 'Senior IEEE lead offering practical, lab-tested tutoring. Struggling with oscilloscope measurements, logic synthesis, or circuit breadboarding? Let\'s fix your doubts before lab submissions.',
    rating: 4.92,
    reviewsCount: 29,
    availableDays: ['Tue', 'Thu', 'Sat', 'Sun'],
    availableSlots: ['3:00 PM - 4:00 PM', '6:00 PM - 7:00 PM']
  },
  {
    id: 'tutor_3',
    student: MOCK_USERS.elena,
    subjects: ['Engineering Thermodynamics', 'Fluid Mechanics', 'Statics & Dynamics', 'Calculus III'],
    gpaOrGrade: 'GPA 3.94 · Dean\'s Academic Honors',
    hourlyRate: 14,
    currency: '$',
    bio: 'Junior Mechanical Eng. I love helping students conquer thermo cycles, entropy balance, and vector calculus. I provide practice sheets and formula breakdowns with each 1-on-1 session.',
    rating: 4.95,
    reviewsCount: 24,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    availableSlots: ['2:00 PM - 3:00 PM', '5:00 PM - 6:00 PM', '6:30 PM - 7:30 PM']
  },
  {
    id: 'tutor_4',
    student: MOCK_USERS.tariq,
    subjects: ['Microeconomics (ECON 210)', 'Macroeconomics', 'Business Statistics', 'Econometrics (R / Stata)'],
    gpaOrGrade: 'GPA 3.89 · Department TA',
    hourlyRate: 12,
    currency: '$',
    bio: 'Economics & Statistics senior. Reasonable rates so everyone can master market equilibrium, regression models, and hypothesis testing without stress.',
    rating: 4.88,
    reviewsCount: 31,
    availableDays: ['Wed', 'Fri', 'Sat', 'Sun'],
    availableSlots: ['11:00 AM - 12:00 PM', '4:00 PM - 5:00 PM', '7:00 PM - 8:00 PM']
  }
];

export const INITIAL_VERIFICATION_SUBMISSIONS: VerificationSubmission[] = [
  {
    id: 'sub_1',
    studentName: 'Eliza Jane Carter',
    college: 'Oakwood University',
    rollNumber: '23140597',
    department: 'Computer Science',
    graduationYear: '2027',
    studentEmail: 'eliza.carter@oakwood.edu',
    idCardImageUrl: SAMPLE_ID_CARD_IMAGE,
    submittedAt: '15 Aug 2023 · 10:14 AM',
    status: 'verified',
    ocrConfidence: 98.6,
    extractedData: {
      nameMatch: true,
      collegeMatch: true,
      rollMatch: true
    },
    moderatorNotes: 'Official Oakwood University Student ID card verified with matching institutional email and department records.'
  },
  {
    id: 'sub_2',
    studentName: 'Rohan Mehta',
    college: 'Oakwood University',
    rollNumber: '2024-BIO-3319',
    department: 'Biotechnology & Bioinformatics',
    graduationYear: '2026',
    studentEmail: 'rmehta@oakwood.edu',
    idCardImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    submittedAt: 'Today · 14 mins ago',
    status: 'pending',
    ocrConfidence: 94.2,
    extractedData: {
      nameMatch: true,
      collegeMatch: true,
      rollMatch: true
    },
    moderatorNotes: 'Awaiting campus admin review. Student requested verified badge to list Organic Chemistry lab records.'
  }
];

export const INITIAL_CONVERSATIONS: import('../types').ChatConversation[] = [
  {
    id: 'conv_eliza',
    peerUser: MOCK_USERS.eliza,
    lastMessage: 'Definitely! You can book the 4:00 PM slot directly on the Tutors tab or we can meet at the Science Library cafe.',
    lastMessageTime: '12m ago',
    unreadCount: 1,
    itemContext: {
      title: 'Complete CS201 Data Structures & Algorithms Handwritten Notes',
      type: 'notes',
      price: 0,
      currency: '$'
    },
    messages: [
      {
        id: 'msg_1',
        senderId: 'verified_user_eliza',
        senderName: 'Eliza Jane Carter',
        content: 'Hey Alex! Saw you downloaded the CS201 Algorithms notes. Let me know if you need any clarification on the Bellman-Ford shortest paths proofs or AVL rotations!',
        timestamp: '1:45 PM',
        isCurrentUser: false
      },
      {
        id: 'msg_2',
        senderId: 'current_user_1',
        senderName: 'Alex Rivera',
        content: 'Hey Eliza! The notes are incredible, especially the color-coded recursive tree breakdown. Are you free for a 15-minute doubt session this Thursday before the midterm?',
        timestamp: '1:52 PM',
        isCurrentUser: true
      },
      {
        id: 'msg_3',
        senderId: 'verified_user_eliza',
        senderName: 'Eliza Jane Carter',
        content: 'Definitely! You can book the 4:00 PM slot directly on the Tutors tab or we can meet at the Science Library cafe.',
        timestamp: '1:55 PM',
        isCurrentUser: false
      }
    ]
  },
  {
    id: 'conv_marcus',
    peerUser: MOCK_USERS.marcus,
    lastMessage: 'Yes, in the /calibration directory inside the ZIP archive! All sensor offsets are logged.',
    lastMessageTime: '1h ago',
    unreadCount: 0,
    itemContext: {
      title: 'Autonomous Drone Flight Controller Project',
      type: 'project',
      price: 15,
      currency: '$'
    },
    messages: [
      {
        id: 'msg_m1',
        senderId: 'user_marcus',
        senderName: 'Marcus Chen',
        content: 'Hey! Saw you were checking out the STM32 drone flight controller firmware. The ROS2 nodes run on Ubuntu 22.04 LTS.',
        timestamp: '11:20 AM',
        isCurrentUser: false
      },
      {
        id: 'msg_m2',
        senderId: 'current_user_1',
        senderName: 'Alex Rivera',
        content: 'Thanks Marcus! Does the package also contain the PID tuning parameters for dual-rotor tests?',
        timestamp: '11:35 AM',
        isCurrentUser: true
      },
      {
        id: 'msg_m3',
        senderId: 'user_marcus',
        senderName: 'Marcus Chen',
        content: 'Yes, in the /calibration directory inside the ZIP archive! All sensor offsets are logged.',
        timestamp: '11:40 AM',
        isCurrentUser: false
      }
    ]
  },
  {
    id: 'conv_tariq',
    peerUser: MOCK_USERS.tariq,
    lastMessage: 'Sure, I can meet you by the Science Quad at 3:30 PM with the TI-84 calculator.',
    lastMessageTime: '3h ago',
    unreadCount: 0,
    itemContext: {
      title: 'TI-84 Plus CE Color Graphing Calculator',
      type: 'item',
      price: 45,
      currency: '$'
    },
    messages: [
      {
        id: 'msg_t1',
        senderId: 'current_user_1',
        senderName: 'Alex Rivera',
        content: 'Hi Tariq! Is the TI-84 Plus CE graphing calculator still available for campus pickup?',
        timestamp: '9:15 AM',
        isCurrentUser: true
      },
      {
        id: 'msg_t2',
        senderId: 'user_tariq',
        senderName: 'Tariq Al-Mansoor',
        content: 'Sure, I can meet you by the Science Quad at 3:30 PM with the TI-84 calculator. Battery is fully charged!',
        timestamp: '9:30 AM',
        isCurrentUser: false
      }
    ]
  }
];

export const INITIAL_MENTORS: import('../types').IndustryMentor[] = [
  {
    id: 'mentor_priya',
    name: 'Priya Sharma',
    username: 'priya_cloud',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    role: 'mnc_developer',
    company: 'Google',
    jobTitle: 'Software Engineer II (Google Cloud)',
    almaMater: 'Class of 2022 Alumni',
    experienceYears: 4,
    techStack: ['Go', 'Kubernetes', 'Distributed Systems', 'C++', 'GCP'],
    mentorshipTopics: [
      'Google Mock Coding & DSA Interview',
      'System Design Fundamentals',
      'Resume Review for FAANG / Big Tech',
      'MNC Referral Guidance'
    ],
    hourlyFee: 0, // Free alumni mentoring for juniors!
    currency: '$',
    bio: 'Proud college alumni currently building distributed storage & Kubernetes orchestration at Google. Passionate about helping students from our college crack tier-1 product MNC interviews.',
    isVerified: true,
    verificationBadgeText: 'Verified SDE @ Google',
    rating: 4.98,
    sessionsCompleted: 47,
    linkedinUrl: 'https://linkedin.com',
    availableDays: ['Sat', 'Sun'],
    availableSlots: ['10:00 AM - 11:00 AM', '3:00 PM - 4:00 PM', '6:00 PM - 7:00 PM']
  },
  {
    id: 'mentor_david',
    name: 'David Kim',
    username: 'david_kim_dev',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    role: 'mnc_developer',
    company: 'Microsoft',
    jobTitle: 'Senior Software Engineer (Azure)',
    almaMater: 'Stanford University (Class of \'21)',
    experienceYears: 5,
    techStack: ['TypeScript', 'C#', '.NET Core', 'React', 'Azure Cosmos DB'],
    mentorshipTopics: [
      'Microsoft SDE Hiring Roadmap',
      'Full-Stack Architecture & Microservices',
      'Behavioral Interview (STAR method)',
      'Clean Code & Design Patterns'
    ],
    hourlyFee: 15,
    currency: '$',
    bio: 'Senior engineer at Microsoft Azure Developer Tools. I conduct 1-on-1 code architecture teardowns, behavioral mock rounds, and portfolio code reviews for aspiring software engineers.',
    isVerified: true,
    verificationBadgeText: 'Verified Senior SDE @ Microsoft',
    rating: 4.95,
    sessionsCompleted: 62,
    linkedinUrl: 'https://linkedin.com',
    availableDays: ['Fri', 'Sat', 'Sun'],
    availableSlots: ['5:00 PM - 6:00 PM', '7:30 PM - 8:30 PM']
  },
  {
    id: 'mentor_arjun',
    name: 'Arjun Patel',
    username: 'arjun_aws',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    role: 'mnc_developer',
    company: 'Amazon',
    jobTitle: 'SDE II (AWS DynamoDB)',
    almaMater: 'IIT Delhi (Class of \'20)',
    experienceYears: 4,
    techStack: ['Java', 'Distributed NoSQL', 'Kafka', 'High-Throughput Concurrency'],
    mentorshipTopics: [
      'Amazon Leadership Principles (LP) Mastery',
      'Graph Algorithms & Dynamic Programming',
      'Off-Campus MNC Referral Strategy',
      'Low-Level Object Oriented Design (LLD)'
    ],
    hourlyFee: 12,
    currency: '$',
    bio: 'Working on core AWS database clustering. I help students navigate Amazon online assessments (OA), solve tough tree/graph DP problems, and frame project impact on their resumes.',
    isVerified: true,
    verificationBadgeText: 'Verified SDE II @ Amazon',
    rating: 4.92,
    sessionsCompleted: 39,
    linkedinUrl: 'https://linkedin.com',
    availableDays: ['Wed', 'Thu', 'Sat'],
    availableSlots: ['6:00 PM - 7:00 PM', '8:00 PM - 9:00 PM']
  },
  {
    id: 'mentor_kavya',
    name: 'Kavya Nair',
    username: 'kavya_senior',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    role: 'college_senior',
    company: 'Oracle (Placed Class of 2025)',
    jobTitle: 'Final Year Senior & Placement Representative',
    almaMater: 'Current College (Class of \'25)',
    experienceYears: 1,
    techStack: ['Python', 'SQL', 'DBMS', 'Operating Systems', 'Aptitude & Puzzles'],
    mentorshipTopics: [
      'On-Campus Placement Drive Preparation',
      'Aptitude Tests & Technical Quiz Hacks',
      'Core CS Fundamentals (OS, DBMS, CN, OOPs)',
      'Final Year Project Defense Advice'
    ],
    hourlyFee: 0, // Free senior guidance for junior college batch!
    currency: '$',
    bio: 'Senior Year CS. Placed at Oracle during Day 1 campus recruitment. Ready to mentor 2nd and 3rd year juniors on how to prepare for aptitude rounds, technical HR interviews, and GPA maintenance.',
    isVerified: true,
    verificationBadgeText: 'Senior Year · Placed @ Oracle',
    rating: 4.97,
    sessionsCompleted: 53,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableSlots: ['4:30 PM - 5:30 PM', '6:30 PM - 7:30 PM']
  },
  {
    id: 'mentor_lucas',
    name: 'Lucas Meyer',
    username: 'lucas_cal',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    role: 'cross_college_student',
    company: 'Cal Hacks Lead',
    jobTitle: 'Junior CS Major @ UC Berkeley',
    almaMater: 'UC Berkeley (Class of \'26)',
    experienceYears: 2,
    techStack: ['PyTorch', 'Next.js', 'LLMs', 'FastAPI', 'Rust'],
    mentorshipTopics: [
      'Inter-College Hackathon Team Teaming',
      'Open-Source (GSoC / LFX) Contribution Guide',
      'Building Full-Stack AI Prototypes',
      'Cross-Campus Project Collaborations'
    ],
    hourlyFee: 0,
    currency: '$',
    bio: 'Lead organizer at Cal Hacks. Looking to connect with ambitious student developers from colleges worldwide to collaborate on open-source packages, global hackathons, and research projects.',
    isVerified: true,
    verificationBadgeText: 'Verified Student @ UC Berkeley',
    rating: 4.89,
    sessionsCompleted: 28,
    availableDays: ['Tue', 'Thu', 'Sat'],
    availableSlots: ['2:00 PM - 3:00 PM', '5:00 PM - 6:00 PM']
  }
];


