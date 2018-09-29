import * as React from 'react';

import {Repository} from '../octotypes';
import {
  markSubscribe,
  markUnsubscribe,
  cancelMark,
} from '../action_creator/root';
import Store from '../store';

interface Props {
  repo: Repository;
}

export class RepositoryActionButtonComponent extends React.Component<Props> {
  private onClickSubscribe() {
    Store.dispatch(markSubscribe(this.props.repo));
  }

  private onClickUnsubscribe(repo: Repository) {
    Store.dispatch(markUnsubscribe(repo));
  }

  private onClickCancel(repo: Repository) {
    Store.dispatch(cancelMark(repo));
  }

  render() {
    const {repo} = this.props;

    switch (repo.extend.action) {
      case 'delete':
      case 'create':
        return <button onClick={() => this.onClickCancel(repo)}>Cancel</button>;
      case null:
        if (repo.extend.subscribed) {
          return (
            <button onClick={() => this.onClickUnsubscribe(repo)}>
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
}
