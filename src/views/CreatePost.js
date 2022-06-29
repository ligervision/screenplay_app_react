import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatePost(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create a post', 'danger');
            navigate('/login')
        }
    }, [loggedIn, flashMessage, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

        let title = e.target.title.value;
        let content = e.target.content.value;
        let data = JSON.stringify({title,content})

        fetch('https://kekambas-blog.herokuapp.com/blog/posts', {
            method: 'POST',
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    flashMessage(data.error, 'danger')
                } else {
                    flashMessage(`The post ${data.title} has been created`, 'success')
                    navigate('/')
                }
            })
    }

    return (
        <>
            <h4 className='text-center'>Create Your Own Post</h4>
            <form onSubmit={handleSubmit}>
                <div className='from-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' className='form-control' placeholder='Enter Title of Post' />

                    <label htmlFor='content'>Content</label>
                    <input type='text' name='content' className='form-control' placeholder='Enter Body of Post' />

                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Create Post' />
                </div>
            </form>
        </>
    )
}