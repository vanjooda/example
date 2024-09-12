import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};
const loadMemberCookie = () => {
  const memeberInfo = getCookie("member");
  //닉네임처리
  if (memeberInfo && memeberInfo.nickname) {
    memeberInfo.nickname = decodeURI(memeberInfo.nickname);
  }
  return memeberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: initState || loadMemberCookie(), //쿠키가 없을시 초기값 사용
  reducers: {
    login: (state, action) => {
      console.log("로그인...");

      //소셜 로그인 회원이 사용
      const payload = action.payload;

      setCookie("member", JSON.stringify(payload), 1); //1일
      return payload;
    },
    logout: (state) => {
      console.log("로그아웃...");
      removeCookie("member");
      return { ...initState };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 완료");

        const payload = action.payload;
        //정상적 로그인 시에만 저장
        if (!payload.error) {
          console.log("쿠키저장");
          setCookie("memeber", JSON.stringify(payload), 1); //1일
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  },
});

// loginSlice내부에 선언된 함수들을 외부에 노출하기 위해서 export처리

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
