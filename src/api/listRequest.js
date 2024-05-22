import axios from 'axios';

export async function listRequest() {
  try {
    const response = await axios.get('http://localhost:3000/cita');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
