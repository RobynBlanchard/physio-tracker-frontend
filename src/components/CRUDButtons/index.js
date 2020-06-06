import { forwardRef } from 'react';
import { string, func } from 'prop-types';
import { StyledIcon, IconButton } from './style';

export const SaveButton = forwardRef(
  ({ onClick, disabled = false, title = 'save', fill = 'white' }, ref) => (
    <IconButton onClick={onClick} ref={ref} disabled={disabled}>
      <StyledIcon
        aria-hidden="true"
        aria-label="Save"
        icon="save"
        size="lg"
        title={title}
        fill={fill}
      />
    </IconButton>
  )
);

export const EditButton = ({ onClick, title = 'edit', fill = 'white' }) => (
  <IconButton onClick={onClick}>
    <StyledIcon
      aria-hidden="true"
      aria-label="Edit"
      icon="edit"
      size="lg"
      title={title}
      fill={fill}
    />
  </IconButton>
);

EditButton.defaultProps = {
  title: 'edit',
  fill: 'white',
};

EditButton.propTypes = {
  onClick: func.isRequired,
  title: string,
  fill: string,
};

export const DeleteButton = ({ onClick, title = 'delete', fill = 'white' }) => (
  <IconButton onClick={onClick}>
    <StyledIcon
      aria-hidden="true"
      aria-label="Delete"
      icon="trash-alt"
      size="lg"
      title={title}
      fill={fill}
    />
  </IconButton>
);

DeleteButton.defaultProps = {
  title: 'delete',
  fill: 'white',
};

DeleteButton.propTypes = {
  onClick: func.isRequired,
  title: string,
  fill: string,
};
