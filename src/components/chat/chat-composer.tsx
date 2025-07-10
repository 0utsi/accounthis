// components/ChatComposer.tsx
'use client'

import React, { useState, useCallback } from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { generateReply } from '@/lib/api'

export interface ChatComposerProps {
  /** Callback with bot response text */
  onSend: (text: string) => void
}

export default function ChatComposer({ onSend }: ChatComposerProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = useCallback(async () => {
    const prompt = input.trim()
    if (!prompt || loading) return

    setLoading(true)
    try {
      const { text } = await generateReply({ prompt })
      onSend(text)
    } catch (error) {
      console.error('Chat send error:', error)
    } finally {
      setLoading(false)
      setInput('')
    }
  }, [input, loading, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !loading) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend, loading]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value)
    },
    []
  )

  return (
    <Box display="flex" alignItems="center" gap={1} p={2}>
      <TextField
        fullWidth
        size="small"
        placeholder="Type your message..."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <Button
        variant="contained"
        onClick={handleSend}
        disabled={loading || !input.trim()}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Send'}
      </Button>
    </Box>
  )
}
