import { ref } from 'vue'
import { defineStore } from 'pinia'

import CategoriaApi from '@/api/categoria'

const categoriaApi = new CategoriaApi()

export const useCategoriaStore = defineStore('categoria', () => {
  const categorias = ref([])
  const meta = ref({
    page: 0,
    page_size: 0,
    total_pages: 0
  })

  async function getCategorias(page = 1) {
    const data = await categoriaApi.buscarTodasAsCategorias(page)
    categorias.value = data.results
    meta.value.page = data.page
    meta.value.page_size = data.page_size
    meta.value.total_pages = data.total_pages
  }

  async function excluirCategoria(id) {
    await categoriaApi.excluirCategoria(id)
    const index = categorias.value.findIndex((categoria) => categoria.id === id)
    categorias.value.splice(index, 1)
  }

  async function salvarCategoria(categoria) {
    if (categoria.id) {
      await categoriaApi.atualizarCategoria(categoria)
      const index = categorias.value.findIndex((c) => c.id === categoria.id)
      categorias.value.splice(index, 1, categoria)
    } else {
      const data = await categoriaApi.adicionarCategoria(categoria)
      categorias.value.splice(0, 0, data)
    }
  }

  async function proximaPagina() {
    await getCategorias(meta.value.page + 1)
  }

  async function paginaAnterior() {
    await getCategorias(meta.value.page - 1)
  }

  return {
    categorias,
    meta,
    getCategorias,
    salvarCategoria,
    excluirCategoria,
    proximaPagina,
    paginaAnterior
  }
})
