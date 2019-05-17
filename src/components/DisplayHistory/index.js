import React, { Component } from 'react';

class DisplayHistory extends Component {
    
  render() {
    const history = this.props.history.map((value, entryNo) => {
      const { repetitions, name, date, medKey } = value;

      return (
        <tr key={ entryNo }>
          <td>{ repetitions }</td> 
          <td>{ name }</td>
          <td>{ date }</td>
          <td><button 
            className='btn btn-sm btn-outline-danger'
            onClick={ ()=> this.props.removeLine( entryNo, medKey, repetitions ) }
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