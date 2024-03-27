export type Tag = {
    last_activity_date?: number; // Date represented as a Unix timestamp
    has_synonyms: boolean;
    is_moderator_only: boolean;
    is_required: boolean;
    count?: number;
    name: string;
    synonyms?: string[];
    user_id?: number;
  };