import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
import CategoryFeed from './components/forum/CategoryFeed';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Fake', () => {
  expect(true).toBeTruthy();
});
