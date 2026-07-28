const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    maxAge: 15 * 60 * 1000,
  });
};

export default setTokenCookie;