export const extractRoleFromToken = (decodedToken: any) => {
  const roleKey: any = Object.keys(decodedToken).find((key) =>
    key.includes("identity/claims/role")
  );
  return decodedToken[roleKey];
};

export const print = (message: string) => {
  console.log(message);
};
