import { z } from "zod";
 
export const formSchema = z.object({
  username: z.string().trim()
    .min(1, { error: "Please Enter a Username" })
    .max(50, { error: "Please Limit Username to 50 Characters"}),
  website: z.url({
    protocol:/^https?$/,
    hostname: z.regexes.domain,
    error: "URL must start with http/https and use a valid domain name",
    })
    .optional(),
  message: z.string().trim()
    .min(1, { error: "Please Enter a Message"})
    .max(255, { error: "Please Limit Message to 255 Characters"}),
});
 
export type FormSchema = typeof formSchema;
