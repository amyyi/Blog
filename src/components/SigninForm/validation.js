import {createValidator, required, maxLength, email, url} from 'utils/validation';

const validation = createValidator({
  account: [required, email],
  password: [required]
});

export default validation;
