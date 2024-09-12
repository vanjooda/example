//목록 화면을 보여줄 컴포넌트
//목록 데이터 출력
//API 서버에서 가져온 목록 데이터는 이미지 파일의 이릉이 포함되어 있으므로 이를 화면에 출력 해 줄때 서버의 경로를 이용해야함
//useCustomMove를 통해 만든 moveToRead를 이용해 상품 조회 페이지로 이동이 가능하도록 구성
//페이지 이동
//useCustomMove()를 이용해서 moveToList()를 이용가능, 페이징 처리 역시 common 폴더의 pageComponent를 활용하면 쉽게 구현 가능
import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;
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
  const { exceptionHandle } = useCustomLogin();

  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);
  // for FetchingModal

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
        setFetching(false);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);
  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {" "}
      {fetching ? <FetchingModal /> : <></>}{" "}
      <div className="flex flex-wrap mx-auto p-6">
        {" "}
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(product.pno)}
          >
            {" "}
            <div className="flex flex-col h-full">
              {" "}
              <div className="font-extrabold text-2xl p-2 w-full ">
                {" "}
                {product.pno}{" "}
              </div>{" "}
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                {" "}
                <div className="w-full overflow-hidden ">
                  {" "}
                  <img
                    alt="product"
                    className="m-auto rounded-md w-60"
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]} `}
                  />{" "}
                </div>{" "}
                <div className="bottom-0 font-extrabold bg-white">
                  {" "}
                  <div className="text-center p-1">
                    {" "}
                    이름: {product.pname}{" "}
                  </div>{" "}
                  <div className="text-center p-1"> 가격: {product.price} </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>{" "}
    </div>
  );
};
export default ListComponent;
