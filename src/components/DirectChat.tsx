import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  FileText,
  Code2,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IDCardBadge } from './IDCardBadge';
import { ChatConversation } from '../types';

export const DirectChat: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({
  isModal = false,
  onClose
}) => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    currentUser
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation =
    conversations.find(c => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, messageText);
    setMessageText('');
  };

  const handleQuickChip = (text: string) => {
    if (!activeConversation) return;
    sendMessage(activeConversation.id, text);
  };

  const filteredConversations = conversations.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.peerUser.name.toLowerCase().includes(q) ||
      c.peerUser.college.toLowerCase().includes(q) ||
      c.peerUser.department.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${
        isModal ? 'h-[620px] max-w-4xl w-full' : 'h-[680px]'
      }`}
    >
      {/* Header if modal */}
      {isModal && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold tracking-tight">Student-to-Student Direct Messages</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main 2-Column Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Conversations List */}
        <div
          className={`w-full sm:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 ${
            mobileShowChat ? 'hidden sm:flex' : 'flex'
          }`}
        >
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students or messages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4 text-xs text-slate-400">
                No conversations found.
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = activeConversation?.id === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setActiveConversationId(conv.id);
                      setMobileShowChat(true);
                    }}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-white border-l-2 border-indigo-600 shadow-2xs'
                        : 'hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={conv.peerUser.avatar}
                          alt={conv.peerUser.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white font-mono text-[9px] flex items-center justify-center font-bold">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {conv.peerUser.name}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono tabular-nums">
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-1">
                        <IDCardBadge status={conv.peerUser.verificationStatus} size="sm" showLabel={false} />
                        <span className="text-[11px] text-slate-500 truncate">
                          {conv.peerUser.department}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 truncate leading-snug">
                        {conv.lastMessage}
                      </p>

                      {conv.itemContext && (
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 max-w-full truncate">
                          <span className="font-semibold capitalize">{conv.itemContext.type}:</span>
                          <span className="truncate">{conv.itemContext.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation Thread */}
        {activeConversation ? (
          <div
            className={`flex-1 flex flex-col bg-white ${
              mobileShowChat ? 'flex' : 'hidden sm:flex'
            }`}
          >
            {/* Thread Header */}
            <div className="p-3.5 sm:px-5 sm:py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setMobileShowChat(false)}
                  className="sm:hidden p-1 text-slate-400 hover:text-slate-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={activeConversation.peerUser.avatar}
                    alt={activeConversation.peerUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {activeConversation.peerUser.name}
                    </h4>
                    <IDCardBadge
                      status={activeConversation.peerUser.verificationStatus}
                      size="sm"
                      college={activeConversation.peerUser.college}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {activeConversation.peerUser.department} · {activeConversation.peerUser.college}
                  </p>
                </div>
              </div>

              {activeConversation.itemContext && (
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">
                    Subject / Listing
                  </span>
                  <span className="text-xs font-bold text-slate-800 max-w-[200px] truncate">
                    {activeConversation.itemContext.title}
                  </span>
                </div>
              )}
            </div>

            {/* Context Notice Banner */}
            {activeConversation.itemContext && (
              <div className="px-4 py-2 bg-indigo-50/60 border-b border-indigo-100/70 flex items-center justify-between text-xs text-indigo-900">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span className="truncate">
                    Inquiring about: <strong>{activeConversation.itemContext.title}</strong>
                  </span>
                </div>
                {activeConversation.itemContext.price !== undefined && (
                  <span className="font-mono font-bold text-indigo-950 shrink-0 ml-2">
                    {activeConversation.itemContext.price === 0
                      ? 'Free'
                      : `${activeConversation.itemContext.currency || '$'}${activeConversation.itemContext.price}`}
                  </span>
                )}
              </div>
            )}

            {/* Message Bubble Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30">
              {activeConversation.messages.length === 0 ? (
                <div className="text-center py-16 text-xs text-slate-400">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p>No messages yet. Send a message to coordinate notes or study sessions!</p>
                </div>
              ) : (
                activeConversation.messages.map(msg => {
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.isCurrentUser ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                          msg.isCurrentUser
                            ? 'bg-indigo-600 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono tabular-nums">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <span className="text-slate-400 text-[10px] shrink-0 font-medium">Quick Replies:</span>
              {[
                '📍 Meet at Science Library lobby?',
                '🕒 What time works best for you?',
                '📚 Is this the latest syllabus?',
                '🤝 Sounds great, confirmed!'
              ].map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleQuickChip(chip)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-lg transition-colors border border-slate-200/60 shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Composer */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Message ${activeConversation.peerUser.name}...`}
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                🛡️ Safe Campus Guarantee: Both students verified with institutional ID cards.
              </p>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
            Select a student to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};
