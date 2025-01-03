export interface Note {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}