import { request } from 'umi';

export async function loginByForm({username, password} : {username: string, password: string}) {
  // return request<boolean>('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  console.log(username, password)
  return true;
}

export async function loginByToken() {
  return true;
}

export async function logout() {
  return true;
}
