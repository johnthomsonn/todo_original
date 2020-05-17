

export const cleanInput = input => !/[[\]<>^!@"()#}/{+\s]/.test(input)

  export const validateEmail = email => /.+@.+\..+/.test(email)
