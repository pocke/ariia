import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <div>Hello!</div>;
  }
}

document.addEventListener('DOMContentLoaded', event =>
  ReactDOM.render(<App />, document.getElementById('app-main')),
);
