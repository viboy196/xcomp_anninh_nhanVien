export interface ExcuteResult {
  code?: string;
  errorMessage?: string;
  result?: any | string;
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
