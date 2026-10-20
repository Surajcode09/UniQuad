import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  BarChart2,
  Tag,
  Search,
  Check,
  HelpCircle,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IDCardBadge } from './IDCardBadge';
import { Post, PostCategory } from '../types';

export const CampusFeed: React.FC = () => {
  const {
    currentUser,
    posts,
    createPost,
    toggleLikePost,
    toggleRepost,
    addCommentToPost,
    voteInPoll,
    openVerificationModal,
    selectedCollege,
    setSelectedCollege
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>('general');
  const [newPostTags, setNewPostTags] = useState<string>('');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser.isVerified) {
      openVerificationModal('post');
      return;
    }

    if (!newPostContent.trim()) return;

    const tagsArray = newPostTags
      .split(' ')
      .filter(t => t.startsWith('#') || t.trim().length > 0)
      .map(t => (t.startsWith('#') ? t : `#${t}`));

    const validPollOptions = pollOptions.filter(o => o.trim().length > 0);
    const hasPoll = showPollCreator && pollQuestion.trim() && validPollOptions.length >= 2;

    const success = createPost(
      newPostContent.trim(),
      newPostCategory,
      tagsArray,
      hasPoll ? pollQuestion.trim() : undefined,
      hasPoll ? validPollOptions : undefined
    );

    if (success) {
      setNewPostContent('');
      setNewPostTags('');
      setShowPollCreator(false);
      setPollQuestion('');
      setPollOptions(['', '']);
    }
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    addCommentToPost(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(post => {
    if (activeCategory !== 'all' && post.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesContent = post.content.toLowerCase().includes(q);
      const matchesAuthor = post.author.name.toLowerCase().includes(q) || post.author.college.toLowerCase().includes(q);
      const matchesTags = post.tags.some(t => t.toLowerCase().includes(q));
      if (!matchesContent && !matchesAuthor && !matchesTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Verification Gate Banner for Unverified Users */}
      {!currentUser.isVerified && (
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 border border-amber-300/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-slate-900">Student ID Verification Required to Post</h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">Gate Active</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                You are currently browsing in read-only visitor mode. Upload an image of your student identity card to get authenticated as a verified student and start sharing campus news, study questions, or confessions.
              </p>
            </div>
          </div>
          <button
            onClick={() => openVerificationModal('post')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Upload Student ID Card</span>
          </button>
        </div>
      )}

      {/* Tweet / Buzz Composer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <form onSubmit={handlePostSubmit} className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                <IDCardBadge status={currentUser.verificationStatus} college={currentUser.college} />
              </div>
              <textarea
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                onClick={() => {
                  if (!currentUser.isVerified) {
                    openVerificationModal('post');
                  }
                }}
                maxLength={280}
                placeholder={
                  currentUser.isVerified
                    ? "What's happening on campus? Share lecture notes, club notices, questions, or lost & found..."
                    : "🔒 Verify your Student ID card to unlock posting to the campus feed..."
                }
                rows={3}
                className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none bg-transparent"
              />
            </div>
          </div>

          {/* Interactive Poll Creator Modal/Drawer */}
          {showPollCreator && (
            <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-indigo-600" />
                  Campus Poll Creator
                </span>
                <button
                  type="button"
                  onClick={() => setShowPollCreator(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  Remove Poll
                </button>
              </div>
              <input
                type="text"
                placeholder="Ask a campus poll question..."
                value={pollQuestion}
                onChange={e => setPollQuestion(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={e => {
                    const newOpts = [...pollOptions];
                    newOpts[idx] = e.target.value;
                    setPollOptions(newOpts);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ))}
              {pollOptions.length < 4 && (
                <button
                  type="button"
                  onClick={() => setPollOptions(prev => [...prev, ''])}
                  className="text-xs text-indigo-600 font-medium hover:underline"
                >
                  + Add another option
                </button>
              )}
            </div>
          )}

          {/* Composer Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Category Selector */}
              <select
                value={newPostCategory}
                onChange={e => setNewPostCategory(e.target.value as PostCategory)}
                className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="general">💬 General Buzz</option>
                <option value="study">📚 Study & Notes</option>
                <option value="senior_advice">🎓 Senior & MNC Advice</option>
                <option value="news">📢 Campus News</option>
                <option value="confession">🎭 Confessions</option>
                <option value="lost_found">🔍 Lost & Found</option>
                <option value="events">🎉 Club Events</option>
              </select>

              <button
                type="button"
                onClick={() => setShowPollCreator(prev => !prev)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
                  showPollCreator
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Poll</span>
              </button>

              <input
                type="text"
                value={newPostTags}
                onChange={e => setNewPostTags(e.target.value)}
                placeholder="#Tags (e.g. #CS201 #Finals)"
                className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-32 sm:w-44"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-mono tabular-nums ${newPostContent.length > 250 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                {280 - newPostContent.length}
              </span>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{currentUser.isVerified ? 'Post Buzz' : 'Verify ID to Post'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Category Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Interactive Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All Buzz' },
            { id: 'senior_advice', label: '🎓 Senior & MNC Advice' },
            { id: 'study', label: 'Study & Notes' },
            { id: 'news', label: 'News' },
            { id: 'lost_found', label: 'Lost & Found' },
            { id: 'events', label: 'Club Events' },
            { id: 'confession', label: 'Confessions' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search campus feed or tags..."
            className="w-full sm:w-60 pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Post Stream */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800 mb-1">No campus posts found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Be the first verified student to start a conversation in this topic.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map(post => {
            const isCommentsExpanded = expandedCommentsPostId === post.id;
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors p-5"
              >
                {/* Author Bar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{post.author.name}</span>
                        <IDCardBadge status={post.author.verificationStatus} college={post.author.college} />
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>@{post.author.username}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.author.college}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {post.category === 'senior_advice' ? (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-indigo-600" />
                      <span>Senior & MNC Advice</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                      {post.category.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {/* Post Content */}
                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-3">
                  {post.content}
                </p>

                {/* Interactive Poll */}
                {post.poll && (
                  <div className="my-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-semibold text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
                      {post.poll.question}
                    </p>
                    <div className="space-y-2">
                      {post.poll.options.map(option => {
                        const total = post.poll?.totalVotes || 1;
                        const percentage = Math.round((option.votes / total) * 100);
                        const hasVoted = post.poll?.userVotedOptionId === option.id;

                        return (
                          <div
                            key={option.id}
                            onClick={() => voteInPoll(post.id, option.id)}
                            className={`relative overflow-hidden border rounded-lg p-2.5 transition-all cursor-pointer ${
                              hasVoted
                                ? 'border-indigo-500 bg-indigo-50/40 font-semibold'
                                : 'border-slate-200 hover:border-indigo-300 bg-white'
                            }`}
                          >
                            <div
                              className="absolute inset-y-0 left-0 bg-indigo-100/60 transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                            <div className="relative flex items-center justify-between text-xs text-slate-800">
                              <span className="flex items-center gap-1.5">
                                {hasVoted && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                                {option.text}
                              </span>
                              <span className="font-mono tabular-nums font-semibold text-slate-600">
                                {percentage}% ({option.votes})
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-mono">
                      {post.poll.totalVotes} student votes recorded
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mb-3 text-xs">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-6">
                    {/* Like button */}
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.hasLiked ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="font-mono tabular-nums">{post.likesCount}</span>
                    </button>

                    {/* Repost button */}
                    <button
                      onClick={() => toggleRepost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.hasReposted ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-600'
                      }`}
                    >
                      <Repeat2 className="w-4 h-4" />
                      <span className="font-mono tabular-nums">{post.repostsCount}</span>
                    </button>

                    {/* Comment button */}
                    <button
                      onClick={() => setExpandedCommentsPostId(isCommentsExpanded ? null : post.id)}
                      className={`flex items-center gap-1.5 hover:text-indigo-600 transition-colors ${
                        isCommentsExpanded ? 'text-indigo-600 font-semibold' : ''
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-mono tabular-nums">{post.comments.length}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                    }}
                    title="Copy share link"
                    className="hover:text-slate-900 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Comment Thread Drawer */}
                {isCommentsExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder={
                          currentUser.isVerified
                            ? 'Write a reply to this student...'
                            : 'Verify Student ID card to reply...'
                        }
                        value={commentInputs[post.id] || ''}
                        onChange={e =>
                          setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            if (!currentUser.isVerified) {
                              openVerificationModal('post');
                            } else {
                              handleCommentSubmit(post.id);
                            }
                          }
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => {
                          if (!currentUser.isVerified) {
                            openVerificationModal('post');
                          } else {
                            handleCommentSubmit(post.id);
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Existing Comments */}
                    {post.comments.map(c => (
                      <div key={c.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900">{c.author.name}</span>
                            <IDCardBadge status={c.author.verificationStatus} size="sm" showLabel={false} />
                            <span className="text-[10px] text-slate-400">· {c.createdAt}</span>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-normal">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
