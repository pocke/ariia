import * as React from 'react';

import Conn from '../state_connection';
import {get, del, post} from '../api_client';
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

  async onClickApply() {
    const reqs = this.props.repos
      .filter(repo => repo.extend.action)
      .map(
        repo =>
          repo.extend.action === 'delete'
            ? del(`/watched_repositories/${repo.id}`)
            : post(`/watched_repositories/${repo.id}`),
      );
    await Promise.all(reqs);
  }

  render() {
    return this.props.repos ? (
      <div>
        <RepositoriesComponent repos={this.props.repos} />
        <button onClick={this.onClickApply.bind(this)}>Apply</button>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}
