import * as React from 'react';

import {updateAccessToken} from '../action_creator/root';
import Store from '../store';

interface Props {}
interface State {
  accessToken?: string;
  valid: boolean;
}

export class TokenInputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {valid: false};
  }

  onChangeText(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const valid = target.validity.valid;
    this.setState({accessToken: target.value, valid});
  }

  async onSubmit() {
    Store.dispatch(await updateAccessToken(this.state.accessToken));
  }

  render() {
    return (
      <div>
        <h3>Sign in to ARIIA</h3>
        Enter your parsonal access token on GitHub
        <br />
        <input
          type="text"
          onChange={this.onChangeText.bind(this)}
          required
          pattern="[0-9a-f]{40}"
          minLength={40}
          maxLength={40}
        />
        <button onClick={this.onSubmit.bind(this)} disabled={!this.state.valid}>
          Sign In
        </button>
      </div>
    );
  }
}
