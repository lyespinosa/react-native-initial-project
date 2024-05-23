import axios from 'axios';

export async function updateRequest(id, dataRequest) {
  try {
    const response = await axios.patch(
      'http://localhost:3000/cita/' + id,
      dataRequest,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
