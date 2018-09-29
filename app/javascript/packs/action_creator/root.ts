import {get, post, del} from '../api_client';
import {Repository} from '../octotypes';

export const FetchAccessToken = 'root.FetchAccessToken';
export const UpdateAccessToken = 'root.UpdateAccessToken';
export const SignOut = 'root.SignOut';

export const FetchWatchedRepositories = 'root.FetchWatchedRepositories';
export const FetchRepositoriesByOrg = 'root.FetchRepositoriesByOrg';

export const ApplySubscriptions = 'root.ApplySubscriptions';

export const MarkUnsubscribe = 'root.MarkUnsubscribe';
export const MarkSubscribe = 'root.MarkSubscribe';
export const CancelMark = 'root.CancelMark';
export const MarkUnsubscribeAll = 'root.MarkUnsubscribeAll';
export const MarkSubscribeAll = 'root.MarkSubscribeAll';
export const CancelMarkAll = 'root.CancelAll';

export const UpdateTextFilter = 'root.UpdateTextFilter';
export const UpdateVisibilityFilter = 'root.UpdateVisibilityFilter';
export const UpdateForkFilter = 'root.UpdateForkFilter';

interface FetchAccessTokenT {
  type: typeof FetchAccessToken;
  accessToken: string | null;
}

interface UpdateAccessTokenT {
  type: typeof UpdateAccessToken;
  accessToken: string | null;
}

interface SignOutT {
  type: typeof SignOut;
}

interface FetchWatchedRepositoriesT {
  type: typeof FetchWatchedRepositories;
  repos: Repository[];
}

interface FetchRepositoriesByOrgT {
  type: typeof FetchRepositoriesByOrg;
  repos: Repository[];
}

interface ApplySubscriptionsT {
  type: typeof ApplySubscriptions;
  repos: Repository[];
}

interface MarkUnsubscribeT {
  type: typeof MarkUnsubscribe;
  repo: Repository;
}

interface MarkSubscribeT {
  type: typeof MarkSubscribe;
  repo: Repository;
}

interface CancelMarkT {
  type: typeof CancelMark;
  repo: Repository;
}

interface MarkUnsubscribeAllT {
  type: typeof MarkUnsubscribeAll;
  repos: Repository[];
}

interface MarkSubscribeAllT {
  type: typeof MarkSubscribeAll;
  repos: Repository[];
}

interface CancelMarkAllT {
  type: typeof CancelMarkAll;
  repos: Repository[];
}

interface UpdateTextFilterT {
  type: typeof UpdateTextFilter;
  key: string;
  value: string;
}

interface UpdateVisibilityFilterT {
  type: typeof UpdateVisibilityFilter;
  key: 'private' | 'public';
  value: boolean;
}

interface UpdateForkFilterT {
  type: typeof UpdateForkFilter;
  key: 'fork' | 'noFork';
  value: boolean;
}

export type ActionTypes =
  | FetchAccessTokenT
  | UpdateAccessTokenT
  | FetchWatchedRepositoriesT
  | FetchRepositoriesByOrgT
  | SignOutT
  | ApplySubscriptionsT
  | MarkUnsubscribeT
  | MarkSubscribeT
  | CancelMarkT
  | MarkUnsubscribeAllT
  | MarkSubscribeAllT
  | CancelMarkAllT
  | UpdateTextFilterT
  | UpdateVisibilityFilterT
  | UpdateForkFilterT;

export const fetchAccessToken = async () => {
  const resp = await get('/access_token');
  const accessToken = (await resp.json()).access_token as string | null;
  return {
    type: FetchAccessToken,
    accessToken,
  };
};

export const updateAccessToken = async (accessToken: string) => {
  await post('/access_token', {access_token: accessToken});
  return {
    type: UpdateAccessToken,
    accessToken,
  };
};

export const signOut = async () => {
  await del('/access_token');
  return {
    type: SignOut,
  };
};

export const fetchWatchedRepositories = async () => {
  const resp = await get('/watched_repositories');
  const repos = await resp.json();
  return {
    type: FetchWatchedRepositories,
    repos,
  };
};

export const fetchRepositoriesByOrg = async (name: string) => {
  const resp = await get(`/repositories?user_or_org_name=${name}`);
  const repos = await resp.json();
  return {
    type: FetchRepositoriesByOrg,
    repos,
  };
};

export const applySubscriptions = async (repos: Repository[]) => {
  const reqs = repos
    .filter(repo => repo.extend.action)
    .map(
      repo =>
        repo.extend.action === 'delete'
          ? del(`/watched_repositories/${repo.id}`)
          : post(`/watched_repositories?id=${repo.id}`),
    );
  await Promise.all(reqs);
  return {
    type: ApplySubscriptions,
    repos,
  };
};

export const markUnsubscribe = (repo: Repository) => {
  return {
    type: MarkUnsubscribe,
    repo,
  };
};

export const markSubscribe = (repo: Repository) => {
  return {
    type: MarkSubscribe,
    repo,
  };
};

export const cancelMark = (repo: Repository) => {
  return {
    type: CancelMark,
    repo,
  };
};

export const markUnsubscribeAll = (repos: Repository[]) => {
  return {
    type: MarkUnsubscribeAll,
    repos,
  };
};

export const markSubscribeAll = (repos: Repository[]) => {
  return {
    type: MarkSubscribeAll,
    repos,
  };
};

export const cancelMarkAll = (repos: Repository[]) => {
  return {
    type: CancelMarkAll,
    repos,
  };
};

export const updateTextFilter = (key: string, value: string) => {
  return {
    type: UpdateTextFilter,
    key,
    value,
  };
};

export const updateVisibilityFilter = (
  key: 'private' | 'public',
  value: boolean,
) => {
  return {
    type: UpdateVisibilityFilter,
    key,
    value,
  };
};

export const updateForkFilter = (key: 'fork' | 'noFork', value: boolean) => {
  return {
    type: UpdateForkFilter,
    key,
    value,
  };
};
