'use client'
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {Label} from "../../components/ui/label";
import pbkdf2 from '@/app/pbkdf2'

export default function SignupForm() {

    function signup_function() {
        fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
            })
        })
            .catch(error => {
            })
            .then(resp => {
                resp.json()
                if (resp.status === 400) {
                    return 0
                }
            })
            .then(data => {
                fetch('http://127.0.0.1:8000/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'username': document.getElementById('email').value,
                        'password': document.getElementById('password').value,
                    })
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        sessionStorage.setItem('email', document.getElementById('email').value)
                        sessionStorage.setItem('token', data['access_token'])
                        window.location.href = '/dashboard'
                    });
            })
        fetch('http://127.0.0.1:8000/all_passwords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(resp => resp.json())
            .then(data => {
                sessionStorage.setItem('passwords', data)
            });
    }

    return (
        <div className="space-y-4 w-72">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" required placeholder='m@example.com'/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required/>
            </div>
            <Button className="w-full bg-gray-900 text-gray-50 hover:bg-gray-500" onClick={() => signup_function()}>
                Sign Up
            </Button>

        </div>


    )
}