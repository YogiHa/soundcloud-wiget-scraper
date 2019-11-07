import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [url, setUrl] = useState('/shady-badr-298691337/sets/mark-eliyaho');


    const { SC } = window;
    // const widget = SC.Widget('soundcloud_widget');



    // add SoundCloud script tag to html doc
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://w.soundcloud.com/player/api.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);



    useEffect(() => console.log(results), [results])


    const sendToScraper = input => {
        console.log(input)
        fetch('http://localhost:3001/soundcloudcrawler', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' //,
                    // 'Authorization' : 
                },
                body: JSON.stringify({ input })
            })
            .then(response => response.json())
            .then(response => {
                setResults(response)
            })

            .catch(err => console.log)
    }

    return (
        <div className="App">
                <iframe 
                 allow="autoplay"
                 title = "iframe" 
                 id="soundcloud_widget"
                 src={`https://w.soundcloud.com/player/?url=https://soundcloud.com${url}`}
                 >
                </iframe> 
                <br />
                <div>
                  <input onChange = { e => setSearch(e.target.value) } />
                  <button onClick={()=>sendToScraper(search)}> s </button>
                </div>
             {results &&
                      <div>
                 {
                    results.map(song => <button onClick={()=>setUrl(song.URL)}> {song.name} </button>)
                 }
                   </div>
                 }
            </div>
    )
}


export default App;