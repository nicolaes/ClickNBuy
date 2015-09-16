jest.dontMock('../home');

const React = require('react/addons');
const Home = require('../home');
const TestUtils = React.addons.TestUtils;

describe('Home', function() {
  let home = null;

  beforeEach(function() {
    home = TestUtils.renderIntoDocument(<Home/>);
  });

  it('Has the title ClickNBuy', function() {
    expect(React.findDOMNode(home).textContent).toContain('ClickNBuy');
  });
});
