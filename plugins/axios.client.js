import secureStorage from "./secure-storage";
export default function ({ $axios, store, redirect }) {
  $axios.onRequest((request) => {
    let token = null;
    if (
      secureStorage.getItem("token") ||
      secureStorage.getItem("token") !== undefined
    ) {
      // token = secureStorage.getItem('token');
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MzA4ODMyLCJleHAiOjE3MjYzNTIwMzJ9.j7X9paCv9v46_Qe3tuihs0lyzmxlBOE3RHUyaAHTM1c";
    }
    if (token) {
      request.headers.common["Authorization"] = `Bearer ${token}`;
      // request.headers.common.Authorization = "Bearer" + token;
      // request.headers.secretid = process.env.SECRET_ID;
      // request.headers.secretkey = process.env.SECRET_KEY;
    }
    return request;
  });
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      secureStorage.removeItem("token");
      secureStorage.removeItem("userinfo");
      $axios.setHeader("Authorization", null);
      console.log("401");
      redirect("/");
    }
  });
}
