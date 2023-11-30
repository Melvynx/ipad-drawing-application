import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_6fYjorfbWscJnOVhgigAJqkZrDzKiCkfKG8MGFoyuUGyBYhVlBwcyEtFVd-f3QeS",
  // authEndpoint: "/api/auth",
  // throttle: 100,
});


export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  
  /* ...all the other hooks you’re using... */
} = createRoomContext(client);