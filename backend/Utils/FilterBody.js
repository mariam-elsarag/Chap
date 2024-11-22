import AppErrors from "./AppErrors.js";

const FilterBody = (body, next, requiredFields, allowedFields = []) => {
  let errors = [];
  let filter = {};
  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key) || requiredFields.includes(key)) {
      filter[key] = body[key];
    }
  });

  requiredFields.forEach((el) => {
    if (!filter[el]) {
      errors.push({ [el]: `${el} is required` });
    }
  });

  if (errors.length > 0) {
    next(new AppErrors(errors, 400));
    return null;
  }

  return filter;
};
export default FilterBody;
