import * as React from 'react';
import Octicon, {Lock, RepoForked} from '@githubprimer/octicons-react';

import {Repository} from '../octotypes';
import {markSubscribe} from '../action_creator/root';
import Store from '../store';

interface Props {
  repo: Repository;
  onClickUnsubscribe: (repo: Repository) => void;
  onClickCancel: (repo: Repository) => void;
}

export class RepositoryRowComponent extends React.Component<Props> {
  private onClickSubscribe() {
    Store.dispatch(markSubscribe(this.props.repo));
  }

  private renderActionButton() {
    const {repo} = this.props;

    switch (repo.extend.action) {
      case 'delete':
      case 'create':
        return (
          <button onClick={() => this.props.onClickCancel(repo)}>Cancel</button>
        );
      case null:
        if (repo.extend.subscribed) {
          return (
            <button onClick={() => this.props.onClickUnsubscribe(repo)}>
              Unsubscribe🚮
            </button>
          );
        } else {
          return (
            <button onClick={() => this.onClickSubscribe()}>Subscribe👀</button>
          );
        }
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
        <td>{this.renderActionButton()}</td>
      </tr>
    );
  }
}
