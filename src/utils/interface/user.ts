export type UserRole = 'user' | 'admin';
export interface IAuthUser {
  id: number;
  email: string;
  roles: [UserRole];
}
