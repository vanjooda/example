//ReadComponent가 완성되기 위해선 목록화면으로 이동하는 기능 추가되어야 함
// 화면구성은 컴포넌트를 이용해 처리가능하지만, 컴포넌트 내부에서 만들어지는 공통 코드의 경우 Custom hook 사용
//커스텀훅의 파일명은 use~ 로 반드시 시작해야함
//조회 화면에서 다시 목록을 화면으로 이동해야 하는 기능 필요함, 그렇게때문에 useNavigate, useSearchParams 이용해야함
//커스텀훅 이용하면 여러 컴포넌트들이 필요한 기능을 하나의 함수로 묶어서 처리 가능
//목록, 수정페이지로 이동

//동일 페이지 클릭시 문제
//동일한 page와 size라고해도 매번 서버를 호출하고 싶다면 컴포넌트 내부에서 매번 변하는 상태(state)값을 이용함
// ex) true/false값이 번갈아가며 변경, 계속올라가는 숫자, 현재시간등을 이용할 수 있음
//useCustomMove의 내부에 refresh 변수를 상태로 선언하고 moveToList()가 호출될 때마다 변경

//조회 페이지 이동
// Todo 번호(tno)를 클릭해 조회 화면으로 이동하는것, useCustomMove()를 이용해 moveToRead()와 같은 함수 하나 추가

import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

//useCustomMove() 내부에 useNavigate()와 useSearchParams()를 이용해 원하는 기능을 moveToList()로 만들고 이것을 page,size와 함께 반환함
//useCustomMove()를 이용하면 이전에 비해 간단이 useNavigate() 이용함, 반환된 데이터중 필요한 데이터만 선별해서 사용가능
const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const [queryParams] = useSearchParams();
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString(); //새로 추가

  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../list`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };

  const moveToModify = (num) => {
    console.log(queryDefault);

    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };

  const moveToRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../read/${num}`,
      search: queryDefault,
    });
  };
  return { moveToList, moveToModify, moveToRead, page, size, refresh }; //refresh 추가
};

export default useCustomMove;
