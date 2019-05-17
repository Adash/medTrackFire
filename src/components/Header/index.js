import React from 'react';

const Header = (props) => {
  return (
    <header className="header">
    <h2 className="logo">MedTrack</h2>
    <button className="btn btn-warning" 
            onClick={ props.testReducers }
    >test</button>
    <button 
      type="button" 
      className="btn btn-outline-light btn-sm navbutton"
      onClick={ props.toggleForm }  
    >
      { props.showForm ? "Hide": "Show" } Form
    </button>
  </header> 
  )
}

export default Header