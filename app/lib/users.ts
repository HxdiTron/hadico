export interface UserData {
  id: string;
  email: string;
  password: string;
  name: string;
  unitNumber: string;
}

// Shared storage for users
export const users: UserData[] = [];

// Helper functions
export const findUserByEmail = (email: string): UserData | undefined => {
  return users.find(u => u.email === email);
};

export const addUser = (user: UserData): void => {
  users.push(user);
}; 