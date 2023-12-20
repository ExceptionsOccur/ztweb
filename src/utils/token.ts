import { getCookie, setCookie } from "typescript-cookie";

export function setToken(token: string) {
  setCookie("token", token, { sameSite: "strict" });
}

export function getToken(): string {
  return getCookie("token") as string;
}
