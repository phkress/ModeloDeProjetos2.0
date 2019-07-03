<template>
  <div id="cardProfile">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Profile">
          <b-card-text>
            {{nome}} {{sobreNome}}
          </b-card-text>
          <b-card-text>
            Setor:{{role}}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </div>
</template>
<script>
export default {
  name: "cardProfile",
  props:{
    nome: String,
    sobreNome: String,
    role: String,
  },
  data: () => ({

  })
}
</script>
<style lang="css" scoped>
</style>
