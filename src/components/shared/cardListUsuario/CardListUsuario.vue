<template>
  <div id="cardListaUsuario">
    <b-card title="Lista de Usuario">
      <b-card-text>
        Lista dos usuarios cadastrados no sistema e seus setores
      </b-card-text>
      <b-card-text>
        <b-table striped hover :fields="tfields" :items="titens">
          <template slot="ação" slot-scope="row">
            <b-button size="sm" variant="danger"  @click="excluir(row.index, row.item._id)">
              Excluir
            </b-button>
          </template>
        </b-table>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>

export default {
  name: "cardListaUsuario",
  props:{
    titens: Array,
    tfields: Array,
  },
  data: () => ({
  }),
  methods: {
    excluir(index,id){
      this.$emit('excluir-usuario-lista',{
          'index':index,
          'id':id
      })
    }
  },
  created(){
  }
}
</script>
<style lang="css" scoped>
</style>
