import { StatusError } from '../errors/statusError';

function verifyRequiredFields(fields: string[], requestBody: Record<string, unknown>): Error {
  
  for (const field of fields) {
    if (requestBody[field] === null || requestBody[field] === undefined) {
      throw new StatusError(400, new Error(`Missing param: ${field}`));
    }
  }

  return null;
}

export { verifyRequiredFields };
