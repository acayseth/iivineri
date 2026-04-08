import { defineDb } from "astro:db";

import { User } from "./_user";
import { Image } from "./_image";
import { Session } from "./_session";
import { ResetPassword } from "./_reset_password";
import { Contact } from "./_contact";

// https://astro.build/db/config
export default defineDb({
  tables: { User, Session, Image, ResetPassword, Contact },
});
