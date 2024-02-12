/*
Handle the password dashboard, where the user can create, delete and view his passwords
encrypting and decrypting the passwords will follow in the future
sharing passwords with other users will follow in the future
searching for passwords will follow in the future(backend is already implemented)
*/
'use client'
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog
} from "@/components/ui/dialog"
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import React, {useEffect, useState} from 'react';
import {Label} from "@/components/ui/label";


const columns = [
    {
        Header: 'Webseite',
        accessor: 'name'
    },
    {
        Header: 'Password',
        accessor: 'password'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Username',
        accessor: 'username'
    }
]

var CryptoJS = require("crypto-js");

export default function Password_Dashboard() {

    useEffect(() => {
        fetch('http://212.132.69.126:8000/all_passwords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setPasswordsData(data);
            })
    }, []);

    const [passwordsData, setPasswordsData] = useState([]);


    function Create_Password(value) {
        if (document.getElementById('name').value == '') {
            document.getElementById('answermodal').innerText = 'Please add a email address'
            document.getElementById('answermodal').className = 'text-red-700'
        } else if (document.getElementById('password').value == '') {
            document.getElementById('answermodal').innerText = 'Please add a password'
            document.getElementById('answermodal').className = 'text-red-700'
        } else {
            document.getElementById('answermodal').innerText = 'Password created'
            document.getElementById('answermodal').className = 'text-green-700'
            fetch('http://127.0.0.1:8000/users/passwords/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    'name': document.getElementById('name').value,
                    'password': document.getElementById('password').value,
                    'email': document.getElementById('email').value,
                    'username': document.getElementById('username').value
                })
            })
        }

        fetch('http://212.132.69.126:8000/all_passwords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setPasswordsData(data);
            });
    }

    function delete_password(index) {
        fetch('http://212.132.69.126:8000/password_delete/?password_name=' + passwordsData[index]['name'], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })

            .then(resp => resp.json())
            .then(data => {

            })
        fetch('http://212.132.69.126:8000/all_passwords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                setPasswordsData(data);
            });
    }

    function generate_password() {
        var length = 12,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!§$%&/()=?*+#-_.:,;<>",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));

        }
        document.getElementById('password').value = retVal;
        document.getElementById('password').type = ''
    }


    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Passwords</h1>
                <Dialog id="modal">
                    <DialogTrigger asChild>
                        <Button className="ml-auto bg-gray-900 text-gray-50 hover:bg-gray-500" size="sm">Create
                            Password</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] accent-gray-700">
                        <DialogHeader>
                            <DialogTitle>Create Account</DialogTitle>
                            <DialogDescription>Enter your details to create a new account.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter your email" type="email"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Enter your username"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Enter your password" type="password"/>
                                <Button onClick={() => generate_password()}
                                        className='bg-gray-900 text-gray-50 hover:bg-gray-500'>Generate
                                    password</Button>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className='' id='answermodal'></div>
                            <Button type="submit" className='bg-gray-900 text-gray-50 hover:bg-gray-500'
                                    onClick={() => Create_Password()}>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border shadow-sm rounded-lg" id='Table'>

                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => <TableHead key={column.Header}>{column.Header}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody id='tablebody'>
                        {passwordsData.map((item, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <TableCell
                                        key={`<span class="math-inline">\{column\.Header\}\-</span>{index}`}>
                                        {item[column.accessor]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button size="icon" variant="ghost">
                                            <EyeIcon className="h-4 w-4"/>
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={() => delete_password(index)}>
                                            <TrashIcon className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    );
};

function XIcon(props) {
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
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}

function CheckIcon(props) {
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
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    )
}

function TrashIcon(props) {
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
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
    )
}

function EyeIcon(props) {
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
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    )
}