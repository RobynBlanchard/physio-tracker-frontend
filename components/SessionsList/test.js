import Link from 'next/link';
import SessionsList from '.';
import { shallow } from 'enzyme';
import { Text } from './style';

describe('SessionsList', () => {
  const sessions = [
    { id: 1, date: '2019-01-01' },
    { id: 2, date: '2019-01-05' },
    { id: 3, date: '2019-01-10' }
  ];
  const component = shallow(<SessionsList sessions={sessions} />);
  const listItems = component.find('ul');
  const listItem = listItems.at(0);

  it('rends a list item for each item', () => {
    expect(listItems.length).toEqual(3);
  });

  describe('List item', () => {
    it('formats the date', () => {
      expect(
        listItem
          .find(Text)
          .at(0)
          .text()
      ).toEqual('Tuesday 1st January');
    });

    it('renders an arrow', () => {
      expect(
        listItem
          .find(Text)
          .at(1)
          .text()
      ).toEqual('>');
    });

    it('renders a link', () => {
      const link = listItem.find(Link);

      expect(link.prop('href')).toEqual('/session/[id]');
      expect(link.prop('as')).toEqual('/session/1');
    });
  });
});
