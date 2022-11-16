import api from "../api/instance";
import { API_BASE } from "../api/config";
export class DgService {
  getDg() {
    return api.get(`${API_BASE}/dg/`);
  }
  deleteDg(id) {
    return api.delete(`${API_BASE}/dg/${id}`);
  }
}
