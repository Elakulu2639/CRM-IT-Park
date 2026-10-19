import apiClient from './api';
import type {
  Lead,
  LeadCategory,
  LeadFilters,
  LeadMetrics,
  LeadSource,
  LeadStatus,
  LeadsKanbanResponse,
  LeadsTableResponse,
  CreateLeadPayload,
  ConvertLeadPayload,
  DuplicateCheckResult,
} from '../types/lead';

export const leadService = {
  /**
   * Fetch leads list (table view with pagination & filters).
   */
  async getLeadsTable(filters: LeadFilters = {}): Promise<LeadsTableResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.owner_id && filters.owner_id !== 'all') params.append('owner_id', filters.owner_id);
    if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.per_page) params.append('per_page', String(filters.per_page));
    if (filters.sort_by) params.append('sort_by', filters.sort_by);
    if (filters.sort_order) params.append('sort_order', filters.sort_order);

    const response = await apiClient.get<LeadsTableResponse>(`/leads?${params.toString()}`);
    return response.data;
  },

  /**
   * Fetch leads organized in Kanban columns.
   */
  async getLeadsKanban(filters: Omit<LeadFilters, 'page' | 'per_page' | 'view'> = {}): Promise<LeadsKanbanResponse> {
    const params = new URLSearchParams();
    params.append('view', 'kanban');
    if (filters.search) params.append('search', filters.search);
    if (filters.owner_id && filters.owner_id !== 'all') params.append('owner_id', filters.owner_id);
    if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);

    const response = await apiClient.get<LeadsKanbanResponse>(`/leads?${params.toString()}`);
    return response.data;
  },

  /**
   * Fetch high-level lead pipeline metrics.
   */
  async getMetrics(): Promise<LeadMetrics> {
    const response = await apiClient.get<{ success: boolean; data: LeadMetrics }>('/leads/metrics');
    return response.data.data;
  },

  /**
   * Pre-flight check for duplicate leads via email, phone, or company name.
   */
  async checkDuplicate(
    email?: string | null,
    phone?: string | null,
    organization?: string | null,
    excludeId?: number | null
  ): Promise<DuplicateCheckResult> {
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (phone) params.append('phone', phone);
    if (organization) params.append('organization', organization);
    if (excludeId) params.append('exclude_id', String(excludeId));

    const response = await apiClient.get<{ success: boolean; data: DuplicateCheckResult }>(
      `/leads/check-duplicate?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Fetch single lead with full history, notes, and activity timeline.
   */
  async getLead(id: number): Promise<Lead> {
    const response = await apiClient.get<{ success: boolean; data: Lead }>(`/leads/${id}`);
    return response.data.data;
  },

  /**
   * Create a new lead. Throws 409 if duplicate is detected and force_duplicate is false.
   */
  async createLead(payload: CreateLeadPayload): Promise<Lead> {
    const response = await apiClient.post<{ success: boolean; data: Lead }>('/leads', payload);
    return response.data.data;
  },

  /**
   * Update lead properties.
   */
  async updateLead(id: number, payload: Partial<CreateLeadPayload>): Promise<Lead> {
    const response = await apiClient.put<{ success: boolean; data: Lead }>(`/leads/${id}`, payload);
    return response.data.data;
  },

  /**
   * Transition lead status stage.
   */
  async updateStatus(id: number, status: LeadStatus, reason?: string): Promise<Lead> {
    const response = await apiClient.patch<{ success: boolean; data: Lead }>(`/leads/${id}/status`, {
      status,
      reason,
    });
    return response.data.data;
  },

  /**
   * Assign or reassign lead to a team member.
   */
  async assignLead(id: number, ownerUserId: number | null, note?: string): Promise<Lead> {
    const response = await apiClient.patch<{ success: boolean; data: Lead }>(`/leads/${id}/assign`, {
      owner_user_id: ownerUserId,
      note,
    });
    return response.data.data;
  },

  /**
   * 1-Click Convert Lead into Corporate Account, Primary Contact, and Deal.
   */
  async convertLead(id: number, payload: ConvertLeadPayload): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`/leads/${id}/convert`, payload);
    return response.data.data;
  },

  /**
   * Soft delete a lead.
   */
  async deleteLead(id: number): Promise<void> {
    await apiClient.delete(`/leads/${id}`);
  },

  /**
   * Dropdown Options: Lead Sources.
   */
  async getLeadSources(): Promise<LeadSource[]> {
    const response = await apiClient.get<{ success: boolean; data: LeadSource[] }>('/lead-sources');
    return response.data.data;
  },

  /**
   * Dropdown Options: Lead Sector Categories.
   */
  async getLeadCategories(): Promise<LeadCategory[]> {
    const response = await apiClient.get<{ success: boolean; data: LeadCategory[] }>('/lead-categories');
    return response.data.data;
  },

  /**
   * Dropdown Options: Active Team Members for Assignment.
   */
  async getTeamMembers(): Promise<Array<{ id: number; full_name: string; role_name?: string }>> {
    try {
      const response = await apiClient.get<{ success: boolean; data: any[] }>('/users?status=active');
      return (response.data.data || []).map((u: any) => ({
        id: u.id,
        full_name: u.full_name || `${u.first_name} ${u.last_name}`,
        role_name: u.role?.role_name,
      }));
    } catch {
      return [];
    }
  },
};

export default leadService;
