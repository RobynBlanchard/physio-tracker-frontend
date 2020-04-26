import {
  IconButton,
  StyledIcon,
  ExerciseItemWrapper,
} from './style';
import TitleLink from './TitleLink';
import { arrayOf, string, shape, func } from 'prop-types';
import { DeleteButton } from  '../CRUDButtons';

const ExercisesList = ({ deleteExercise, exercises = [] }) => {
  return (
    <>
      {exercises.map((exercise) => {
        const { name, id } = exercise;

        return (
          <ExerciseItemWrapper key={`${name}_${id}`}>
            <TitleLink title={name} exerciseId={id} />
            <DeleteButton onClick={() => deleteExercise(id)}  title="Delete this exercise?"/>
          </ExerciseItemWrapper>
        );
      })}
    </>
  );
};

ExercisesList.propTypes = {
  exercises: arrayOf(
    shape({
      name: string,
    })
  ),
  deleteExercise: func.isRequired,
};

export default ExercisesList;
