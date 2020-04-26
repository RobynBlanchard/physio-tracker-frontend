import { shallow } from 'enzyme';
import Exercises from '.';
import TitleLink from './TitleLink';
import { ExerciseItemWrapper } from './style';
import { DeleteButton } from  '../CRUDButtons';

describe('ExercisesList', () => {
  const exercises = [
    { id: '1', name: 'Hamstring curls' },
    { id: '2', name: 'Leg press' },
  ];
  const deleteExercise = jest.fn();
  const component = shallow(
    <Exercises exercises={exercises} deleteExercise={deleteExercise} />
  );

  it('it maps over the exercises', () => {
    const exercises = component.find(ExerciseItemWrapper);

    expect(exercises.length).toEqual(2);
  });

  it('renders a title for each exercise', () => {
    const firstExerciseTitle = component.find(TitleLink).at(0);

    expect(firstExerciseTitle.length).toEqual(1);
    expect(firstExerciseTitle.prop('title')).toEqual('Hamstring curls');
    expect(firstExerciseTitle.prop('exerciseId')).toEqual('1');
  });

  it('renders a delete button for each exercise', () => {
    const button = component.find(DeleteButton).at(0);

    expect(button.length).toEqual(1);
  });

  it('calls deleteExercise when the delete icon is clicked', () => {
    component.find(DeleteButton).at(0).simulate('click');

    expect(deleteExercise).toHaveBeenCalledTimes(1);
    expect(deleteExercise).toHaveBeenCalledWith('1');
  });
});
