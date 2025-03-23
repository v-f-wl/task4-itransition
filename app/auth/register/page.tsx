'use client'
import { Title } from "@/app/components/UI/title";
import { Input } from "@/app/components/UI/input";
import { Button } from "@/app/components/UI/button";
import Link from "next/link";
import { useState } from "react";
import { AuthResponse } from "@/types";
import { createUser } from "./actions";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import ErrorHandler from "@/app/components/UI/error-handler";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(1, 'First name must be at least 1 character')
    .required('First name is required'),
  secondName: Yup.string()
    .min(1, 'Second name must be at least 1 character')
    .required('Second name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .matches(/^\S+$/, 'Email cannot contain spaces'),
  password: Yup.string()
    .min(1, 'Password must be at least 61character')
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .required('Password is required'),
})

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorHandle, setErrorHandle] = useState('')
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setIsLoading(true)
      const response:AuthResponse = await createUser(values)
      if(response.success && response.id && response.token){
        Cookies.set('id', response.id)
        Cookies.set('token', response.token)
        await router.push('/')
      }else{
        setErrorHandle(prev => response.message)
        setIsLoading(false)
      }
    },
  });
  
  return ( 
    <div className="authContainer">

      <Title label="Welcome to The App"/>
      <div className="mt-[-25px] text-neutral-400 flex gap-2">
        Already have an account?
        <Link href={`/auth/login`} className="text-blue-400 font-bold">Sign In</Link>
      </div>
      
      <form className="formContainer" onSubmit={formik.handleSubmit}>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          value={formik.values.firstName}
          changeValue={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <Input
          id="secondName"
          name="secondName"
          type="text"
          label="Second Name"
          value={formik.values.secondName}
          changeValue={formik.handleChange}
          error={formik.touched.secondName && Boolean(formik.errors.secondName)}
          helperText={formik.touched.secondName && formik.errors.secondName}
        />
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
        <Button intent="primary" label={isLoading ? 'Loading...' : 'Sing Up'} type="submit" disabled={isLoading}/>
      </form>
      <ErrorHandler label={errorHandle}/>
    </div>
  );
}
 
export default Page;