import './App.scss'

import React, { useState } from 'react';

import { QueryEngine } from '@comunica/query-sparql';
import * as rdflib from 'rdflib';

import { comunicaQuadToRdflibObject } from './util.js';

import Profile from './components/Profile.jsx';

// TODO: make this a config
const SOURCES = ['https://solid.robbevanherck.be/robbevanherck/profile/card'];
const TARGET = rdflib.sym('https://robbevanherck.be/#me');

function App() {
  const [graph, setGraph] = useState(rdflib.graph());
  const [debugEmptyGraph, setDebugEmptyGraph] = useState(false);

  const engine = new QueryEngine();
  if (!debugEmptyGraph && (!graph || graph.length === 0)) {
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

  if (debugEmptyGraph && (graph && graph.length !== 0)) {
    setGraph(rdflib.graph());
  }

  function getValue(predicates) {
    let value;
    predicates.forEach(predicate => {
        value = value || graph.any(TARGET, predicate);
    })
    return value;
  }

  function createElement(type, predicates, props, childrenfn, defaultValue="Loading...") {
    let value = getValue(predicates);
    return React.createElement(
      type,
      {
        className: value ? undefined : 'loading',
        property: value ? predicates.map(p => p.value).join(' ') : undefined,
        ...props
      },
      childrenfn ? childrenfn(value?.value || defaultValue) : value?.value || defaultValue
    );
  }

  function createImage(predicates, props, defaultValue) {
    const value = getValue(predicates);
    return React.createElement(
      "img",
      {
        className: value ? undefined : 'loading',
        src: value?.value || defaultValue,
        property: value ? predicates.map(p => p.value).join(' ') : undefined,
        ...props
      },
    );
  }

  return (
    <div>
      <input
        id="debugEmptyGraph"
        type="checkbox"
        checked={debugEmptyGraph}
        onChange={e => setDebugEmptyGraph(e.target.checked)}
      />
      <label htmlFor="debugEmptyGraph">(Debug) use empty graph</label>
      <Profile
        createElement={(p, t, s, c, d) => createElement(p, t, s, c, d)}
        createImage={(p, s, d) => createImage(p, s, d)}
        getValue={p => getValue(p)}
        graph={graph}
        user={TARGET}
      />
    </div>
  )
}

export default App
