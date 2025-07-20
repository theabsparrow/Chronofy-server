import { ZodError } from 'zod';
import { TErrorSource, TValidationError } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleZodError = (err: ZodError): TValidationError => {
  const errorSource: TErrorSource = err.issues.map((issue) => {
    const lastPathPart = issue.path[issue.path.length - 1];

    return {
      path:
        typeof lastPathPart === 'string' || typeof lastPathPart === 'number'
          ? lastPathPart
          : String(lastPathPart),
      message: issue.message,
    };
  });

  const statusCode = StatusCodes.BAD_REQUEST;
  const message = 'validation error';

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default handleZodError;
