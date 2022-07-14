import { InferType, object, string } from "yup";

export const createMovieSchema = object({
  remark: string().required(),
});

export type CreateMovieDto = InferType<typeof createMovieSchema>;
