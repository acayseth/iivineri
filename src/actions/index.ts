import { signUp } from "./sign-up";
import { signIn } from "./sign-in";
import { forgotPassword } from "./forgot-password";
import { resetPassword } from "./reset-password";
import { changePassword } from "./change-password";
import { deleteAccount } from "./delete-account";
import { randomImage } from "./random-image";
import { approveImage, rejectImage } from "./moderate";
import { moderateUser } from "./moderate-user";
import { contactUs } from "./contact";

export const server = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteAccount,
  randomImage,
  approveImage,
  rejectImage,
  moderateUser,
  contactUs,
};
