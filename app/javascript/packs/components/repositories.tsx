import * as React from 'react';
import {Repository} from '../octotypes';

interface Props {
  repos: Repository[];
}

export class RepositoriesComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.props.repos.map(repo => <div key={repo.id}>{repo.name}</div>);
  }
}
