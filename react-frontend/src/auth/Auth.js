import React from 'react'

export const cleanInput = input => !/[\[\]<>^!@\"()#}\/{+\s]/.test(input)
