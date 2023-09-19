import axios from "axios";

const BASE_API_URL = "http://localhost:8081/api/v1";

class EmpService {

    saveEmp(formdata) {
       return axios.post(BASE_API_URL + "/save", formdata)
           
    }

    getAllEmp() {
        return axios.get(BASE_API_URL + "/getAll");
    }

    getEmpById(id) {
        return axios.get(BASE_API_URL + "/get/" + id);
    }

    deleteEmp(id) {
        return axios.delete(BASE_API_URL + "/delete/" + id);
    }

    updateEmp(id, emp) {
        return axios.put(BASE_API_URL + "/update/" + id, emp);
    }

    getEmpByFirstName(keyword){
        return axios.get(BASE_API_URL + "/gets/"+ keyword);
    }
}

export default new EmpService();