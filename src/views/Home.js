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
                    <div className='col-5'>
                    <br></br>Scenes for "Chapter One":
                    </div>
                    <div className='col-7'>
                            {this.state.posts.map(p => <PostCard post={p} key={p.id} />)}
                    </div>
                </div>
            </>
        )
    }
}
