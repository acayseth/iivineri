import axios, {type CreateAxiosDefaults, type AxiosInstance} from "axios";

export default (config: CreateAxiosDefaults): AxiosInstance => axios.create(config);