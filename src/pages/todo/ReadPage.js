//조회 페이지로 이동하는 기능은 page/todo/ReadPage에서 처리하지만 ReadComponent가 필요한 기능을 useCustomMove를 이용해 처리 가능하기 때문에 useNavigate이용하는 코드 삭제했음

import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () =>{

  const {tno} = useParams()
  
  return(
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl">
        Todo Read Page Component {tno}
      </div>

      <ReadComponent tno={tno}></ReadComponent>
      
    </div>
  );
}

export default ReadPage;