const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

export const API_ROUTES = {
    TASKS: {
        BASE: API_BASE_URL,
        GET_ALL: API_BASE_URL,
        CREATE: API_BASE_URL,
        UPDATE: (id) => `${API_BASE_URL}/${id}`,
        DELETE: (id) => `${API_BASE_URL}/${id}`,
    }
};
