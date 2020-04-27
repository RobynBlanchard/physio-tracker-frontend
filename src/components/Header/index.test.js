import Router from 'next/router';
import { mount } from 'enzyme';
import Header from '.';
import { Heading, Anchor, StyledIcon } from './style';

const mockedRouter = {};
Router.router = mockedRouter;

describe('Header', () => {
  const title = 'Your sessions';

  describe('when not on the homepage', () => {
    const router = {
      pathname: '/sessions',
    };
    const component = mount(<Header router={router} title={title} />);
    it('renders a title', () => {
      const heading = component.find(Heading);

      expect(heading).toHaveLength(1);
      expect(heading.text()).toEqual(title);
    });

    it('renders an icon', () => {
      const icon = component.find(StyledIcon);

      expect(icon).toHaveLength(1);
      expect(icon.prop('icon')).toEqual('arrow-left');
    });

    it('renders a link', () => {
      const link = component.find(Anchor);

      expect(link).toHaveLength(1);
    });

    it('calls back function on click of the link', () => {
      const link = component.find(Anchor);
      const mockBack = jest.fn();
      Router.router.back = mockBack;

      link.simulate('click');

      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('when on the homepage', () => {
    const router = {
      pathname: '/',
    };
    const component = mount(<Header router={router} title={title} />);

    it('renders a title ', () => {
      const heading = component.find(Heading);

      expect(heading).toHaveLength(1);
      expect(heading.text()).toEqual(title);
    });

    it('does not render a link', () => {
      const link = component.find(Anchor);

      expect(link).toHaveLength(0);
    });
  });
});
