import { atom } from "recoil";

export const loginModalAtom = atom({
  key: 'loginModalAtom',
  default: {
    isOpen: false, // 모달이 열려 있는지 여부
    content: 'login', // 모달의 내용 ('login' 또는 'signup')
    duplicate: false  // 모달 중첩 여부 (true, false)
  }
});