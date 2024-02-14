'use client'
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {Label} from "../../components/ui/label";
import pbkdf2 from "@/app/pbkdf2";

function LoginForm() {
    function login_function() {

        fetch(api_address + 'token', {
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
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input id="email" placeholder="Email" required/>
            </div>
            <div className="space-y-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" required type="password"/>
            </div>
            <Button className="w-full bg-gray-900 text-gray-50 hover:bg-gray-500" onClick={() => login_function()}>
                Login
            </Button>
        </div>
    )
}

export default LoginForm;





