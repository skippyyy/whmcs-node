export interface SendEmailRequest {
  messagename?: string;
  id?: number;
  customtype?: string;
  custommessage?: string;
  customsubject?: string;
  customvars?: Record<string, any>;
}

export interface SendEmailResponse {
  result: string;
}
