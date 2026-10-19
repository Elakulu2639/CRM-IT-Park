import apiClient from './api';
import roleService from './roleService';
import type {
  User,
  Role,
  CreateUserPayload,
  UpdateUserPayload,
  UserStatus,
} from '../types/user';

export const userService = {
  /**
   * Fetch all CRM users with their roles.
   * Authorized: System Administrator, CRM Manager
   */
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<{ data: User[] }>('/users');
    return response.data.data;
  },

  /**
   * Fetch all active roles for assignment (delegated to roleService).
   */
  getRoles: () => roleService.getRoles(),

  /**
   * Create a new CRM user with an assigned role.
   * Authorized: System Administrator
   */
  async createUser(payload: CreateUserPayload): Promise<User> {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: { user: User };
    }>('/users', payload);
    return response.data.data.user;
  },

  /**
   * Update existing user information.
   * Authorized: System Administrator
   */
  async updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
    const response = await apiClient.put<{
      success: boolean;
      message: string;
      data: { user: User };
    }>(`/users/${id}`, payload);
    return response.data.data.user;
  },

  /**
   * Activate or deactivate user account.
   * Authorized: System Administrator
   */
  async updateStatus(id: number, status: UserStatus): Promise<User> {
    const response = await apiClient.patch<{
      success: boolean;
      message: string;
      data: { user: User };
    }>(`/users/${id}/status`, { status });
    return response.data.data.user;
  },

  /**
   * Assign or modify user's role.
   * Authorized: System Administrator
   */
  async assignRole(id: number, roleId: number): Promise<User> {
    const response = await apiClient.put<{
      success: boolean;
      message: string;
      data: { user: User };
    }>(`/users/${id}/role`, { role_id: roleId });
    return response.data.data.user;
  },
};

export default userService;
