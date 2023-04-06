import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const BASE_URL = 'https://8000-psoper1-djangojamsproje-mukak3eo3sv.ws-us93.gitpod.io/api'

function App() {
    const [genres, setGenres] = useState([])
    const inputRef = useRef('');

    useEffect(() => {
        const getGenres = async () => {
            let config = {
                url: '/songs-list/',
                baseURL: BASE_URL,
                method: 'get',
            }
            let response = await axios.request(config);
            setGenres(response.data);
        }

        getGenres();
    }, [])
    
    async function getSongs() {
        let config = {
            url: '/albums-list/',
            baseURL: BASE_URL,
            method: 'get',
        }
        let response = await axios.request(config);
        setGenres(response.data)
        return (
            <h1>{response.data.name}</h1>
        )
    }
    
    
    return (
        <>
        <input type='text' ref={inputRef} />
        <button onClick={getSongs}>Get Songs</button>
        {genres.map((genre) => 
        <div>
            <h1>Artist: {genre?.artist?.name}</h1>
            <h2>Song Title: {genre.name}</h2>
            <h2>Album: {genre?.album?.name}</h2>
            <h2>Genre: {genre?.album?.genres[0]?.name}</h2>
            </div>)}
        </>
    )
}

export default App;