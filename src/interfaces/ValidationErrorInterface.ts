export default interface IValidationError {
  [key: string]: string | IValidationError;
}
