const genericError = (action, resource) =>
  `Sorry could not ${action} ${resource} at this time, please try again later`;

export default {
  sets: {
    fetchError: genericError('fetch', 'sets'),
    createError: genericError('create', 'set'),
    updateError: genericError('update', 'set'),
    deleteError: genericError('delete', 'set'),
    failedValidationError: 'updated set expects a number',
  },
};
