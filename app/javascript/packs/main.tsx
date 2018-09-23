import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';

document.addEventListener('DOMContentLoaded', event =>
  ReactDOM.render(<App />, document.getElementById('app-main')),
);
