export interface GenerateRequest {
  prompt: string
}
export interface GenerateResponse {
  text: string
}

const BASE_URL = 'http://localhost:8000'

export async function generateReply(
  body: GenerateRequest,
): Promise<GenerateResponse> {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let detail = `Request failed (${res.status})`
    try {
      const json = await res.json()
      detail = (json.detail as string) || detail
    } catch {}
    throw new Error(detail)
  }

  return res.json()
}
