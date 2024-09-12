// get방식으로 호출하는 함수를 작성함
// 비동기방식을 Ajax가 아닌 Axios 라이브러리를 추가해서 사용함, 데이터형식이 JSON을 사용하기 떄문에 개발 분량도 적음

import jwtAxios from "../util/jwtUtil";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/todo`;

// todo 번호를 조회하기 위한 함수
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);

  return res.data;
};

//가장 핵심인 함수 (페이지를 처리하기 위함)
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

//서버 호출 결과 확인
export const postAdd = async (todoObj) => {
  const res = await jwtAxios.post(`${prefix}/`, todoObj);
  return res.data;
};

//삭제에 필요한 함수
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}`);
  return res.data;
};

//수정에 필요한 함수
export const putOne = async (todo) => {
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);
  return res.data;
};
