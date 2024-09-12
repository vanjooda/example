//ListComponent를 ListPage에 임포트함
//ListComponent는 useCustomMove를 이용하기때문에 현재 컴포넌트에서 필요한 page나 size같은 데이터 쉽게 구할수 있기때문에 기존 코드 수정했음

import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {

  return(
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Todo List Page Component
      </div>

      <ListComponent/>
      
    </div>
  );
}

export default ListPage;