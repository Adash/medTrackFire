import React, { useState } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

import Header from '../Header';
import Footer from '../Footer';
import { withFirebase } from '../Firebase';

const INITIAL_GRAPH_DATA = [
  {
    name: "a",
    repetitions: 0,
  },
  {
    name: "b",
    repetitions: 0,
  },
]

const StatsBase = (props) => {
  const [graphData, setGraphData] = useState(INITIAL_GRAPH_DATA);

  fetch = (callback, target) => {
    const loadingLabel = `loading${target}`
    //this.setState({[loadingLabel]: true});
  
    callback().on('value', snapshot => {
      const snapshotObject = snapshot.val();

      if (snapshotObject) {
        //console.log('function in componentDidMount meditations triggered')
        const snapshotList = Object.keys(snapshotObject).map(key => ({
          ...snapshotObject[key],
          uid: key,
        }));
        setGraphData(transformData(snapshotList));
        //this.setState({[loadingLabel]: false});
      } else {
        //this.setState({[loadingLabel]: false});
      }
    });
  }

  //function componentDidMount() {
  function fetchData() {
    fetch(props.firebase.meditations, 'meditations');
    //this.fetch(this.props.firebase.history, 'history');
  }

  function readData() {
    console.log(graphData);
  }

  function transformData(data) {
    return data.map(currentObject => ({
      name: currentObject.meditationName,
      repetitions: currentObject.repetitions
    }));
  }

  function componentWillUnmount() {
    props.firebase.meditations().off();
    //this.props.firebase.history().off()
  }

  return (
    <>
      <h4>Stats Component</h4>
      <button 
        className="btn btn-primary"
        onClick={ fetchData }
      >Fetch Data
      </button>
      <button 
        className="btn btn-secondary"
        onClick={ readData }
      >read Data
      </button>
      <BarChart width={800} height={350} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="repetitions" fill="#8884d8" />
      </BarChart>
    </>
  )
}

const Stats = withFirebase(StatsBase);

export default Stats;