import { Payload, OPERATION_TYPE, UserAuthInfo } from "@/types/authTypes";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const API_KEY: string = import.meta.env.VITE_FIREBASE_API_KEY;

  const userInfo = ref<UserAuthInfo>({
    email: "",
    expiresIn: "",
    idToken: "",
    localId: "",
    refreshToken: "",
  });

  const error = ref<string>("");
  const loading = ref<boolean>(false);

  const auth = async (payload: Payload, type: string) => {
    const operationType: string =
      type === OPERATION_TYPE.SIGNUP
        ? OPERATION_TYPE.SIGNUP
        : OPERATION_TYPE.SIGNIN;

    error.value = "";

    try {
      loading.value = true;
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${operationType}?key=${API_KEY}`,
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
      if (err.response?.data?.error) {
        const firebaseMessage: string = err.response.data.error.message;
        console.error("Firebase error:", firebaseMessage); // Логируем для отладки

        switch (firebaseMessage) {
          case "EMAIL_EXISTS":
            error.value = "Пользователь с таким email уже существует";
            break;
          case "OPERATION_NOT_ALLOWED":
            error.value = "Регистрация отключена";
            break;
          case "EMAIL_NOT_FOUND":
            error.value = "Email не найден";
            break;
          case "INVALID_PASSWORD":
            error.value = "Неверный пароль";
            break;
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            error.value = "Слишком много попыток. Попробуйте позже";
            break;
          case "INVALID_EMAIL":
            error.value = "Неверный формат email";
            break;
          case "WEAK_PASSWORD":
            error.value = "Пароль должен быть не менее 6 символов";
            break;
          default:
            error.value = `Ошибка: ${firebaseMessage}`; // Показываем оригинальное сообщение
            break;
        }
      } else {
        error.value = "Ошибка сети или сервера";
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    auth,
    userInfo,
    error,
    loading,
  };
});
