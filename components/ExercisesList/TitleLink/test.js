import Link from 'next/link';
import { shallow } from 'enzyme';
import TitleLink from './';
import { Title } from './style';

describe('TitleLink', () => {
  const titleProp = 'Go to exercise';
  const component = shallow(<TitleLink title={titleProp} />);

  it('renders a link', () => {
    const linkFound = component.find(Link);

    expect(linkFound.length).toEqual(1);
    expect(linkFound.prop('href')).toEqual('/exercises/sets/[id]');
    expect(linkFound.prop('as')).toEqual('/exercises/sets/Go to exercise');
  });

  it('renders text', () => {
    const text = component.find(Title);

    expect(text.length).toEqual(1);
    expect(text.text()).toEqual(titleProp);
  });
});
