function PasswordCreateClick() {

    everything_right = true

    if (document.getElementById('floatingNameCreate').value === '') {
        document.getElementById("floatingNameCreate").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingNameCreate').classList.contains('is-invalid')) {
            document.getElementById("floatingNameCreate").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (document.getElementById('floatingEmailCreate').value === '') {
        document.getElementById("floatingEmailCreate").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingEmailCreate').classList.contains('is-invalid')) {
            document.getElementById("floatingEmailCreate").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (document.getElementById('floatingPasswordCreate').value === '') {
        document.getElementById("floatingPasswordCreate").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingPasswordCreate').classList.contains('is-invalid')) {
            document.getElementById("floatingPasswordCreate").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (document.getElementById('floatingUsernameCreate').value === '') {
        document.getElementById("floatingUsernameCreate").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingUsernameCreate').classList.contains('is-invalid')) {
            document.getElementById("floatingUsernameCreate").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (everything_right) {
        //Fast-Api
    }

}


function PasswordGetClick() {
    if (document.getElementById('floatingPassswordName').value === '')
        document.getElementById("floatingPassswordName").classList.add('is-invalid');
    else {
        if (document.getElementById('floatingPassswordName').classList.contains('is-invalid'))
            document.getElementById('floatingPassswordName').classList.remove('is-invalid')
        //Fast-Api
    }
}

function PasswordDelClick() {
    if (document.getElementById('floatingDeletingName').value === '')
        document.getElementById("floatingDeletingName").classList.add('is-invalid');
    else {
        if (document.getElementById('floatingDeletingName').classList.contains('is-invalid'))
            document.getElementById('floatingDeletingName').classList.remove('is-invalid')
        //Fast-Api
    }
}

function AccountCreateClick() {

    everything_right = true

    if (document.getElementById('floatingSignupEmail').value === '') {
        document.getElementById("floatingSignupEmail").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingSignupEmail').classList.contains('is-invalid')) {
            document.getElementById("floatingSignupEmail").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (document.getElementById('floatingSignupPassword').value === '') {
        document.getElementById("floatingSignupPassword").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingSignupPassword').classList.contains('is-invalid')) {
            document.getElementById("floatingSignupPassword").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (everything_right) {
        fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': 'foo',
                'password': 'Adf'
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            });
    }
}

function LoginClick() {

    everything_right = true

    if (document.getElementById('floatingLoginEmail').value === '') {
        document.getElementById("floatingLoginEmail").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingLoginEmail').classList.contains('is-invalid')) {
            document.getElementById("floatingLoginEmail").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (document.getElementById('floatingLoginPasssword').value === '') {
        document.getElementById("floatingLoginPasssword").classList.add('is-invalid');
        everything_right = false
    } else {
        if (document.getElementById('floatingLoginPasssword').classList.contains('is-invalid')) {
            document.getElementById("floatingLoginPasssword").classList.remove('is-invalid');
            everything_right = true
        }
    }

    if (everything_right) {
        fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': 'foo',
                'password': 'Adf'
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            });


    }
}
