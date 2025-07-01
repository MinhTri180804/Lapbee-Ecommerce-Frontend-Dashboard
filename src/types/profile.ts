export type Profile = {
  firstName: string;
  lastName: string;
  avatar: {
    publicId: string;
    url: string;
  } | null;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
};
