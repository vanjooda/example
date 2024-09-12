//특정한 번호(tno)의 값에 의해 todoApi.js의 getOne()을 호출하도록 구성함
//비동기 통신으로 가져온 데이터는 컴포넌트 상태로 반영한다.
//useCustomMove()의 실행 결과중에서 moveToList()와 moveToModify()를 이용하여 처리

import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

//기본값 초기화
const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
}

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState) //아직 todo 사용 x
  const {moveToList, moveToModify} = useCustomMove()

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    })
  }, [tno])

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 ">
      {makeDiv("Tno", todo.tno)} {makeDiv("Writer", todo.writer)}
      {makeDiv("Title", todo.title)} {makeDiv("Due Date", todo.dueDate)}
      {makeDiv("Complete", todo.complete ? "Completed" : "Not Yet")}

      {/* buttons.........start */} 
      <div className="flex justify-end p-4"> 
        <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList()} > List </button> 
        <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => moveToModify(tno)} > Modify </button>
    </div>
    </div>
  )
}

const makeDiv = (title, value) => 
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>


export default ReadComponent
