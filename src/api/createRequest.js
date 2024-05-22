import axios from 'axios';

export async function createRequest(dataRequest) {
  try {
    const response = await axios.post(
      'http://localhost:3000/cita/crear',
      dataRequest,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
