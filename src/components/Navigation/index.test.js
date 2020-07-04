import { shallow } from 'enzyme';
import Link from 'next/link';
import { useAuth } from '../../customHooks/useAuth';
import Navigation from '.';
import { StyledIcon } from './style';

jest.mock('../../customHooks/useAuth');

useAuth.mockReturnValue({
  user: {
    token: '123',
  },
});

describe('Navigation', () => {
  const component = shallow(<Navigation />);
  const navItems = [
    { link: '/', icon: 'home' },
    { link: '/sessions', icon: 'dumbbell' },
    { link: '/#', icon: 'chart-line' },
    { link: '/signIn', icon: 'user' },
  ];

  it('renders a link with the correct href and icon', () => {
    const links = component.find(Link);

    links.forEach((link, index) => {
      expect(link.prop('href')).toEqual(navItems[index].link);

      const icon = link.find(StyledIcon);
      expect(icon.prop('icon')).toEqual(navItems[index].icon);
    });
  });
});
