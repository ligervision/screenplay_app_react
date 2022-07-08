import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function CreatePost(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create a scene', 'danger');
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

        fetch('postgres://tgcibbxy:wh7D1iFId2OcZTO633cLvEwvL0SUephantsql.com/tgcibbxy', {
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

                <div className='col-6'>
                <h4><br></br><strong>SCREENPLAYS</strong>
                    <p><br></br>Start a new Screenplay here.</p></h4>
                    <p>
                        >> Enter your new screenplay's TITLE below and Save to start a new Screenplay.    
                    </p>
                    <div className='card border-primary mb-3'>
                        <div className = 'card-header bg-info bg-opacity-50'><b>Elements of a Screenplay</b>
                                {/* <h5 className='card-title'>{ post.title }</h5> # post title as link */}
                        </div>
                        <div className='card-body bg-info bg-opacity-10'>
                            {/* <h6 className='card-subtitle mb-2 text-muted'>By: { post?.author?.username }</h6> # author of post */}
                            {/* <p className='card-text'>{ post.content }</p> # post content*/} 
                            <form onSubmit={handleSubmit}>
                                <div className='px-2 text-muted'>
                                    To get started on a new screenplay, fill out below your story's Title, Logline and Dramatic Question, then click <Link to="/plotoutline">"Start New Plot Outline"</Link> at the bottom. You will then select a Story Structure to help you create your Plot Outline.
                                <br></br>
                                <br></br>
                                </div>
                                <div className='form-group'>

                                    {/* TITLE, START NEW SCREENPLAY */}
                                    <div className = 'card-header bg-info bg-opacity-50'>
                                        <label htmlFor='title'><h5><strong>TITLE</strong></h5></label>
                                    </div>
                                    <p className='text-muted'>
                                    (You must save a title to start a new screenplay.)
                                    </p>
                                    {/* <h7 className = 'card-subtitle text-muted'>(50 words or less)</h7> */}
                                    <input type='text' name='title' className='form-control' placeholder='START HERE -- Enter your new screenplay idea title here and save.' />
                                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Save + Start New Screenplay with this Title +' />
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    {/* LOG LINE */}
                                    <div className = 'card-header bg-info bg-opacity-50'>
                                        <label htmlFor='logline'><h5><strong>LOGLINE</strong></h5></label>
                                    </div>
                                    {/* <br></br> */}
                                    {/* <h7 className = 'card-subtitle text-muted'>(50 words or less)</h7> */}
                                    <div className='px-2 text-muted'>
                                        <br></br>
                                        A <strong>logline</strong> should succinctly answer these questions (30-50 words):
                                        <div>
                                            <ol>
                                                <li>
                                                &nbsp; &nbsp; How does your protagonist get involved in your story?
                                                </li>
                                                <li>
                                                &nbsp; &nbsp; What conflict arises to challenge the main character, moving your story forward?
                                                </li>
                                                <li>
                                                &nbsp; &nbsp; What is your story's "world"? What makes it different, interesting, or suspenseful?
                                                </li>
                                            </ol>
                                            <p className='px-2 text-muted'>
                                            <strong>
                                                    [protagonist] + [inciting incident] + [protagonist’s goal] + [central conflict]
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                        
                                    <textarea className="form-control" name="logline" rows="3" placeholder='A logline is a one-sentence summary/description of your movie that entices others into reading the entire script.'></textarea>
                                    <input type='submit' className='btn btn-success w-20' value='Save Logline' />
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    {/* DRAMATIC QUESTION / THROUGHLINE */}
                                    <div className = 'card-header bg-info bg-opacity-50'>
                                        <label htmlFor='dramatic-question'><h5><strong>DRAMATIC QUESTION / THROUGHLINE</strong></h5></label>
                                    </div>
                                    <br></br>
                                    {/* <h7 className = 'card-subtitle text-muted'>(50 words or less)</h7> */}
                                    <div className='px-2 text-muted'>
                                        <p>
                                            A good story has a major <strong>dramatic question</strong> to answer, also known as a <strong>"throughline"</strong>. Answering this question is the single driving force behind the action in your story.
                                        </p>
                                        <p>
                                        Will Luke blow up the Death Star?
                                        </p>
                                    </div>
                                    <textarea className="form-control" name="logline" rows="3" placeholder='What is the central character’s objective, and will they succeed at achieving it?'></textarea>
                                    <input type='submit' className='btn btn-success w-20' value='Save Dramatic Question' />
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    {/* PLOT OUTLINE */}
                                    <div className = 'card-header bg-info bg-opacity-50'>
                                        <label htmlFor='outline'><h5><strong>PLOT OUTLINE</strong></h5></label>
                                    </div>
                                    <br></br>
                                    <div className='px-2 text-muted'>
                                        <p>Your screenplay <strong>outline</strong> is a scene-by-scene breakdown of your movie (1-2 pages). It helps you turn your premise and logline into a final screnplay.
                                            <ul>
                                                <li>
                                                    This app will help you outline the main events of your script in order.
                                                </li>
                                                <li>
                                                    Each event should be a single, short sentence.
                                                </li>
                                            </ul>
                                            Your plot outline may include:
                                            <ul>
                                                <li>
                                                    <strong>Plot points</strong> aka <strong>story beats</strong>: Typical plot points and story beats include an inciting incident, a rising action, and a climax.
                                                </li>
                                                <li>
                                                    <strong>Scene descriptions</strong>: Broad-stroke descriptions of action within a single scene.
                                                </li>
                                                <li>
                                                    <strong>Character arcs</strong>: Emotional arcs for key figures in your story, particularly your main character.
                                                </li>
                                                <li>
                                                    <strong>Dialogue snippets</strong>: Key lines of dialogue to employ when the actual scriptwriting begins.
                                                </li>
                                                <li>
                                                    <strong>Act breaks</strong>: Most half-hour television shows use a three-act structure, hourlong shows favor a five-act structure, and movies tend to fall within a three-act structure.
                                                </li>
                                            </ul>
                                            
                                        </p>
                                    </div>
                                    <textarea className="form-control" name="content" rows="3" placeholder='Answering your dramatic question guides the main plotline of your story. Many screenwriters call this the "throughline."'></textarea>
                                    <input type='submit' className='btn btn-primary w-50' value='Start New Plot Outline &nbsp; &nbsp; >>' />
                                    <br></br>
                                    <br></br>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='offset-1 col-5'>
                    <h3 className='text-center'><br></br>...or just start writing scenes!</h3>
                    <div className='card border-primary mb-3'>

                        {/* START WRITING SCENES! */}
                        <div className = 'card-header bg-warning bg-opacity-25'>[ Your Screenplay Title ]
                                {/* <h5 className='card-title'>{ post.title }</h5> # post title as link */}
                        </div>
                        <div className='card-body bg-warning bg-opacity-10'>
                        <form onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor='title'><strong>Slug Line</strong></label>
                            <input type='text' name='title' className='form-control' placeholder='slug line -- e.g. "INT. ABANDONED WAREHOUSE - NIGHT"' />
                            <br></br>
                            <label htmlFor='content'><strong>Scene Body</strong></label>
                            <textarea className="form-control" name="content" rows="10" placeholder='scene body'></textarea>
                            <input type='submit' className='btn btn-primary w-100 mt-3' value='Create Scene +' />
                        </div>
                    </form>
                        </div>


                                    {/* <textarea className="form-control" name="content" rows="5" placeholder='Answering your dramatic question guides the main plotline of your story. Screenwriters calls this the throughline.'></textarea>
                                    <input type='submit' className='btn btn-primary w-50' value='Start New Plot Outline &nbsp; &nbsp; >>' /> */}
                        
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

