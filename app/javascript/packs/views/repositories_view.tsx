import * as React from 'react';

import {Filters} from '../app';
import {Repository} from '../octotypes';
import {RepositoriesComponent} from '../components/repositories';
import {FilterSettingComponent} from '../components/filter_setting';
import {FilterComponent} from '../components/filter';
import {FetchRepositoriesComponent} from '../components/fetch_repositories';
import Store from '../store';
import {
  fetchWatchedRepositories,
  signOut,
  applySubscriptions,
} from '../action_creator/root';

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
    Store.dispatch(await fetchWatchedRepositories());
  }

  async onClickApply() {
    Store.dispatch(await applySubscriptions(this.props.repos));
  }

  async onClickSignOut() {
    Store.dispatch(await signOut());
  }

  render() {
    return this.props.repos ? (
      <div>
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
