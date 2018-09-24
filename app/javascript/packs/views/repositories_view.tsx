import * as React from 'react';

import Conn, {Filters} from '../state_connection';
import {get, del, post} from '../api_client';
import {Repository} from '../octotypes';
import {RepositoriesComponent} from '../components/repositories';
import {FilterSettingComponent} from '../components/filter_setting';
import {FilterComponent} from '../components/filter';

interface Props {
  accessToken: string;
  repos?: Repository[];
  filters: Filters;
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

  async onClickSignOut() {
    await del('/access_token');
    Conn.setState({accessToken: null});
  }

  render() {
    return this.props.repos ? (
      <div>
        <FilterSettingComponent filters={this.props.filters} />
        <FilterComponent
          repos={this.props.repos}
          filters={this.props.filters}
          renderChild={repos => <RepositoriesComponent repos={repos} />}
        />

        <button onClick={this.onClickApply.bind(this)}>Apply</button>
        <button onClick={this.onClickSignOut.bind(this)}>Sign Out</button>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}
