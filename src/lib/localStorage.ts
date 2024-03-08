// import secureLocalStorage from "react-secure-storage";

// const getItem = (key) => {
//   const data =
//     typeof window !== "undefined" ? secureLocalStorage.getItem(key) : "";

//   try {
//     return JSON.parse(data);
//   } catch (err) {
//     return data;
//   }
// };

// const setItem = (key, value) => {
//   const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
//   return secureLocalStorage.setItem(key, stringify);
// };

// const removeItem = (key) => {
//   secureLocalStorage.removeItem(key);
// };

// export { getItem, setItem, removeItem };

// const getItem = (key: any) => {
//   const data = typeof window !== "undefined" ? localStorage.getItem(key) : "";

//   try {
//     return JSON.parse(data: string | null);
//   } catch (err) {
//     return data;
//   }
// };

const getItem = (key: any) => {
  const data = typeof window !== "undefined" ? localStorage.getItem(key) : "";

  try {
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return data;
  }
};

const setItem = (key: any, value: any) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
  // if (typeof window === "undefined") return;
  return localStorage ? localStorage.setItem(key, stringify) : "";
};

const removeItem = (key: any) => {
  // if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
