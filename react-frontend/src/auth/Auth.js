

export const cleanInput = input => !/[[\]<>^!@"()#}/{+\s]/.test(input)

export const validateEmail = email => /.+@.+\..+/.test(email)

export const isLoggedIn = () => {
  fetch("http://localhost:5000/auth/islogged")
  .then(res => res.json())
  .then(data => {
    if(data.logged)
      return true;
      else
      return false;
  })
  .catch(err => false)
}
