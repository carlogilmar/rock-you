import Vue from 'vue'
import socket from "./socket"
import {Howl, Howler} from 'howler';

export const app = new Vue({
  el:"#app",
  data: {
    mvn: null,
    message: " 😟 ",
    e1: "-",
    e2: "-",
		beta: "",
		gama: "",
		alpha: "",
		x: null,
		y: null,
		z: null,
		abeta: "",
		agama: "",
		aalpha: "",
		agx: "",
		agy: "",
		agz: "",
    sound: null
  },
  created: function() {
    console.log("Rock Controller Here!!");
    this.channel = socket.channel("rock:you", {});
    this.channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp);
        this.message = " 😊 ";
      })
      .receive("error", resp => { console.log("Unable to join", resp) });
    window.addEventListener('devicemotion', this.motion);
    console.log("Inicializando");
    this.sound = new Howl({
      src: [ '/sounds/piano.wav' ],
      autoplay: true,
      volume: 1
    });
    this.sound.play();
  },
  methods:{
    motion: function(e){
			this.x = Math.round(e.acceleration.x *10)/10;
			this.y = Math.round(e.acceleration.y *10)/10;
			this.z = Math.round(e.acceleration.z *10)/10;
      this.movement();
		},
    movement: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.mvn = "-";
      } else if (this.x > 15){
        this.mvn = "Lateral";
      } else if (this.y > 15){
        this.mvn = "Frontal";
      } else if (this.z > 15){
        this.mvn = "Descendente";
      } else{
        this.mvn = "...";
      }
    }
  }
});
