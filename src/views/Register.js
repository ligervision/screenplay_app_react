import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

    let navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        // Confirm that passwords are equal
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        console.log(password, confirmPass);
        if (password !== confirmPass){
            props.flashMessage('Your passwords do not match', 'danger');
        } else {
            // Set up post request to /auth/users
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let data = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            fetch('https://kekambas-blog.herokuapp.com/auth/users', {
                method: "POST",
                headers: myHeaders,
                body: data
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        props.flashMessage(data.error, 'danger')
                    } else {
                        props.flashMessage(`${data.username} has been registered`, 'success')
                        navigate('/')
                    }
                });


        }
    }

    return (
        <>
            <h4 className='text-center'>Register Here</h4>
            <form onSubmit={handleFormSubmit}>
                <div className='from-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' className='form-control' placeholder='Enter Username' />

                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' className='form-control' placeholder='Enter Email' />

                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' className='form-control' placeholder='Enter Password' />

                    <label htmlFor='confirmPass'>Confirm Password</label>
                    <input type='password' name='confirmPass' className='form-control' placeholder='Enter Confirm Password' />

                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Register' />
                </div>
            </form>
        </>
    )
}