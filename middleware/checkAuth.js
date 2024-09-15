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
    let token = secureStorage.getItem("token");
    if (!token) {
      secureStorage.removeItem("token");
      secureStorage.removeItem("userinfo");
      $axios.setHeader("Authorization", null);
      redirect("/authen/login");
    }
  } catch (ex) {
    console.log(ex);
  }
};
