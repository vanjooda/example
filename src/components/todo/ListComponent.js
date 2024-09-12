// 목록 데이터 처리
//브라우저 경로에 있는 쿼리스트링으로 페이지 번호/사이즈에 따라서 서버를 호출하고 결과를 출력하는것
//useEffect()를 사용해 해당 데이터를 가져와서 구현
//ListComponent는 useCustomMove()를 이용해 현재 경로의 page와 size구성하고 API서버를 호출함
//서버의 데이터는 dtoList라는 배열 데이터와 pageNumList라는 페이지번호가 있고, 이전(prev) / 다음(next) 등의 추가적인 데이터가있음
//서버에서 가져온 데이터들을 ListComponent에서 출력함
//refresh 값은 페이지 번호를 클릭하면 매번 변경되기 때문에 useEffect의 조건이 된다 (동일 페이지 클릭시 문제에 대해)

import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove(); //refresh 추가

  const [serverData, setServerData] = useState(initState);
  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((todo) => (
          <div
            key={todo.tno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(todo.tno)} //이벤트 처리
          >
            <div className="flex ">
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {todo.tno}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {todo.title}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {todo.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
