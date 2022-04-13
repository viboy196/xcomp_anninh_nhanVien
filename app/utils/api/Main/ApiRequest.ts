import axios, {AxiosRequestConfig} from 'axios';
import {ExcuteResult, InputRegister} from '../apiTypes';

const host = 'http://api.kachiusa.vn/api';
axios.defaults.baseURL = host;
const urlLogin = '/Auth/login?v=1.0';

const urlRegister = '/api/NguoiDung/register?v=1.0';

const urlDetail = '/NguoiDung/Detail?v=1.0';

const urlActivateApp = '/App/active-app?v=1.0';

const urlGetTienichAnninhByNguoidung =
  '/CongViec/get-list-congviec-by-system-anninh?v=1.0';

const urlGetListNoti = '/Noti/get-list-noti?v=1.0';

export default class ApiRequest {
  // export const host = 'http://e874-113-185-51-101.ngrok.io'

  static GetListNoti = async (token: string): Promise<ExcuteResult> => {
    const tag = 'GetListNoti';
    console.log(`${tag} url:`, urlGetListNoti);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(urlGetListNoti, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static DetailInfoNguoiDung = async (token: string): Promise<ExcuteResult> => {
    const tag = 'DetailInfoNguoiDung';
    console.log(`${tag} url:`, urlDetail);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(urlDetail, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static GetListCongviecBySystemAnninh = async (data: {
    token: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetListCongviecBySystemAnninh';
    const url = urlGetTienichAnninhByNguoidung;
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${data.token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static ActivateApp = async (
    tokenNotification: string,
    token: string,
  ): Promise<ExcuteResult> => {
    console.log('urlActivateApp ', urlActivateApp);

    console.log(tokenNotification, token);
    const tag = 'ActivateApp';
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };

    const bodyParameters = {
      appToken: tokenNotification,
      device: 'firebase',
      typeApp: 'nhanvien',
    };
    const res = await axios.post(urlActivateApp, bodyParameters, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);

    return res.data as ExcuteResult;
  };
  static LoginApi = async (input: {
    phone: string;
    password: string;
  }): Promise<ExcuteResult> => {
    console.log('urlLogin ', urlLogin);
    const res = await axios.post(urlLogin, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };

  static RegisterApi = async (input: InputRegister): Promise<ExcuteResult> => {
    console.log('urlRegister ', urlRegister);
    const res = await axios.post(urlRegister, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };
}
