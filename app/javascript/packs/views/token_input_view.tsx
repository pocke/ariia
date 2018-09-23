import * as React from 'react';

import Conn from '../state_connection';

interface Props {}
interface State {
  accessToken?: string;
}

export class TokenInputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onChangeText(event: any) {
    this.setState({accessToken: event.target.value});
  }

  onSubmit() {
    Conn.setState({accessToken: this.state.accessToken});
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.onChangeText.bind(this)} />
        <button onClick={this.onSubmit.bind(this)}>Submit</button>
      </div>
    );
  }
}
