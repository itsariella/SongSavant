import React from 'react';
import queryString from 'query-string';
import Timer from './Timer';
import PlayTimer from './PlayTimer';
import Card from './Card';
import Player from './Player';
import Title from './Title'
import Directions from './Directions';
import '../App.css';


class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            songsList: {},
            categoryClicked: false,
            clicked: false,
            isEmptyState: true,
            isLogged: false,
            catIsLogged: false,
            renderPlayer: false,
            renderTimer: false,
            category: "",
            fetched: false,
            myCategories: ["hiphop", "pop", "toplists", "country", "rock", "rnb", "alternative", "dance", "decades", "christian", "kpop", "blues", "classical","indie","jazz","soul","punk","metal","reggae","funk"],
            gameOver:false
    };

        this.handlePlaylist = this.handlePlaylist.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
    }

    componentDidMount(){
       let parsed = queryString.parse(window.location.search); //gets access token
       let accessToken = parsed.get('access_token');
      
       if(!accessToken)
        return
       fetch('https://api.spotify.com/v1/me', {
         headers:{ 'Authorization': 'Bearer ' + accessToken
       }}).then(response => response.json())
       .then(data => this.setState({
           user: {
               name: data.display_name
           }
       }))

       fetch('https://api.spotify.com/v1/browse/categories?&limit=50', {
         headers:{ 'Authorization': 'Bearer ' + accessToken
       }}).then(response => response.json())
       .then(categoryData => {
        console.log(categoryData)
        let categories = categoryData.categories.items
        this.setState({
            categories: categories.map(item => {
                return {
                    name: item.name,
                    imageUrl: item.icons[0].url,
                    id: item.id
                    }
                })
            })
        })

    }

    handlePlaylist(playlist) {
       console.log("clicked")
        this.setState({
            clicked: true,
            isEmptyState: false,
            songsList: playlist.songs,
            chosenPlaylist: playlist,
            playlists: []
        });

        setTimeout(function() { //Start the timer
            this.setState({renderPlayer: true, renderTimer: true}) //After 1 second, set render to true
        }.bind(this), 3000)

        setTimeout(function() {
            this.setState({renderTimer:false, gameOver: true})
        }.bind(this),123000)
        
    }

    handleCategory(category) {
        
        let parsed = queryString.parse(window.location.hash); //gets access token
        let accessToken = parsed.access_token;
        this.setState({
            categoryClicked: true,
            categoryId: category.id,
            myCategories: ["removeCategory"],
            fetched: true
        });
        
        let url = 'https://api.spotify.com/v1/browse/categories/' + category.id + '/playlists?&limit=50'
        console.log(url)

        fetch(url, {
                headers: {'Authorization': 'Bearer ' + accessToken}
                }).then(response => response.json())
                .then(playlistData => {
                    console.log(playlistData)
                    
                    let playlists = playlistData.playlists.items
                    let trackDataPromises = playlists.map(playlist  => { 
                        let responsePromise = fetch(playlist.tracks.href, { 
                        headers: {'Authorization' : 'Bearer ' + accessToken}
                        })
                        let trackDataPromise = responsePromise
                        .then(response => response.json()).catch((error) => {console.log(error)})
                        return trackDataPromise
                    })
                    let allTracksDataPromises 
                        = Promise.all(trackDataPromises)
                        /*get song names, error may occur if track is null? */ 
                    let playlistPromise = allTracksDataPromises.then(trackDatas => {
        
                        trackDatas.forEach((trackData, i) => {

                            console.log(trackData)
                            console.log(trackData.items.filter(function(item) {return item.track != null }))
                            console.log(trackData.items)
                            playlists[i].trackDatas = trackData.items
                                .filter(function(item) {return item.track != null })
                                .map(item => item.track)  
                                .map((trackData) => ({
                                name: trackData.name,
                                url: trackData.preview_url,
                                artists: trackData.artists
                            }))                  
                        })
                        return playlists
                    })
                    return playlistPromise
                })
                .then(playlists => this.setState({
                    playlists: playlists.map(item => {
                        return {
                            name: item.name,
                            imageUrl: item.images[0].url,
                            songs: item.trackDatas,
                        }
                    })
                }))
                .catch((error) => {
                    console.log(error)
                })
                
    }

    render() {

        let categoryToRender = 
        this.state.user && 
        this.state.categories 
            ? this.state.categories.filter(category => {
                let matchesCategory = this.state.myCategories.includes(category.id)
                console.log(matchesCategory)
                return matchesCategory
            }) : []

        
        let playlistToRender = 
        this.state.user && 
        this.state.playlists 
            ? this.state.playlists.filter(playlist => {
                let matchesPlaylist = this.state.playlists
                return matchesPlaylist
            }) : []

        return (
        <div>
            {this.state.user ?
            [<Title/>,
            <div> {!this.state.clicked ?
             <p>
                <h1 id="welcome">
                    Welcome, {this.state.user.name.split(" ").shift()}! 
                    {console.log(this.state.user)}
                </h1>
            </p>   
            : this.state.gameOver ? 
            <h1 id="welcome">
            Nice Job, {this.state.user.name.split(" ").shift()}! 
            {console.log(this.state.user)}
            </h1> 
            : null} 

            {!this.state.clicked ? <Directions></Directions> : null}

            {
                <div id = "game">
                    {!this.state.categoryClicked && <h3> Select a category:  </h3> }
                    {this.state.categoryClicked && this.state.isEmptyState && <h3> Select a playlist:  </h3> }
                </div>
            }

            { this.state.categoryClicked ? playlistToRender.map(playlist => 
                <button className="songCard" onClick={() => this.handlePlaylist(playlist)}>

                    {this.state.clicked && !this.state.isLogged ? this.setState(
                        { 
                            isLogged: true,
                        }): console.log("no playlists")
                    }
                    <Card card={playlist} />
                </button>
            ) : console.log("unclicked")}
                

            {
                <div id = "game">
                    {!this.state.renderTimer && !this.state.gameOver && this.state.categoryClicked && this.state.clicked ? <div>Game starts in...<Timer limit={3} ></Timer></div> : null}
                    {this.state.categoryClicked && this.state.clicked && this.state.renderTimer? <Timer limit={120}/> : null} 
                    {!this.state.renderTimer && this.state.gameOver ? <div> <button id = "replay"> Play Again </button> <button id = "diffPlaylist"> Different Playlist</button></div> : null}
                    {this.state.clicked && this.state.renderPlayer ? <Player elementId = "myPlayer" playlist= {this.state.chosenPlaylist} selectedPlaylist = {this.state.songsList}/> : null} 
                </div>
            }
            
            {categoryToRender.map(category => 
                
                    <button className="songCard" onClick={() => this.handleCategory(category)}>
    
                        {this.state.categoryClicked && !this.state.catIsLogged ? this.setState(
                            { 
                                catIsLogged: true,
                            }): console.log(category)
                        }
                        <Card card={category} />
                    </button>
                )
            }
            
             
            </div>] : [<img id ="logo" src={require("../images/Song-SavantLogo.png")}/>, <button id="signIn" onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://song-savant.herokuapp.com/login' }
          }
          >Sign in with Spotify</button>]
            }
        </div>
        );
    }
}

export default Select;
