import React, { Component } from 'react';

class MeditationTrackerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRepValue: 0  // propably deprecated - to be removed
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

  }

  handleSubmit(key){
//  const newValue = parseInt(this.state.newRepValue, 10);
    this.props.addNewValue(key);
}

  onKeyPress(event, key){
    if (event.key === 'Enter') {
      this.handleSubmit(key);
    }
  }
    
  render() {
    const meditations = Object.keys(this.props.meditations).map(
      (key)=> {
        const thisMed = this.props.meditations[key];
        return (
          <div 
            key={key} 
            className='card-body text-center card medcard'
          >
            <h5 className='card-title'> 
              { thisMed.meditationName } </h5>
            <h6 className='card-subtitle mb-2 text-muted'> 
              { this.props.meditations[key].meditationType } </h6>
            <p className='card-text' > 
              { this.props.meditations[key].repetitions } </p>
            
            <div className="input-group mb-3">
              <input
                className="form-control"
                name='newRepetitions'
                type='text'
                value={ thisMed.newRepValue }
                onChange= { (event)=>this.props.handleNewValueChange(event, key) }
                onKeyPress= { (event)=>this.onKeyPress(event, key) }
            ></input>
              <div className="input-group-append">
                <button className='btn btn-outline-primary'
                  onClick={ ()=> this.props.addNewValue(key) }
                  > add mantras 
                </button>
              </div>
            </div>
          </div>
        )
      }            
    );
    
    return (
      <div className="medbox">
        { meditations }
      </div>
    )
  }
}

export default MeditationTrackerBox;