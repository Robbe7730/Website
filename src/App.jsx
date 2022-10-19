import './App.scss'

import React, { useState } from 'react';

import { QueryEngine } from '@comunica/query-sparql';
import * as rdflib from 'rdflib';

import { comunicaQuadToRdflibObject } from './util.js';

import Profile from './components/Profile.jsx';

// TODO: make this a config
const SOURCES = [
  'https://solid.robbevanherck.be/robbevanherck/profile/card',
];
const TARGET = rdflib.sym('https://robbevanherck.be/#me');

function App() {
  const [graph, setGraph] = useState(rdflib.graph());

  const engine = new QueryEngine();
  if (!graph || graph.length === 0) {
    engine.queryQuads(`
      CONSTRUCT WHERE {
        ?s ?p ?o
      }`, {
        sources: SOURCES,
      }).then(
        bindingStream => bindingStream.toArray()
      ).then(
        bindings => {
          const store = rdflib.graph();
          bindings.forEach(binding => {
            store.add(comunicaQuadToRdflibObject(binding));
          });
          return store;
        }
      ).then(setGraph);
  }

  return (
    <div>
      <Profile
        graph={graph}
        user={TARGET}
      />
    </div>
  )
}

export default App
