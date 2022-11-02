import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function confirmPasswordValidator() {
  return (form: FormGroup) => {
    const password = form.get('password');
    const confirmPassword = form?.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ notMatch: true });
      return { notMatch: true };
    }
    confirmPassword?.setErrors(null);
    return null;
  };
}
