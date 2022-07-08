import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

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
                    <h4><br></br><strong>CHARACTERS</strong>
                    <p><br></br>Story is the resolution of your protagonist's Central Conflict</p></h4>
                    <div class="dropdown mt-3">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                Select a Central Conflict:
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#">Internal vs. External</a></li>
                                <li><a class="dropdown-item" href="#">Character vs. Society</a></li>
                                <li><a class="dropdown-item" href="#">Character vs. Character</a></li>
                                <li><a class="dropdown-item" href="#">Character vs. Nature</a></li>
                                <li><a class="dropdown-item" href="#">Character vs. Technology</a></li>
                                <li><a class="dropdown-item" href="#">Character vs. Destiny</a></li>
                            </ul>
                            </div>
                    <div className='card border-primary mb-3 mt-3'>
                            <div className = 'card-header bg-success bg-opacity-25'>
                                <strong>Christopher Booker on the Hero:</strong>
                            </div>
                            <div className='card-body bg-success bg-opacity-10'>
                            <p>
                                "However many characters may appear in a story, its real concern is with just one: its <strong>hero</strong>. It is the one whose fate we identify with, as we see them gradually developing towards that state of self-realization which marks the end of the story. Ultimately it is in relation to this central figure that all other characters in a story take on their significance."<br></br>
                            </p>
                            <h4>
                            <strong><i>"What each of the other characters represents is really only some aspect of the inner state of the hero himself."</i></strong>
                            </h4>
                            
                            </div>
                        </div>
                        <br></br>
                    <p>
                        As you develop your story, your protagonist (and even your bad guy) will go through character changes, as they encounter and surmount <strong>conflicts</strong> -- both external and internal -- over the course of the narrative.
                    </p>
                    <p>
                        Build your story's conflict from your protagnist's unique core values or fears, or from an overall theme you're exploring. All conflicts should relate to the main character's main desires/goals and relate to your story's <strong>dramatic question</strong>.
                    </p>
                    <p>
                        Go big with your story's antagonistic forces. The stakes should rise and your character's situation should go from bad to worse. This keeps your audience glued to the screen.
                    </p>
               
                </div>
                <div className='offset-1 col-7'>
                    <h4 className='text-center'><br></br>Create a Character</h4>

                    <div className='card border-primary mb-3'>
                        <div className = 'card-header bg-warning bg-opacity-25 text-muted'>STAR WARS
                                {/* <h5 className='card-title'>{ post.title }</h5> # post title as link */}
                        </div>
                        <div className='card-body bg-warning bg-opacity-10'>
                            {/* <h6 className='card-subtitle mb-2 text-muted'>By: { post?.author?.username }</h6> # author of post */}
                            {/* <p className='card-text'>{ post.content }</p> # post content*/} 
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='name'><strong>Character Name</strong></label>
                                    <input type='text' name='name' className='form-control' placeholder='character name' />
                                    <br></br>
                                    <div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="protagonist" value="option1"></input>
                                            <label class="form-check-label" for="inlineRadio1">Protagonist/Hero</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="antagonist" value="option2"></input>
                                            <label class="form-check-label" for="inlineRadio2">Antagonist/Villain</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="narrator" value="option3"></input>
                                            <label class="form-check-label" for="inlineRadio3">Narrator</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="secondary" value="option4"></input>
                                            <label class="form-check-label" for="inlineRadio4">Secondary Character</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5" disabled></input>
                                            <label class="form-check-label" for="inlineRadio5">(other types coming soon) (disabled)</label>
                                        </div>
                                    </div>
                                    <br></br>
                                    <label htmlFor='content'><strong>Description</strong></label>
                                    <textarea className="form-control" name="description" rows="3" placeholder='Physical traits as well as personality traits'></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Core Values / Motivations</strong></label>
                                    <textarea className="form-control" name="values" rows="3" placeholder="Core values/motivations should be revealed early on, as they motivate the character's actions in response to conflict over the course of the story."></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Core Fears / Flaws</strong></label>
                                    <textarea className="form-control" name="fears" rows="3" placeholder='Characters are also motivated by their fears. A perfect protagonist is boring. Characters with weaknesses are more believable and relatable to the audience.'></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Back Story / "Ghost"</strong></label>
                                    <textarea className="form-control" name="backstory" rows="3" placeholder="What event in your character's past haunts them in the present? How do they overcome the 'ghost' in their past as they encounter and surmount conflict throughout the story? (This relates to his/her core motivation.)"></textarea>
                                    <br></br>
                                    <label htmlFor='content'><strong>Character Arc</strong></label>
                                    <textarea className="form-control" name="backstory" rows="3" placeholder="How does your story illustrate your protagonist's character development? How does their character change over the course of the action? Describe the character at the beginning and the end of the story."></textarea>
    
                                    <input type='submit' className='btn btn-primary w-25 mt-3' value='Create Character +' />
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

