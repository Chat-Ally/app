interface Conversation {
    id: number,
    name: string,
    time: string,
    number: number
}

export async function getConversations(): Promise<Conversation[]> {
    let response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/chats")
    let data = await response.json()

    return data
}