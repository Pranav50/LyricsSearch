import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'  
import Moment from 'react-moment'

const APP_KEY = 'f4de7cde344132a63f26522e8f5c9ddf'

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };
    componentDidMount = async () => {
        await axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?` + 
            `track_id=${this.props.match.params.id}&apikey=${APP_KEY}`)
        .then(res => {
            // console.log('Lyrics', res.data);
        this.setState({lyrics: res.data.message.body.lyrics});
 
        return axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?` + 
            `track_id=${this.props.match.params.id}&apikey=${APP_KEY}`)
    })
        .then(res => {
            this.setState({track: res.data.message.body.track});
        })
        .catch(err => console.log(err));
    }

    // track.get?commontrack_id=5920049
    render() {
        const { track, lyrics } = this.state;
        console.log('Track', track)
        if(track === undefined ||
            lyrics === undefined ||
            Object.keys(track).length === 0 ||
            Object.keys(lyrics).length === 0) {
            return <Spinner/>
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <div>
                        <div className="card">
                            <h5 className="card-header">
                                {track.track_name} by{' '}  
                                <span className="text-secondary">{track.artist_name}</span>
                            </h5>
                            <div className="card-body">
                                <p className="card-text">{lyrics.lyrics_body}</p>
                            </div>
                        </div>
                    </div>

                        <ul className="list-group mt-3">
                            <li className="list-group-item">
                                <strong>Album ID</strong>: {track.album_id}
                            </li>
                            <li className="list-group-item">
                            <strong>Song Genre</strong>: {''} 
                            {track.primary_genres.music_genre_list.map((data) => {
                                return (<p key={track.track_id}>{data.music_genre.music_genre_name}</p>)
                            })}
                            {/* {track.h5rimary_genres.music_genre_list.length === 0 ?
                                 "No Genre" : track.primary_genres.music_genre_list[0].music_genre.music_genre_name}  */}
                                {/*track.primary_genres.music_genre_list[0].music_genre.music_genre_name*/} 
                            </li>
                            <li className="list-group-item">
                                <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                            </li>
                            <li className="list-group-item">
                                <strong>Release Date</strong>: {' '}
                                <Moment format="DD-MM-YYYY">{track.first_release_date}</Moment>
                            </li>
                        </ul>

                </React.Fragment>
            )
        }
    }
}

export default Lyrics
