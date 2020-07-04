import { shallow } from 'enzyme';
import StyledInput from './style';
import FormInput from '.';
import Label from '../Label';

describe('FormInput', () => {
  const mockOnChange = jest.fn();
  const wrapper = shallow(
    <FormInput
      name="password"
      type="password"
      onChange={mockOnChange}
      value="supersecret"
      label="Password"
      required
      minLength="8"
    />
  );

  it('renders a Label with the correct htmlFor prop and text', () => {
    const label = wrapper.find(Label);

    expect(label).toHaveLength(1);
    expect(label.prop('htmlFor')).toEqual('password');
    expect(label.text()).toEqual('Password');
  });

  it('renders an Input with correct props', () => {
    const Input = wrapper.find(StyledInput);

    expect(Input.prop('id')).toEqual('password');
    expect(Input.prop('name')).toEqual('password');
    expect(Input.prop('type')).toEqual('password');
    expect(Input.prop('placeholder')).toBeUndefined();
    expect(Input.prop('onChange')).toEqual(mockOnChange);
    expect(Input.prop('value')).toEqual('supersecret');
    expect(Input.prop('className')).toBeUndefined();
    expect(Input.prop('required')).toEqual(true);
  });
});
