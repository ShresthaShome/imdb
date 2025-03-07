import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const id = evt?.data.id as string;
  const eventType = evt?.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { first_name, last_name, image_url, email_addresses } = evt?.data;

    try {
      const user = await createOrUpdateUser(
        id,
        first_name!,
        last_name!,
        image_url!,
        email_addresses!
      );

      if (eventType === "user.created" && user) {
        try {
          const client = await clerkClient();
          await client.users.updateUserMetadata(id!, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.error("Error: User metadata update failed:", error);
        }
      }
    } catch (error) {
      console.error("Error: User create or update failed:", error);
      return new Response("Error: User create or update failed.", {
        status: 400,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error: User deletion failed:", error);
      return new Response("Error: User creation or update failed.", {
        status: 400,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
