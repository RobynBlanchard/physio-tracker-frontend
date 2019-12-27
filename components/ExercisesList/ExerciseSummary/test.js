import { shallow } from 'enzyme';
import ExerciseSummary from './';
import { StyledIcon } from './style';

describe('ExerciseSummary', () => {
  const component = shallow(<ExerciseSummary sets={3} reps={8} weight={45} />);
  const icons = component.find(StyledIcon);
  const text = component.text();

  it('renders text of the number of sets next to an icon', () => {
    expect(icons.at(0).prop('icon')).toEqual('layer-group');
    expect(text).toContain('3 sets');
  });

  it('renders text of the number of sets next to an icon', () => {
    expect(icons.at(1).prop('icon')).toEqual('redo-alt');
    expect(text).toContain('8 reps');
  });

  it('renders text of the number of sets next to an icon', () => {
    expect(icons.at(2).prop('icon')).toEqual('weight-hanging');
    expect(text).toContain('45kg');
  });
});
