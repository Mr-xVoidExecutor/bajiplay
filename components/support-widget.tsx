'use client'

import { useState } from 'react'
import { Headset, Send, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

type Message = { from: 'agent' | 'user'; text: string }

export function SupportWidget() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { from: 'agent', text: 'Hi! Welcome to BajiPlay support. How can we help you today?' },
  ])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [
      ...m,
      { from: 'user', text },
      { from: 'agent', text: 'Thanks! A support agent will join this chat in a moment.' },
    ])
    setInput('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label={t('support')}
          className="flex h-96 w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <div className="flex items-center justify-between bg-gold-gradient px-4 py-3 text-primary-foreground">
            <div>
              <p className="font-display text-lg font-bold leading-tight">{t('support')}</p>
              <p className="flex items-center gap-1.5 text-xs opacity-80">
                <span className="size-2 rounded-full bg-green-700" aria-hidden />
                Online now
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-black/10">
              <X className="size-5" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col gap-2 overflow-y-auto p-3" aria-live="polite">
            {messages.map((m, i) => (
              <li
                key={i}
                className={
                  m.from === 'user'
                    ? 'ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground'
                    : 'max-w-[80%] rounded-2xl rounded-bl-sm bg-secondary px-3 py-2 text-sm'
                }
              >
                {m.text}
              </li>
            ))}
          </ul>
          <form
            className="flex gap-2 border-t border-border p-2"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <label htmlFor="support-input" className="sr-only">
              Message
            </label>
            <input
              id="support-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
              }}
              placeholder="Type a message..."
              className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm focus:border-primary focus:outline-none"
            />
            <button type="submit" aria-label="Send" className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t('support')}
        className="relative flex size-14 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground shadow-[0_0_30px_-4px] shadow-primary/70 transition hover:scale-105"
      >
        {open ? <X className="size-6" /> : <Headset className="size-6" />}
        {!open && <span className="absolute right-0.5 top-0.5 size-3 rounded-full border-2 border-background bg-success" aria-hidden />}
      </button>
    </div>
  )
}
