export interface State {
  accessToken?: string;
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
