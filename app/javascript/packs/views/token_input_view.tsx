import * as React from 'react';

import Conn from '../state_connection';
import {post} from '../api_client';

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

  async onSubmit() {
    await post('/access_token', {access_token: this.state.accessToken});
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
