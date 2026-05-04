export const isAdminEnabled = (): boolean => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_ENABLE_ADMIN) {
    return process.env.NEXT_PUBLIC_ENABLE_ADMIN === "true";
  }
  return process.env.NODE_ENV !== "production";
};
