/*
page.tsx handels the main page of the application. It is the first page the user sees when he visits the website.
login/page.tsx handels the login page of the application. It is the page the user sees when he logs in.
signup/page.tsx handels the signup page of the application. It is the page the user sees when he signs up.
dashboard/page.tsx handels the dashboard page of the application. It is the page the user sees his passwords.


Support page and Privacy Policy page are not implemented yet.
UI is not final yet.
 */

import Link from "next/link"
import './global.css';

export default function Component() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <LockIcon className="h-6 w-6"/>
                    <span className="sr-only">Password Safe</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
                        Log In
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Support
                    </Link>
                </nav>
            </header>
            <main className="flex-1 mx-auto  space-y-6">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl accent-black">Welcome to
                                Password
                                Safe</h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Your one-stop solution for secure password management. Store and manage your passwords
                                securely
                                with Password Safe.
                            </p>
                            <Link
                                className="inline-flex h-10 items-center justify-center bg-gray-900 text-gray-50 rounded-md px-8 text-sm font-medium shadow transition-colors hover:bg-gray-500 hover:text-gray-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                href="/signup"
                            >
                                Sign Up Now
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer
                className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t position: fixed bottom-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Password Safe. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy Policy
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        <FacebookIcon className="h-4 w-4"/>
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        <TwitterIcon className="h-4 w-4"/>
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        <InstagramIcon className="h-4 w-4"/>
                    </Link>
                </nav>
            </footer>
        </div>
    )
}


function FacebookIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
    )
}


function InstagramIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
    )
}


function LockIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    )
}


function TwitterIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
    )
}

