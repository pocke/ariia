import * as React from 'react';
import Store from '../store';
import {fetchRepositoriesByOrg} from '../action_creator/root';

interface Props {}

interface State {
  name: string;
}

export class FetchRepositoriesComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChangeText(event: any) {
    const text = event.target.value;
    this.setState({name: text});
  }

  async fetchRepositories() {
    Store.dispatch(await fetchRepositoriesByOrg(this.state.name));
  }

  render() {
    return (
      <div>
        <h4>Fetch new repositories</h4>
        <label>
          User or organization name:
          <input
            type="text"
            value={this.state.name}
            onChange={event => this.handleChangeText(event)}
          />
        </label>
        <button onClick={() => this.fetchRepositories()}>Fetch</button>
      </div>
    );
  }
}
