import Joi from "joi";

export const authLoginSchema = Joi.object({
  Username: Joi.string().trim().required().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  Password: Joi.string().trim().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
