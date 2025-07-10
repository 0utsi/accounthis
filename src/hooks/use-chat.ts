import { useMutation } from '@tanstack/react-query'
import { generateReply, GenerateRequest, GenerateResponse } from '../lib/api'

export function useChat(onSuccess: (msg: string) => void) {
  return useMutation<GenerateResponse, Error, GenerateRequest>({
    mutationFn: generateReply,
    onSuccess(data) {
      onSuccess(data.text)
    },
    onError(error) {
      console.error('Chat error:', error)
    },
  })
}
