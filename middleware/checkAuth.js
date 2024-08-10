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
      !secureStorage.getItem("token") ||
      secureStorage == null ||
      secureStorage.getItem("token") === undefined
    ) {
      return redirect("/authen/login");
    }
  } catch (ex) {
    console.log(ex);
  }
};
