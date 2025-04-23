export function formatConversations(conversations: any) {
  let parsedConversations = conversations;

  if (typeof conversations === 'string') {
    try {
      parsedConversations = JSON.parse(conversations);
    } catch (error) {
      console.error("Erro ao tentar converter conversations para objeto:", error);
    }
  }

  if (!parsedConversations) return [];

  const isArray = Array.isArray(parsedConversations);
  const isObject = typeof parsedConversations === 'object' && !isArray;

  const convArray = isArray
    ? parsedConversations
    : isObject
    ? Object.values(parsedConversations)
    : [];

  return convArray.map((conv) => {
    // Encontrar a mensagem com a data mais recente
    const latestMessage = conv.messages.reduce((latest, current) => {
      const currentTime = new Date(current.times).getTime();
      const latestTime = latest ? new Date(latest.times).getTime() : 0;
      return currentTime > latestTime ? current : latest;
    }, null);

    const previewContent =
      latestMessage && latestMessage.content && latestMessage.content !== 'unsupported'
        ? latestMessage.content
        : '(Mídia)';

    return {
      ...conv,
      preview: previewContent,
      date: latestMessage ? new Date(latestMessage.times).toLocaleDateString() : '',
      avatar: `https://icones.pro/wp-content/uploads/2021/03/avatar-de-personne-icone-homme.png`,
      typingUsers: [],
    };
  });
}

export function formatMessageContent(content: string) {
  if (!content) return "(Mídia vazia)";
  if (content === "unsupported") return "(Mídia não suportada)";
  if (content === "document") return "(Documento)";
  if (content === "image") return "(Imagem)";
  if (content === "video") return "(Vídeo)";
  return content;
}
