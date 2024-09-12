//라우터를 설정함
//productsRouter.js에 이 파일의 라우팅을 설정할것임

import AddComponent from "../../components/products/AddComponent";

const AddPage = () =>{
  return(
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        상품 추가 페이지
      </div>
      <AddComponent/>
    </div>
  );
}

export default AddPage;