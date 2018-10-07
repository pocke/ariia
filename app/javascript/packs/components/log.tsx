import * as React from 'react';

interface Props {
  logs: {message: string; ok: boolean}[];
}

interface State {}

export class LogComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4>Logs</h4>
        <pre style={{backgroundColor: 'lightgray'}}>
          {this.props.logs.map(log => (
            <code style={{color: log.ok ? 'black' : 'red'}}>
              {log.message + '\n'}
            </code>
          ))}
        </pre>
      </div>
    );
  }
}
