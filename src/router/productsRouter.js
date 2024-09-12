//React-Router의 설정을 위한 컴포넌트
//만들어진 ListPage는 이 컴포넌트에서 '/products/' 경로를 호출할 때 자동으로 '/product/list'로 이동하고 ListPage를 보이도록 설정함
//AddPage.js에 대한 라우틴 설정 추가

import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ProductsList = lazy(() => import("../pages/products/ListPage")); //목록페이지
const ProductsAdd = lazy(() => import("../pages/products/AddPage")); //등록페이지
const ProductRead = lazy(() => import("../pages/products/ReadPage")); //상세조회
const ProductModify = lazy(() => import("../pages/products/ModifyPage"));

const productsRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ProductsAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:pno",
      element: (
        <Suspense fallback={Loading}>
          <ProductRead />
        </Suspense>
      ),
    },

    {
      path: "modify/:pno",
      element: (
        <Suspense fallback={Loading}>
          <ProductModify />
        </Suspense>
      ),
    },
  ];
};
export default productsRouter;
