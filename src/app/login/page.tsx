'use client'
import React, { useState } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { emailValidate, passwordValidate } from '@/libs/userValidate'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const clearForm = () => {
        setEmail('')
        setPassword('')
        setEmailError('')
        setPasswordError('')
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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (emailError || passwordError) {
            toast.error('Invalid email or password')
        } else {
            // Call API to login (Later)
            toast.success('Login success')
            clearForm()
            window.location.href = '/'
        }
    }

    return (
    <div className="bg-white">
        <Box className="flex flex-col items-center justify-center pb-[20%] h-screen">
            <h2 className='text-5xl font-bold text-blue-600 pb-12'>
                Login
            </h2>
            <form onSubmit={handleLogin} className='flex flex-col space-y-4 w-[30%]'>
                <TextField
                    label="Email"
                    variant="outlined"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError !== ''}
                    helperText={emailError}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError !== ''}
                    helperText={passwordError}
                />
                <button className='bg-orange-500 text-white text-lg font-semibold py-2 px-2 rounded-2xl text-center hover:bg-orange-600 mt-4' type="submit">
                    Login
                </button>
                <div>
                    <Typography variant="body2" gutterBottom className='text-gray-500'>
                        Don't have an account? <a href="/register" className='text-blue-700'>Register</a>
                    </Typography>
                </div>
            </form>
        </Box>
        <ToastContainer />
    </div>
)
}
