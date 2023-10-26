import EndPointProvider from "../util/EndPointProvider";
import axios from "axios";

export default class AuthService {
    endpoint = '';
    token = '';
    config;

    constructor(authStore) {
        this.endpoint = EndPointProvider.getEndPoint() + "/auth";
        this.token = authStore.token;
        this.config = {
            headers: {Authorization: `Bearer ${this.token}`}
        }
    }

    getProtectedStatus = async () => {

        const response = await axios.get(this.endpoint + '/protected', this.config);

        return response.status;
    }
}