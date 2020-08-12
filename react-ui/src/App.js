import React, { Component } from 'react';
import './App.css'
import Select from './Components/Select'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {

    render() {
        return (
        <div className ="App">
                <Select/>
                
        </div>
        );
    }
}

export default App;
