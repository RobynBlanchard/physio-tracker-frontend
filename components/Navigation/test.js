import { shallow } from 'enzyme';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navigation from './';

describe('Navigation', () => {
  const component = shallow(<Navigation />);
  const navItems = [
    { link: '/', icon: 'home' },
    { link: '/sessions', icon: 'dumbbell' },
    { link: '/analysis', icon: 'chart-line' },
    { link: '/user', icon: 'user' }
  ];

  it('renders a link with the correct href and icon', () => {
    const links = component.find(Link);

    links.forEach((link, index) => {
      expect(link.prop('href')).toEqual(navItems[index].link);

      const icon = link.find(FontAwesomeIcon);
      expect(icon.prop('icon')).toEqual(navItems[index].icon);
    });
  });
});
