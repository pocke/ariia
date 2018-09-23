import * as React from 'react';

import {TokenInputView} from './views/token_input_view';
import {RepositoriesView} from './views/repositories_view';
import Conn, {State} from './state_connection';

interface Props {}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    Conn.onSetState(this.setState.bind(this));

    this.state = {
      accessToken: null,
    };
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
