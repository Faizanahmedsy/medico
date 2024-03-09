export const API = {
  auth: {
    signup: "auth/signup",
    login: "auth/login",
    verifyUser: "auth/verify-user",
    otp: "auth/otp",
    resetPassword: "auth/resetpassword",
    checkIsEmailVerified: "auth/verify-user",
  },
  user: {
    registerAsCompany: "user/company",
    registerAsBuyer: "user/buyer",
  },
} as const;
