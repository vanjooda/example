import jwtAxios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  //경로 뒤의 '/' 주의
  const res = await jwtAxios.post(`${host}/`, product, header);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${host}/${tno}`);
  return res.data;
};

//수정
export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${pno}`, product, header);
  return res.data;
};

//삭제
export const deleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${host}/${pno}`);
  return res.data;
};
