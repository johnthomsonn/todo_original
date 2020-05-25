export const cleanInput = input => !/[[\]<>^!@"()#}/{+\s]/.test(input);

export const validateEmail = email => /.+@.+\..+/.test(email);

export const isLoggedInOld = () => {
  fetch("http://localhost:5000/auth/islogged")
    .then(res => res.json())
    .then(data => {
      if (data.logged){
        console.log("server says true")
        return true;
      }
      else {
        console.log("sever says NOP")
        return true;
      }
    })
    .catch(err => false);
};

export const isLoggedInBasic = () => {
  let isOnline = false;
  if(typeof window !== "undefined")
  {
    isOnline = window.sessionStorage.getItem("status")
  }
  return isOnline
}

export const signout = (next)=> {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("status");
  }
  next()
  return fetch("http://localhost:5000/auth/signout", {
    credentials :'include',
    mode : 'cors',
    credentials : 'include'
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
