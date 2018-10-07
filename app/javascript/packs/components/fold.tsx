import * as React from 'react';

interface Props {
  initialFolding: boolean;
  header: string;
  renderBody: () => React.ReactNode;
}

interface State {
  folding: boolean;
}

export class FoldComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {folding: props.initialFolding};
  }

  toggleFold() {
    this.setState({folding: !this.state.folding});
  }

  renderHeader() {
    return (
      <h3>
        <span onClick={() => this.toggleFold()} style={{cursor: 'pointer'}}>
          {this.state.folding ? '▶' : '▼'} {this.props.header}
        </span>
      </h3>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.state.folding ? null : this.props.renderBody()}
        <hr />
      </div>
    );
  }
}
