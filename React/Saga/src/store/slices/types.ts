export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    zipcode: string;
  };
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}