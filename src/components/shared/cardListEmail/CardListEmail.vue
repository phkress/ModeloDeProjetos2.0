<template>
  <div id="cardListEmail">
    <b-card bg-variant="light" class="mt-3">
      <b-form-group
        label-cols-lg="2"
        label='Lista de Emails'
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
      </b-form-group>
      <b-table striped
               :items="eItens"
               :fields="eFields"
      >
      <template slot="Projeto" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.projeto"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Compra" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.compra"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Comercial" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.comercial"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Engenharia" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.engenharia"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Financeiro" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.financeiro"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      </b-table>
      <b-button  variant="primary" class="right" @click='salvar()'>
          Salvar
      </b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "cardListEmail",
  props:{
    eItens:Array,
    eFields:Array,
    listaEmail:Object
  },
  data: () => ({
  }),
  methods: {
    salvar(id) {
      this.$emit('salvar-listaDeEmail',id);
    }
  }
}
</script>
<style lang="css" scoped>
</style>
