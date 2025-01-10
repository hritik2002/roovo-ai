export type Message = {
  text: string
  sender: "user" | "bot"
  timestamp: string
}

export async function handleMessage(message: string): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    text: "This is a dummy response from the API",
    sender: "bot",
    timestamp: new Date().toISOString()
  }
}
