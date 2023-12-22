import axios from "axios";

const BASE_API_URL = "http://localhost:8081/api/v1";

class EmpService {

    saveEmp(formdata) {
       return axios.post(BASE_API_URL + "/save", formdata)
           
    }

    getAllEmp(pageNumber, pageSize) {
        return axios.get(`${BASE_API_URL}/getAll`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    getEmpById(id) {
        return axios.get(BASE_API_URL + "/get/" + id);
    }

    deleteEmp(id) {
        return axios.delete(BASE_API_URL + "/delete/" + id);
    }

    updateEmp(id, formdata) {
        return axios.put(BASE_API_URL + "/update/" + id, formdata);
    }

    getEmpByFirstName(keyword){
        return axios.get(BASE_API_URL + "/gets/"+ keyword);
    }
}

export default new EmpService();