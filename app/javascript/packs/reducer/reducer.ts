import {State} from '../app';
import {
  ActionTypes,
  FetchAccessToken,
  UpdateAccessToken,
  FetchWatchedRepositories,
  FetchRepositoriesByOrg,
  SignOut,
  ApplySubscriptions,
  MarkUnsubscribe,
  MarkSubscribe,
  CancelMark,
  MarkUnsubscribeAll,
  UpdateTextFilter,
  UpdateVisibilityFilter,
  UpdateForkFilter,
} from '../action_creator/root';

export default (currentState: State, action: ActionTypes): State => {
  switch (action.type) {
    case FetchAccessToken:
    case UpdateAccessToken:
      return {...currentState, accessToken: action.accessToken};
    case SignOut:
      return {...currentState, accessToken: null};
    case FetchWatchedRepositories:
      return {...currentState, repos: action.repos};
    case FetchRepositoriesByOrg: {
      const currentRepos = currentState.repos;
      const newRepos = action.repos
        .map(repo => (currentRepos.find(r => r.id === repo.id) ? null : repo))
        .filter(repo => repo);
      const repos = currentState.repos.concat(newRepos);
      return {...currentState, repos};
    }
    case ApplySubscriptions:
      return currentState;
    case MarkUnsubscribe: {
      const newRepo = {
        ...action.repo,
        extend: {
          ...action.repo.extend,
          action: 'delete' as 'delete',
        },
      };

      const repos = [...(currentState.repos || [])].map(
        repo => (repo.id == newRepo.id ? newRepo : repo),
      );
      return {...currentState, repos};
    }
    case MarkSubscribe: {
      const newRepo = {
        ...action.repo,
        extend: {
          ...action.repo.extend,
          action: 'create' as 'create',
        },
      };

      const repos = [...(currentState.repos || [])].map(
        repo => (repo.id == newRepo.id ? newRepo : repo),
      );
      return {...currentState, repos};
    }
    case CancelMark: {
      const newRepo = {
        ...action.repo,
        extend: {
          ...action.repo.extend,
          action: null as null,
        },
      };

      const repos = [...(currentState.repos || [])].map(
        repo => (repo.id == newRepo.id ? newRepo : repo),
      );
      return {...currentState, repos};
    }
    case MarkUnsubscribeAll: {
      const unsubscribeRepoIDs = action.repos.map(repo => repo.id);
      const repos = currentState.repos.map(
        repo =>
          unsubscribeRepoIDs.includes(repo.id)
            ? {...repo, extend: {...repo.extend, action: 'delete' as 'delete'}}
            : repo,
      );
      return {...currentState, repos};
    }
    case UpdateTextFilter: {
      const newFilters = {
        ...currentState.filters,
        [action.key]: action.value,
      };
      return {...currentState, filters: newFilters};
    }
    case UpdateVisibilityFilter: {
      const newFilters = {
        ...currentState.filters,
        visibility: {
          ...currentState.filters.visibility,
          [action.key]: action.value,
        },
      };
      return {...currentState, filters: newFilters};
    }
    case UpdateForkFilter: {
      const newFilters = {
        ...currentState.filters,
        fork: {
          ...currentState.filters.fork,
          [action.key]: action.value,
        },
      };
      return {...currentState, filters: newFilters};
    }
  }
};
