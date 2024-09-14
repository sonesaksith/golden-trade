import secureStorage from "../plugins/secure-storage";
export default ({
  $axios,
  $router,
  $auth,
  isHMR,
  app,
  store,
  route,
  error,
  redirect,
}) => {
  try {
    if (
      !JSON.parse(secureStorage.getItem("userinfo"))?.accessToken ||
      JSON.parse(secureStorage.getItem("userinfo"))?.accessToken === undefined
    ) {
      return redirect("/authen/login");
    }
  } catch (ex) {
    console.log(ex);
  }
};
