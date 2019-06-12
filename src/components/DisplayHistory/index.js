import React, { Component } from 'react';

class DisplayHistory extends Component {
    
  render() {
    const userID = this.props.uid;
    const currentUserHistory = this.props.history.filter( element => element.userID !== userID );
    const history = currentUserHistory.map((value, entryNo) => {
      const { uid, repetitions, name, date, medKey } = value;

      return (
        <tr key={ entryNo }>
          <td>{ repetitions }</td> 
          <td>{ name }</td>
          <td>{ date }</td>
          <td><button 
            className='btn btn-sm btn-outline-danger'
            onClick={ ()=> this.props.removeLine(uid, medKey, repetitions) }
          > remove 
          </button>
          </td>
        </tr>
      );
    });

    return (
      <table className='table medlist' >
        <thead>
          <tr>
            <th scope='col'>Repetitions</th>
            <th scope='col'>Meditation</th>
            <th scope='col'>Completed On</th>
            <th scope='col'></th>
          </tr>
      </thead>
      <tbody>{ history }</tbody>
      </table>
    )
  }
}

export default DisplayHistory;