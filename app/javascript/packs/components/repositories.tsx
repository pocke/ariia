import * as React from 'react';

import {Repository} from '../octotypes';
import Conn from '../state_connection';

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

  private renderActionButton(repo: Repository) {
    switch (repo.extend.action) {
      case 'delete':
      case 'create':
        return (
          <button onClick={this.onClickCancel.bind(this, repo)}>Cancel</button>
        );
      case null:
        return (
          <button onClick={this.onClickUnsubscribe.bind(this, repo)}>
            Unsubscribe
          </button>
        );
      default:
        throw `Unexpected value: ${repo.extend.action}`;
    }
  }

  private renderActionStatus(repo: Repository) {
    switch (repo.extend.action) {
      case 'delete':
        return '🚮';
      case 'create':
        return '👀';
      case null:
        return null;
      default:
        throw `Unexpected value: ${repo.extend.action}`;
    }
  }

  render() {
    return this.props.repos.map(repo => (
      <div key={repo.id}>
        <img
          src={repo.owner.avatar_url}
          alt={`avatar for ${repo.owner.login}`}
          style={{width: '1em', height: '1em'}}
        />
        <a href={repo.html_url} target="_blank">
          {repo.full_name}
        </a>
        {this.renderActionButton(repo)}
        {this.renderActionStatus(repo)}
      </div>
    ));
  }
}
