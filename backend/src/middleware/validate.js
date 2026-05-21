import { ZodError } from 'zod';

export function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        const firstError = formattedErrors[0] ? `: ${formattedErrors[0].message}` : '';
        res.status(400).json({ error: `Validation failed${firstError}`, details: formattedErrors });
        return;
      }
      next(error);
    }
  };
}
