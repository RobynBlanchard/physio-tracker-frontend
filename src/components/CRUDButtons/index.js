import { forwardRef } from 'react';
import { StyledIcon, IconButton } from './style';

export const SaveButton = forwardRef(
  ({ onClick, title = 'save', fill = 'white' }, ref) => (
    <IconButton onClick={onClick} ref={ref}>
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
