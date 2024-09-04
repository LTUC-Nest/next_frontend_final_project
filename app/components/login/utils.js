export const dynamicClass = (condition) => condition ? 'border-red-500' : 'border-green-500';

export const validationMessage = (condition, successMessage, errorMessage) => condition ? successMessage : errorMessage;
