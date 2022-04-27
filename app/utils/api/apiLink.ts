// export const host = 'http://e874-113-185-51-101.ngrok.io'
export const host = 'http://api.kachiusa.vn/api';

export const urlLogin = '/Auth/login?v=1.0';

export const urlRegister = '/NguoiDung/register?v=1.0';

export const urlDetail = '/NguoiDung/Detail?v=1.0';

export const urlActivateApp = '/App/active-app?v=1.0';

export const urlGetTienichAnninhByNguoidung =
  '/CongViec/get-list-congviec-by-system-anninh?v=1.0';

export const Unauthorized = 'Unauthorized';

import axios from 'axios';
axios.defaults.baseURL = host;
export default axios;
