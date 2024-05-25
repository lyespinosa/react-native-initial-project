import axios from 'axios';

export async function deleteRequest(id) {
  try {
    await axios.delete('http://localhost:3000/cita/' + id);
  } catch (error) {
    console.error(error);
    return null;
  }
}
