import Link from 'next/link';
import List from './';
import { shallow } from 'enzyme';
import { Text } from './style';

describe('List', () => {
  const applyFunc = num => num.id * 2;
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const component = shallow(<List items={items} applyFunc={applyFunc} />);
  const listItems = component.find('ul');
  const listItem = listItems.at(0);

  it('rends a list item for each item', () => {
    expect(listItems.length).toEqual(3);
  });

  describe('List item', () => {
    it('renders the result of the given function applied to the item', () => {
      expect(
        listItem
          .find(Text)
          .at(0)
          .text()
      ).toEqual('2');
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
