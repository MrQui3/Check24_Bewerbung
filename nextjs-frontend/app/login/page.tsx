import Form from './login_form'
import Link from "next/link"
import '@/app/global.css';


export default function Component() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto w-[350px] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your username and password to logi to your
                        account</p>
                </div>
                <Form/>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <Link className="underline" href="/signup">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

