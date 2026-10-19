export interface Role {
  id: number;
  role_name: string;
  description: string | null;
  role_tier: number | null;
  is_active?: boolean;
}

export interface RoleResponse {
  data: Role[];
}
