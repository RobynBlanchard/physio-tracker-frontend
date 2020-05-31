import Link from 'next/link';
import { shallow } from 'enzyme';
import TitleLink from '.';
import { Title } from './style';

describe('TitleLink', () => {
  const titleProp = 'TREADMILL';
  const metrics = ['TIME', 'DISTANCE'];
  const component = shallow(
    <TitleLink title={titleProp} metrics={metrics} exerciseId="1" />
  );

  it('renders a link', () => {
    const linkFound = component.find(Link);

    expect(linkFound).toHaveLength(1);
    expect(linkFound.prop('href')).toEqual(
      '/exercises/sets/[id]/[title]/[metrics]'
    );
    expect(linkFound.prop('as')).toEqual(
      '/exercises/sets/1/TREADMILL/TIME,DISTANCE'
    );
  });

  it('renders text', () => {
    const text = component.find(Title);

    expect(text).toHaveLength(1);
    expect(text.text()).toEqual('Treadmill');
  });
});
