import React, { Component } from 'react';
import './Home.css';
import TrackerBox from '../TrackerBox';
import DisplayHistory from '../DisplayHistory';
import FormElement from '../FormElement';
import inData from '../../inData';

class Home extends Component {
  constructor(props) {
    super(props);

    this.addNewValue = this.addNewValue.bind(this);
    this.handleNewValueChange = this.handleNewValueChange.bind(this);
    this.removeHistoryItem = this.removeHistoryItem.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  state = {
    meditations: inData,
    history: [],
  }


  addNewValue(medKey) {
    const medClone = Object.assign({}, this.state.meditations);
    const newValue = parseInt(this.state.meditations[medKey].newRepValue, 10);;
    const history = this.state.history;
    const date = new Date();
    const time = date.toDateString();
    const medName = this.state.meditations[medKey].meditationName;
    
    medClone[medKey].repetitions += newValue;  

    this.setState({
        meditations: medClone,
        history: history.concat([
          {
            name: medName,
            repetitions: newValue,
            date: time,
            medKey: medKey,
          }])
    });
  }

  handleNewValueChange = (event, medName) => {
    const value = event.target.value;
    if ( isNaN(value) === false ) {
      const medClone = Object.assign({}, this.state.meditations);
      medClone[medName].newRepValue = value;   

      this.setState({
          meditations: medClone, 
          showForm: false,
      });
    }  
  }

  removeHistoryItem(entryNo, medKey, repetitions) {
    const newHistory = this.state.history.filter(
      (value, index)=> index !== entryNo
    );
    console.log(newHistory);

    //try to take this bit out to separte function and change it 
    // in a way that it can be also called from addNewValue function

    const medClone = Object.assign({}, this.state.meditations);
    medClone[medKey].repetitions -= repetitions;  

    this.setState({
      meditations: medClone,
      history: newHistory
    });
  }

  handleFormSubmit(input) {
    const repetitions = parseInt(input.repetitions, 10)
    const newMeditation = {
      meditationName: input.name,
      meditationType: input.type,
      repetitions: repetitions,
      newRepValue: 0,
    }

    let medKey = input.name.replace(/\s+/g, '').toLowerCase();
    if ( !(isNaN(medKey.charAt(0))) ) { medKey = 'a' + medKey };
    console.log(this.state.meditations[medKey]);
    const medClone = Object.assign({ [medKey]:{} }, this.state.meditations);
    medClone[medKey] = newMeditation;   

    this.setState({
      meditations: medClone,
    }); 
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }


  render() {
    const { meditations } = this.state;
    const { history } = this.state

    return (
      <div className="App container">
        <header className="header">
        <h2 className="logo">MedTrack</h2>
        <button 
          type="button" 
          className="btn btn-outline-light btn-sm navbutton"
          onClick={ this.toggleForm }  
        >
          { this.state.showForm ? "Hide": "Show" } Form
        </button>
        </header>        
        <TrackerBox 
          meditations= { meditations }  
          addNewValue= { this.addNewValue }
          handleKeyPress= { this.handleKeyPress }
          handleNewValueChange= {this.handleNewValueChange}
        />
        <DisplayHistory
          history={ history }
          removeLine={ this.removeHistoryItem }
          test={this.handleFormSubmit}
        />
        { this.state.showForm ?
          <FormElement
            handleFormSubmit={ this.handleFormSubmit }
          />
          : null
        }
        <footer className="footer"> Footer  </footer>
      </div>
    );
  }
}

export default Home;
