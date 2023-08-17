import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import NavBar from '../components/navbar/NavBar';

describe('NavBar Component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Router><NavBar /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
