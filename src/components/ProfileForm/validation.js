import {
  createValidator,
  required,
} from 'utils/validation';

const validation = createValidator({
  name: [required],
  members: {
    addr: [required],
    tel: [required],
  },
});

export default validation;
