'use client'

/**
 * components/blog/CommentSection.tsx
 *
 * Full comment system:
 * - Post new comment / reply
 * - Nested replies (1 level deep — keeps UI simple)
 * - Edit own comment (within 15 min window)
 * - Delete own comment
 * - Optimistic UI
 *
 * "Own" is determined by matching localStorage fingerprint.
 * The server re-derives fingerprint from the request for actual auth.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Reply, Trash2, Edit2, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getClientFingerprint } from '@/lib/fingerprint'
import NeonButton from '@/components/NeonButton'

interface Comment {
  id: string
  postId: string
  text: string
  authorName: string
  parentId: string | null
  approved: boolean
  pinned: boolean
  createdAt: string
  updatedAt: string
}

interface CommentThread extends Comment {
  replies: Comment[]
}

interface CommentSectionProps {
  postId: string
}

// ─── Comment Thread ──────────────────────────────────────────────────────────

function buildThreads(comments: Comment[]): CommentThread[] {
  const roots: CommentThread[] = []
  const map = new Map<string, CommentThread>()

  // First pass: create all threads
  comments.forEach(c => map.set(c.id, { ...c, replies: [] }))

  // Second pass: attach replies
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
  clientFp,
  onReply,
  onDelete,
  onEdit,
  depth = 0,
}: {
  comment: CommentThread
  postId: string
  clientFp: string
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
  const canEdit = age < 15 * 60 * 1000 // 15 minutes

  // Determine ownership: localStorage fingerprint matches (heuristic only — server validates)
  // We can't verify on client side since server uses IP+UA hash, not this random UUID.
  // So we expose edit/delete for all users on client, let server reject unauthorized.
  // In practice: this means UI shows edit/delete buttons to everyone, but server blocks it.
  // For a personal blog where you're likely the main commenter, this is fine.
  // If you want stricter UI: store a session token after posting.

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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'border-brutal p-4',
        depth === 0
          ? 'border-punk-white/20 bg-punk-gray-100'
          : 'border-punk-white/10 bg-punk-gray-200 ml-6',
        comment.pinned && 'border-neon-yellow'
      )}
    >
      {/* Header */}
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
              <span className="ml-2 font-mono text-brutal-xs text-neon-yellow">
                [PINNED]
              </span>
            )}
            <div className="font-mono text-brutal-xs text-punk-white/40">
              {formattedDate}
              {isEdited && <span className="ml-2">(edited)</span>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {canEdit && !editing && (
            <button
              onClick={() => {
                setEditing(true)
                setTimeout(() => textareaRef.current?.focus(), 50)
              }}
              className="text-punk-white/30 hover:text-neon-yellow transition-colors"
              title="Edit comment"
            >
              <Edit2 size={13} />
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('Delete this comment?')) {
                onDelete(comment.id, comment.parentId)
              }
            }}
            className="text-punk-white/30 hover:text-neon-red transition-colors"
            title="Delete comment"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      {editing ? (
        <div className="space-y-2">
          <textarea
            ref={textareaRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
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

      {/* Reply button */}
      {depth === 0 && !editing && (
        <button
          onClick={() => onReply(comment.id, comment.authorName)}
          className="flex items-center gap-1 mt-3 font-mono text-brutal-xs text-punk-white/40 hover:text-neon-cyan transition-colors"
        >
          <Reply size={12} />
          REPLY
        </button>
      )}

      {/* Nested replies */}
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
                    comment={{ ...reply, replies: [] }}
                    postId={postId}
                    clientFp={clientFp}
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
}: {
  postId: string
  replyTo?: { id: string; name: string } | null
  onCancel?: () => void
  onSubmit: (comment: Comment) => void
}) {
  const [text, setText] = useState('')
  const [name, setName] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('comment_name') || ''
      : ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function submit() {
    if (!text.trim()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          authorName: name || 'anonymous',
          parentId: replyTo?.id || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to post comment')
      } else {
        // Persist name
        if (name) localStorage.setItem('comment_name', name)

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
          <p className="font-mono text-brutal-xs text-neon-cyan">
            ↳ Replying to {replyTo.name}
          </p>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-punk-white/40 hover:text-punk-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={60}
        className="w-full bg-punk-black border-brutal border-punk-white/20 px-3 py-2 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:border-neon-yellow outline-none mb-3"
      />

      <textarea
        placeholder={replyTo ? `Reply to ${replyTo.name}...` : 'Write a comment...'}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        maxLength={2000}
        className="w-full bg-punk-black border-brutal border-punk-white/20 px-3 py-2 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:border-neon-yellow outline-none resize-none mb-3"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-brutal-xs text-punk-white/30">
          {text.length}/2000
        </span>
        <NeonButton
          onClick={submit}
          disabled={loading || !text.trim()}
          variant="yellow"
          size="sm"
        >
          {loading ? 'POSTING...' : 'POST COMMENT'}
        </NeonButton>
      </div>

      {error && (
        <p className="mt-2 font-mono text-brutal-xs text-neon-red">{error}</p>
      )}
      {success && (
        <p className="mt-2 font-mono text-brutal-xs text-neon-green">{success}</p>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null)
  const [clientFp] = useState(() => getClientFingerprint())

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

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  function handleNewComment(comment: Comment) {
    setComments(prev => [comment, ...prev])
    setReplyTo(null)
  }

  function handleDelete(id: string, parentId: string | null) {
    fetch(`/api/blog/${postId}/comments/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setComments(prev => prev.filter(c => c.id !== id))
        }
      })
      .catch(() => {})
  }

  function handleEdit(id: string, newText: string) {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, text: newText, updatedAt: new Date().toISOString() } : c)
    )
  }

  const threads = buildThreads(comments)

  return (
    <section id="comments" className="mt-16">
      <div className="border-t-brutal border-punk-white mb-8" />

      <h2 className="font-brutal text-brutal-2xl text-punk-white mb-6 flex items-center gap-3">
        <MessageSquare size={24} className="text-neon-cyan" />
        COMMENTS
        {!loading && (
          <span className="font-mono text-brutal-sm text-punk-white/50">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* Post new comment */}
      {!replyTo && (
        <div className="mb-8">
          <CommentForm
            postId={postId}
            onSubmit={handleNewComment}
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
          />
        </div>
      )}

      {/* Comment list */}
      {loading ? (
        <div className="font-mono text-brutal-sm text-punk-white/40 animate-pulse">
          loading comments...
        </div>
      ) : threads.length === 0 ? (
        <div className="border-brutal border-punk-white/10 p-6 text-center">
          <p className="font-mono text-brutal-sm text-punk-white/40">
            // no comments yet. be the first.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {threads.map(thread => (
              <CommentItem
                key={thread.id}
                comment={thread}
                postId={postId}
                clientFp={clientFp}
                onReply={(id, name) => setReplyTo({ id, name })}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
