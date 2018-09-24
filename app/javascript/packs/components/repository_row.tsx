import * as React from 'react';
import Octicon, {Lock, RepoForked} from '@githubprimer/octicons-react';

import {Repository} from '../octotypes';

interface Props {
  repo: Repository;
  onClickUnsubscribe: (repo: Repository) => void;
  onClickCancel: (repo: Repository) => void;
}

export class RepositoryRowComponent extends React.Component<Props> {
  private renderActionButton() {
    const {repo} = this.props;

    switch (repo.extend.action) {
      case 'delete':
      case 'create':
        return (
          <button onClick={() => this.props.onClickCancel(repo)}>Cancel</button>
        );
      case null:
        return (
          <button onClick={() => this.props.onClickUnsubscribe(repo)}>
            Unsubscribe
          </button>
        );
      default:
        throw `Unexpected value: ${repo.extend.action}`;
    }
  }

  private renderActionStatus() {
    const {repo} = this.props;

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
    const {repo} = this.props;
    return (
      <tr key={repo.id}>
        <td>{this.renderActionStatus()}</td>
        <td>
          <img
            src={repo.owner.avatar_url}
            alt={`avatar for ${repo.owner.login}`}
            style={{width: '1em', height: '1em'}}
          />
        </td>
        <td>{repo.private ? <Octicon icon={Lock} /> : null}</td>
        <td>{repo.fork ? <Octicon icon={RepoForked} /> : null}</td>
        <td>
          <a href={repo.html_url} target="_blank">
            {repo.full_name}
          </a>
        </td>
        <td>{this.renderActionButton()}</td>
      </tr>
    );
  }
}
