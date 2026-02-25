export function setCookie(name: string, value: string, days: number = 30): string {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  return `${name}=${value}; Path=/; Expires=${date.toUTCString()}; HttpOnly; Secure; SameSite=Strict`;
}

export function getCookieValue(cookieString: string | undefined, name: string): string | null {
  if (!cookieString) return null;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key.trim() === name) {
      return value?.trim() || null;
    }
  }
  return null;
}