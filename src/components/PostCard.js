import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <>
            <br></br>
            <div className='card border-primary mb-3'>
                <div className = 'card-header bg-warning bg-opacity-25 text-muted'>THE TRIAL
                    <Link to={`/posts/${post.id}`}>
                        <h5 className='card-title'>{ post.title }</h5>
                    </Link>
                </div>
                <div className='card-body bg-warning bg-opacity-10'>
                    <h6 className='card-subtitle mb-2 text-muted'>By: { post?.author?.username }</h6>
                    <p className='card-text'>{ post.content }</p>
                </div>
            </div>

        </>
    )
}
