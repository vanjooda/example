//결과를 확인할 정도로만 작성하고
//AddPage 컴포넌트에서 실제 화면의 내용을 구성하는 작업은 이 컴포넌트에서 결과를 확인하는 정도로만 작성
//Todo의 AddComponent를 참고해서 첨부파일을 추가할 수 있는구성으로 작성, 첨부파일은 useRef()를 사용해서 처리

//useRef() = 자바스크립트의 document.getElementById()와 유사
//리액트의 컴포넌트는 태그의 id속성을 활용하면 나중에 동일 컴포넌트를 여러번 사용해서 화면에 문제가 생기기때문에 useRef()사용함
//ADD를 클릭했을대 첨부파일에 선택된 정보 읽어온뒤 첨부파일 정보 확인 후 이를 Ajax 전송에 사용하면 FormData 객체로 구성해야함
//FormData 타입으로 처리된 내용은 Axios를 이용해 서버를 호출할때 사용하게됨

import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModel from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove"; //유저커스텀훅의 이동함수

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove(); //유저커스텀 훅의 이동함수

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //other Data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    console.log(formData);
    setFetching(true);

    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  const closeModal = () => {
    setResult(null); //ResultModel 종료

    moveToList({ page: 1 }); // 모달창이 닫히면 리스트의 페이지 1 번으로 이동
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* 삼항연산자 참일경우 FetchingModel을 보여주고 false일 경우 빈값을 보냄 */}
      {fetching ? <FetchingModel /> : null}
      {result ? (
        <ResultModal
          title={"product Add Result"}
          content={`${result}번 등록완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="pname"
            type={"text"}
            value={product.pname}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
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
