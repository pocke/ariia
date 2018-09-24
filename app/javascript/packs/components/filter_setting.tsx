import * as React from 'react';
import Conn, {Filters} from '../state_connection';

interface Props {
  filters: Filters;
}

export class FilterSettingComponent extends React.Component<Props> {
  private handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newFilters = {
      ...this.props.filters,
      [name]: value,
    };
    Conn.setState({
      filters: newFilters,
    });
  }

  private handleChangeCheckbox(event: any) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name.split('.');

    const newFilters = {
      ...this.props.filters,
      [name[0]]: {
        ...(this.props.filters as any)[name[0]],
        [name[1]]: checked,
      },
    };
    Conn.setState({
      filters: newFilters,
    });
  }

  render() {
    return (
      <div>
        <h3>Filters</h3>

        <h4>Visibility</h4>
        <label>
          Private
          <input
            type="checkbox"
            name="visibility.private"
            checked={this.props.filters.visibility.private}
            onChange={(event: any) => this.handleChangeCheckbox(event)}
          />
        </label>
        <label>
          Public
          <input
            type="checkbox"
            name="visibility.public"
            checked={this.props.filters.visibility.public}
            onChange={(event: any) => this.handleChangeCheckbox(event)}
          />
        </label>

        <h4>Fork</h4>
        <label>
          Fork
          <input
            type="checkbox"
            name="fork.fork"
            checked={this.props.filters.fork.fork}
            onChange={(event: any) => this.handleChangeCheckbox(event)}
          />
        </label>
        <label>
          Not fork
          <input
            type="checkbox"
            name="fork.notFork"
            checked={this.props.filters.fork.notFork}
            onChange={(event: any) => this.handleChangeCheckbox(event)}
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
