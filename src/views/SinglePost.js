import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SinglePost(props) {
    const { postId } = useParams();
    const [ post, setPost ] = useState({});
    const [ editMode, setEditMode ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [postId])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        let data = JSON.stringify({
            title: e.target.title.value,
            content: e.target.content.value
        })

        fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${postId}`,{
            method: 'PUT',
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    props.flashMessage(data.error, 'danger')
                } else {
                    props.flashMessage(`${data.title} has been updated`, 'secondary')
                    setPost(data)
                    setEditMode(false)
                }
            })
    }

    const deletePost = () => {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

        fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${postId}`, {
            method: 'DELETE',
            headers: myHeaders
        }).then(res => {
            if (res.ok){
                props.flashMessage('The post has been deleted', 'info');
                navigate('/')
            } else {
                props.flashMessage('You cannot delete this post', 'danger')
            }
        })
    }

    return (
        <>
            <PostCard post={post} />
            <button className='btn btn-info w-50 mt-3' onClick={()=>{setEditMode(!editMode)}}>Edit</button>
            <button className='btn btn-danger w-50 mt-3' onClick={deletePost}>Delete</button>
            {editMode ? (
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className='from-group'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' className='form-control' defaultValue={post.title} />

                        <label htmlFor='content'>Content</label>
                        <input type='text' name='content' className='form-control' defaultValue={post.content} />

                        <input type='submit' className='btn btn-primary w-100 mt-3' value='Edit Post' />
                    </div>
                </form>
            ) : null}
        </>
    )
}
