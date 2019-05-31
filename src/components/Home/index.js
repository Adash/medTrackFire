import React, { Component } from 'react';
import './home.css';
import TrackerBox from '../TrackerBox';
import DisplayHistory from '../DisplayHistory';
import FormElement from '../FormElement';
import Header from '../Header';
import Footer from '../Footer';
import { withFirebase } from '../Firebase';

class HomeBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meditations: [],
      history: [],
      loadingMeditations: false,
      loadingHistory: false,
    }
    
  }


  addNewValue = (value, thisMed) => {
    const meditation = {...thisMed}
    const { uid } = meditation;
    const newValue = isNaN(value) ? 0 : value;
    const time = (new Date()).toDateString();
    meditation.repetitions += newValue;  
    
    const newHistory = {
      name: meditation.meditationName,
      repetitions: newValue,
      date: time,
      medKey: uid,
    } 

    this.props.firebase.meditation(uid).set(meditation);
    this.props.firebase.history().push(newHistory);
  }


  removeHistoryItem = (uid, medKey, repetitions) => {
    this.props.firebase.getReps(medKey).once('value', snapshot => {
      const currentReps = snapshot.val();
      if (currentReps) {
        this.props.firebase.meditation(medKey).update(
          { 'repetitions': currentReps - repetitions }
        )
      } 
    });
    this.props.firebase.historyElement(uid).remove(); 
  }

  handleFormSubmit = (input) => {
    const repetitions = parseInt(input.repetitions, 10)
    const newMeditation = {
      meditationName: input.name,
      meditationType: input.type,
      repetitions: repetitions,
    }
     
    this.props.firebase.meditations().push(newMeditation);
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  
  fetch = (callback, target) => {
    const loadingLabel = `loading${target}`
    this.setState({[loadingLabel]: true});
  
    callback().on('value', snapshot => {
      const snapshotObject = snapshot.val();

      if (snapshotObject) {
        //console.log('function in componentDidMount meditations triggered')
        const snapshotList = Object.keys(snapshotObject).map(key => ({
          ...snapshotObject[key],
          uid: key,
        }));
        this.setState({[target]: snapshotList});
        this.setState({[loadingLabel]: false});
      } else {
        this.setState({[loadingLabel]: false});
      }
    });
  }

  componentDidMount() {
    this.fetch(this.props.firebase.meditations, 'meditations');
    this.fetch(this.props.firebase.history, 'history');

  }

  componentWillUnmount() {
    this.props.firebase.meditations().off();
    this.props.firebase.history().off()
  }


  render() {
    const { meditations, history } = this.state;

    return (
      <div className="App home_container">
        <Header 
          toggleForm={ this.toggleForm }
          showForm={ this.state.showForm }
          loading={ this.state.loadingMeditations }
        />      
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
        <Footer />
      </div>
    );
  }
}

const HomePage = withFirebase(HomeBase);

export default HomePage;
