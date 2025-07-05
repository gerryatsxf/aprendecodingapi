export class DialogConfig {
    message: string;
    replies: ReplyConfig[];
    next: string | null; // 'stage' or 'reply'
    setNextStage?: string | null; // Optional next stage to set
}

export class ReplyConfig {
    options: ReplyOption[];
    identifiers: string[];
}

export class ReplyOption {
    value: string;
    nextStage: string;
}