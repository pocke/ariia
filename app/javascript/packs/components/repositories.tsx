import * as React from 'react';

import {Repository} from '../octotypes';
import {RepositoryRowComponent} from './repository_row';
import Store from '../store';
import {
  cancelMarkAll,
  markSubscribeAll,
  markUnsubscribeAll,
} from '../action_creator/root';

interface Props {
  repos: Repository[];
}

export class RepositoriesComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private onClickUnsubscribeAll() {
    Store.dispatch(markUnsubscribeAll(this.props.repos));
  }

  private onClickSubscribeAll() {
    Store.dispatch(markSubscribeAll(this.props.repos));
  }

  private onClickCancelAll() {
    Store.dispatch(cancelMarkAll(this.props.repos));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Icon</th>
            <th>Private</th>
            <th>Fork</th>
            <th>name</th>
            <th>
              Actions
              <button onClick={() => this.onClickUnsubscribeAll()}>
                Unsubscribe All
              </button>
              <button onClick={() => this.onClickSubscribeAll()}>
                Subscribe All
              </button>
              <button onClick={() => this.onClickCancelAll()}>
                Cancel All
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.repos.map(repo => (
            <RepositoryRowComponent key={repo.id} repo={repo} />
          ))}
        </tbody>
      </table>
    );
  }
}
