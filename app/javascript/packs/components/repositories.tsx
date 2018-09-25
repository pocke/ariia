import * as React from 'react';

import {Repository} from '../octotypes';
import {RepositoryRowComponent} from './repository_row';
import Store from '../store';
import {markUnsubscribe, cancelMark} from '../action_creator/root';

interface Props {
  repos: Repository[];
}

export class RepositoriesComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private onClickUnsubscribe(repo: Repository) {
    Store.dispatch(markUnsubscribe(repo));
  }

  private onClickCancel(repo: Repository) {
    Store.dispatch(cancelMark(repo));
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repos.map(repo => (
            <RepositoryRowComponent
              key={repo.id}
              repo={repo}
              onClickUnsubscribe={(repo: Repository) =>
                this.onClickUnsubscribe(repo)
              }
              onClickCancel={(repo: Repository) => this.onClickCancel(repo)}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
