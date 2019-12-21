import { shallow } from 'enzyme';
import Layout from './';
import Header from '../Header';
import Navigation from '../Navigation';

describe('Layout', () => {
  const component = shallow(
    <Layout title="Title">
      <div>child</div>
    </Layout>
  );
  it('renders a header', () => {
    const header = component.find(Header);

    expect(header.length).toEqual(1);
    expect(header.prop('title')).toEqual('Title');
  });

  it('renders children', () => {});

  it('renders a navigation', () => {
    const nav = component.find(Navigation);

    expect(nav.length).toEqual(1);
  });
});
