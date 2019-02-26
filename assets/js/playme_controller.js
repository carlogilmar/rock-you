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
    //sounds
    sound_guitar: null,
    sound_claps: null,
    sound_corum: null,
    sound_vocals: null,
    vocals_status: null,
    guitar_status: null,
    claps_status: null,
    corum_status: null,
    play_flag: null
  },
  created: function() {
    window.addEventListener('devicemotion', this.motion);
    window.addEventListener('deviceorientation', this.orientation);
    // add howler sounds
    this.sound_guitar = new Howl({ src: [ '/sounds/rockyou_guitar.m4a' ], volume: 1, loop: true});
    this.sound_claps= new Howl({ src: [ '/sounds/rockyou_claps1.m4a' ], volume: 1, loop: true});
    this.sound_corum = new Howl({ src: [ '/sounds/rockyou_corum2.m4a' ], volume: 1, loop: true});
    this.sound_vocals = new Howl({ src: [ '/sounds/rockyou_vocals.m4a' ], volume: 1, loop: true});
    this.sound_guitar.once('load', this.load_guitar);
    this.sound_claps.once('load', this.load_claps);
    this.sound_corum.once('load', this.load_corum);
    this.sound_vocals.once('load', this.load_vocals);
  },
  methods:{

    load_guitar:function(){this.guitar_status="ready"},
    load_claps:function(){this.claps_status="ready"},
    load_corum:function(){this.corum_status="ready"},
    load_vocals:function(){ this.vocals_status="ready"},

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
        if( this.beta > 1 && this.beta <15 && this.gama < 5 && this.gama > -5){
          this.orn = "Inclinado";
          this.movement_1();
        } else if( this.beta > 50 && this.beta < 100 && this.gama < 5 && this.alpha < 50){
          this.orn = "Parado";
          this.movement_2();
        } else if( this.gama > 35 && this.gama < 80 && this.alpha > 90 && this.alpha < 140){
          this.orn = "De costado";
          this.movement_3();
        } else if( this.gama < -35 && this.gama > -90 && this.alpha > 90 && this.alpha < 140 && this.beta > 10 && this.beta < 20){
          this.orn = "De costado inverso";
          this.movement_4();
        }
      }
    },
    movement_1: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.mvn = "Inclinado";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      } else if (this.x > 4 || this.y > 4){
        this.mvn = "Inclinado Frontal";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(1);
        this.sound_vocals.volume(0);
      } else{
        this.mvn = "...";
      }
    },
    movement_2: function(){
      if( this.x < 0.5 && this.y < 0.5 && this.z < 0.5 ){
        this.mvn = "Parado";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      } else if (this.x > 4 || this.y > 4){
        this.mvn = "Parado Lateral"; // ia la izquierda
        this.sound_guitar.volume(0);
        this.sound_claps.volume(1);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      } else{
        this.mvn = "...";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      }
    },
    movement_3: function(){
      if( this.x > 3 || this.y > 3 || this.z > 3){
        // de costado
        this.sound_guitar.volume(1);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
        this.mvn = "Costado Guitarra";
      } else {
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
        this.mvn = "-";
      }
    },
    movement_4: function(){
      if( this.x > 3 || this.y > 3 || this.z > 3){
        // de costado
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(1);
        this.mvn = "Costado Inverso";
      } else {
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(1);
        this.mvn = "- Costado Inverso -";
      }
    },
    ms: function(){
      this.sound_guitar.play();
      this.sound_claps.play();
      this.sound_corum.play();
      this.sound_vocals.play();
      this.sound_guitar.volume(0);
      this.sound_claps.volume(0);
      this.sound_corum.volume(0);
      this.sound_vocals.volume(0);
      this.play_flag = "ok";
    }
  }
});
