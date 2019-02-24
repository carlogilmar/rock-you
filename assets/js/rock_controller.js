import Vue from 'vue'
import socket from "./socket"

export const app = new Vue({
  el:"#app",
  data: {
    mvn: null,
    message: "Socket abajo!",
    message_x: "",
    message_y: "",
    message_z: "",
    acc: "Buscando...",
    e1: "-",
    e2: "-",
		beta: "",
		gama: "",
		alpha: "",
		x: "",
		y: "",
		z: "",
		abeta: "",
		agama: "",
		aalpha: "",
		agx: "",
		agy: "",
		agz: ""
  },
  created: function() {
    console.log("Rock Controller Here!!");
    this.channel = socket.channel("rock:you", {});
    this.channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp);
        this.message = "Socket arriba!";
      })
      .receive("error", resp => { console.log("Unable to join", resp) });
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('deviceorientation', this.orientation);
    window.addEventListener('devicemotion', this.motion);
  },
  methods:{
    handleScroll: function(){
      console.log("Scroolll down!!");
      this.acc = "Scroll down";
    },
    orientation: function(e){
   		this.beta = Math.round(e.beta);
   		this.gama = Math.round(e.gamma);
   		this.alpha = Math.round(e.alpha);
    },
    motion: function(e){
   		//this.abeta = Math.round( e.rotationRate.beta );
   		//this.agama = Math.round( e.rotationRate.gamma );
   		//this.aalpha = Math.round( e.rotationRate.alpha );
			this.x = Math.round(e.acceleration.x *10)/10;
			this.y = Math.round(e.acceleration.y *10)/10;
			this.z = Math.round(e.acceleration.z *10)/10;
			this.agx = Math.round(e.accelerationIncludingGravity.x *10)/10;
			this.agy = Math.round(e.accelerationIncludingGravity.y *10)/10;
			this.agz = Math.round(e.accelerationIncludingGravity.z *10)/10;
      this.movement();
		},
    movement: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.message = "El dispositivo está en reposo sobre la mesa";
        this.mvn = "Reposo";
      } else if (this.x > 10){
        this.mvn = "Lateral";
        this.message_x = "X Lateral";
      } else if (this.y > 8){
        this.mvn = "Frontal";
        this.message_y = "Y NorteSur";
      } else if (this.z > 8){
        this.mvn = "Descendente";
        this.message_z = "Z Descendente";
      } else{
        this.message = "...";
        this.message_x = "";
        this.message_y = "";
        this.message_z = "";
      }
    }
  }
});
