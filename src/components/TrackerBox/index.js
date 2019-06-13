import React, { Component } from 'react';

class TrackerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

  }

  handleSubmit(thisMed){
    this.props.addNewValue(this.state[thisMed.uid], thisMed, this.props.user);
}

  onKeyPress(event, thisMed){
    if (event.key === 'Enter') {
      this.handleSubmit(thisMed);
    }
  }
  
  handleNewValueChange = (event, uid) => {
    const value = parseInt(event.target.value, 10)
    this.setState({[uid]: value})
  }

  componentDidMount() {
    setTimeout(
      () => console.log(this.props.meditations),
      2000
    );
  }
    
  render() {
    const userID = this.props.user.uid;
    // the commented code below is kept temporarily for analisys
    // will be removed soon
    // const meditations = Object.keys(this.props.meditations)
    // .filter( element => element.userID === userID )
    //const meditations = this.props.meditations ? this.props.meditations
    const meditations = this.props.meditations
    .filter( element => element.userID === userID )
    .map(
      (thisMed, index)=> {
        //const thisMed = this.props.meditations[key];
        const { uid } = thisMed;
        const inputField = this.state[uid] ? this.state[uid] : ''
        
        return (
          <div 
            key={uid} 
            className='card-body text-center card medcard'
          >
            <h5 className='card-title'> 
              { thisMed.meditationName } </h5>
            <h6 className='card-subtitle mb-2 text-muted'> 
              { thisMed.meditationType } </h6>
            <p className='card-text' > 
              { thisMed.repetitions } </p>
            <div className="input-group mb-3">
              <input
                className="form-control"
                name='newRepetitions'
                type='text'
                value={ inputField }
                onChange= { event => this.handleNewValueChange(event, uid) }
                onKeyPress= { event => this.onKeyPress(event, thisMed) }
            ></input>
              <div className="input-group-append">
                <button 
                  className='btn btn-outline-primary'
                  type="submit"
                  onClick={ () => this.handleSubmit(thisMed) }
                  > add mantras 
                </button>
              </div>
            </div>
          </div>
        )
      }            
    )
    
    return (
      <div className="medbox">
        { meditations }
      </div>
    )
  }
}

export default TrackerBox;