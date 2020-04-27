import { shallow } from 'enzyme';
import Layout from '.';
import Header from '../Header';
import Navigation from '../Navigation';

describe('Layout', () => {
  const component = shallow(
    <Layout title="Title">
      <div className="child">child</div>
    </Layout>
  );
  it('renders a header', () => {
    const header = component.find(Header);

    expect(header).toHaveLength(1);
    expect(header.prop('title')).toEqual('Title');
  });

  it('renders children', () => {
    const child = component.find('.child');

    expect(child).toHaveLength(1);
    expect(child.text()).toEqual('child');
  });

  it('renders a navigation', () => {
    const nav = component.find(Navigation);

    expect(nav).toHaveLength(1);
  });
});
