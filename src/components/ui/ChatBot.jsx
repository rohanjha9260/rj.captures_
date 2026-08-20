import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCamera } from 'react-icons/fi'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

const SYSTEM_PROMPT = `You are a friendly and knowledgeable photography assistant for "RJ Captures" — a premium cinematic photography portfolio by Rohan Jha based in Delhi, India.

Your role is to:
- Help users learn about photography techniques (composition, lighting, exposure, aperture, shutter speed, ISO, etc.)
- Give tips on nature, sky, village, travel, and portrait photography — all specialties of RJ Captures
- Explain camera settings and gear recommendations in simple terms
- Share creative ideas for shots and storytelling through photography
- Answer general photography questions warmly and encouragingly

Keep responses concise, friendly, and practical. Use emojis occasionally to make responses feel warm. Format answers with bullet points or short paragraphs when helpful.`

const QUICK_QUESTIONS = [
  '📷 Best camera settings for nature?',
  '🌅 How to photograph golden hour?',
  '🏔️ Tips for landscape shots?',
  '🌃 Night sky photography guide',
]

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your photography guide 📸 Ask me anything about photography — from camera settings to composition tips. I'm here to help you capture stunning moments!",
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
  }, [messages])

  const sendMessage = async (text) => {
    const userText = text || inputText.trim()
    if (!userText || isLoading) return

    setInputText('')
    const updatedMessages = [...messages, { role: 'user', content: userText }]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const apiKey = GEMINI_API_KEY || ''
      if (!apiKey) {
        throw new Error(
          'Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env.local file.'
        )
      }

      // Build a clean contents array.
      // Rules: must start with 'user', must alternate user/model, no empty parts.
      const history = []

      // Add system prompt as the very first user turn
      history.push({
        role: 'user',
        parts: [{ text: `[System] ${SYSTEM_PROMPT}` }],
      })
      history.push({
        role: 'model',
        parts: [{ text: 'Got it! Ready to help with photography guidance.' }],
      })

      // Add actual conversation (skip the initial greeting at index 0)
      for (let i = 1; i < updatedMessages.length; i++) {
        const msg = updatedMessages[i]
        history.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errMsg = data?.error?.message || `HTTP ${response.status}`
        console.error('Gemini API Error:', errMsg, data)
        throw new Error(errMsg)
      }

      const replyText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
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

  const formatMessage = (text) => {
    return text
      .split('\n')
      .map((line, i) => (
        <span key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      ))
  }

  return (
    <div className="fixed bottom-8 right-4 md:right-8 lg:right-28 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="w-[calc(100vw-2rem)] sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-theme-border flex flex-col"
            style={{
              background: 'var(--color-bg-card)',
              backdropFilter: 'blur(24px)',
              maxHeight: '520px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 border-b border-gold/10"
              style={{
                background: 'linear-gradient(90deg, rgba(var(--color-gold-rgb),0.12) 0%, rgba(var(--color-gold-rgb),0.05) 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                  }}
                >
                  <FiCamera className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gold leading-tight">RJ Photography Guide</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Always ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gold hover:bg-gold/10 transition-all duration-200"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: '200px', maxHeight: '300px' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-2"
                      style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}
                    >
                      <FiCamera className="w-3 h-3 text-black" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
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
                    {formatMessage(msg.content)}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-2"
                    style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}
                  >
                    <FiCamera className="w-3 h-3 text-black" />
                  </div>
                  <div className="bg-theme-bg-sec border border-theme-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
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
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-gold/20 text-gold/70 hover:border-gold/50 hover:text-gold hover:bg-gold/5 transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 pt-2 border-t border-white/5">
              <div className="flex items-end gap-2 bg-theme-bg-sec border border-theme-border rounded-xl px-3 py-2 focus-within:border-gold/30 transition-all duration-300">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about photography..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-theme-text placeholder-theme-text-sec resize-none outline-none leading-relaxed py-0.5"
                  style={{ maxHeight: '80px' }}
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                  style={{
                    background: inputText.trim()
                      ? 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))'
                      : 'rgba(255,255,255,0.05)',
                  }}
                >
                  <FiSend
                    className="w-3.5 h-3.5"
                    style={{ color: inputText.trim() ? '#000' : 'currentColor' }}
                  />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-700 mt-1.5">Powered by Gemini AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
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
              <FiX className="w-6 h-6" style={{ color: 'var(--color-gold)' }} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center"
          >
            <span className="text-[8px] text-black font-bold">!</span>
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}

export default ChatBot
