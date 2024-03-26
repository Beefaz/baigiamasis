const getValidationErrors = (error) => {
    const {errors} = error;
    Object.keys(errors).forEach((key) => {
      errors[key] = errors[key].message;
    });
    return errors;
}

export default getValidationErrors;
