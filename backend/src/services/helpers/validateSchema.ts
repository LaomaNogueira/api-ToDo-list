import Joi from 'joi';

function validateSchema<T>(
    schema: Joi.ObjectSchema<T>,
    DTO: T,
    customAttributeErrors?: Record<keyof T, string>
): void | Error {

    const dtoValidation = schema.validate(DTO);
    const schemaAttributes = schema.$_terms.keys.map((objectKey: any) => objectKey.key);

    if (dtoValidation.error) {
        const attributeErrorFromValidator = dtoValidation.error.details[0].context.key;

        if (customAttributeErrors) {
            for (const attributeError in customAttributeErrors) {
                if (attributeError === attributeErrorFromValidator) {
                    throw new Error(customAttributeErrors[attributeError]);
                }
            }
        }

        if (!customAttributeErrors) {
            for (const attributeError of schemaAttributes) {
                if (attributeError === attributeErrorFromValidator) {
                    throw new Error(`Atributo '${attributeError}' inválido`);
                }
            }
        }

    }
}

export { validateSchema };

