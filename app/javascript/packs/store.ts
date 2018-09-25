import {Store} from './toyger/store';
import {State} from './app';
import reducer from './reducer/reducer';

export default new Store<State>(reducer);
