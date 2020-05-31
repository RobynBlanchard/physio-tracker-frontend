import { shallow } from 'enzyme';
import ErrorText, { StyledIcon, Text } from '.';

describe('ErrorText', () => {
  let component;
  const text = 'Please log in first';

  beforeEach(() => {
    component = shallow(<ErrorText>{text}</ErrorText>);
  });

  it('renders an icon', () => {
    expect(component.find(StyledIcon)).toHaveLength(1);
  });

  it('renders children prefixed', () => {
    expect(component.find(Text).text()).toContain(text);
  });
});
