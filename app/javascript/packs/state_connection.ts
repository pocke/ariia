import {Repository} from './octotypes';

export interface Filters {
  owner: string;
  name: string;
  visibility: {
    private: boolean;
    public: boolean;
  };
  fork: {
    fork: boolean;
    notFork: boolean;
  };
}

export interface State {
  accessToken?: string;
  repos?: Repository[];
  filters: Filters;
}

class Conn {
  private f: (a: Partial<State>) => void;
  onSetState(f: (a: Partial<State>) => void) {
    this.f = f;
  }

  setState(state: Partial<State>) {
    this.f(state);
  }
}

export default new Conn();
