import React from "react"
import Sidebar from "react-sidebar";
import PlayTimer from './PlayTimer';
import '../App.css';

export default class Player extends React.Component {

    constructor(props){
        super(props);
        this.state={
          currentSongUrl: null, 
          currentSongName: "",
          currentSongArtist: "",
          isLogged: false,
          totalCount:0,
          score: 0,
          correct: false,
          submitted: false,
          gameOver:false,
        };
        this.handleAudio = this.handleAudio.bind(this);
        this.nextTrack = this.nextTrack.bind(this);
        this.randomNumber = this.randomNumber.bind(this);
        this.myInput = React.createRef();
        this.arrNums = [];
        this.known = [];
        this.missed = [];
    } 

    componentDidMount() {
        setTimeout(function() {
            this.setState({gameOver: true})
        }.bind(this),120000)
    }

    /*Generates a random number between min to max*/
    randomNumber(min, max) {  
        let myCount = parseInt(Math.random() * (max - min) + min); 
        let attemptNum = 0;
        while(this.arrNums.indexOf(myCount) !== -1 && attemptNum <= 5) {
            myCount = parseInt(Math.random() * (max - min) + min); 
        }
        this.arrNums.push(myCount);
        return myCount;
    } 

    /**Sets state for next track, previous track, input validation
    * @param songs array for which you want to set the next track
    *
    **/
    nextTrack(e,songs) {
        e.preventDefault();
        let myCount = this.randomNumber(0,songs.length-1)
        let matchesSong = this.state.currentSongName.normalize("NFD").toLowerCase().replace(/[.,'/?#!$%^&*;:{}=_`~\s]/g,"")
        matchesSong = matchesSong.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let input = this.myInput.value.normalize("NFD").toLowerCase().replace(/[.,'/?#!$%^&*;:{}=_`~\s]/g,"").trim();
        input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        this.setState({correct: false, submitted: true})
    
        if(songs.length > 0)
        {
            while(songs[myCount].url == null)
            {
                myCount=this.randomNumber(0,songs.length-1);
            } 
        }

        if(matchesSong[0] === ('('))
        {
            matchesSong = matchesSong.split(')')[1].trim();
        }
        else if(matchesSong.includes('('))
        {
            matchesSong = matchesSong.split('(')[0].trim();
        }
        if(matchesSong.includes('-'))
        {
            matchesSong = matchesSong.split('-')[0].trim();
        }
        
        if( input === matchesSong)
        {
            this.known.push(this.state.currentSongName);
            this.setState({
                score: this.state.score + 1,
                correct: true
            
            }, () => console.log(this.state.score));
        } 
        else {
            this.missed.push(this.state.currentSongName);
        }
        this.myInput.value = "";
        console.log(this.myInput.value);
        console.log(matchesSong);
        this.setState({
            previousSongName: this.state.currentSongName,
            totalCount: this.state.totalCount + 1,
            match: false,
            currentSongUrl:songs[myCount].url,
            currentSongName: songs[myCount].name,
            
        }, () => console.log(songs[myCount].name))

        console.log(this.known);
        console.log(this.missed)
    }

    handleAudio(songs) {
        console.log("handle audio start")
        let myCount = this.randomNumber(0,songs.length-1)
        console.log(myCount)
        if(songs.length > 0)
        {
            while(songs[myCount].url == null)
            {
                myCount = this.randomNumber(0,songs.length-1);
            } 
        }
        this.setState({
            currPosition:myCount,
            currentSongUrl:songs[myCount].url,
            currentSongName: songs[myCount].name,
            correct: false    
        }, () => console.log("im setting state"))


        console.log("handle audio done")
    }
    
    render() {
       
        let songs = this.props.selectedPlaylist
       
        if(songs == null)
        {
            return <h2>Error! No playlists retrieved! </h2>
        }
        if(songs.length > 0)
        {
            if(this.state.currentSongUrl === null || this.state.currentSongUrl === '')
            {
                this.handleAudio(songs)
            } 
            
     
            return [
                    <h2> Score: {this.state.score} </h2>, 
                    <div> { !this.state.gameOver ?
                        <div id= "player">
                            <audio className="audioPlayer" controls autoPlay src = {this.state.currentSongUrl} onEnded=
                                {(e) => this.nextTrack(e,songs)}> {console.log(this.state.currentSongUrl)}
                            </audio>
                            {/* <PlayTimer song={this.state.currentSongUrl}/> */}
                            <form onSubmit = {(e) => this.nextTrack(e,songs)}>
                                <input
                                    type = "text"
                                    ref={input => {this.myInput = input;}} 
                                    placeholder="Enter song name"
                                    autoFocus>

                                </input>
                                <button type="submit"> submit </button>
                            </form> 
                            <div>{this.state.submitted? this.state.correct ? 
                                <h5> Good job!</h5>: <h5> Not quite... </h5> : null}
                            </div>
                            <div> { this.state.submitted ? 
                                <h4> Previous song:  {this.state.previousSongName} </h4> : null } 
                            </div>
                        </div>  : null} 
                    </div>,
                    
                    <div> {this.state.gameOver? 
                        <div className = "container">
                            <div className = "list-container">
                                <h3> Songs you knew </h3>
                                <ul className = "list"> {this.known.map((song) => (
                                    <li> {song}</li>
                                ))}
                                </ul>
                            </div>
                            <div className = "list-container">
                                <h3> Songs you missed </h3>
                                <ul className = "list"> {this.missed.map((song) => (
                            <li> {song}</li>
                         ))}
                        </ul> 
                            </div>
                        
                        </div>: null }
                    
                    </div>
                    ]
            
        }
        else{
            return <h2> Error! No songs retrieved! </h2>
        }
    }
}   