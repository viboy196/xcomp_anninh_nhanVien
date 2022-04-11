import axios, {urlLogin, urlRegister} from './apiLink';
import {ExcuteResult, InputRegister} from './apiTypes';
export const LoginApi = async (input: {
  phone: string;
  password: string;
}): Promise<ExcuteResult> => {
  console.log('urlLogin ', urlLogin);
  const res = await axios.post(urlLogin, input);
  console.log(res.data);
  return res.data as ExcuteResult;
};

export const RegisterApi = async (
  input: InputRegister,
): Promise<ExcuteResult> => {
  console.log('urlRegister ', urlRegister);
  const res = await axios.post(urlRegister, input);
  console.log(res.data);
  return res.data as ExcuteResult;
};
