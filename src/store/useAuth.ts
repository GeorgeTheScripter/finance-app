import { Payload, UserAuthInfo } from "@/types/authTypes";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const API_KEY: string = "AIzaSyCwl6j-SZv-Ki-UEmGnrP1g2l8QCpwKIZk";

  const userInfo = ref<UserAuthInfo>({
    email: "",
    expiresIn: "",
    idToken: "",
    localId: "",
    refreshToken: "",
  });

  const error = ref<string>("");
  const loading = ref<boolean>(false);

  const signUp = async (payload: Payload) => {
    error.value = "";
    try {
      loading.value = true;
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true,
        }
      );

      userInfo.value = {
        email: response.data.email,
        expiresIn: response.data.expiresIn,
        idToken: response.data.idToken,
        localId: response.data.localId,
        refreshToken: response.data.refreshToken,
      };
    } catch (err: any) {
      const firebaseMessage = err.response.data.error.message;

      switch (firebaseMessage) {
        case "EMAIL_EXISTS":
          error.value = "Email exist";
          break;
        case "OPERATION_NOT_ALLOWED":
          error.value = "Operation not allowed";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          error.value = "Too many attemps try later";
          break;
        default:
          error.value = "error";
          break;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    signUp,
    userInfo,
    error,
    loading,
  };
});
