import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slice/loginSlice";
import { loginPostAsync } from "../../slice/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";
//email(아이디)와 패스워드를 받아 입력받아 로그인을 처리하는 파일
// 서버의 통신은 뒤로 미루고 대신에 리덕스 툴킷으로 애플리케이션 상태를 처리한다

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  //핸들러
  const handleClickLogin = (e) => {
    doLogin(loginParam); //loginSlide 의 비동기호출
    // dispatch(login(loginParam)); //동기화호출

    //loginSlice 비동기화 호출
    dispatch(loginPostAsync(loginParam))
      .unwrap()
      .then((data) => {
        console.log(data);

        if (data.error) {
          alert("로그인 실패");
        } else {
          alert("로그인 성공!");
          moveToPath("/");
        }
      });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        {" "}
        <div className="text-4xl m-4 p-4 font-extrabold text-blue500">
          Login Component
        </div>{" "}
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type={"text"}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type={"password"}
            value={loginParam.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 textxl text-white"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <KakaoLoginComponent />
    </div>
  );
};

export default LoginComponent;
