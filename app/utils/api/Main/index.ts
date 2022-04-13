import axios, {
  Unauthorized,
  urlActivateApp,
  urlDetail,
  urlGetTienichAnninhByNguoidung,
} from '../apiLink';
import {ExcuteResult} from '../apiTypes';
import {AxiosRequestConfig} from 'axios';

export const DetailInfoNguoiDung = async (
  token: string,
  url = urlDetail,
): Promise<ExcuteResult> => {
  const tag = 'DetailInfoNguoiDung';
  console.log(`${tag} url:`, url);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `bearer ${token}`,
      accept: 'text/plain',
    },
  };
  const res = await axios.get(urlDetail, config);
  console.log(`${tag} data:`, res.data);
  return res.data as ExcuteResult;
};

export const GetListCongviecBySystemAnninh = async (data: {
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
  try {
    const res = await axios.get(url, config);
    // console.log(`${tag} data:`, res.data);
    return res.data as ExcuteResult;
  } catch (error) {
    return {status: false, errorMessage: Unauthorized};
  }
};

export const ActivateApp = async (
  tokenNotification: string,
  token: string,
): Promise<ExcuteResult> => {
  console.log('urlActivateApp ', urlActivateApp);

  // console.log(tokenNotification, token);

  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      accept: 'text/plain',
    },
  };

  const bodyParameters = {
    appToken: tokenNotification,
    device: 'expo',
    typeApp: 'nhanvien',
  };
  try {
    const res = await axios.post(urlActivateApp, bodyParameters, config);
    console.log('ActivateApp', res.data);

    return res.data;
  } catch (error) {
    return {status: false};
  }
};
