<template>
    <div id="Relogio">

      <div v-if="this.relogio != null" class="format" :class="color">
        D:{{relogio.days}} - H:
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
            color: 'suave'
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
            let tclock
            this.tempoAtual= moment();
            tclock = moment.duration(this.tempoAtual.diff(this.tempoRegistrado))._data;
            this.convertClock(tclock);
            this.setColorbg();
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
      convertClock(tclock){
        this.relogio ={}
        this.relogio.days = tclock.days;
        this.relogio.hours = moment().hours(tclock.hours).format('HH')
        this.relogio.minutes = moment().minutes(tclock.minutes).format('mm')
        this.relogio.seconds = moment().seconds(tclock.seconds).format('ss')
      },
      setColorbg(){
        if(this.relogio.days == 1){
            this.color = 'normal';
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
    border-radius: 20px;
  }
  .suave{
    background-color: #20c997;
  }
  .normal{
    background-color: #ffc107;
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
