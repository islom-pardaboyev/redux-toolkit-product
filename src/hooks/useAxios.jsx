import axios from "axios";
import {REQUEST} from './useEnv' 

export default function useAxios(){
    return (
        axios.create({baseURL: REQUEST})
    )
}