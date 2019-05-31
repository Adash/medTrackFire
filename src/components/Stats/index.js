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
import { Link } from 'react-router-dom'
import Footer from '../Footer';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'

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
  const [graphDataTwo] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = (callback, target, transformer) => {
    setLoading(`loading ${target}`);
  
    callback().on('value', snapshot => {
      const snapshotObject = snapshot.val();

      if (snapshotObject) {
        //console.log('function in componentDidMount meditations triggered')
        const snapshotList = Object.keys(snapshotObject).map(key => ({
          ...snapshotObject[key],
          uid: key,
        }));
        setGraphData(transformer(snapshotList));
        console.log(snapshotList)
        setLoading(false);
      } else {
        setLoading(`unable to load ${target}`);
      }
    });
  }

  //function componentDidMount() {
  function fetchCurrent() {
    fetch(props.firebase.meditations, 'meditations', transformData);
  }

  function fetchHistory() {
    fetch(props.firebase.history, 'history', transformDataHistory);
    //this.fetch(this.props.firebase.history, 'history');
  }

  function transformData(data) {
    return data.map(currentObject => ({
      name: currentObject.meditationName,
      repetitions: currentObject.repetitions
    }));
  }


  function transformDataHistory(data) {
    return data.map(currentObject => ({
      name: currentObject.name,
      repetitions: currentObject.repetitions
    }));
  }

  // function componentWillUnmount() {
  //   props.firebase.meditations().off();
  //   //this.props.firebase.history().off()
  // }

  return (
    <div className="history_container">
      <h4>Stats Component</h4>
      <Link 
        className="nav-link"
        to={ ROUTES.HOME }>
          Home
      </Link>
      <button 
        className="btn btn-primary"
        onClick={ fetchCurrent }
      >Show current repetitions
      </button>
      <button 
        className="btn btn-secondary"
        onClick={ fetchHistory }
      >Show history
      </button>
      { loading && <p>{loading}</p> }
      <BarChart width={800} height={350} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="repetitions" fill="#8884d8" />
      </BarChart>
      { graphDataTwo === false ? <p>Waiting for additional graph data</p> :
        (<BarChart width={800} height={350} data={graphDataTwo}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="repetitions" fill="#8884d8" />
        </BarChart>)
      }
        <Footer />
    </div>
  )
}

const Stats = withFirebase(StatsBase);

export default Stats;