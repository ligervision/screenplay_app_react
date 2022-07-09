import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import plotpyramid from './freytags_pyramid.png'

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

        fetch('postgresql://ltyhscaa:gwplgirsmnWS6b80ViNGxvaxSSXm6gHh@lallah.db.elephantsql.com/ltyhscaa', {
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
                    <h4><br></br><strong>STORY STRUCTURE Templates</strong>
                        <p><br></br>
                        <div className = 'card-header bg-warning bg-opacity-25'>
                            <label htmlFor='title'><strong>2. Plot Templates</strong></label>
                        </div>
                        </p>
                    </h4>
                    <p>
                        <p>
                            <div class="dropdown mt-3">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                    Select Plot Template
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" href="/ThreeAct">3-Act Structure</a></li>
                                        <li><a class="dropdown-item" href="/structures/">3-Act Structure (Campbell's Hero's Journey)</a></li>
                                        <li><a class="dropdown-item" href="/structures/">3-Act Structure (Vogler's Mythic)</a></li>
                                        <li><a class="dropdown-item" href="/structures/">4-Act Structure</a></li>
                                        <li><a class="dropdown-item" href="/structures/">4-Act Structure (Snyder's Save the Cat)</a></li>
                                        <li><a class="dropdown-item" href="SevenAct">Classical 7-Step Structure</a></li>
                                        <li><a class="dropdown-item" href="/structures/">Quest Structure (Propp's Functions)</a></li>
                                        <li><a class="dropdown-item" href="Truby22">Blockbuster Structure (Truby's 22 Steps)</a></li>
                                </ul>
                            </div>
                            <br></br>
                            <div className='card border-primary mb-3'>
                                <div className = 'card-header bg-info bg-opacity-25'>
                                    <strong>Narrative Archetype</strong>: You chose <strong>TRAGEDY</strong>
                                </div>
                                <div className='card-body bg-info bg-opacity-10'>
                                    The main character has a flaw or makes a mistake that results in their downfall. Example: <i>Romeo and Juliet</i> by Shakespeare.
                                </div>
                            </div>
                            <br></br>
                            Around 335 B.C., Aristotle wrote in his <i>Poetics</i> about how every story we tell fits into a <strong>3-Act Structure</strong> (see right).
                        </p>
                        <p>
                            This diagram shows Freytag's Pyramid -- a classic representation of a 3-act <strong>narrative arc</strong>.
                        </p>
                        <br></br>
                        <span className='logo-holder p-4'>
                            <img src={plotpyramid} alt="Freytag's Pyramid" width="100%"></img>
                        </span>
                    </p>
                    <br></br>
                </div>
                <div className='offset-1 col-7'>
                    <h4 className='text-center'><br></br><strong>3-Act Structure</strong> is the most basic plot template:</h4>

                    <div className='card border-primary mb-3'>
                        <div className = 'card-header bg-warning bg-opacity-25 text-muted'>STAR WARS
                                {/* <h5 className='card-title'>{ post.title }</h5> # post title as link */}
                        </div>
                        <div className='card-body bg-warning bg-opacity-10'>
                            {/* <h6 className='card-subtitle mb-2 text-muted'>By: { post?.author?.username }</h6> # author of post */}
                            {/* <p className='card-text'>{ post.content }</p> # post content*/} 
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>

                                    {/* 3-Act Structure */}
                                    {/* ACT ONE */}
                                    <div className = 'card-header bg-warning bg-opacity-25'>
                                        <h4>
                                            <label htmlFor='act1'><strong>ACT ONE - 'SETUP'</strong></label>
                                        </h4>
                                    </div>
                                    <div className='text-muted'>
                                        <ul>
                                            <li>
                                                >> exposition, inciting incident, turning point into ACT TWO
                                            </li>
                                            <li>
                                                first 25% of story
                                            </li>
                                        </ul>                                        
                                    </div>
                                    <label htmlFor='content'><strong>Exposition</strong></label>
                                    <textarea className="form-control" name="exposition" rows="2" placeholder='One or more opening scenes that establish "the world" of the story, providing the background information needed for the audience to understand what follows.'></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Inciting Incident</strong></label>
                                    <textarea className="form-control" name="inciting-incident" rows="2" placeholder='Main conflict is introduced to the protagonist, pulling them out of their normal world and into the main action of the story.'></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>First Plot Point</strong></label>
                                    <textarea className="form-control" name="first-plot-point" rows="2" placeholder='Turning point into ACT TWO.'></textarea>
                                    <br></br>
                                    <br></br>

                                    {/* ACT TWO */}
                                    <div className = 'card-header bg-warning bg-opacity-25'>
                                        <h4>
                                            <label htmlFor='act2'><strong>ACT TWO - 'CONFRONTATION'</strong></label>
                                        </h4>
                                    </div>
                                    <div className='text-muted'>
                                        <ul>
                                            <li>
                                                >> rising action, midpoint, turning point into ACT THREE (often a “dark night of the soul”)
                                            </li>
                                            <li>
                                                middle 50% of story
                                            </li>
                                        </ul>
                                    </div>
                                    <label htmlFor='content'><strong>Rising Action</strong></label>
                                    <textarea className="form-control" name="rising-action" rows="2" placeholder="Protagonist encounters various obstacles in his/her path to resolving the central conflict. Also secondary conflicts/antagonists or sub-plots can be introduced here."></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Midpoint</strong></label>
                                    <textarea className="form-control" name="midpoint" rows="2" placeholder='Midpoint'></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Second Plot Point</strong></label>
                                    <textarea className="form-control" name="second-plot-point" rows="2" placeholder="Turning point into ACT THREE -- often the lowest point for the protagonist, aka his/her 'Dark Night of the Soul.'"></textarea>
                                    <br></br>
                                    <br></br>

                                    {/* ACT THREE */}
                                    <div className = 'card-header bg-warning bg-opacity-25'>
                                        <h4>
                                            <label htmlFor='act3'><strong>ACT THREE - 'RESOLUTION'</strong></label>
                                        </h4>
                                    </div>
                                    <div className='text-muted'>
                                        <ul>
                                            <li>
                                                >> pre-climax, climax, denouement
                                            </li>
                                            <li>
                                                final 25% of story
                                            </li>
                                        </ul>
                                    </div>
                                    <label htmlFor='content'><strong>Pre-Climax</strong></label>
                                    <textarea className="form-control" name="pre-climax" rows="2" placeholder="Events leading up to a climactic confrontation in which the hero faces a point of no return: they must either prevail or perish."></textarea>
                                    <br></br>                                      
                                    <label htmlFor='content'><strong>Climax</strong></label>
                                    <textarea className="form-control" name="climax" rows="2" placeholder="The high point of the action, answering the Dramatic Question. The moment the main conflict gets resolved and the protagonist either achieves his/her goal or fails. Often a showdown between Protagonist/Hero and Antagonist/Villain."></textarea>
                                    <br></br>                                      
                                    <label htmlFor='content'><strong>Denouement</strong></label>
                                    <textarea className="form-control" name="denouement" rows="2" placeholder="Events of the climax wind back down into normal life. The central conflict becomes finally resolved."></textarea>
                                    <br></br>                                    
                                    <input type='submit' className='btn btn-primary w-67 mt-3' value='Start Plot Outline with 3-Act Structure Template >>' />
                                    <br></br>
                                    <br></br>
                                    <p className='px-2 text-muted'>...or try another Plot Template below:</p>
                                    <div class="dropdown mt-3">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                            Select Plot Template
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li><a class="dropdown-item" href="/ThreeAct">3-Act Structure</a></li>
                                            <li><a class="dropdown-item" href="/structures/">3-Act Structure (Campbell's Hero's Journey)</a></li>
                                            <li><a class="dropdown-item" href="/structures/">3-Act Structure (Vogler's Mythic)</a></li>
                                            <li><a class="dropdown-item" href="/structures/">4-Act Structure</a></li>
                                            <li><a class="dropdown-item" href="/structures/">4-Act Structure (Snyder's Save the Cat)</a></li>
                                            <li><a class="dropdown-item" href="/SevenAct">Classical 7-Step Structure</a></li>
                                            <li><a class="dropdown-item" href="/structures/">Quest Structure (Propp's Functions)</a></li>
                                            <li><a class="dropdown-item" href="/Truby22">Blockbuster Structure (Truby's 22 Steps)</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
