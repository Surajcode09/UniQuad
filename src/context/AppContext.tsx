import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentUser,
  Post,
  MarketplaceItem,
  TutorProfile,
  TutorBooking,
  VerificationSubmission,
  VerificationStatus,
  PostCategory,
  MarketplaceCategory,
  ChatConversation,
  ChatMessage,
  CollegeConfig,
  IndustryMentor,
  MentorshipBooking
} from '../types';
import {
  INITIAL_CURRENT_USER,
  VERIFIED_DEMO_USER,
  MOCK_USERS,
  INITIAL_POSTS,
  INITIAL_MARKETPLACE_ITEMS,
  INITIAL_TUTORS,
  INITIAL_VERIFICATION_SUBMISSIONS,
  INITIAL_CONVERSATIONS,
  DEFAULT_COLLEGE_CONFIG,
  INITIAL_MENTORS
} from '../data/mockData';

interface AppContextType {
  currentUser: StudentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<StudentUser>>;
  activeTab: 'feed' | 'marketplace' | 'tutors' | 'mentors' | 'chat' | 'verification' | 'moderator';
  setActiveTab: (tab: 'feed' | 'marketplace' | 'tutors' | 'mentors' | 'chat' | 'verification' | 'moderator') => void;
  selectedCollege: string;
  setSelectedCollege: (college: string) => void;
  posts: Post[];
  createPost: (content: string, category: PostCategory, tags: string[], pollQuestion?: string, pollOptions?: string[]) => boolean;
  toggleLikePost: (postId: string) => void;
  toggleRepost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;
  voteInPoll: (postId: string, optionId: string) => void;
  marketplaceItems: MarketplaceItem[];
  createMarketplaceItem: (item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'seller' | 'downloadsCount' | 'rating'>) => boolean;
  tutors: TutorProfile[];
  bookings: TutorBooking[];
  bookTutorSession: (tutorId: string, subject: string, date: string, timeSlot: string, doubtTopic: string) => boolean;
  mentors: IndustryMentor[];
  mentorshipBookings: MentorshipBooking[];
  bookMentorshipSession: (mentorId: string, topic: string, date: string, timeSlot: string) => boolean;
  submissions: VerificationSubmission[];
  isVerificationModalOpen: boolean;
  verificationTriggerReason: string;
  openVerificationModal: (reason?: string) => void;
  closeVerificationModal: () => void;
  submitIdVerification: (data: {
    fullName: string;
    college: string;
    rollNumber: string;
    department: string;
    graduationYear: string;
    studentEmail: string;
    idCardImageUrl: string;
    instantApprove?: boolean;
  }) => void;
  approveSubmission: (submissionId: string) => void;
  rejectSubmission: (submissionId: string, reason: string) => void;
  switchUserPreset: (preset: 'unverified' | 'verified_eliza' | 'moderator') => void;
  userPreset: 'unverified' | 'verified_eliza' | 'moderator';
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // 1-to-1 Chat additions
  conversations: import('../types').ChatConversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  isChatDrawerOpen: boolean;
  openChatWithUser: (
    peerUser: StudentUser,
    itemContext?: import('../types').ChatConversation['itemContext'],
    initialMsg?: string
  ) => void;
  closeChatDrawer: () => void;
  sendMessage: (conversationId: string, content: string) => void;
  totalUnreadMessages: number;
  collegeConfig: CollegeConfig;
  updateCollegeConfig: (newConfig: Partial<CollegeConfig>) => void;
  isCollegeModalOpen: boolean;
  openCollegeModal: () => void;
  closeCollegeModal: () => void;
  addMentor: (mentorData: Omit<IndustryMentor, 'id' | 'rating' | 'sessionsCompleted' | 'isVerified'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collegeConfig, setCollegeConfig] = useState<CollegeConfig>(() => {
    const saved = localStorage.getItem('uniquad_college_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_COLLEGE_CONFIG;
  });

  const [currentUser, setCurrentUser] = useState<StudentUser>(() => {
    const saved = localStorage.getItem('uniquad_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CURRENT_USER;
  });

  const [userPreset, setUserPreset] = useState<'unverified' | 'verified_eliza' | 'moderator'>('unverified');
  const [activeTab, setActiveTab] = useState<'feed' | 'marketplace' | 'tutors' | 'mentors' | 'chat' | 'verification' | 'moderator'>('feed');
  const [selectedCollege, setSelectedCollege] = useState<string>('All Colleges');
  const [mentors, setMentors] = useState<IndustryMentor[]>(() => {
    const saved = localStorage.getItem('uniquad_mentors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MENTORS;
  });
  const [mentorshipBookings, setMentorshipBookings] = useState<MentorshipBooking[]>(() => {
    const saved = localStorage.getItem('uniquad_mentor_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('uniquad_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_POSTS;
  });

  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('uniquad_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MARKETPLACE_ITEMS;
  });

  const [tutors, setTutors] = useState<TutorProfile[]>(INITIAL_TUTORS);
  const [bookings, setBookings] = useState<TutorBooking[]>([]);
  const [submissions, setSubmissions] = useState<VerificationSubmission[]>(() => {
    const saved = localStorage.getItem('uniquad_submissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_VERIFICATION_SUBMISSIONS;
  });

  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationTriggerReason, setVerificationTriggerReason] = useState<string>('general');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1-to-1 Chat State
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = localStorage.getItem('uniquad_conversations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    INITIAL_CONVERSATIONS[0]?.id || null
  );
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('uniquad_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('uniquad_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('uniquad_items', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  useEffect(() => {
    localStorage.setItem('uniquad_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('uniquad_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const openVerificationModal = (reason = 'general') => {
    setVerificationTriggerReason(reason);
    setIsVerificationModalOpen(true);
  };

  const closeVerificationModal = () => {
    setIsVerificationModalOpen(false);
  };

  const openCollegeModal = () => {
    setIsCollegeModalOpen(true);
  };

  const closeCollegeModal = () => {
    setIsCollegeModalOpen(false);
  };

  const switchUserPreset = (preset: 'unverified' | 'verified_eliza' | 'moderator') => {
    setUserPreset(preset);
    if (preset === 'unverified') {
      setCurrentUser({
        ...INITIAL_CURRENT_USER,
        isVerified: false,
        verificationStatus: 'unverified'
      });
      showToast('Switched to Unverified Student view (Alex Rivera)');
    } else if (preset === 'verified_eliza') {
      setCurrentUser(VERIFIED_DEMO_USER);
      showToast('Switched to Verified Student view (Eliza Jane Carter)');
    } else if (preset === 'moderator') {
      setActiveTab('moderator');
      showToast('Switched to Campus Moderator review console');
    }
  };

  const submitIdVerification = (data: {
    fullName: string;
    college: string;
    rollNumber: string;
    department: string;
    graduationYear: string;
    studentEmail: string;
    idCardImageUrl: string;
    instantApprove?: boolean;
  }) => {
    const submissionId = `sub_${Date.now()}`;
    const newStatus: VerificationStatus = data.instantApprove ? 'verified' : 'pending';

    const newSubmission: VerificationSubmission = {
      id: submissionId,
      studentName: data.fullName,
      college: data.college,
      rollNumber: data.rollNumber,
      department: data.department,
      graduationYear: data.graduationYear,
      studentEmail: data.studentEmail,
      idCardImageUrl: data.idCardImageUrl,
      submittedAt: 'Just now',
      status: newStatus,
      ocrConfidence: 97.8,
      extractedData: {
        nameMatch: true,
        collegeMatch: true,
        rollMatch: true
      },
      moderatorNotes: data.instantApprove
        ? 'Verified automatically via Campus OCR & Institutional Email validation.'
        : 'Submitted for Campus Administrator manual review.'
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    const updatedUser: StudentUser = {
      ...currentUser,
      name: data.fullName,
      college: data.college,
      rollNumber: data.rollNumber,
      department: data.department,
      graduationYear: data.graduationYear,
      studentEmail: data.studentEmail,
      idCardImageUrl: data.idCardImageUrl,
      isVerified: data.instantApprove ?? false,
      verificationStatus: newStatus,
      verifiedAt: data.instantApprove ? new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : undefined
    };

    setCurrentUser(updatedUser);
    setIsVerificationModalOpen(false);

    if (data.instantApprove) {
      showToast('🎉 Student ID Verified! You can now post to campus feed and list items.');
    } else {
      showToast('📋 ID Card submitted! Campus Moderator will review within 24 hours.');
    }
  };

  const approveSubmission = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId ? { ...sub, status: 'verified', moderatorNotes: 'Approved by Campus Administrator.' } : sub
      )
    );

    // If the approved submission belongs to the current user, update their status
    setSubmissions(prev => {
      const match = prev.find(s => s.id === submissionId);
      if (match && match.rollNumber === currentUser.rollNumber) {
        setCurrentUser(curr => ({
          ...curr,
          isVerified: true,
          verificationStatus: 'verified',
          verifiedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        }));
      }
      return prev;
    });

    showToast('Student ID verification approved! Verified campus badge issued.');
  };

  const rejectSubmission = (submissionId: string, reason: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId ? { ...sub, status: 'rejected', moderatorNotes: reason || 'ID card illegible or details mismatch.' } : sub
      )
    );
    showToast('Submission rejected with feedback notes.');
  };

  const createPost = (
    content: string,
    category: PostCategory,
    tags: string[],
    pollQuestion?: string,
    pollOptions?: string[]
  ): boolean => {
    if (!currentUser.isVerified) {
      openVerificationModal('post');
      return false;
    }

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: currentUser,
      content,
      category,
      createdAt: 'Just now',
      likesCount: 0,
      hasLiked: false,
      repostsCount: 0,
      hasReposted: false,
      tags,
      comments: [],
      poll: pollQuestion && pollOptions && pollOptions.length >= 2 ? {
        question: pollQuestion,
        options: pollOptions.map((opt, i) => ({ id: `opt_${Date.now()}_${i}`, text: opt, votes: 0 })),
        totalVotes: 0
      } : undefined
    };

    setPosts(prev => [newPost, ...prev]);
    showToast('Post published to campus feed!');
    return true;
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        const hasLiked = !post.hasLiked;
        return {
          ...post,
          hasLiked,
          likesCount: hasLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1)
        };
      })
    );
  };

  const toggleRepost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        const hasReposted = !post.hasReposted;
        return {
          ...post,
          hasReposted,
          repostsCount: hasReposted ? post.repostsCount + 1 : Math.max(0, post.repostsCount - 1)
        };
      })
    );
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: currentUser,
      content: text.trim(),
      createdAt: 'Just now',
      likesCount: 0
    };

    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      })
    );
  };

  const voteInPoll = (postId: string, optionId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId || !post.poll || post.poll.userVotedOptionId) return post;
        const updatedOptions = post.poll.options.map(opt =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            userVotedOptionId: optionId,
            totalVotes: post.poll.totalVotes + 1
          }
        };
      })
    );
  };

  const createMarketplaceItem = (
    itemData: Omit<MarketplaceItem, 'id' | 'createdAt' | 'seller' | 'downloadsCount' | 'rating'>
  ): boolean => {
    if (!currentUser.isVerified) {
      openVerificationModal('sell');
      return false;
    }

    const newItem: MarketplaceItem = {
      ...itemData,
      id: `item_${Date.now()}`,
      createdAt: 'Just now',
      seller: currentUser,
      downloadsCount: 0,
      rating: 5.0
    };

    setMarketplaceItems(prev => [newItem, ...prev]);
    showToast('Study material listed in Marketplace!');
    return true;
  };

  const bookTutorSession = (
    tutorId: string,
    subject: string,
    date: string,
    timeSlot: string,
    doubtTopic: string
  ): boolean => {
    const tutor = tutors.find(t => t.id === tutorId);
    if (!tutor) return false;

    const newBooking: TutorBooking = {
      id: `book_${Date.now()}`,
      tutorId,
      tutorName: tutor.student.name,
      subject,
      date,
      timeSlot,
      studentName: currentUser.name,
      studentEmail: currentUser.studentEmail,
      doubtTopic,
      hourlyRate: tutor.hourlyRate,
      currency: tutor.currency,
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/uniquad-peer-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: 'Just now'
    };

    setBookings(prev => [newBooking, ...prev]);
    showToast(`Session booked with ${tutor.student.name} for ${date} at ${timeSlot}!`);
    return true;
  };

  const bookMentorshipSession = (
    mentorId: string,
    topic: string,
    date: string,
    timeSlot: string
  ): boolean => {
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) return false;

    const newBooking: MentorshipBooking = {
      id: `m_book_${Date.now()}`,
      mentorId,
      mentorName: mentor.name,
      mentorCompany: mentor.company,
      studentName: currentUser.name,
      studentEmail: currentUser.studentEmail,
      topic,
      date,
      timeSlot,
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/uniquad-mentor-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: 'Just now'
    };

    setMentorshipBookings(prev => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('uniquad_mentor_bookings', JSON.stringify(updated));
      return updated;
    });

    showToast(`1-on-1 Mentorship session booked with ${mentor.name} (${mentor.company || 'Senior'}) for ${date} at ${timeSlot}!`);
    return true;
  };

  // 1-to-1 Chat functions
  const openChatWithUser = (
    peerUser: StudentUser,
    itemContext?: ChatConversation['itemContext'],
    initialMsg?: string
  ) => {
    let conv = conversations.find(c => c.peerUser.id === peerUser.id);
    if (!conv) {
      const newConvId = `conv_${peerUser.id}_${Date.now()}`;
      conv = {
        id: newConvId,
        peerUser,
        lastMessage: initialMsg || `Chat started with ${peerUser.name}`,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        itemContext,
        messages: initialMsg
          ? [
              {
                id: `msg_${Date.now()}`,
                senderId: currentUser.id,
                senderName: currentUser.name,
                content: initialMsg,
                timestamp: 'Just now',
                isCurrentUser: true,
                itemContext
              }
            ]
          : []
      };
      setConversations(prev => [conv!, ...prev]);
      setActiveConversationId(newConvId);
    } else {
      setActiveConversationId(conv.id);
      // Mark as read
      setConversations(prev =>
        prev.map(c => (c.id === conv!.id ? { ...c, unreadCount: 0 } : c))
      );
      if (initialMsg) {
        sendMessage(conv.id, initialMsg);
      }
    }
    setIsChatDrawerOpen(true);
  };

  const closeChatDrawer = () => {
    setIsChatDrawerOpen(false);
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: content.trim(),
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg]
        };
      })
    );

    // Simulate smart peer / mentor / senior response
    setTimeout(() => {
      setConversations(prev => {
        const targetConv = prev.find(c => c.id === conversationId);
        if (!targetConv) return prev;

        let replyText = "Sounds good! Thanks for messaging. Let's coordinate on campus!";
        const pName = targetConv.peerUser.name;
        if (pName.includes('Priya')) {
          replyText = "Hi! Super glad to connect. Feel free to share your resume link or GitHub project! For Google Cloud & Big Tech roles, focus heavily on tree/graph traversals and clean OOP design.";
        } else if (pName.includes('David')) {
          replyText = "Hey! Glad to meet an aspiring engineer from your college. I'd be happy to do a mock interview or review your full-stack project architecture. When are you free for a session?";
        } else if (pName.includes('Arjun')) {
          replyText = "Hello! Send over any tough DSA doubts or questions on Amazon's leadership principles. Happy to help you prep for the upcoming hiring drives!";
        } else if (pName.includes('Kavya')) {
          replyText = "Hey junior! Being from the same college, I know exactly what our placement cell asks in the technical round. Happy to share my interview notes and cheat sheet with you!";
        } else if (pName.includes('Lucas')) {
          replyText = "Hey! Awesome to connect cross-campus. We're assembling a multi-college team for Cal Hacks and an open-source AI package. Let's collaborate!";
        } else if (pName.includes('Eliza')) {
          replyText = "Got it! Thanks for checking in. Happy to review those algorithm proofs with you anytime!";
        } else if (pName.includes('Marcus')) {
          replyText = "Awesome! Let me know if you run into any ROS2 setup or baud rate questions with the code.";
        } else if (pName.includes('Tariq')) {
          replyText = "Perfect, see you at the Quad. You can test the device before taking it!";
        } else if (pName.includes('Elena')) {
          replyText = "Great! I've sent the problem breakdown notes to your college email as well.";
        }

        const replyMsg: ChatMessage = {
          id: `msg_reply_${Date.now()}`,
          senderId: targetConv.peerUser.id,
          senderName: targetConv.peerUser.name,
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false
        };

        return prev.map(c => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            lastMessage: replyText,
            lastMessageTime: 'Just now',
            messages: [...c.messages, replyMsg]
          };
        });
      });
    }, 1200);
  };

  const addMentor = (mentorData: Omit<IndustryMentor, 'id' | 'rating' | 'sessionsCompleted' | 'isVerified'>) => {
    const newMentor: IndustryMentor = {
      ...mentorData,
      id: `mentor_${Date.now()}`,
      rating: 5.0,
      sessionsCompleted: 0,
      isVerified: true
    };
    setMentors(prev => {
      const updated = [newMentor, ...prev];
      localStorage.setItem('uniquad_mentors', JSON.stringify(updated));
      return updated;
    });
    showToast(`Welcome! ${newMentor.name} added as a mentor in the Senior & MNC Network.`);
  };

  const updateCollegeConfig = (newConfig: Partial<CollegeConfig>) => {
    setCollegeConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('uniquad_college_config', JSON.stringify(updated));
      return updated;
    });
    if (newConfig.name) {
      setCurrentUser(prev => ({
        ...prev,
        college: newConfig.name!
      }));
    }
    showToast('Private College branding and settings updated!');
  };

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        selectedCollege,
        setSelectedCollege,
        posts,
        createPost,
        toggleLikePost,
        toggleRepost,
        addCommentToPost,
        voteInPoll,
        marketplaceItems,
        createMarketplaceItem,
        tutors,
        bookings,
        bookTutorSession,
        mentors,
        mentorshipBookings,
        bookMentorshipSession,
        addMentor,
        submissions,
        isVerificationModalOpen,
        verificationTriggerReason,
        openVerificationModal,
        closeVerificationModal,
        isCollegeModalOpen,
        openCollegeModal,
        closeCollegeModal,
        submitIdVerification,
        approveSubmission,
        rejectSubmission,
        switchUserPreset,
        userPreset,
        toastMessage,
        showToast,
        conversations,
        activeConversationId,
        setActiveConversationId,
        isChatDrawerOpen,
        openChatWithUser,
        closeChatDrawer,
        sendMessage,
        totalUnreadMessages,
        collegeConfig,
        updateCollegeConfig
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
