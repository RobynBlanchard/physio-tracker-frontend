import { shallow } from 'enzyme';
import Exercises from './';
import TitleLink from './TitleLink';
import ExerciseSummary from './ExerciseSummary';
import ToggleSwitch from '../ToggleSwitch';
import { Wrapper } from './style';

describe('Exercises', () => {
  const exercises = [
    { id: 1, name: 'Hamstring curls' },
    { id: 2, name: 'Leg press' }
  ];
  const component = shallow(<Exercises exercises={exercises} />);

  it('renders a toggle switch', () => {
    const toggle = component.find(ToggleSwitch);
    expect(toggle.length).toEqual(1);
  });

  it('iterates over exercises and renders a title and exercise summary', () => {
    const titles = component.find(TitleLink);
    const exericseSummaries = component.find(ExerciseSummary);

    expect(titles.length).toEqual(2);
    expect(exericseSummaries.length).toEqual(2);
  });

  it('clicking on the toggle switch expands each summary', () => {
    const wrapper = component.find(Wrapper).at(0);

    expect(wrapper.prop('open')).toEqual(false);

    component.find(ToggleSwitch).simulate('click');
    const updatedOpenWrapper = component.find(Wrapper).at(0);

    expect(updatedOpenWrapper.prop('open')).toEqual(true);

    component.find(ToggleSwitch).simulate('click');
    const updatedClosedWrapper = component.find(Wrapper).at(0);

    expect(updatedClosedWrapper.prop('open')).toEqual(false);
  });
});
