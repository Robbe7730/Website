import './App.scss'

import React, { useState } from 'react';

import * as rdflib from 'rdflib';

// import {  } from "@inrupt/solid-client";

import { comunicaQuadToRdflibObject } from './util.js';

import Profile from './components/Profile.jsx';

// TODO: make this a config
const SOURCES = [
  'https://solid.robbevanherck.be/robbevanherck/profile/card',
  'https://solid.robbevanherck.be/robbevanherck/profile/card-private',
];
const TARGET = rdflib.sym('https://robbevanherck.be#me');

function App() {
  const [loading, setLoading] = useState(false);
  const [graph, setGraph] = useState(rdflib.graph());

  if (!loading) {
    setLoading(true);
    const newGraph = rdflib.graph();
    const fetcher = new rdflib.Fetcher(newGraph, {});
    SOURCES.forEach((source) => {
      fetcher.nowOrWhenFetched(source, (ok, body, response) => {
        if (ok) {
          console.log('fetched', source);
          setGraph(newGraph);
        }
      });
    });
  }

  return (
    <Profile
      graph={graph}
      user={TARGET}
    />
  )
}

export default App
