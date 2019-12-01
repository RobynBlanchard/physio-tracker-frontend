import { shallow } from 'enzyme';
import NavigationTab from './index';
import { Tab, TabContent } from './style';

describe('NavigationTab', () => {
  const tabHeadings = [
    { id: 'tabA', title: 'Tab A' },
    { id: 'tabB', title: 'Tab B' }
  ];

  const content = { tabA: <div>Content A</div>, tabB: <div>Content B</div> };

  const component = shallow(
    <NavigationTab tabHeadings={tabHeadings} contentPanes={content} />
  );

  it('renders tab headings', () => {
    const tabs = component.find(Tab);
    expect(tabs).toHaveLength(tabHeadings.length);

    tabs.forEach((tab, index) => {
      expect(tab.text()).toEqual(tabHeadings[index].title);
    });
  });

  it('renders the content of the first tab by default', () => {
    const openPane = component.find(TabContent);

    expect(openPane).toHaveLength(1);
    expect(openPane.text()).toEqual('Content A');
  });

  describe('on click of a tab', () => {
    it("renders that tab's content", () => {
      component
        .find(Tab)
        .at(1)
        .simulate('click');

      const openPane = component.find(TabContent);

      expect(openPane).toHaveLength(1);
      expect(openPane.text()).toEqual('Content B');
    });
  });
});
