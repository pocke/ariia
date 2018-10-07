import * as React from 'react';

import {TokenInputView} from './views/token_input_view';
import {RepositoriesView} from './views/repositories_view';
import {get} from './api_client';
import {Repository} from './octotypes';
import Store from './store';
import {fetchAccessToken} from './action_creator/root';

interface Props {}

export interface Filters {
  owner: string;
  name: string;
  visibility: {
    private: boolean;
    public: boolean;
  };
  fork: {
    fork: boolean;
    notFork: boolean;
  };
}

export interface State {
  accessToken?: string;
  repos?: Repository[];
  filters: Filters;
  logs: {message: string; ok: boolean}[];
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    Store.onUpdate((state: State) => this.setState(state));
    this.state = {
      filters: {
        owner: '',
        name: '',
        visibility: {
          private: true,
          public: true,
        },
        fork: {
          fork: true,
          notFork: true,
        },
      },
      logs: [],
    };
    Store.setInitialState(this.state);
  }

  async componentDidMount() {
    Store.dispatch(await fetchAccessToken());
  }

  render() {
    const {accessToken} = this.state;
    return (
      <div>
        <h1>ARIIA - GitHub watching repositories manager</h1>
        {accessToken ? (
          <RepositoriesView
            accessToken={accessToken}
            repos={this.state.repos}
            filters={this.state.filters}
            logs={this.state.logs}
          />
        ) : (
          <TokenInputView />
        )}
      </div>
    );
  }
}
