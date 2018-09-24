import * as React from 'react';

import {Repository} from '../octotypes';
import Conn from '../state_connection';
import {RepositoryRowComponent} from './repository_row';

interface Props {
  repos: Repository[];
}

export class RepositoriesComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private onClickUnsubscribe(repo: Repository) {
    const newRepo = {
      ...repo,
      extend: {
        ...repo.extend,
        action: 'delete' as 'delete', // Type hack
      },
    };

    const repos = [...this.props.repos].map(
      repo => (repo.id == newRepo.id ? newRepo : repo),
    );
    Conn.setState({repos});
  }

  private onClickCancel(repo: Repository) {
    const newRepo = {
      ...repo,
      extend: {
        ...repo.extend,
        action: null as null, // Type hack
      },
    };

    const repos = [...this.props.repos].map(
      repo => (repo.id == newRepo.id ? newRepo : repo),
    );
    Conn.setState({repos});
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
