import Teleprompter from '../components/Teleprompter/index';
import { Provider } from 'react-redux';
import store from '../store/store';
import StartBubble from '../components/StartBubble';

export default function Home() {
  return (
    <Provider store={store}>
      <Teleprompter></Teleprompter>
    </Provider>
  );
}
