import secureStorage from "./secure-storage";
export default function ({ $axios, store, redirect }) {
    $axios.onRequest((request) => {
        let token = null

        if (
            secureStorage.getItem('token') ||
            secureStorage.getItem('token') !== undefined
        ) {
            token = secureStorage.getItem('token');
        }

        if (token) {
            request.headers.common.Authorization = 'Bearer' + token;
            request.headers.secretid = process.env.SECRET_ID;
            request.headers.secretkey = process.env.SECRET_KEY;
        }
        return request;
    });
    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            secureStorage.removeItem("token");
            secureStorage.removeItem("userinfo");
            $axios.setHeader("Authorization", null);
            console.log('401');
            redirect('/')
        }
    });   
}