import { z } from "zod";
 
export const messageFormSchema = z.object({
  username: z.string().trim()
    .min(1, { error: "Please Enter a Username" })
    .max(50, { error: "Please Limit Username to 50 Characters"}),
  website: z.url({
      protocol:/^https?$/,
      hostname: z.regexes.domain,
      error: "URL must start with http/https and use a valid domain name",
    })
    .optional(),
  content: z.string().trim()
    .min(1, { error: "Please Enter a Message"})
    .max(255, { error: "Please Limit Message to 255 Characters"}),
});

export const replyFormSchema = z.object({
  messageId: z.int({ error: "Form Error: Unable to Find Message ID (the developer f*cked up)" }),
  username: z.string().trim()
    .min(1, { error: "Please Enter a Username" })
    .max(50, { error: "Please Limit Username to 50 Characters"}),
  content: z.string().trim()
    .min(1, { error: "Please Enter a Reply"})
    .max(255, { error: "Please Limit Message to 255 Characters"}),
});
 
export type MessageFormSchema = typeof messageFormSchema;
export type ReplyFormSchema = typeof replyFormSchema;
