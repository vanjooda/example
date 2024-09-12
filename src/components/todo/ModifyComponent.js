// 수정,삭제 처리는 여기서 또한 더 일관성 있는 개발을 위해 버튼도 여기서 처리함

// 이 컴포넌트는 우선 서버에서 내용물을 가져와 출력하고 변경이 가능하도록 구성
// 이것을 위해 조회기능과 useEffect()를 사용해 서버로부터 데이터를 가져오고, 등록가능한 <input>을 이용함

// 이 컴포넌트의 기능들은 호출 후 결과를 보여주기때문에 모달창을 추가해야함
// 삭제의 경우 삭제 후 모달창 보여준뒤 모달창 닫히면서 삭제하도록 구성해야함 = 화면에 ResultModel을 이용해서 처리함
// 화면 이동 전에 수정이나 삭제 호출에 문제없는지 확인하기 위해 handleClickModify() , handleClickDelete()와 같은 함수 지정하고 버튼에 이벤트 처리 추가
// useCustomMove를 이용해 화면 이동에 필요한 기능을 가져오고 ResultModal이 close 될 때 호출 하도록 변경함

import { useEffect, useState } from "react";
import { deleteOne,getOne,putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno:0,
  title:'',
  writer:'',
  dueDate:'',
  complete: false
}

const ModifyComponent = ({tno}) => {

  const [todo, setTodo] = useState({...initState})

  //모달 창을 위한 상태
  const [result, setResult] = useState(null)

  //이동을 위한 기능들
  const {moveToList, moveToRead} = useCustomMove()

  useEffect(() => {
    getOne(tno).then(data => setTodo(data))
  }, [tno])

  const handleClickModify = () =>{  //수정 버튼 클릭시
    putOne(todo).then(data => {
      setResult('Modified')
    })
  }

  const handleClickDelete = () =>{  //삭제 버튼 클릭시
    deleteOne(tno).then( data => {
      setResult('Deleted')
    })
  }

  //모달 창이 closed 될때
  const closeModal = () =>{
    if (result === 'Deleted') {
      moveToList()
    } else {
      moveToRead(tno)
    }
  }

  const handleChangeTodo = (e) =>{
    todo[e.target.name] = e.target.value
    setTodo({...todo})
  }
  const handleChangeTodoComplete = (e) =>{
    const value = e.target.value
    todo.complete = (value === 'Y')
    setTodo({...todo})
  }

  return(
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">

      {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> :<></>}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
          {todo.tno}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
          {todo.writer}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          name="title"
          type={'text'}
          value={todo.title}
          onChange={handleChangeTodo}
          >
          </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          name="dueDate"
          type={'date'}
          value={todo.dueDate}
          onChange={handleChangeTodo}
          >
          </input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
          <select
          name="status"
          className="border-solid border-2 rounded m-1 p-2"
          onChange={handleChangeTodoComplete}
          value={todo.complete? 'Y':'N'}     //삼항 연산자  = 조건 ? 참일때값 : 거짓일때 값
          >
            <option value={'Y'}>Complete</option>
            <option value={'N'}>Not Yet</option>
          </select>
        </div>
      </div>

    <div className="flex justify-end p-4">
      <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={handleClickDelete}>Delete</button>
      <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={handleClickModify}>Modify</button>
    </div>

 </div>
  );
}

export default ModifyComponent;