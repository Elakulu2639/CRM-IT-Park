export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface LeadUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  full_name?: string;
}

export interface LeadSource {
  id: number;
  source_name: string;
  description?: string;
}

export interface LeadCategory {
  id: number;
  category_group: string;
  category_name: string;
  description?: string;
}

export interface LeadActivity {
  id: number;
  lead_id: number;
  user_id?: number;
  activity_type: string;
  title: string;
  description?: string;
  status: string;
  completed_at?: string;
  created_at: string;
  user?: LeadUser;
}

export interface ConvertedEntities {
  converted_account?: { id: number; organization_name: string };
  converted_contact?: { id: number; first_name: string; last_name: string };
  converted_opportunity?: { id: number; value?: number; status: string };
}

export interface Lead {
  id: number;
  name: string;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  source_id?: number | null;
  category_id?: number | null;
  owner_user_id?: number | null;
  status: LeadStatus;
  priority: LeadPriority;
  lead_score: number;
  estimated_space_sqm?: number | null;
  estimated_headcount?: number | null;
  next_follow_up_at?: string | null;
  disqualification_reason?: string | null;
  notes?: string | null;
  converted_at?: string | null;
  converted_account_id?: number | null;
  converted_contact_id?: number | null;
  converted_opportunity_id?: number | null;
  owner?: LeadUser | null;
  source?: LeadSource | null;
  category?: LeadCategory | null;
  activities?: LeadActivity[];
  converted_account?: { id: number; organization_name: string } | null;
  converted_contact?: { id: number; first_name: string; last_name: string } | null;
  converted_opportunity?: { id: number; value?: number; status: string } | null;
  created_at: string;
  updated_at: string;
}

export interface DuplicateMatch {
  id: number;
  name: string;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  owner_name: string;
  owner_id?: number | null;
  created_at?: string;
  matched_fields: string[];
}

export interface DuplicateCheckResult {
  has_duplicates: boolean;
  count: number;
  duplicates: DuplicateMatch[];
}

export interface LeadMetrics {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  unqualified: number;
  sla_breaches: number;
  hot_leads: number;
  conversion_rate_pct: number;
}

export interface LeadFilters {
  search?: string;
  status?: string;
  owner_id?: string;
  priority?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  view?: 'table' | 'kanban';
}

export interface LeadsTableResponse {
  success: boolean;
  data: Lead[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  };
}

export interface LeadsKanbanResponse {
  success: boolean;
  data: {
    view: 'kanban';
    columns: Record<LeadStatus, Lead[]>;
    total_count: number;
  };
}

export interface CreateLeadPayload {
  name: string;
  organization?: string;
  email?: string;
  phone?: string;
  source_id?: number;
  category_id?: number;
  owner_user_id?: number;
  status?: LeadStatus;
  priority?: LeadPriority;
  notes?: string;
  estimated_space_sqm?: number;
  estimated_headcount?: number;
  next_follow_up_at?: string;
  force_duplicate?: boolean;
}

export interface ConvertLeadPayload {
  contact_title?: string;
  create_opportunity?: boolean;
  opportunity_title?: string;
  estimated_value?: number;
}
