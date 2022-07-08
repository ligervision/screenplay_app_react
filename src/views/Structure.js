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
                    <h4><br></br><strong>STORY STRUCTURE Templates</strong>
                        <p><br></br>
                        <div className = 'card-header bg-warning bg-opacity-25'>
                            <label htmlFor='title'><strong>1. Narrative Archetypes</strong></label>
                        </div>
                        </p>
                    </h4>
                    <p>
                        <p><br></br>
                            Christopher Booker, in <i>The Seven Basic Plot Points</i> (2004), outlines the seven main archetypal narrative arcs. Regardless of genre, all stories fit into one of these archetypes. Click on the pull-down menu to select a universal <strong>Narrative Archetype</strong>:
                        </p>
                        <div class="dropdown mt-3">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                Select one of the 7 Narrative Archetypes:
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="/PlotTemplate">1. Overcoming the Monster</a></li>
                                <li><a class="dropdown-item" href="/PlotTemplate">2. Rags to Riches</a></li>
                                <li><a class="dropdown-item" href="/PlotTemplate">3. The Quest / Hero's Journey</a></li>
                                <li><a class="dropdown-item" href="/PlotTemplate">4. Voyage &amp; Return</a></li>
                                <li><a class="dropdown-item" href="/PlotTemplate">5. Comedy</a></li>
                                <li><a class="dropdown-item" href="/PlotTemplate">6. Tragedy</a></li>
                                <li><a class="dropdown-item" href="/PlotTemplate">7. Rebirth</a></li>
                            </ul>
                            </div>
                        </p>
                </div>
                <div className='offset-1 col-7'>
                
                        <br></br>
                        <p>
                            To start, let's choose one of Booker's 7 classic <strong>Narrative Archetypes</strong>:
                        </p>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                1. <strong>OVERCOMING THE MONSTER</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character must stop the person or force threatening them.
                                <br></br>Example: <i>Dracula</i> by Bram Stoker.
                            </div>
                        </div>
                        <br></br>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                2. <strong>RAGS TO RICHES</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character begins poor, comes into money (and/or fame, power, and love), loses it, and becomes a better person because of it.
                                <br></br>Example: <i>Great Expectations</i> by Charles Dickens.
                            </div>
                        </div>
                        <br></br>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                3. <strong>THE QUEST / HERO'S JOURNEY</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character takes an epic journey to find something, someone, or some place, running into obstacles on the way.
                                <br></br>Example: <i>The Lord of the Rings</i> by J.R.R. Tolkien.
                            </div>
                        </div>
                        <br></br>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                4. <strong>VOYAGE &amp; RETURN</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character visits a new world and returns home with a new perspective.
                                <br></br>Example: <i>Alice in Wonderland</i> by Lewis Carroll.
                            </div>
                        </div>
                        <br></br>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                5. <strong>COMEDY</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character experiences an escalating sequence of confusing but comedic events, which are ultimately resolved into a happy ending.
                                <br></br>Example: <i>A Midsummer Night’s Dream</i> by Shakespeare.
                            </div>
                        </div>
                        <br></br>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                6. <strong>TRAGEDY</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character has a flaw or makes a mistake that results in their downfall.
                                <br></br>Example: <i>Romeo and Juliet</i> by Shakespeare.
                            </div>
                        </div>
                        <br></br>
                        <div className='card border-primary mb-3'>
                            <div className = 'card-header bg-info bg-opacity-25'>
                                7. <strong>REBIRTH</strong>
                            </div>
                            <div className='card-body bg-info bg-opacity-10'>
                                The main character experiences an event that makes them a better person.
                                <br></br>Example: <i>A Christmas Carol</i> by Charles Dickens.
                            </div>
                        </div>
                        <br></br>
                </div>
            </div>
        </>
    )
}
