'use client'

<<<<<<< HEAD
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
=======
import React from 'react'

/**
 * components/blog/CommentSection.tsx
 *
 * Full comment system:
 * - Post new comment / reply
 * - Nested replies (1 level deep)
 * - Edit own comment (within 15 min window) — hidden from admin viewing others' comments
 * - Delete own comment OR admin can delete any comment
 * - Admin: auto-approved, default name "jagaddhita (admin)", no pending
 * - Optimistic UI
 */

import { useState, useEffect, useCallback, useRef } from 'react'
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Reply, Trash2, Edit2, Check, X, ChevronDown, ChevronUp, LogIn, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import NeonButton from '@/components/NeonButton'

interface Comment {
  id: string
  postId: string
  text: string
  authorName: string
  authorFingerprint?: string
  parentId: string | null
  approved: boolean
  pinned: boolean
  createdAt: string
  updatedAt: string
<<<<<<< HEAD
  isOwner: boolean // set by server based on session
=======
  ownerFp?: string // returned only for own comments
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
}

interface CommentThread extends Comment {
  replies: Comment[]
}

function buildThreads(comments: Comment[]): CommentThread[] {
  const roots: CommentThread[] = []
  const map = new Map<string, CommentThread>()
<<<<<<< HEAD
=======

>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
  comments.forEach(c => map.set(c.id, { ...c, replies: [] }))
  comments.forEach(c => {
    const thread = map.get(c.id)!
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId)!.replies.push(thread)
    } else {
      roots.push(thread)
    }
  })
  return roots
}

// ─── Single Comment ───────────────────────────────────────────────────────────

function CommentItem({
  comment,
  postId,
<<<<<<< HEAD
=======
  clientFp,
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
  isAdmin,
  onReply,
  onDelete,
  onEdit,
  depth = 0,
}: {
  comment: CommentThread
  postId: string
<<<<<<< HEAD
=======
  clientFp: string
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
  isAdmin: boolean
  onReply: (parentId: string, parentName: string) => void
  onDelete: (id: string, parentId: string | null) => void
  onEdit: (id: string, newText: string) => void
  depth?: number
}) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(comment.text)
  const [editLoading, setEditLoading] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isEdited = comment.updatedAt !== comment.createdAt
  const age = Date.now() - new Date(comment.createdAt).getTime()
  const canEdit = comment.isOwner && age < 15 * 60 * 1000

<<<<<<< HEAD
  // isOwner comes from server (session-based) — immune to browser profile switching
  const showEdit = canEdit && !editing
  const showDelete = comment.isOwner || isAdmin
=======
  // Ownership: server stores ownerFp per comment for the requesting user
  const isOwner = !!(comment.ownerFp && comment.ownerFp === clientFp)

  // Button visibility:
  // - Edit: only owner (not admin editing others' comments)
  // - Delete: owner OR admin
  const showEdit = isOwner && canEdit && !editing
  const showDelete = isOwner || isAdmin
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781

  async function submitEdit() {
    if (!editText.trim() || editText === comment.text) {
      setEditing(false)
      return
    }
    setEditLoading(true)
    try {
      const res = await fetch(`/api/blog/${postId}/comments/${comment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editText }),
      })
      if (res.ok) {
        const data = await res.json()
        onEdit(comment.id, data.comment.text)
        setEditing(false)
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to edit')
      }
    } finally {
      setEditLoading(false)
    }
  }

  const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'border-brutal p-4',
        depth === 0 ? 'border-punk-white/20 bg-punk-gray-100' : 'border-punk-white/10 bg-punk-gray-200 ml-6',
        comment.pinned && 'border-neon-yellow'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-brutal border-neon-yellow flex items-center justify-center font-brutal text-brutal-sm shrink-0 bg-punk-black">
            {comment.authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="font-brutal text-brutal-sm text-punk-white">
              {comment.authorName}
            </span>
            {comment.pinned && (
              <span className="ml-2 font-mono text-brutal-xs text-neon-yellow">[PINNED]</span>
            )}
            <div className="font-mono text-brutal-xs text-punk-white/40">
              {formattedDate}
              {isEdited && <span className="ml-2">(edited)</span>}
            </div>
          </div>
        </div>

<<<<<<< HEAD
=======
        {/* Actions — only shown to owner or admin */}
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
        {(showEdit || showDelete) && (
          <div className="flex items-center gap-2 shrink-0">
            {showEdit && (
              <button
<<<<<<< HEAD
                onClick={() => { setEditing(true); setTimeout(() => textareaRef.current?.focus(), 50) }}
=======
                onClick={() => {
                  setEditing(true)
                  setTimeout(() => textareaRef.current?.focus(), 50)
                }}
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
                className="text-punk-white/30 hover:text-neon-yellow transition-colors"
                title="Edit comment"
              >
                <Edit2 size={13} />
              </button>
            )}
            {showDelete && (
              <button
<<<<<<< HEAD
                onClick={() => { if (confirm('Delete this comment?')) onDelete(comment.id, comment.parentId) }}
=======
                onClick={() => {
                  if (confirm('Delete this comment?')) {
                    onDelete(comment.id, comment.parentId)
                  }
                }}
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
                className="text-punk-white/30 hover:text-neon-red transition-colors"
                title="Delete comment"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          <textarea
            ref={textareaRef}
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditText(e.target.value)}
            className="w-full bg-punk-black border-brutal border-punk-white/30 p-3 font-mono text-brutal-sm text-punk-white resize-none focus:border-neon-yellow outline-none"
            rows={3}
            maxLength={2000}
          />
          <div className="flex gap-2">
            <button
              onClick={submitEdit}
              disabled={editLoading}
              className="flex items-center gap-1 border-brutal border-neon-green text-neon-green px-3 py-1 font-mono text-brutal-xs hover:bg-neon-green hover:text-punk-black transition-colors disabled:opacity-50"
            >
              <Check size={12} /> SAVE
            </button>
            <button
              onClick={() => { setEditing(false); setEditText(comment.text) }}
              className="flex items-center gap-1 border-brutal border-punk-white/30 text-punk-white/50 px-3 py-1 font-mono text-brutal-xs hover:text-punk-white transition-colors"
            >
              <X size={12} /> CANCEL
            </button>
          </div>
        </div>
      ) : (
        <p className="font-mono text-brutal-sm text-punk-white/80 leading-relaxed whitespace-pre-wrap break-words">
          {comment.text}
        </p>
      )}

      {depth === 0 && !editing && (
        <button
          onClick={() => onReply(comment.id, comment.authorName)}
          className="flex items-center gap-1 mt-3 font-mono text-brutal-xs text-punk-white/40 hover:text-neon-cyan transition-colors"
        >
          <Reply size={12} /> REPLY
        </button>
      )}

      {comment.replies.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowReplies(r => !r)}
            className="flex items-center gap-1 font-mono text-brutal-xs text-punk-white/40 hover:text-punk-white/70 mb-2"
          >
            {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {comment.replies.length} {comment.replies.length === 1 ? 'REPLY' : 'REPLIES'}
          </button>
          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {comment.replies.map(reply => (
                  <CommentItem
                    key={reply.id}
                    comment={{ ...reply, replies: [] } as CommentThread}
                    postId={postId}
<<<<<<< HEAD
=======
                    clientFp={clientFp}
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
                    isAdmin={isAdmin}
                    onReply={onReply}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    depth={1}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

// ─── Comment Form ─────────────────────────────────────────────────────────────

function CommentForm({
  postId,
  replyTo,
  onCancel,
  onSubmit,
  isAdmin,
<<<<<<< HEAD
  userName,
=======
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
}: {
  postId: string
  replyTo?: { id: string; name: string } | null
  onCancel?: () => void
  onSubmit: (comment: Comment) => void
  isAdmin: boolean
<<<<<<< HEAD
  userName: string
=======
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
}) {
  const ADMIN_NAME = 'jagaddhita (admin)'

  const [text, setText] = useState('')
<<<<<<< HEAD
=======
  const [name, setName] = useState(() => {
    if (isAdmin) return ADMIN_NAME
    if (typeof window !== 'undefined') {
      return localStorage.getItem('comment_name') || ''
    }
    return ''
  })
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Sync name when isAdmin changes (e.g. after hydration)
  useEffect(() => {
    if (isAdmin) setName(ADMIN_NAME)
  }, [isAdmin])

  async function submit() {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, parentId: replyTo?.id || null }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to post comment')
      } else {
<<<<<<< HEAD
=======
        if (!isAdmin && name) localStorage.setItem('comment_name', name)

>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
        setSuccess(data.message || 'Posted!')
        setText('')
        onSubmit(data.comment)
        if (onCancel) setTimeout(onCancel, 500)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-brutal border-punk-white/30 p-4 bg-punk-gray-100">
      {replyTo && (
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-brutal-xs text-neon-cyan">↳ Replying to {replyTo.name}</p>
          {onCancel && (
            <button onClick={onCancel} className="text-punk-white/40 hover:text-punk-white">
              <X size={14} />
            </button>
          )}
        </div>
      )}

<<<<<<< HEAD
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-6 h-6 border border-neon-yellow flex items-center justify-center font-brutal text-brutal-xs bg-punk-black shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="font-mono text-brutal-xs text-punk-white/60">
          posting as <span className="text-neon-yellow">{userName}</span>
          {isAdmin && <span className="ml-1 text-neon-yellow">[ADMIN]</span>}
        </span>
      </div>
=======
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!isAdmin) setName(e.target.value)
        }}
        readOnly={isAdmin}
        maxLength={60}
        className={cn(
          "w-full bg-punk-black border-brutal border-punk-white/20 px-3 py-2 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:border-neon-yellow outline-none mb-3",
          isAdmin && "opacity-60 cursor-not-allowed"
        )}
      />
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781

      <textarea
        placeholder={replyTo ? `Reply to ${replyTo.name}...` : 'Write a comment...'}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        rows={4}
        maxLength={2000}
        className="w-full bg-punk-black border-brutal border-punk-white/20 px-3 py-2 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:border-neon-yellow outline-none resize-none mb-3"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-brutal-xs text-punk-white/30">{text.length}/2000</span>
        <NeonButton onClick={submit} disabled={loading || !text.trim()} variant="yellow" size="sm">
          {loading ? 'POSTING...' : 'POST COMMENT'}
        </NeonButton>
      </div>

      {error && <p className="mt-2 font-mono text-brutal-xs text-neon-red">{error}</p>}
      {success && <p className="mt-2 font-mono text-brutal-xs text-neon-green">{success}</p>}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session, status } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null)
<<<<<<< HEAD

  // Check admin via cookie separately (session doesn't carry admin cookie)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    fetch('/api/admin/me').then(r => r.json()).then(d => setIsAdmin(!!d.isAdmin)).catch(() => {})
=======
  const [clientFp] = useState<string>(() => getClientFingerprint())
  const [isAdmin, setIsAdmin] = useState(false)

  // Check admin status on mount
  useEffect(() => {
    fetch('/api/admin/me')
      .then(r => r.json())
      .then(d => setIsAdmin(!!d.isAdmin))
      .catch(() => {})
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
  }, [])

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/blog/${postId}/comments`)
      const data = await res.json()
      setComments(data.comments || [])
    } catch {
      // fail silently
    } finally {
      setLoading(false)
    }
  }, [postId])

  // Re-fetch when session changes so isOwner flags are correct
  useEffect(() => {
    if (status !== 'loading') fetchComments()
  }, [fetchComments, status])

  function handleNewComment(comment: Comment) {
    setComments(prev => [comment, ...prev])
    setReplyTo(null)
  }

  function handleDelete(id: string) {
    fetch(`/api/blog/${postId}/comments/${id}`, { method: 'DELETE' })
      .then(res => { if (res.ok) setComments(prev => prev.filter(c => c.id !== id)) })
      .catch(() => {})
  }

  function handleEdit(id: string, newText: string) {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, text: newText, updatedAt: new Date().toISOString() } : c)
    )
  }

  const threads = buildThreads(comments)
  const userName = isAdmin
    ? 'jagaddhita (admin)'
    : session?.user?.name ?? session?.user?.email?.split('@')[0] ?? ''

  return (
    <section id="comments" className="mt-16">
      <div className="border-t-brutal border-punk-white mb-8" />

      <h2 className="font-brutal text-brutal-2xl text-punk-white mb-6 flex items-center gap-3">
        <MessageSquare size={24} className="text-neon-cyan" />
        COMMENTS
        {!loading && (
          <span className="font-mono text-brutal-sm text-punk-white/50">({comments.length})</span>
        )}
        {isAdmin && (
          <span className="font-mono text-brutal-xs text-neon-yellow border border-neon-yellow px-2 py-0.5">ADMIN</span>
        )}
        {isAdmin && (
          <span className="font-mono text-brutal-xs text-neon-yellow border border-neon-yellow px-2 py-0.5">
            ADMIN
          </span>
        )}
      </h2>

<<<<<<< HEAD
      {/* Auth gate */}
      {status === 'unauthenticated' && (
        <div className="border-brutal border-punk-white/20 p-6 mb-8 flex items-center justify-between gap-4">
          <p className="font-mono text-brutal-sm text-punk-white/60">
            // sign in to leave a comment
          </p>
          <button
            onClick={() => signIn()}
            className="flex items-center gap-2 border-brutal border-neon-yellow text-neon-yellow font-mono text-brutal-xs px-4 py-2 hover:bg-neon-yellow hover:text-punk-black transition-colors shrink-0"
          >
            <LogIn size={14} /> SIGN IN
          </button>
        </div>
      )}

      {/* Comment form — only when authenticated */}
      {status === 'authenticated' && (
        <>
          <div className="flex items-center justify-end mb-2">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 font-mono text-brutal-xs text-punk-white/30 hover:text-punk-white/60 transition-colors"
            >
              <LogOut size={12} /> sign out
            </button>
          </div>

          {!replyTo && (
            <div className="mb-8">
              <CommentForm postId={postId} onSubmit={handleNewComment} isAdmin={isAdmin} userName={userName} />
            </div>
          )}
          {replyTo && (
            <div className="mb-8">
              <CommentForm
                postId={postId}
                replyTo={replyTo}
                onCancel={() => setReplyTo(null)}
                onSubmit={handleNewComment}
                isAdmin={isAdmin}
                userName={userName}
              />
            </div>
          )}
        </>
=======
      {/* Post new comment */}
      {!replyTo && (
        <div className="mb-8">
          <CommentForm
            postId={postId}
            onSubmit={handleNewComment}
            isAdmin={isAdmin}
          />
        </div>
      )}

      {/* Reply form */}
      {replyTo && (
        <div className="mb-8">
          <CommentForm
            postId={postId}
            replyTo={replyTo}
            onCancel={() => setReplyTo(null)}
            onSubmit={handleNewComment}
            isAdmin={isAdmin}
          />
        </div>
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
      )}

      {/* Comment list */}
      {loading ? (
        <div className="font-mono text-brutal-sm text-punk-white/40 animate-pulse">loading comments...</div>
      ) : threads.length === 0 ? (
        <div className="border-brutal border-punk-white/10 p-6 text-center">
          <p className="font-mono text-brutal-sm text-punk-white/40">// no comments yet. be the first.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {threads.map(thread => (
              <CommentItem
                key={thread.id}
                comment={thread}
                postId={postId}
<<<<<<< HEAD
                isAdmin={isAdmin}
                onReply={(id, name) => setReplyTo({ id, name })}
                onDelete={(id) => handleDelete(id)}
=======
                clientFp={clientFp}
                isAdmin={isAdmin}
                onReply={(id: string, name: string) => setReplyTo({ id, name })}
                onDelete={handleDelete}
>>>>>>> aaca07ecb61bcc20f65d2244bfcf196924353781
                onEdit={handleEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
