import * as React from 'react';

import Conn from '../state_connection';
import {get} from '../api_client';
import {Repository} from '../octotypes';
import {RepositoriesComponent} from '../components/repositories';

interface Props {
  accessToken: string;
  repos?: Repository[];
}

export class RepositoriesView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const resp = await get('/watched_repositories');
    const repos = await resp.json();
    Conn.setState({repos});
  }

  render() {
    return this.props.repos ? (
      <RepositoriesComponent repos={this.props.repos} />
    ) : (
      <div>loading...</div>
    );
  }
}
