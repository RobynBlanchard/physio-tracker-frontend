import { shallow } from 'enzyme';
import CreateExercise, {
  HEADING,
  INPUT_NAME_LABEL,
  SELECT_METRICS_HEADING,
  metrics,
} from '.';
import { CloseButton, ButtonOption, MainHeading, SubHeading } from './style';
import FormInput from '../FormInput';
import Button from '../Button';

describe('Create exercise', () => {
  let component;
  const mockCloseModal = jest.fn();
  const mockHandleCustomExercise = jest.fn();

  beforeEach(() => {
    component = shallow(
      <CreateExercise
        closeModal={mockCloseModal}
        handleAddCustomExercise={mockHandleCustomExercise}
      />
    );
  });

  it('renders a close button', () => {
    expect(component.find(CloseButton)).toHaveLength(1);
  });

  it('renders a heading', () => {
    expect(component.find(MainHeading)).toHaveLength(1);
    expect(component.find(MainHeading).text()).toEqual(HEADING);
  });

  it('renders an input for the exercise name', () => {
    const input = component.find(FormInput);
    expect(input).toHaveLength(1);
    expect(input.prop('label')).toEqual(INPUT_NAME_LABEL);
  });

  it('renders a button for each metric', () => {
    expect(component.find(ButtonOption)).toHaveLength(metrics.length);
  });

  it('renders a button to submit the custom exercise', () => {
    expect(component.find(Button)).toHaveLength(1);
    expect(component.find(Button).text()).toEqual('Add +');
  });

  it('calls closeModal on click of the close button', () => {
    component.find(CloseButton).simulate('click');
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('passes isSelected as true to the ButtonOption when it is clicked', () => {
    component.find(ButtonOption).at(0).simulate('click');
    component.find(ButtonOption).at(2).simulate('click');

    const updatedButtons = component.find(ButtonOption);
    expect(updatedButtons.at(0).prop('isSelected')).toEqual(true);
    expect(updatedButtons.at(1).prop('isSelected')).toEqual(false);
    expect(updatedButtons.at(2).prop('isSelected')).toEqual(true);
    expect(updatedButtons.at(3).prop('isSelected')).toEqual(false);
  });

  it('updates the value of the InputBlock onChange', () => {
    component.find(FormInput).simulate('change', {
      target: {
        value: 'Bosu',
      },
    });

    expect(component.find(FormInput).prop('value')).toEqual('Bosu');
  });

  it('calls handleAddCustomExercise with the input exercise name and selected metric options on click of the submit button', () => {
    component.find(FormInput).simulate('change', {
      target: {
        value: 'Bosu',
      },
    });

    component.find(ButtonOption).at(0).simulate('click');
    component.find(ButtonOption).at(2).simulate('click');

    component.find(Button).simulate('click');

    expect(mockHandleCustomExercise).toHaveBeenCalledTimes(1);
    expect(mockHandleCustomExercise).toHaveBeenCalledWith('Bosu', [
      metrics[0],
      metrics[2],
    ]);
  });
});
