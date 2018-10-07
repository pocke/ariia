import {State} from '../app';
import {
  ActionTypes,
  FetchAccessToken,
  UpdateAccessToken,
  FetchWatchedRepositories,
  FetchRepositoriesByOrg,
  SignOut,
  ApplySubscription,
  StartApplySubscriptions,
  FinishApplySubscriptions,
  MarkUnsubscribe,
  MarkSubscribe,
  CancelMark,
  MarkUnsubscribeAll,
  MarkSubscribeAll,
  CancelMarkAll,
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
    case ApplySubscription: {
      const message = `[${
        action.ok ? 'SUCCESS' : `FAILED: ${action.status}`
      }] Make ${action.repo.full_name} ${
        action.repo.extend.action === 'delete' ? 'unsubscribe' : 'subscribe'
      }`;
      const ok = action.ok;
      return {
        ...currentState,
        logs: [...currentState.logs, {message, ok}],
      };
    }

    case StartApplySubscriptions: {
      const message = `Start applying ${action.count} subscriptions`;
      return {
        ...currentState,
        logs: [...currentState.logs, {message, ok: true}],
      };
    }
    case FinishApplySubscriptions: {
      const message = `Finish applying subscriptions`;
      return {
        ...currentState,
        logs: [...currentState.logs, {message, ok: true}],
      };
    }
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
      const unsubscribeRepoIDs = action.repos
        .filter(repo => repo.extend.subscribed)
        .map(repo => repo.id);
      const repos = currentState.repos.map(
        repo =>
          unsubscribeRepoIDs.includes(repo.id)
            ? {...repo, extend: {...repo.extend, action: 'delete' as 'delete'}}
            : repo,
      );
      return {...currentState, repos};
    }
    case MarkSubscribeAll: {
      const subscribeRepoIDs = action.repos
        .filter(repo => !repo.extend.subscribed)
        .map(repo => repo.id);
      const repos = currentState.repos.map(
        repo =>
          subscribeRepoIDs.includes(repo.id)
            ? {...repo, extend: {...repo.extend, action: 'create' as 'create'}}
            : repo,
      );
      return {...currentState, repos};
    }
    case CancelMarkAll: {
      const unsubscribeRepoIDs = action.repos.map(repo => repo.id);
      const repos = currentState.repos.map(
        repo =>
          unsubscribeRepoIDs.includes(repo.id)
            ? {...repo, extend: {...repo.extend, action: null as null}}
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
