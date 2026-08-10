import { strapiFetch } from "./client";

export type ContactMessagePayload = {
  name: string;
  email: string;
  message: string;
  locale?: string;
};

export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<void> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (!name || !email || !message) {
    throw new Error("Missing required contact fields");
  }

  await strapiFetch("/api/contact-messages", {
    method: "POST",
    body: JSON.stringify({
      data: {
        name,
        email,
        message,
        locale: payload.locale || "fr",
        status: "new",
      },
    }),
  });
}
