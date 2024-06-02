import { atom } from 'recoil';

export const imageString = atom<string>({
  key: 'image',
  default: '', 
});
