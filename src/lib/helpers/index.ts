import { jwtDecode } from "jwt-decode";

export const extractRoleFromToken = (decodedToken: any) => {
  const roleKey: any = Object.keys(decodedToken).find((key) =>
    key.includes("identity/claims/role")
  );
  return decodedToken[roleKey];
};

export const extractEmailFromToken = (decodedToken: any) => {
  const roleKey: any = Object.keys(decodedToken).find((key) =>
    key.includes("identity/claims/emailaddress")
  );
  return decodedToken[roleKey];
};

export const getDecodedToken = (token: any) => {
  let accessToken: any = token;

  let decodedAccessToken: any = jwtDecode(accessToken);

  return decodedAccessToken;
};

export const superTokenFormatter = (token: any) => {
  let accessToken: any = token;

  let decodedAccessToken: any = jwtDecode(accessToken);

  const formattedToken = {
    emailAddress: extractEmailFromToken(decodedAccessToken),
    role: extractRoleFromToken(decodedAccessToken),
    isComplete: decodedAccessToken?.isComplete,
    isEmailVerified: decodedAccessToken?.isEmailVerified,
    isVerified: decodedAccessToken?.isVerified,
  };

  return formattedToken;
};
