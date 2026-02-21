import { z } from "zod";
 
export const formSchema = z.object({
  username: z.string().trim()
    .min(1, { error: "Please Enter a Username" })
    .max(50, { error: "Please Limit Username to 50 Characters"}),
  email: z.email().optional(),
  message: z.string().trim()
    .min(1, { error: "Please Enter a Message"})
    .max(255, { error: "Please Limit Message to 255 Characters"}),
});
 
export type FormSchema = typeof formSchema;
