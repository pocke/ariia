import * as React from 'react';

import {Filters} from '../app';
import Store from '../store';
import {
  updateTextFilter,
  updateForkFilter,
  updateVisibilityFilter,
} from '../action_creator/root';

interface Props {
  filters: Filters;
}

export class FilterSettingComponent extends React.Component<Props> {
  private handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    Store.dispatch(updateTextFilter(name, value));
  }

  private handleChangeVisibility(event: any) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    Store.dispatch(updateVisibilityFilter(name, checked));
  }

  private handleChangeFork(event: any) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    Store.dispatch(updateForkFilter(name, checked));
  }

  render() {
    return (
      <div>
        <h4>Visibility</h4>
        <label>
          Private
          <input
            type="checkbox"
            name="private"
            checked={this.props.filters.visibility.private}
            onChange={(event: any) => this.handleChangeVisibility(event)}
          />
        </label>
        <label>
          Public
          <input
            type="checkbox"
            name="public"
            checked={this.props.filters.visibility.public}
            onChange={(event: any) => this.handleChangeVisibility(event)}
          />
        </label>

        <h4>Fork</h4>
        <label>
          Fork
          <input
            type="checkbox"
            name="fork"
            checked={this.props.filters.fork.fork}
            onChange={(event: any) => this.handleChangeFork(event)}
          />
        </label>
        <label>
          Not fork
          <input
            type="checkbox"
            name="notFork"
            checked={this.props.filters.fork.notFork}
            onChange={(event: any) => this.handleChangeFork(event)}
          />
        </label>

        <h4>Repository Name</h4>
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            onChange={(event: any) => this.handleChange(event)}
            value={this.props.filters.owner}
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(event: any) => this.handleChange(event)}
            value={this.props.filters.name}
          />
        </label>
      </div>
    );
  }
}
