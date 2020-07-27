import { request } from 'umi';
import { SessionUser } from './model/user';

export async function getSessionUser() {
  const sessionUser: SessionUser = {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    username: "admin",
    fullname: "Administrator",
    roles: [],
  };
  return sessionUser;
}
