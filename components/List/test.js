import List from './';
import { shallow } from 'enzyme';

describe('List', () => {
  const applyFunc = num => num * 2;
  const items = [1, 2, 3];
  const component = shallow(<List items={items} applyFunc={applyFunc} />);
  const renderedItems = component.find('ul');
  const firstRenderedItem = renderedItems.at(0);

  describe('iterating over each item', () => {
    it('rends a list item for each item', () => {
      expect(renderedItems.length).toEqual(3);
    });
    it('renders the result of the given function applied to the item', () => {
      expect(
        firstRenderedItem
          .find('p')
          .at(0)
          .text()
      ).toEqual('2');
    });

    it('renders an arrow', () => {
      expect(
        firstRenderedItem
          .find('p')
          .at(1)
          .text()
      ).toEqual('>');
    });

    it('passes an onClick/href to each item', () => {
      // expect(firstRenderedItem.prop('href')).toEqual('/session?userId=1');
    });
  });
});
