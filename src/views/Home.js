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
        fetch('https://kekambas-blog.herokuapp.com/blog/posts')
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
                <h1 className='text-center'><b>The Trial</b> blog</h1>
                <hr></hr>
                <div className='offset-8 col-4'>
                    <select onChange={(e) => this.sortPosts(e.target.value)} className='form-select'>
                        <option>Sort Posts</option>
                        <option value='byDateAsc'>By Date Ascending</option>
                        <option value='byDateDesc'>By Date Descending</option>
                        <option value='byTitleAsc'>By Title Ascending</option>
                        <option value='byTitleDesc'>By Title Descending</option>
                    </select><br></br>
                </div>

                <div className='d-flex justify-content-between'>
                    <div className='col-5 text-muted'>
                        <br></br>Viewing scenes for <b>The Trial</b> > Chapter One:
                        <br></br>
                        <br></br>
                        <ul class="no-bullets">
                            <li className='text-primary'>Chapter 1</li>
                            <li>Chapter 2</li>
                            <li>Chapter 3</li>
                            <li>Chapter 4</li>
                            <li>Chapter 5</li>
                            <li>Chapter 6</li>
                            <li>Chapter 7</li>
                            <li>Chapter 8</li>
                            <li>Chapter 9</li>
                            <li>Chapter 10</li>
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
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Story Structure</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div>
                                <p className="text-muted">PLOT ELEMENTS for <b>'THE TRIAL'</b></p> 
                            </div>
                            <div class="dropdown mt-3">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                Select Plot Template
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#">3-Act Structure</a></li>
                                <li><a class="dropdown-item" href="#">3-Act Structure (Campbell's Hero's Journey</a></li>
                                <li><a class="dropdown-item" href="#">4-Act Structure</a></li>
                                <li><a class="dropdown-item" href="#">4-Act Structure (Snyder's Save the Cat)</a></li>
                                <li><a class="dropdown-item" href="#">Quest Structure (Propp's Functions)</a></li>
                                <li><a class="dropdown-item" href="#">Truby's 22 Steps</a></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className='col-7'>
                            {this.state.posts.map(p => <PostCard post={p} key={p.id} />)}
                    </div>
                </div>
            </>
        )
    }
}
