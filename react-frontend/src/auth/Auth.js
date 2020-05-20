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
    isOnline = window.localStorage.getItem("status")
  }
  return isOnline
}

export const signout = (next)=> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("status");
  }
  next()
  return fetch("http://localhost:5000/auth/signout", {
    credentials :'include',
    mode : 'cors'
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
