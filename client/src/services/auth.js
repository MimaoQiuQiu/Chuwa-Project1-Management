import makeApiCall from "./apiCall";

export const signup = async (data) => {
  const res = await makeApiCall({
    url: "/api/auth/signup",
    method: "POST",
    data,
  });
  return res;
};

export const signin = async (data) => {
  const res = await makeApiCall({
    url: "/api/auth/signin",
    method: "POST",
    data,
  });
  return res;
};

export const resetPassword = async (data) => {
  const res = await makeApiCall({
    url: "/api/auth/resetpassword",
    method: "PUT",
    data,
  });
  return res;
};
