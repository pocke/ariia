import * as React from 'react';

import {TokenInputView} from './views/token_input_view';
import {RepositoriesView} from './views/repositories_view';
import Conn, {State} from './state_connection';
import {get} from './api_client';

interface Props {}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    Conn.onSetState(this.setState.bind(this));

    this.state = {};
  }

  async componentDidMount() {
    const resp = await get('/access_token');
    const {access_token} = await resp.json();
    if (access_token) {
      this.setState({accessToken: access_token});
    }
  }

  render() {
    const {accessToken} = this.state;
    return accessToken ? (
      <RepositoriesView accessToken={accessToken} repos={this.state.repos} />
    ) : (
      <TokenInputView />
    );
  }
}
