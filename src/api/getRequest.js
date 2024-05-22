import axios from 'axios';

export async function getRequest(id) {
  try {
    const request = await axios.get('http://localhost:3000/cita/' + id);
    return request.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
