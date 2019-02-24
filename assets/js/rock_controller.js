import Vue from 'vue'
import socket from "./socket"

export const app = new Vue({
  el:"#app",
  data: {
    message: "Socket abajo!",
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
   		this.beta = e.beta;
   		this.gama = e.gamma;
   		this.alpha = e.alpha;
    },
    motion: function(e){
   		this.abeta = e.rotationRate.beta;
   		this.agama = e.rotationRate.gamma;
   		this.aalpha = e.rotationRate.alpha;
			this.x = e.acceleration.x;
			this.y = e.acceleration.y;
			this.z = e.acceleration.z;
			this.agx = e.accelerationIncludingGravity.x;
			this.agy = e.accelerationIncludingGravity.y;
			this.agz = e.accelerationIncludingGravity.z;
		}
  }
});
