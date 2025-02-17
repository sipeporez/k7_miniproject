import { atom, selector } from "recoil";

export const snoAtom = atom({
    key: 'snoAtom',
    default: 95,
  });

export const snoSel = selector({
  key: 'snoSel', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    return parseInt(get(snoAtom));
  },
});