import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-35338.firebaseio.com/"
});
export default instance;