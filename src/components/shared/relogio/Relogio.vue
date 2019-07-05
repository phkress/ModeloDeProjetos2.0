<template>
    <div id="Relogio">

      <div v-if="this.relogio != null" class="format" :class="color">
        D:{{relogio.days}} -
        {{relogio.hours}}:
        {{relogio.minutes}}:
        {{relogio.seconds}}
      </div>

    </div>
</template>
<script>
//https://momentjs.com/ <- Documentação para alterar formato da hora
import moment, { duration }  from 'moment';
export default {
    name: "Relogio",
    props:{
      time: String,
    },
    data(){
        return {
            tempoRegistrado: null,
            tempoAtual: null,
            relogio: null,
            color: 'normal'
        }
    },
    created() {
        //this.tempoRegistrado = moment('1562200337000', 'x');
        this.clock();
    },
    methods: {
      clock(){
        if(this.tempoRegistrado !== null){
          setInterval(()=>{
            
            this.tempoAtual= moment();
            this.relogio = moment.duration(this.tempoAtual.diff(this.tempoRegistrado))._data;

          },1000);
        }else{
          this.setProps();
          //setTimeout(()=>{
            this.clock();
          //},50);
        }
      },
      setProps(){
        this.tempoRegistrado = moment(this.$props.time, 'x');
      },
      setColorbg(){
        if(this.relogio.days >= 1){
            this.color = 'suave';
        }else if(this.relogio.days >= 2){
          this.color = 'deuRuim';
        }

      }
    }
}
</script>
<style scoped>
  #Relogio{
    /* margin:-20px 0px -40px 0px; */
  }
  p{
    /* font-size:14pt; */
  }
  .format{
    padding: 10px;
    margin: 0;
  }
  .suave{
    background-color: #8EDB35;
  }
  .normal{
    background-color: #E8D200;
  }
  .ruim{
    background-color: #F9720E;
  }
  .deuRuim{
    background-color: #DF0000;
  }
  .card-body{
    padding:0.5rem;
  }
</style>
