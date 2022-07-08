import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SinglePost(props) {
    const { postId } = useParams();
    const [ post, setPost ] = useState({});
    const [ editMode, setEditMode ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`postgresql://ltyhscaa:gwplgirsmnWS6b80ViNGxvaxSSXm6gHh@lallah.db.elephantsql.com/ltyhscaa/${postId}`)
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

        fetch(`postgresql://ltyhscaa:gwplgirsmnWS6b80ViNGxvaxSSXm6gHh@lallah.db.elephantsql.com/ltyhscaa/${postId}`,{
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

        fetch(`postgresql://ltyhscaa:gwplgirsmnWS6b80ViNGxvaxSSXm6gHh@lallah.db.elephantsql.com/ltyhscaa/${postId}`, {
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
            <div className='d-flex justify-content-between'>
                <div className='col-4'>
                    <h4><br></br><strong>SCENES</strong>
                    <p><br></br>Edit Scene</p></h4>
                </div>
                <div className='col-7'>
                    <PostCard post={post} />
                    
                    <button className='btn btn-primary w-25' onClick={()=>{setEditMode(!editMode)}}>Edit This Scene</button>
                    <button className='btn btn-danger w-25' onClick={deletePost}>Delete This Scene</button>
                    {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <br></br>
                                    <label htmlFor='title'><strong>New Slug Line</strong></label>
                                    <input type='text' name='title' className='form-control' placeholder='slug line -- e.g. "INT. ABANDONED WAREHOUSE - NIGHT"' />
                                    <br></br>
                                    <label htmlFor='content'><strong>New Scene Body</strong></label>
                                    <textarea className="form-control" name="content" rows="10" placeholder='scene body'></textarea>
                                    <input type='submit' className='btn btn-primary w-25' value='Submit Edit >>' />
                                </div>
                            </form>
                    ) : null}
                </div>
            </div>
        </>
    )
}
