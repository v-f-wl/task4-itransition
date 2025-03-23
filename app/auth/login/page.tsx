'use client'
import { Title } from "@/app/components/UI/title"
import { Button } from "@/app/components/UI/button"
import { Input } from "@/app/components/UI/input"
import Link from "next/link"
import { useState } from "react"
import Cookies from "js-cookie"
import { AuthResponse } from "@/types"
import { loginUser } from "./actions"
import { useRouter } from "next/navigation"
import ErrorHandler from "@/app/components/UI/error-handler"
import { useFormik } from "formik"
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .required('Email is required')
    .matches(/^\S+$/, 'Email cannot contain spaces'),
    password: Yup.string()
    .min(1, 'Password must be at least 61character')
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .required('Password is required'),
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorHandle, setErrorHandle] = useState('')
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setIsLoading(true)
      const response:AuthResponse = await loginUser(values)
      if(response.success && response.id && response.token){
        Cookies.set('id', response.id)
        Cookies.set('token', response.token)
        await router.push('/')
      }else{
        setErrorHandle(prev => response.message)
        setIsLoading(false)
      }
    },
  })
  return ( 
    <div className="authContainer">
      <Title label="Welcome to The App"/>
      <div className="mt-[-25px] text-neutral-400 flex gap-2">
        Don't have an account?
        <Link href={`/auth/register`} className="text-blue-400 font-bold">Sign Up</Link>
      </div>
      <form className="formContainer" onSubmit={formik.handleSubmit}>
      <Input
          id="email"
          name="email"
          type="text"
          label="Email"
          value={formik.values.email}
          changeValue={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          changeValue={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button intent="primary" label={isLoading ? 'Loading...' : 'Sing In'} type="submit" disabled={isLoading}/>
      </form>
      <ErrorHandler label={errorHandle}/>
    </div>
   );
}
 
export default Page;