import Cookie from "universal-cookie";
const cookie = new Cookie();

class handleCookie {
  get(key: string) {
    return cookie.get(key);
  }
  set(key: string, value: string, options: object) {
    cookie.set(key, value, options);
  }

  remove(key: string) {
    cookie.remove(key);
  }
}

export default new handleCookie();

// const getCookie = (name: string) => {
//   const cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith(name + "=")) {
//       return cookie.substring(name.length + 1);
//     }
//   }
//   return null;
// };

// export default getCookie;
