import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import sceneformatting from './scene_formatting.png'


export default function CreatePost(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to scene a post', 'danger');
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

        fetch('http://127.0.0.1:5000/blog/posts', {
            method: 'POST',
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    flashMessage(data.error, 'danger')
                } else {
                    flashMessage(`The scene ${data.title} has been created`, 'success')
                    navigate('/')
                }
            })
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                {/* <div className='col-5'>
                    {this.state.posts.map(p => <PostCard post={p} key={p.id} />)}
                </div> */}
                <div className='col-4'>
                    <h4><br></br><strong>SCENES</strong>
                        <p><br></br>"Show, Don't Tell!"</p></h4>
                        <p>
                            Whereas in a novel, the author can describe with words (or "tell") a character’s internal thoughts or state of mind, with screenplays the author must only include information that can be “shown” on screen.
                        <p>
                            <br></br>
                            If a character is feeling happy, sad or angry, you must find a way to <i>show</i> that they are happy, sad or angry.
                        </p>
                        <p>
                            SHOW (don't tell) the story -- all action and dialogue contributing to the character's development with relation to his/her <b>central conflict</b>:
                            <ol>
                                <br></br>
                                <li>
                                    <strong>Scene headings</strong> (Slug Lines) - ALL CAPS, aligned left
                                </li>
                                <li>
                                    <strong>Action lines</strong> - always present tense, aligned left
                                </li>
                                <li>
                                    <strong>Character Names</strong> - ALL CAPS (use 'V.O' after name for voice-over)
                                </li>
                                <li>
                                    <strong>Dialogue</strong> - indented to center of page
                                </li>
                                <li>
                                    <strong>Parentheticals</strong> - describes how character performs dialogue, indented to just left of center
                                </li>
                                <li>
                                    <strong>Transitions</strong> - ALL CAPS, aligned right
                                    <ul>
                                        <li>
                                            FADE IN:
                                        </li>
                                        <li>
                                            FADE OUT:
                                        </li>
                                        <li>
                                            CUT TO:
                                        </li>
                                        <li>
                                            DISSOLVE TO:
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Shots</strong> - ALL CAPS, aligned left
                                    <ul>
                                        <li>
                                            CLOSE UP:
                                        </li>
                                        <li>
                                            ANGLE ON:
                                        </li>
                                        <li>
                                            PAN TO:
                                        </li>
                                        <li>
                                            POV:
                                        </li>
                                        <li>
                                            EXTREME CLOSE UP:
                                        </li>
                                        <li>
                                            BACK TO SCENE:
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Superimposed text/images</strong> - ALL CAPS, aligned left
                                </li>
                            </ol>
                        </p>
                        <span className='logo-holder'>
                            <img src={sceneformatting} alt="scene formatting" width="120%"></img>
                        </span>
                        </p>
                    </div>
                <div className='col-7'>
                    <h4 className='text-center'><br></br>Create Scene</h4>

                    <div className='card border-primary mb-3'>
                        <div className = 'card-header bg-warning bg-opacity-25 text-muted'>STAR WARS
                                {/* <h5 className='card-title'>{ post.title }</h5> # post title as link */}
                        </div>
                        <div className='card-body bg-warning bg-opacity-10'>
                            {/* <h6 className='card-subtitle mb-2 text-muted'>By: { post?.author?.username }</h6> # author of post */}
                            {/* <p className='card-text'>{ post.content }</p> # post content*/} 
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='title'><strong>Slug Line</strong></label>
                                    <input type='text' name='title' className='form-control' placeholder='slug line -- e.g. "INT. ABANDONED WAREHOUSE - NIGHT"' />
                                    <br></br>
                                    <label htmlFor='content'><strong>Scene Body</strong></label>
                                    <textarea className="form-control" name="content" rows="10" placeholder='Type scene here.'></textarea>
                                    <input type='submit' className='btn btn-primary w-25 mt-3' value='Create Scene +' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// <h1 className='text-center'><b>STAR WARS</b> blog</h1>
// <hr></hr>
// <div className='offset-8 col-4'>
//     <select onChange={(e) => this.sortPosts(e.target.value)} className='form-select'>
//         <option>Sort Posts</option>
//         <option value='byDateAsc'>By Date Ascending</option>
//         <option value='byDateDesc'>By Date Descending</option>
//         <option value='byTitleAsc'>By Title Ascending</option>
//         <option value='byTitleDesc'>By Title Descending</option>
//     </select><br></br>
// </div>

// <div className='d-flex justify-content-between'>
//     <div className='offset-5 col-7 text-muted'>
//         <br></br>Viewing scenes for <b>STAR WARS</b> > Chapter One:
//         <br></br>
        
//         <p className="form-group form-check">
//             <input type="checkbox" className="form-check-input" id="exampleCheck1">
//             </input>
//             <label className="form-check-label" for="exampleCheck1">Character View</label>
//         </p>
//         <br></br>
//     </div>

//     <div className='col-5'>
//             {this.state.posts.map(p => <PostCard post={p} key={p.id} />)}
//     </div>
// </div>

