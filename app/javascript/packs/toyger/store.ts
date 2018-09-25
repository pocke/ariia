export interface Action {
  type: string;
}

export class Store<T> {
  constructor(
    private state: T,
    private reducer: (currentState: T, action: Action) => T,
    private onUpdateCallback: ((newState: T) => void),
  ) {
    this.onUpdateCallback(this.state);
  }

  dispatch(action: Action) {
    const newState = this.reducer(this.state, action);
    this.onUpdateCallback(newState);
  }
}
