interface UserData {
  id: string;
  email: string;
  password: string;
  name: string;
  unitNumber: string;
}

// In-memory storage
let users: UserData[] = [
  {
    id: "1",
    email: "info1111@usyd.com",
    password: "welove1111",
    name: "Test User",
    unitNumber: "101"
  }
];

export const storage = {
  getUsers: async (): Promise<UserData[]> => {
    return users;
  },

  saveUsers: async (newUsers: UserData[]): Promise<void> => {
    users = newUsers;
  },

  addUser: async (user: UserData): Promise<void> => {
    users.push(user);
  },

  findUserByEmail: async (email: string): Promise<UserData | undefined> => {
    return users.find(u => u.email === email);
  }
}; 