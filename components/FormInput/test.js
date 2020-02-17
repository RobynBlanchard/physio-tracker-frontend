import { StyledInput, StyledLabel } from './style';
import FormInput from './';
import { shallow } from 'enzyme';

describe('FormInput', () => {
  const mockOnChange = jest.fn();
  const wrapper = shallow(
    <FormInput
      name="password"
      type="password"
      onChange={mockOnChange}
      value={'supersecret'}
      label="Password"
      required
      minLength="8"
    />
  );

  it('renders a Label with the correct props and text', () => {
    const Label = wrapper.find(StyledLabel);

    expect(Label.length).toEqual(1);
    expect(Label.prop('htmlFor')).toEqual('password');
    expect(Label.text()).toEqual('Password');
  });

  it('renders an Input with correct props', () => {
    const Input = wrapper.find(StyledInput);

    expect(Input.prop('id')).toEqual('password');
    expect(Input.prop('name')).toEqual('password');
    expect(Input.prop('type')).toEqual('password');
    expect(Input.prop('placeholder')).toEqual(undefined);
    expect(Input.prop('onChange')).toEqual(mockOnChange);
    expect(Input.prop('value')).toEqual('supersecret');
    expect(Input.prop('className')).toEqual(undefined);
    expect(Input.prop('required')).toEqual(true);
  });
});
