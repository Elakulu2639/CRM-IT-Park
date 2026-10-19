import apiClient from './api';
import type { Role } from '../types/role';

export const roleService = {
  /**
   * Fetch all active roles available for assignment from backend.
   * Endpoint: GET /api/roles
   */
  async getRoles(): Promise<Role[]> {
    const response = await apiClient.get<{ data: Role[] }>('/roles');
    return response.data.data;
  },
};

export default roleService;
