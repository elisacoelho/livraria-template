import axios from "axios";
export default class CategoriaApi {
  async buscarTodasAsCategorias(page) {
    const { data } = await axios.get(`/categorias/?page=${page}`);
    return data;
  }
  async adicionarCategoria(categoria) {
    const { data } = await axios.post("/categorias/", categoria);
    return data;
  }
  async atualizarCategoria(categoria) {
    const { data } = await axios.put(`/categorias/${categoria.id}/`, categoria);
    return data.results;
  }
  async excluirCategoria(id) {
    await axios.delete(`/categorias/${id}/`);
  }
}
