import Button from './';
import { shallow } from 'enzyme';
import { ButtonStyle } from './style';

describe('Button', () => {
  const component = shallow(<Button text="Click me" />);

  it('renders a button with correct text', () => {
    const button = component.find(ButtonStyle);
    
    expect(button.length).toEqual(1);
    expect(button.text()).toEqual('Click me');
  });
});
