import './App.scss'

import React, { useState } from 'react';

import * as rdflib from 'rdflib';

import { login, handleIncomingRedirect, fetch as authFetch, getDefaultSession } from "@inrupt/solid-client-authn-browser";

import Profile from './components/Profile.jsx';
import SideBar from './components/SideBar.jsx';

// TODO: make this a config
const SOURCES = [
  'https://solid.robbevanherck.be/robbevanherck/profile/card-private',
  'https://solid.robbevanherck.be/robbevanherck/profile/card',
];
const TARGET = rdflib.sym('https://robbevanherck.be#me');

function doLogin(solidUri) {
  login({
    oidcIssuer: solidUri,
    redirectUrl: window.location.href,
    clientName: "My CV"
  });
}

function App() {
  const [graph, setGraph] = useState(rdflib.graph());

  handleIncomingRedirect().then(() => {
    if (graph.length === 0) {
      const newGraph = rdflib.graph();
      const fetcher = new rdflib.Fetcher(newGraph, {
        fetch: authFetch
      });

      Promise.all(SOURCES.map((source) => {
        return fetcher.load(source).catch((e) => {
          console.error("Could not fetch ", source);
        });
      })).then(() => {
        setGraph(newGraph);
      });
    }
  })

  return [
    <SideBar
      key={1}
      login={(uri) => {
        doLogin(uri)
      }}
    />,
    <Profile
      graph={graph}
      user={TARGET}
      key={2}
    />
  ]
}

export default App
