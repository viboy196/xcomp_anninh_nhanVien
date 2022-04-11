export interface ExcuteResult {
  errorMessage?: string;
  result?: any | string;
  status: boolean;
}

export type InputRegister = {
  phone: string;
  password: string;
  fullName: string;
  email: string;
};

export type InfoResult = {
  id?: string;
  name?: string;
  dsNhanVienModel?: [];
};
