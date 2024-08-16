export type Admin = {
  id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  username: string;
  phone: string;
  email: string;
  role?: "ADMIN" | "CASHIER";
  isActive?: boolean;
};
