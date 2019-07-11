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
               responsive="sm"
               :items="eItens"
               :fields="eFields"
      >
      <template slot="Lançando" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.lancado"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Aberto" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.aberto"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Pré-Viabilidade" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.preViabilidade"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Orçamento" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.orcamento"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Compras" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.compras"
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
      <template slot="Instalação" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.instalacao"
          :value="row.item"
        >
        </b-form-checkbox>
      </template>
      <template slot="Entregue" slot-scope="row">
        <b-form-checkbox
          v-model="listaEmail.entregue"
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
