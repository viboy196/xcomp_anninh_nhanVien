import axios, {AxiosRequestConfig} from 'axios';
import {ExcuteResult, InputRegister} from '../apiTypes';

const host = 'http://14.225.3.190:8911/api';
axios.defaults.baseURL = host;
const urlLogin = '/AppUser/auth?v=1.0';

const urlRegister = '/NguoiDung/register?v=1.0';

// const urlDetail = '/NguoiDung/Detail?v=1.0';
const getUrlDetail = (userName: string) =>
  `/AppUser/detail?userName=${userName}&v=1.0`;

const urlActivateApp = '/App/active-app?v=1.0';

const urlGetTienichAnninhByNguoidung =
  '/CongViec/get-list-congviec-by-system-anninh?v=1.0';

// const urlGetListNoti = '/Noti/get-list-noti?v=1.0';
const getUrlGetListNoti = (typeApp: string): string => {
  return `Noti/get-list-noti?StrTypeApp=${typeApp}&v=1.0`;
};
export default class ApiRequest {
  // export const host = 'http://e874-113-185-51-101.ngrok.io'

  static GetListNoti = async (token: string): Promise<ExcuteResult> => {
    const tag = 'GetListNoti';
    const url = getUrlGetListNoti('nhanvien');
    console.log(`${tag} url:`, url);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `bearer ${token}`,
        accept: 'text/plain',
      },
    };
    const res = await axios.get(url, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
  static DetailInfoNguoiDung = async (
    token: string,
    userName: string,
  ): Promise<ExcuteResult> => {
    const tag = 'DetailInfoNguoiDung';
    const urlDetail = getUrlDetail(userName);
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
  static ActivateApp = async (input: {
    tokenAuth: string;
    tokenFirebase: string;
    typeApp: string;
  }): Promise<ExcuteResult> => {
    console.log('urlActivateApp ', urlActivateApp);

    const tag = 'ActivateApp';
    const config = {
      headers: {
        Authorization: `bearer ${input.tokenAuth}`,
        accept: 'text/plain',
      },
    };

    const bodyParameters = {
      token: input.tokenFirebase,
      typeApp: input.typeApp,
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
    const res = await axios.post(urlLogin, {
      userName: input.phone,
      password: input.password,
    });
    console.log(res.data);
    return res.data as ExcuteResult;
  };

  static RegisterApi = async (input: InputRegister): Promise<ExcuteResult> => {
    console.log('urlRegister ', urlRegister);
    const res = await axios.post(urlRegister, input);
    console.log(res.data);
    return res.data as ExcuteResult;
  };

  static TollAreaByReader = async (data: {
    token: string;
    userId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetListTollAreaByReader';
    const url = `/TollArea/all-by-reader?userId=${data.userId}&v=1.0`;
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

  static WaterUserAllByTollarea = async (data: {
    token: string;
    tollAreaId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetWaterUserAllByTollarea';
    const url = `/WaterUser/all-by-tollarea?tollAreaId=${data.tollAreaId}&v=1.0`;
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

  static WaterInvoiceAllByWateruser = async (data: {
    token: string;
    waterUserId: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetWaterInvoiceAllByWateruser';
    const url = `/WaterInvoice/all-by-wateruser?waterUserId=${data.waterUserId}&v=1.0`;
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
  static WaterIndexAdd = async (data: {
    token: string;
    waterUserId: string;
    year: string;
    month: string;
    waterMeterNumber: string;
  }): Promise<ExcuteResult> => {
    const tag = 'GetWaterInvoiceAllByWateruser';
    const url = '/WaterIndex/add?v=1.0';
    console.log(`${tag} url:`, url);

    const config = {
      headers: {
        Authorization: `bearer ${data.token}`,
        accept: 'text/plain',
      },
    };

    const bodyParameters = {
      waterUserId: data.waterUserId,
      year: data.year,
      month: data.month,
      waterMeterNumber: data.waterMeterNumber,
    };
    console.log(bodyParameters);

    const res = await axios.post(url, bodyParameters, config);
    console.log(`${tag} data key.length :`, Object.keys(res.data).length);
    return res.data as ExcuteResult;
  };
}
