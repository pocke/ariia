import * as React from 'react';

import {Filters} from '../app';
import {Repository} from '../octotypes';
import {RepositoriesComponent} from '../components/repositories';
import {FilterSettingComponent} from '../components/filter_setting';
import {FilterComponent} from '../components/filter';
import {FetchRepositoriesComponent} from '../components/fetch_repositories';
import {LogComponent} from '../components/log';
import Store from '../store';
import {
  fetchWatchedRepositories,
  signOut,
  startApplySubscriptions,
  finishApplySubscriptions,
  applySubscription,
} from '../action_creator/root';

interface Props {
  accessToken: string;
  repos?: Repository[];
  filters: Filters;
  logs: {message: string; ok: boolean}[];
}

export class RepositoriesView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    Store.dispatch(await fetchWatchedRepositories());
  }

  async onClickApply() {
    const repos = this.props.repos.filter(repo => repo.extend.action);

    Store.dispatch(await startApplySubscriptions(repos));
    await Promise.all(
      repos.map(async repo => Store.dispatch(await applySubscription(repo))),
    );
    Store.dispatch(await finishApplySubscriptions());
  }

  async onClickSignOut() {
    Store.dispatch(await signOut());
  }

  render() {
    return this.props.repos ? (
      <div>
        <LogComponent logs={this.props.logs} />
        <FetchRepositoriesComponent />
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
