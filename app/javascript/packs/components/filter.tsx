import * as React from 'react';
import {Repository} from '../octotypes';
import {Filters} from '../app';

interface Props {
  repos: Repository[];
  renderChild: (repos: Repository[]) => React.ReactNode;
  filters: Filters;
}

export class FilterComponent extends React.Component<Props> {
  private filteredRepos() {
    const {filters} = this.props;
    return this.props.repos.filter(
      repo =>
        ((repo.private && filters.visibility.private) ||
          (!repo.private && filters.visibility.public)) &&
        ((repo.fork && filters.fork.fork) ||
          (!repo.fork && filters.fork.notFork)) &&
        (filters.owner.length === 0 ||
          repo.owner.login.includes(filters.owner)) &&
        (filters.name.length === 0 || repo.name.includes(filters.name)),
    );
  }

  render() {
    return this.props.renderChild(this.filteredRepos());
  }
}
