import { InjectionToken } from '@angular/core';

interface Length {
  requiredLength: number;
  actualLength: number;
}

export const errorList = {
  required: () => `Dato <strong> obligatorio </strong>`,
  email: () => `Ingrese un email valido`,
  minlength: ({ requiredLength, actualLength }: any) =>
    `Ingrese un mínimo de <strong>${requiredLength}</strong> caracteres`,
  maxlength: ({ requiredLength, actualLength }: any) =>
    `Ingrese un máximo de <strong>${requiredLength}</strong> caracteres`,
  notMatch: () => `Las contraseñas no coinciden`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => errorList,
});
