import React from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import '../App.css';

export default class Timer extends React.Component {

constructor(props){
    super(props);

    let time = this.props.limit
    this.state = {
        TIME_LIMIT: time,
        started: false,
        timeLeft: time,
        timePassed: 0
    }

    this.formatTimeLeft = this.formatTimeLeft.bind(this);
    this.calculateTimeFraction = this.calculateTimeFraction.bind(this);
    this.onTimesUp = this.onTimesUp.bind(this);
    
}

componentDidMount() {
  this.interval = setInterval(() => 
     this.startTimer(this.interval),1000
   );
}

componentWillUnmount() {
  if (this.interval) {
     clearInterval(this.interval);
  }
}

formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);
  
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;
  
  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

startTimer() {

    if(this.state.timeLeft < 10) {
      this.setState({
        timePassed: this.state.timePassed += 1,
        timeLeft: this.state.TIME_LIMIT - this.state.timePassed,
        remainingPathColor: "base-timer__path-remaining red"
      });
    }
    else if (this.state.timeLeft < 20)
    {
      this.setState({
        timePassed: this.state.timePassed += 1,
        timeLeft: this.state.TIME_LIMIT - this.state.timePassed,
        remainingPathColor: "base-timer__path-remaining orange"
      });
    }
    else if (this.state.timeLeft > 0)
    {
      this.setState({
        timePassed: this.state.timePassed += 1,
        timeLeft: this.state.TIME_LIMIT - this.state.timePassed,
        remainingPathColor: "base-timer__path-remaining green"
      });
    }
    else if(this.state.timeLeft === 0){
      this.onTimesUp();
    }
    
}

onTimesUp(){
  clearInterval(this.interval)
}

calculateTimeFraction() {
  let rawTimeFraction = this.state.timeLeft / this.state.TIME_LIMIT;
  return rawTimeFraction - (1 / this.state.TIME_LIMIT) * (1 - rawTimeFraction);
}

render() {
  
  return (

    <div id="timer">
    <CountdownCircleTimer
          isPlaying
          duration={this.state.timeLeft}
          size={200}
          strokeWidth={12}
          colors={[
            ['#0cf514', 0.33],
            ['#fa9d2a', 0.33],
            ['#f2340f', 0.33],
          ]}
        >
          
          {({ remainingTime }) => this.formatTimeLeft(remainingTime)}
         
    </CountdownCircleTimer>
    </div>
    

  );
}
}