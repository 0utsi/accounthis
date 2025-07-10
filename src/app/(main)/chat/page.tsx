
'use client'

import React, { useState,useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import ChatComposer from '@/components/chat/chat-composer';
import { generateReply } from '@/lib/api';

type Message = { sender: 'user' | 'bot'; text: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isSending, setIsSending] = useState(false)

  const handleSend = useCallback(async (prompt: string) => {
    setMessages((m) => [...m, { sender: 'user', text: prompt }])
    setIsSending(true)

    try {
      const { text } = await generateReply({ prompt })
      setMessages((m) => [...m, { sender: 'bot', text }])
    } catch (err) {
      console.error(err)
      setMessages((m) => [
        ...m,
        { sender: 'bot', text: 'Oops, something went wrong.' },
      ])
    } finally {
      setIsSending(false)
    }
  }, [])

  return (
    <Box className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <Box className="flex-1 overflow-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <Box
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-blue-100 self-end text-right'
                : 'bg-gray-100 self-start text-left'
            }`}
          >
            <Typography>{msg.text}</Typography>
          </Box>
        ))}
      </Box>

    <ChatComposer onSend={handleSend} />
    </Box>
  )
}
