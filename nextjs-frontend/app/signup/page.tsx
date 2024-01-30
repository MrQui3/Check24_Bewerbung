import '@/app/global.css';

import SignupForm from './signup_form'
import Link from "next/link"

export default function Component() {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
            </div>
            <SignupForm/>
            <div className="mt-4 text-center text-sm">
                Already have an account?
                <Link className="underline" href="/login">
                    Login
                </Link>
            </div>
        </div>
    )

    function handleSubmit() {
        console.log('You clicked submit.');

    }
}