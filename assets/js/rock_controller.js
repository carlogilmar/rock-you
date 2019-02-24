import Vue from 'vue'
import socket from "./socket"

export const app = new Vue({
  el:"#app",
  data: {
    mvn: null,
    message: " 😟 ",
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
        this.message = " 😊 ";
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
        this.mvn = "";
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
