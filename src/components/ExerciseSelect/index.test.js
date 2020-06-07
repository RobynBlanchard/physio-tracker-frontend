import { shallow } from 'enzyme';
import ExerciseSelect from '.';
import { Select } from './style';

describe('ExerciseSelect', () => {
  const exerciseOptions = [
    { name: 'Option 1', value: 'Option1' },
    { name: 'Option 2', value: 'Option2' },
    { name: 'Option 3', value: 'Option3' },
  ];
  const onChange = jest.fn();

  const component = shallow(
    <ExerciseSelect exerciseOptions={exerciseOptions} onChange={onChange} />
  );

  it('passes an onChange to the select element', () => {
    const select = component.find(Select);

    expect(select).toHaveLength(1);
    expect(select.prop('onChange')).toEqual(onChange);
  });

  it('renders an option element for each exerciseOption', () => {
    const options = component.find('option');

    expect(options).toHaveLength(3);
    expect(options.at(0).prop('value')).toEqual('Option1');
    expect(options.at(0).text()).toEqual('Option 1');
  });
});
