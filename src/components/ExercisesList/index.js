import {
  IconButton,
  StyledIcon,
  ExerciseItemWrapper,
} from './style';
import TitleLink from './TitleLink';
import { arrayOf, string, shape, func } from 'prop-types';

const ExercisesList = ({ deleteExercise, exercises = [] }) => {
  return (
    <>
      {exercises.map((exercise) => {
        const { name, id } = exercise;

        return (
          <ExerciseItemWrapper key={`${name}_${id}`}>
            <TitleLink title={name} exerciseId={id} />
            <IconButton id="delete-button" onClick={() => deleteExercise(id)}>
              <StyledIcon
                aria-hidden="true"
                title="Delete this session?"
                aria-label="Delete"
                icon="trash-alt"
                size="lg"
              />
            </IconButton>
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
