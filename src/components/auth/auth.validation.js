import Joi from "joi";

export const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name:Joi.string().required(),
  phonecell:Joi.string().required(),
  dni: Joi.string().required(),
	password: Joi.string().required(),
	role_id:  Joi.string().required(),
});

export const validateUser = (data) => {
  const { error } = userSchema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return { valid: false, errors: messages };
  }
  return { valid: true };
};
