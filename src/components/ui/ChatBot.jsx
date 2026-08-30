import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCamera } from 'react-icons/fi'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'


const SYSTEM_PROMPT = `You are a concise, knowledgeable photography guide for "RJ Captures" — Rohan Jha's cinematic photography portfolio in Delhi.

STRICT RULES:
1. KEEP IT ULTRA-SHORT & PUNCHY: Maximum 2 to 4 bullet points or 2-3 brief sentences (under 60-80 words total). Never give long essays or textbook explanations.
2. NEVER use markdown tables (| col |) or heavy headings (###).
3. Use simple bullet points (•) and bold text (**key setting**) for quick readability on mobile.
4. Provide direct, practical camera settings (aperture, shutter speed, ISO) and photography tips (nature, portrait, sky, street).
5. Warm, friendly, and helpful tone.`

const QUICK_QUESTIONS = [
  '📷 Nature camera settings?',
  '🌅 Golden hour tip?',
  '🏔️ Landscape shot settings?',
  '🌌 Night sky quick settings',
]

const renderInlineFormatted = (text, isUser = false) => {
  if (!text) return null
  const regex = /(\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+?`)/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2)
      return (
        <strong
          key={index}
          className={
            isUser
              ? 'font-bold text-black'
              : 'font-semibold text-gold'
          }
        >
          {inner}
        </strong>
      )
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      const inner = part.slice(1, -1)
      return (
        <em key={index} className="italic opacity-90">
          {inner}
        </em>
      )
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1)
      return (
        <code
          key={index}
          className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
            isUser ? 'bg-black/10 text-black' : 'bg-white/10 text-gold-light'
          }`}
        >
          {inner}
        </code>
      )
    }
    return <span key={index}>{part}</span>
  })
}

const formatMessage = (text, isUser = false) => {
  if (!text) return null
  const rawLines = text.split('\n')
  const elements = []

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i]
    const trimmed = rawLine.trim()

    // 1. Skip table separator lines e.g. |---|---| or |:---|:---|
    if (/^\|?(\s*:?-+:?\s*\|?)+$/.test(trimmed)) {
      continue
    }

    // 2. Handle table data rows e.g. | Full-frame DSLR | Bigger sensor | Budget tip |
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|')) {
      const cells = trimmed
        .split('|')
        .map((c) => c.trim())
        .filter((c) => c.length > 0)

      if (cells.length > 0) {
        elements.push(
          <div
            key={`tbl-${i}`}
            className={`my-1.5 p-2 rounded-lg border text-xs leading-snug ${
              isUser
                ? 'bg-black/10 border-black/20'
                : 'bg-black/25 border-gold/20'
            }`}
          >
            <div className="font-semibold text-gold">
              {renderInlineFormatted(cells[0], isUser)}
            </div>
            {cells.length > 1 && (
              <div className="text-theme-text-sec mt-0.5">
                {renderInlineFormatted(cells.slice(1).join(' — '), isUser)}
              </div>
            )}
          </div>
        )
        continue
      }
    }

    // 3. Headings (# Title, ## Title, ### Title)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      elements.push(
        <div
          key={`h-${i}`}
          className={`font-bold mt-2 mb-1 text-xs md:text-sm tracking-wide ${
            isUser ? 'text-black' : 'text-gold'
          }`}
        >
          {renderInlineFormatted(headingMatch[2], isUser)}
        </div>
      )
      continue
    }

    // 4. Bullet lists (- item, * item, • item, + item)
    const bulletMatch = trimmed.match(/^[-*•+]\s+(.*)$/)
    if (bulletMatch) {
      elements.push(
        <div key={`b-${i}`} className="flex items-start gap-1.5 my-1 text-xs md:text-sm">
          <span
            className={`font-bold leading-5 flex-shrink-0 ${
              isUser ? 'text-black' : 'text-gold'
            }`}
          >
            •
          </span>
          <div className={`flex-1 leading-relaxed ${isUser ? 'text-black font-medium' : ''}`}>
            {renderInlineFormatted(bulletMatch[1], isUser)}
          </div>
        </div>
      )
      continue
    }

    // 5. Numbered lists (1. item, 2) item)
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/)
    if (numMatch) {
      elements.push(
        <div key={`n-${i}`} className="flex items-start gap-1.5 my-1 text-xs md:text-sm">
          <span
            className={`font-semibold text-[11px] md:text-xs leading-5 flex-shrink-0 min-w-[14px] ${
              isUser ? 'text-black' : 'text-gold'
            }`}
          >
            {numMatch[1]}.
          </span>
          <div className={`flex-1 leading-relaxed ${isUser ? 'text-black font-medium' : ''}`}>
            {renderInlineFormatted(numMatch[2], isUser)}
          </div>
        </div>
      )
      continue
    }

    // 6. Empty line -> Spacing
    if (trimmed === '') {
      elements.push(<div key={`sp-${i}`} className="h-1.5" />)
      continue
    }

    // 7. Regular paragraph / text
    elements.push(
      <p key={`p-${i}`} className={`my-0.5 text-xs md:text-sm leading-relaxed ${isUser ? 'text-black font-medium' : ''}`}>
        {renderInlineFormatted(rawLine, isUser)}
      </p>
    )
  }

  return elements
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your photography guide 📸 Ask me anything about camera settings, lighting, or composition tips!",
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
      setHasUnread(false)
    }
  }, [isOpen, messages])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasUnread(true)
    }
  }, [messages, isOpen])

  const sendMessage = async (text) => {
    const userText = text || inputText.trim()
    if (!userText || isLoading) return

    setInputText('')
    const updatedMessages = [...messages, { role: 'user', content: userText }]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      if (!apiKey) {
        throw new Error('Groq API key is missing. Please set VITE_GROQ_API_KEY in your .env file.')
      }
      
      const history = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'assistant', content: 'Understood! I will give short, crisp, practical photography guidance.' }
      ]

      for (let i = 1; i < updatedMessages.length; i++) {
        const msg = updatedMessages[i]
        history.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        })
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b', // Verified working model on user's Groq account
          messages: history,
          temperature: 0.6,
          max_tokens: 200
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errMsg = data?.error?.message || `HTTP ${response.status}`
        console.error('Groq API Error:', errMsg, data)
        throw new Error(errMsg)
      }

      const replyText =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't get a response. Please try again."

      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }])
    } catch (err) {
      console.error('ChatBot error:', err.message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ ${err.message || 'Something went wrong. Please try again.'}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Background Blur Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-24 md:right-28 z-50 flex flex-col items-end gap-3">
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="w-[calc(100vw-2rem)] sm:w-[380px] md:w-96 max-w-[calc(100vw-2rem)] sm:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-theme-border flex flex-col max-h-[calc(100dvh-5.5rem)] sm:max-h-[520px]"
              style={{
                background: 'var(--color-bg-card)',
                backdropFilter: 'blur(24px)'
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3.5 border-b border-gold/10 flex-shrink-0"
                style={{
                  background: 'linear-gradient(90deg, rgba(var(--color-gold-rgb),0.12) 0%, rgba(var(--color-gold-rgb),0.05) 100%)',
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                    }}
                  >
                    <FiCamera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gold leading-tight">RJ Photography Guide</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Always ready to help
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-gold hover:bg-gold/10 transition-all duration-200"
                  aria-label="Close chat assistant"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 min-h-[140px] sm:min-h-[200px]">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-2"
                        style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}
                      >
                        <FiCamera className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'text-black rounded-br-sm'
                          : 'text-theme-text bg-theme-bg-sec border border-theme-border rounded-bl-sm'
                      }`}
                      style={
                        msg.role === 'user'
                          ? {
                              background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                            }
                          : {}
                      }
                    >
                      {formatMessage(msg.content, msg.role === 'user')}
                    </div>
                  </div>
                ))}

                {/* Loading dots */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-2"
                      style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}
                    >
                      <FiCamera className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                    </div>
                    <div className="bg-theme-bg-sec border border-theme-border rounded-2xl rounded-bl-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gold/60"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                  {QUICK_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-[10px] sm:text-xs px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full border border-gold/20 text-gold/70 hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 pt-2 border-t border-white/5 flex-shrink-0">
                <div className="flex items-end gap-1.5 sm:gap-2 bg-theme-bg-sec border border-theme-border rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-gold/30 transition-all duration-300">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about photography..."
                    rows={1}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-theme-text placeholder-theme-text-sec resize-none outline-none leading-relaxed py-1"
                    style={{ maxHeight: '80px' }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputText.trim() || isLoading}
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 mb-0.5"
                    style={{
                      background: inputText.trim()
                        ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))'
                        : 'rgba(255,255,255,0.05)',
                    }}
                    aria-label="Send message"
                  >
                    <FiSend
                      className="w-3.5 h-3.5"
                      style={{ color: inputText.trim() ? '#000' : 'currentColor' }}
                    />
                  </button>
                </div>
                <p className="text-center text-[9px] sm:text-[10px] text-gray-500 mt-1.5">Powered by Groq AI</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: isOpen
              ? 'rgba(20,20,20,0.95)'
              : 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
            border: isOpen ? '2px solid rgba(var(--color-gold-rgb),0.4)' : 'none',
          }}
          aria-label="Open photography chat assistant"
        >
          {/* Glow */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-gold)' }} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineChatBubbleLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center"
            >
              <span className="text-[7px] sm:text-[8px] text-black font-bold">!</span>
            </motion.span>
          )}
        </motion.button>
      </div>
    </>
  )
}

export default ChatBot
