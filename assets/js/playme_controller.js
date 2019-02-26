import Vue from 'vue'
import socket from "./socket"
import {Howl, Howler} from 'howler';

export const app = new Vue({
  el:"#playme",
  data: {
    mvn: null,
    message: " 💀 ",
		beta: "",
		gama: "",
		alpha: "",
    orn: "",
		x: null,
		y: null,
		z: null,
    sound_piano: null,
    sound_vocals: null,
    play_status: null,
    piano_status: "",
    vocals_status: ""
  },
  created: function() {
    window.addEventListener('devicemotion', this.motion);
    window.addEventListener('deviceorientation', this.orientation);
    // add howler sounds
    this.sound_piano = new Howl({ src: [ '/sounds/parte3.m4a' ], volume: 1, loop: true});
    this.sound_vocals = new Howl({ src: [ '/sounds/vocals.mp3' ], volume: 0});
    this.sound_vocals.once('load', this.load_vocals);
    this.sound_piano.once('load', this.load_piano);
  },
  methods:{
    load_vocals:function(){ this.vocals_status="ready"},
    load_piano:function(){ this.piano_status="ready"},
    orientation: function(e){
      this.beta = Math.round(e.beta);
      this.gama = Math.round(e.gamma);
      this.alpha = Math.round(e.alpha);
      this.orientation_check();
    },
    motion: function(e){
			this.x = Math.round(e.acceleration.x *10)/10;
			this.y = Math.round(e.acceleration.y *10)/10;
			this.z = Math.round(e.acceleration.z *10)/10;
		},
    orientation_check:function(){
      if( this.x && this.y && this.z && this.beta && this.gama ){
        if( this.beta > 1 && this.beta <15 && this.gama < 5){
          this.orn = "Inclinado";
          this.sound_piano.volume(0);
        } else if( this.beta > 50 && this.beta < 100 && this.gama < 5 ){
          this.orn = "Parado";
          this.sound_piano.volume(0);
        } else if( this.gama > 35 && this.gama < 80){
          this.orn = "De costado";
          this.movement_3();
        }
      }
    },
    movement_3: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.mvn = "";
        this.sound_piano.volume(0);
      } else if (this.x > 3 || this.y > 3 || this.z > 3 ){
        this.mvn = "Lateral";
        this.sound_piano.volume(1);
      } else {
        this.mvn = "";
        this.sound_piano.volume(0);
      }
    },
    movement: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.mvn = "-";
        this.sound_piano.volume(0);
      } else if (this.x > 3){
        this.mvn = "Lateral";
        this.sound_piano.volume(1);
      } else if (this.y > 3){
        this.mvn = "Frontal";
        this.sound_piano.volume(1);
      } else if (this.z > 3){
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
