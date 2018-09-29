import * as React from 'react';

import Octicon, {Lock, RepoForked} from '@githubprimer/octicons-react';
import {RepositoryActionButtonComponent} from './repository_action_button';

import {Repository} from '../octotypes';

interface Props {
  repo: Repository;
}

export class RepositoryRowComponent extends React.Component<Props> {
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
      <tr
        key={repo.id}
        style={{
          backgroundColor: repo.extend.subscribed ? 'white' : 'lightgray',
        }}>
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
        <td>
          <RepositoryActionButtonComponent repo={repo} />
        </td>
      </tr>
    );
  }
}
