import { InferType, object, string } from "yup";

export const createMovieSchema = object({
  remark: string()
    .required("Please fill remark")
    .min(10, "Remark must be at least 10 characters"),
});

export type CreateMovieDto = InferType<typeof createMovieSchema>;
