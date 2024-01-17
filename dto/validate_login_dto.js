import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const loginDtoSchema = Type.Object(
    {
        email: Type.String({
            format: "email",
            errorMessage: {
                type: "El tipo debe contener un string",
                format: "El email debe contener un correo electrónico válido",
            }
        }),
        password: Type.String({
            errorMessage: {
                type: "El tipo de password debe ser un string",
            }
        }),
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "El formato del objeto no es válido",
        }
    }
    );
    
const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validate = ajv.compile(loginDtoSchema);

const validateLoginDTO = (req, res, next) => {
    const isDtoValid = validate(req.body);

    if(!isDtoValid) return res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}));

    next();
}

export default validateLoginDTO;