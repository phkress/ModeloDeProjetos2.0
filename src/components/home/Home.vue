<template lang="html">
  <div class="Home">
    <b-container fluid>
    <list></list>
  </b-container>
  </div>
</template>

<script>
import ListaFormularios from '../shared/listaFormularios/ListaFormularios.vue';
export default {
  components: {
    'list' : ListaFormularios,
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css">
</style>
