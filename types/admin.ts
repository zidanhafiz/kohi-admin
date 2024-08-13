export type Admin = {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  role?: "ADMIN" | "CASHIER";
  isActive?: boolean;
};
