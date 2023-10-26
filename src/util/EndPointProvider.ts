export default class EndPointProvider{
    static getEndPoint(){
        let endpoint = '';
        if (!process.env.REACT_APP_LOCAL_START) {
            endpoint = "http://localhost:8080/api";
        } else {
            endpoint = "https://dutify.ai/api";
        }

        return endpoint;
    }

    static getPageEndPoint(){
        let endpoint = '';
        if (!process.env.REACT_APP_LOCAL_START) {
            endpoint = "http://localhost:9002";
        } else {
            endpoint = "https://dutify.ai/hub";
        }

        return endpoint;
    }
}