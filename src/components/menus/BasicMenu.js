import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice);

  return (
    <nav id="navbar" className=" flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <Link to={"/"}>Main</Link>
          </li>

          <li className="pr-6 text-2xl">
            <Link to={"/about"}>About</Link>
          </li>

          {loginState.email ? ( //로그인상태 일 때만 보이는 메뉴 (삼항연산자를 사용해서)
            <>
              <li className="pr-6 text-2xl">
                <Link to={"todo"}>Todo</Link>
              </li>

              <li className="pr-6 text-2xl">
                <Link to={"/products/"}>Products</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
        {/* 삼항연산자이용  로그인 상태로 구분하여 출력 */}
        {!loginState.email ? (
          <div className="text-white text-sm m-1 rounded">
            <Link to={"/member/login"}>Login</Link>
          </div>
        ) : (
          <div className="text-white text-sm m-1 rounded">
            <Link to={"/member/logout"}>logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BasicMenu;
