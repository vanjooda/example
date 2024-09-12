import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slice/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  // useSearchParams 훅을 사용하여 쿼리 파라미터에 접근
  const [searchParams] = useSearchParams();

  // "code" 쿼리 파라미터의 값을 추출하여 authCode 변수에 저장
  const authCode = searchParams.get("code");

  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log(accessToken);
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("-------------------");
        console.log(memberInfo);

        dispatch(login(memberInfo));

        //만약에 소셜회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          //메인으로 이동
          moveToPath("/");
        } else {
          //수정으로 이동
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <div>kakao login redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
