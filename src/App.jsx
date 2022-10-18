import './App.css'

import React, { useState } from 'react';

import { QueryEngine } from '@comunica/query-sparql';
import * as rdflib from 'rdflib';

import { comunicaQuadToRdflibObject } from './util.js';

// TODO: make this a config
const SOURCE = 'https://solid.robbevanherck.be/robbevanherck/profile/card#me';

function App() {
  const [graph, setGraph] = useState(null);

  const engine = new QueryEngine();
  if (!graph) {
    engine.queryQuads(`
      CONSTRUCT WHERE {
        ?s ?p ?o
      }`, {
        sources: [SOURCE],
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
      {!graph && <p>Loading...</p>}
      {graph && <p>Loaded!</p>}
    </div>
  )
}

export default App