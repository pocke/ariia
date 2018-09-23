import * as React from 'react';

import Conn from '../state_connection';

interface Props {
  accessToken: string;
}

export class Repositories extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Hello, repos</div>;
  }
}
