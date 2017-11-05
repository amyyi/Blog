import {createValidator, required, titleReg} from 'utils/validation';

const validation = createValidator({
  editTitle: [required, titleReg],
  editContent: [required],
});

export default validation;
