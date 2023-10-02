export interface User {
  user: { id: number; isAdmin: boolean | null; userName: string; email: string };
  token: string;
  message: string;
}
