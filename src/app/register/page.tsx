'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { TextField, Typography, Box } from '@mui/material'
import { nameValidate, telValidate, emailValidate, passwordValidate } from '@/libs/userValidate'
import userRegister from '@/libs/userRegister'
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from '@/redux/store'

export default function page() {
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [telError, setTelError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const roleColor = useAppSelector((state) => state.colorSlice);

    const clearForm = () => {
        setName('')
        setTel('')
        setEmail('')
        setPassword('')
        setNameError('')
        setTelError('')
        setEmailError('')
        setPasswordError('')
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if (e.target.value === '') {
            setNameError('')
        } else if (!nameValidate(e.target.value)) {
            setNameError('Invalid name')
        } else {
            setNameError('')
        }
    }

    const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTel(e.target.value)
        if (e.target.value === '') {
            setTelError('')
        } else if (!telValidate(e.target.value)) {
            setTelError('Invalid phone number')
        } else {
            setTelError('')
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (e.target.value === '') {
            setEmailError('')
        } else if (!emailValidate(e.target.value)) {
            setEmailError('Invalid email')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value === '') {
            setPasswordError('')
        } else if (!passwordValidate(e.target.value)) {
            setPasswordError('Password must be at least 8 characters')
        } else {
            setPasswordError('')
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (nameError || telError || emailError || passwordError) {
            toast.error('Invalid input')
        } else {
            const res = await userRegister(name, email, tel, password)

            if (res?.error) {
                toast.error('Register failed')
                return
            } else {
                toast.success('Register success')
                clearForm()

                await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                })
                window.location.href = '/';
            }
        }
    }

    return (
    <div className="bg-white h-screen relative">
        <Box className="flex flex-col items-center justify-center pt-24">
            <h2 className={`text-5xl font-bold ${roleColor.logoColor} pb-12`}>
                Register
            </h2>
            <form className='flex flex-col space-y-4 w-[30%]' onSubmit={handleRegister}>
                <TextField
                    label='Name'
                    variant='outlined'
                    required
                    value={name}
                    onChange={handleNameChange}
                    error={nameError !== ''}
                    helperText={nameError}
                />
                <TextField
                    label='Phone number'
                    variant='outlined'
                    required
                    value={tel}
                    onChange={handleTelChange}
                    error={telError !== ''}
                    helperText={telError}
                />
                <TextField
                    label='Email'
                    variant='outlined'
                    required
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError !== ''}
                    helperText={emailError}
                />
                <TextField
                    label='Password'
                    variant='outlined'
                    required
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError !== ''}
                    helperText={passwordError}
                />
                <button className={`${roleColor.bgColor} text-white text-lg font-semibold py-2 px-2 rounded-2xl text-center ${roleColor.hoverBgColor} mt-4 `} type="submit">
                    Register
                </button>
                <div>
                    <Typography variant="body2" gutterBottom className='text-gray-500'>
                        Already have an account? <Link href='/login' className='text-blue-600'>Login</Link>
                    </Typography>
                </div>
            </form>
            <ToastContainer />
        </Box>
    </div>
)
}
