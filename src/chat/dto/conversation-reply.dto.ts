export class ConversationReply {
    text: string;
    replyOptions: string[];
    sender: 'bot' | 'user';
    timestamp: string; // ISO date string
    leadId: string; // Optional lead ID for tracking
    setNextStage?: null | string; // Optional next stage to set
}
