export interface UserData{
  id: string;
  fullName: string;
  email: string;
  isBlocked: boolean;
  lastActivityDate: Date | null
}

export interface AuthFormData{
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}
export interface AuthResponse{
  success: boolean;
  message: string;
  id?: string;
  token?: string;
}
export type LoginFormData = Readonly<Omit<AuthFormData, 'firstName' | 'secondName'>>

export type CheckedUserData = UserData & {
  isChecked: boolean;
};

export interface UserSettingsResponse{
  success: boolean;
  message: string;
  redirect?: boolean;
  users?: UserData[]
}