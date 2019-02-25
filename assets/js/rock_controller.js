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
    sound_piano: null,
    sound_vocals: null,
    play_status: null,
    piano_status: "",
    vocals_status: ""
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
    // add howler sounds
    this.sound_piano = new Howl({ src: [ '/sounds/piano.wav' ], volume: 1 });
    this.sound_vocals = new Howl({ src: [ '/sounds/vocals.wav' ], volume: 1});
    this.sound_vocals.once('load', this.load_vocals);
    this.sound_piano.once('load', this.load_piano);
  },
  methods:{
    load_vocals:function(){ this.vocals_status="ready"},
    load_piano:function(){ this.piano_status="ready"},
    motion: function(e){
			this.x = Math.round(e.acceleration.x *10)/10;
			this.y = Math.round(e.acceleration.y *10)/10;
			this.z = Math.round(e.acceleration.z *10)/10;
      this.movement();
		},
    movement: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.mvn = "-";
        this.sound_piano.volume(0);
      } else if (this.x > 5){
        this.mvn = "Lateral";
        this.sound_piano.volume(1);
      } else if (this.y > 5){
        this.mvn = "Frontal";
        this.sound_piano.volume(1);
      } else if (this.z > 5){
        this.mvn = "Descendente";
        this.sound_piano.volume(1);
      } else{
        this.sound_piano.volume(0);
        this.mvn = "...";
      }
    },
    play: function(){
      this.sound_vocals.play();
      this.sound_piano.play();
      this.sound_piano.volume(0)
      this.play_status = "Comenzando la prueba...";
    }
  }
});
