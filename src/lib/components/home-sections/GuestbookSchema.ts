import { z } from "zod";
 
export const formSchema = z.object({
  username: z.string().trim().min(1).max(50),
  email: z.email().optional(),
  message: z.string().trim().min(1).max(255),
});
 
export type FormSchema = typeof formSchema;
