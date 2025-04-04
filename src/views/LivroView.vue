<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCategoriaStore } from "@/stores/categoria";
import LivrosApi from "@/api/livros";
const livrosApi = new LivrosApi();

const categoriaStore = useCategoriaStore()

const defaultLivro = {
  id: null,
  titulo: "",
  categoria: "",
  editora: "",
  autores: "",
  capa: "",
};
const livros = ref([]);
const livro = reactive({ ...defaultLivro });

onMounted(async () => {
  // livros.value = await livrosApi.buscarTodosOsLivros();
  await categoriaStore.getCategorias();
});

function limpar() {
  Object.assign(livro, { ...defaultLivro });
}

async function salvar() {
  if (livro.id) {
    await livrosApi.atualizarLivro(livro);
  } else {
    await livrosApi.adicionarLivro(livro);
  }
  livros.value = await livrosApi.buscarTodosOsLivros();
  limpar();
}

function editar(livroParaEditar) {
  Object.assign(livro, livroParaEditar);
}

async function excluir(id) {
  await livrosApi.excluirLivro(id);
  livros.value = await livrosApi.buscarTodosOsLivros();
  limpar();
}

function mostrar() {
  console.log('teste')
}

</script>

<template>
    <div class="container">
      <h1>Gerenciamento de Livros</h1>
      <div class="form">
        <input type="text" v-model="livro.titulo" placeholder="Título" />
        <input @keypress="mostrar" type="text" v-model="livro.categoria" list="categorias" placeholder="Categoria" />
        <datalist id="categorias" >
          <option v-for="categoria in categoriaStore.categorias" :key="categoria.id" :value="categoria.descricao">
            {{ categoria.descricao }}
          </option>
          <option v-if="categoriaStore.meta.total_pages > 1">Tem mais..</option>
        </datalist>
        <!-- <datalist placeholder="Categoria">
          <option v-for="categoria in categoriaStore.categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.descricao }}
          </option>
        </datalist> -->
        <input type="text" v-model="livro.editora" placeholder="Editora" />
        <input type="text" v-model="livro.autores" placeholder="Autores" />
        <input type="text" v-model="livro.capa" placeholder="URL da Capa" />
        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
      </div>
      <ul class="livros-list">
        <li v-for="livro in livros" :key="livro.id">
          <div class="livro-info" @click="editar(livro)">
            <img :src="livro.capa || 'https://via.placeholder.com/150'" alt="Capa do Livro" class="livro-capa" />
            <div>
              <strong>ID:</strong> {{ livro.id }} <br />
              <strong>Título:</strong> {{ livro.titulo }} <br />
              <strong>Categoria:</strong> {{ livro.categoria }} <br />
              <strong>Editora:</strong> {{ livro.editora }} <br />
              <strong>Autores:</strong> {{ livro.autores }}
            </div>
          </div>
          <button @click="excluir(livro.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>

  <style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 30px;
  text-align: center;
}

.form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

input[type="text"] {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #343a40;
  outline: none;
}

button {
  padding: 12px 25px;
  font-size: 1rem;
  background-color: #343a40;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #000;
}

.livros-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.livro-info {
  display: flex;
  gap: 15px;
  cursor: pointer;
}

.livro-info img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.livro-info div {
  font-size: 0.9rem;
}

li button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .form {
    flex-direction: column;
    gap: 10px;
  }

  input[type="text"] {
    width: 100%;
  }

  ul {
    padding: 0;
  }
}
</style>
