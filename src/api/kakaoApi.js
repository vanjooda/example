import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = `5bb4cfb21648d55c53aac4708b0c0686`; // rset 키값

const redirect_uri = `http://localhost:3001/member/kakao`;
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = `https://kauth.kakao.com/oauth/token`; // access 토큰 호출

// Kakao 로그인 링크 생성 함수
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// Access Token 요청 함수
export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // URLSearchParams 객체를 사용해 x-www-form-urlencoded 형식으로 데이터 변환
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", rest_api_key);
  params.append("redirect_uri", redirect_uri);
  params.append("code", authCode);

  try {
    const res = await axios.post(access_token_url, params, header);
    const accessToken = res.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Access Token을 사용해 사용자 정보 요청 함수
export const getMemberWithAccessToken = async (accessToken) => {
  try {
    const res = await axios.get(
      `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching member data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
