import { AbstractControl, FormGroup } from '@angular/forms';

/* Lo que hace esta función es marcar todos los campos del formulario como "tocados",
para que se muestren los errores de validación cuando el usuario intenta enviar sin rellenar los campos obligatorios.*/

export function validateFields<T extends Record<string, unknown>>(
  data: T,
  requiredFields: readonly (keyof T)[]
): boolean {
  return requiredFields.every(field => {
    const value = data[field];
    return value !== null && value !== undefined && value !== '';
  });
}