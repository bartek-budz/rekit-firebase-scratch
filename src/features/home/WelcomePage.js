import React from 'react';
import { ExamplesList } from '../demo';

export default function WelcomePage() {
  return (
    <div className="home-welcome-page">
      <header className="app-header">
        <img src={require('../../images/rekit-react.png')} className="rekit-logo" alt="logo" />
        <h1 className="app-title">Welcome to Rekit React + Firebase</h1>
      </header>
      <div className="app-intro">
        <ExamplesList />
      </div>
    </div>
  );
}
