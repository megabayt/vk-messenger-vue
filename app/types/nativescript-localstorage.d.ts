declare module 'nativescript-localstorage' {
  interface ILocalStorage {
    getItem: (string) => any;
    setItem: (string, any) => void;
  }
  const localStorage: ILocalStorage;
  export default localStorage;
}
