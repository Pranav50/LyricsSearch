import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../context'
import {MDBBtn} from 'mdbreact'

const APP_KEY = process.env.REACT_APP_LYRICS_KEY

class Search extends Component {
    state = {
        trackTitle: ''
    };

    onChange = e => {
        this.setState({[e.target.name]:  e.target.value});
    }

    findTrack = (dispatch, e) => {
        e.preventDefault();

        axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?track=${this.state.trackTitle}`+
            `&page_size=10&page=1&s_track_rating=desc&apikey=${APP_KEY}`)
        .then(res => {
        dispatch({
            type: 'SEARCH_TRACKS',
            payload: res.data.message.body.track_list
        })
        //this.setState({track_list: res.data.message.body.track_list});
    })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Consumer>
                    {
                        value => {
                            const { dispatch } = value;
                            return (
                                <div className="card card-body mb-4 p-4">
                                    <h1 className="display-5 text-center"><i className="fas fa-music"></i>{' '}
                                        Search for a Song...
                                    </h1>
                                    <p className="lead text-center">Get the Lyrics</p>
                                    <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-lg" 
                                            placeholder="Song tilte..."
                                            name="trackTitle"
                                            value={this.state.trackTitle}
                                            onChange={this.onChange}/>
                                        </div>
                                        <MDBBtn color="primary" className="btn btn-lg btn-block"
                                        type="submit">
                                            Get Track Lyrics
                                        </MDBBtn>
                                    </form>
                                </div>
                            )
                        }
                    }
            </Consumer>
        )
    }
}

export default Search
