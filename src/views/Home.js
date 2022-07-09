import React, { Component } from 'react'
import PostCard from '../components/PostCard';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        fetch('postgresql://ltyhscaa:gwplgirsmnWS6b80ViNGxvaxSSXm6gHh@lallah.db.elephantsql.com/ltyhscaa')
            .then(res => res.json())
            .then(data => this.setState({posts:data}))
    }

    sortPosts = (method) => {
        const sortingMethods = {
            byDateAsc: (a, b) => new Date(a.date_created) - new Date(b.date_created),
            byDateDesc: (a, b) => new Date(b.date_created) - new Date(a.date_created),
            byTitleAsc: (a, b) => a.title > b.title ? 1 : -1,
            byTitleDesc: (a, b) => a.title > b.title ? -1 : 1,
        }
        let sortedPosts = [...this.state.posts].sort(sortingMethods[method])
        this.setState({ posts: sortedPosts })
    }

    render() {
        return (
            <>
                {/* SCREENPLAY TITLE needs to be called */}
                <h1 className='text-center'><b>STAR WARS</b> screenplay</h1>
                <hr></hr>
                <div className='offset-8 col-4'>
                    <select onChange={(e) => this.sortPosts(e.target.value)} className='form-select'>
                        <option>Sort Scenes</option>
                        <option value='byDateAsc'>By Date Ascending</option>
                        <option value='byDateDesc'>By Date Descending</option>
                        <option value='byTitleAsc'>By Title Ascending</option>
                        <option value='byTitleDesc'>By Title Descending</option>
                    </select><br></br>
                </div>

                {/* Left side -- Table of Contents */}
                <div className='d-flex justify-content-between'>
                    <div className='col-5 text-muted'>
                        <br></br>Viewing scenes for <b>STAR WARS</b> &nbsp; > &nbsp; 1. Ordinary World:
                        <br></br>
                        <br></br>
                        <ul class="no-bullets">
                            <li>
                                <div className = 'card-header col-6 bg-info bg-opacity-25'>
                                    <label htmlFor='outline'><h6><strong>Hero's Journey</strong></h6></label>
                                </div>
                                <p>   
                                    
                                </p>
                                
                            </li>
                            <ol>
                                <li className='text-primary'><strong>The Ordinary World</strong></li>                                
                                <li>Call to Adventure</li>
                                <li>Refusal of the Call</li>
                                <li>Crossing the Threshold</li>
                                <li>Tests, Allies, and Enemies</li>
                                <li>The Approach</li>
                                <li>The Ordeal</li>
                                <li>The Reward</li>
                                <li>The Road Back</li>
                                <li>The Resurrection</li>
                                <li>The Return</li>
                            </ol>
                        </ul>
                        <br></br>
                        <p className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1">
                            </input>
                            <label className="form-check-label" for="exampleCheck1">Character View</label>
                        </p>
                        <br></br>
                        <button class="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Show Story Structure
                        </button>

                        {/* start OFFCANVAS */}
                        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Story Structure</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>

                            {/* OFFCANVAS BODY */}
                            <div class="offcanvas-body">

                                {/* Plot Elements for [ SCREENPLAY TITLE ] */}
                                <div>
                                    <p className="text-muted">PLOT ELEMENTS for <b>STAR WARS</b></p> 
                                </div>
                                
                                {/* PLOT TEMPLATE drop-down menu */}
                                <div class="dropdown mt-3">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                        Select Plot Template
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" href="#">3-Act Structure</a></li>
                                        <li><a class="dropdown-item" href="#">3-Act Structure (Campbell's Hero's Journey)</a></li>
                                        <li><a class="dropdown-item" href="#">3-Act Structure (Vogler's Mythic)</a></li>
                                        <li><a class="dropdown-item" href="#">4-Act Structure</a></li>
                                        <li><a class="dropdown-item" href="#">4-Act Structure (Snyder's Save the Cat)</a></li>
                                        <li><a class="dropdown-item" href="#">Classical 7-Step Structure</a></li>
                                        <li><a class="dropdown-item" href="#">Quest Structure (Propp's Functions)</a></li>
                                        <li><a class="dropdown-item" href="#">Blockbuster Structure (Truby's 22 Steps)</a></li>
                                    </ul>
                                </div>

                                {/* PLOT TEMPLATE - Table of Contents */}
                                <ul class="no-bullets">
                                    <li>
                                        <br></br>
                                        <div className = 'card-header col-6 bg-info bg-opacity-25'>
                                            <label htmlFor='outline'><h6><strong>Hero's Journey</strong></h6></label>
                                        </div>  
                                    </li>
                                    <ol>
                                        <li className='text-primary'><strong>The Ordinary World</strong></li>                                
                                        <li>Call to Adventure</li>
                                        <li>Refusal of the Call</li>
                                        <li>Crossing the Threshold</li>
                                        <li>Tests, Allies, and Enemies</li>
                                        <li>The Approach</li>
                                        <li>The Ordeal</li>
                                        <li>The Reward</li>
                                        <li>The Road Back</li>
                                        <li>The Resurrection</li>
                                        <li>The Return</li>
                                    </ol>
                                </ul>
                            </div>  
                            {/* End OFFCANVAS BODY */}

                        </div>
                        {/* End OFFCANVAS */}

                    </div>

                    {/* SORTED POSTS DISPLAY HERE */}
                    <div className='col-7'>
                            {this.state.posts.map(p => <PostCard post={p} key={p.id} />)}
                    </div>
                </div>
            </>
        )
    }
}
