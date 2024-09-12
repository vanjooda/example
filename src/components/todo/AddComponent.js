// 등록 컴포넌트와 모달창 처리
// 등록처리는 입력하는 화면이 있고 버튼을 클릭하면 서버를 호출하고 호출 결과를 모달창에서 현재 화면을 보여주도록 구성함
// 등록처리용 페이지는 AddPage.js , 해당 페이지에 사용할 컴포넌트가 현재 컴포넌트
//input 태그들과 상태 처리에만 중점, ADD버튼 클릭했을때 이벤트 처리 작성
//ResultModal을 import하고 ResultModal을 사용하게 되는 상태를 처리
//ResultModal에 전달되는 속성중 callbackFn은 종료될 때 호출되는 함수.

import { useState } from "react";
import { postAdd } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  title: "",
  writer: "",
  dueDate: "",
};

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });

  //결과 데이터가 있는 경우에는 ResultModal을 보여준다.
  const [result, setResult] = useState(null); //결과 상태

  const { moveToList } = useCustomMove(); //useCustomMove 활용

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  //todoApi.js의 postAdd()를 호출하고 결과를 확인함
  const handleClickAdd = () => {
    postAdd(todo)
      .then((result) => {
        console.log(result);
        setResult(result.TNO); //결과 데이터 변경
        //초기화
        setTodo({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToList(); //moveToList() 호출
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/*모달처리 */}
      {result ? (
        <ResultModal
          title={"Add Result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>{" "}
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>{" "}
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="writer"
            type={"text"}
            value={todo.writer}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
