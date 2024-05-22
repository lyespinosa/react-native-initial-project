import axios from 'axios';

export async function updateRequest(id, dataRequest) {
  try {
    const response = await axios.post(
      'http://localhost:3000/cita/crear' + id,
      dataRequest,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
