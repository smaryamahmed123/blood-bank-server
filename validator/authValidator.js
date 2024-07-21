import z from 'zod'

 export const signUpSchema = z.object({
    firstName: z
    .string({requiered_error: "name is required"})
    .trim()
    .min(3,{message: 'name atleast have three charachter'})
    .max(255,{message: 'name must not be greater then 255 charachters'}),
    lastName: z
    .string({requiered_error: "name is required"})
    .trim()
    .min(3,{message: 'name atleast have three charachter'})
    .max(255,{message: 'name must not be greater then 255 charachters'}),
    email: z
    .string({requiered_error: "email is required"})
    .trim()
    .email({message: 'invalid email'})
    .min(3,{message: 'name atleast have three charachter'})
    .max(255,{message: 'name must not be greater then 255 charachters'}),
    password: z
    .string({requiered_error: "name is required"})
    .trim()
    // .password({message: " invalid password"})
    .min(3,{message: 'name atleast have three charachter'})
    .max(255,{message: 'name must not be greater then 255 charachters'}),
})