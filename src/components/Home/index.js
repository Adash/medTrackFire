import React, { Component } from 'react';
import './Home.css';
import TrackerBox from '../TrackerBox';
import DisplayHistory from '../DisplayHistory';
import FormElement from '../FormElement';
import Header from '../Header';
//import inData from '../../inData';
import { withFirebase } from '../Firebase';

class HomeBase extends Component {
  constructor(props) {
    super(props);

    this.addNewValue = this.addNewValue.bind(this);
    this.removeHistoryItem = this.removeHistoryItem.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  state = {
    meditations: [],
    history: [],
  }


  addNewValue(value, thisMed) {
    //const medClone = Object.assign({}, this.state.meditations);
    const { uid } = thisMed;
    const newValue = parseInt(value, 10);;
    //const history = this.state.history;
    //const date = new Date();
    //const time = date.toDateString();
    //const medName = this.state.meditations[medKey].meditationName;
    thisMed.repetitions += newValue;  
    console.log(thisMed)
    // this.setState({
    //     history: history.concat([
    //       {
    //         name: medName,
    //         repetitions: newValue,
    //         date: time,
    //         medKey: medKey,
    //       }])
    // });
    // const medClone = Object.assign({}, this.state.meditations);
    // medClone = medClone[uid].newRepValue = value;   

    this.props.firebase.meditation(uid).set(thisMed);
  }


  removeHistoryItem(entryNo, medKey, repetitions) {
    const newHistory = this.state.history.filter(
      (value, index)=> index !== entryNo
    );
    //console.log(newHistory);

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
    }

    //let medKey = input.name.replace(/\s+/g, '').toLowerCase();
    //if ( !(isNaN(medKey.charAt(0))) ) { medKey = 'a' + medKey };
    //const medClone = Object.assign({ [medKey]:{} }, this.state.meditations);
    //medClone[medKey] = newMeditation;   
    this.props.firebase.meditations().push(newMeditation);
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  
  componentDidMount() {
    this.setState({loading: true});
  
    this.props.firebase.meditations().on('value', snapshot => {
      const meditationsObject = snapshot.val();

      if (meditationsObject) {
        const meditationsList = Object.keys(meditationsObject).map(key => ({
          ...meditationsObject[key],
          uid: key,
        }));
        this.setState({meditations: meditationsList});
        //console.log(meditationsList);
        //console.log('loaded');
        this.setState({loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }


  render() {
    const { meditations, history } = this.state;

    return (
      <div className="App container">
        <Header 
          toggleForm={ this.toggleForm }
          showForm={ this.state.showForm }
          loading={ this.state.loading }
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
        <footer className="footer"> Footer  </footer>
      </div>
    );
  }
}

const HomePage = withFirebase(HomeBase);

export default HomePage;
