import { arrayOf, shape, string, func } from 'prop-types';

const ExerciseSelect = ({ exerciseOptions, onChange }) => {
  return (
    <select onChange={onChange}>
      {exerciseOptions.map(exercise => (
        <option value={exercise.value} key={exercise.value}>
          {exercise.name}
        </option>
      ))}
    </select>
  );
};

ExerciseSelect.propTypes = {
  exerciseOptions: arrayOf(
    shape({
      name: string,
      value: string
    })
  ),
  onChange: func
};

export default ExerciseSelect;
