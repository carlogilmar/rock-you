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

        if( this.beta > -10 && this.beta <15 && this.gama < 30 && this.gama > -30 && this.alpha < 20 || this.alpha > 345){
          this.orn = "Hacia abajo";
          this.movement_1();
        } else if( this.beta > -20 && this.beta <15 && this.gama < 30 && this.gama > -30 && this.alpha < 220 && this.alpha > 130){
          this.orn = "Hacia abajo inverso";
          this.movement_4();
        } else if( this.beta > 50 && this.beta < 100 && this.gama < 70 && this.gama > -70 && this.alpha < 90 || this.alpha > 270){
          this.orn = "Parado";
          this.movement_2();
        } else if( this.beta > -35 && this.beta < 30 && this.gama > 50 && this.gama < 90 && this.alpha > 60 && this.alpha < 100){
          this.orn = "De costado";
          this.movement_3();
        }
      }
    },
    movement_1: function(){
      if( this.x <= 0.3 && this.y <= 0.3 && this.z <= 0.3 ){
        this.mvn = "M1: Pausa";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      } else {
        this.mvn = "M1: Lateral";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(1);
        this.sound_vocals.volume(0);
      }
    },
    movement_2: function(){
      if( this.x <= 0.3 && this.y <= 0.3 && this.z <= 0.3 ){
        this.mvn = "M2: Pausa";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      } else {
        this.mvn = "M2: Lateral"; // ia la izquierda
        this.sound_guitar.volume(0);
        this.sound_claps.volume(1);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      }
    },
    movement_3: function(){
      if( this.x >= 2 || this.y >= 2 || this.z >= 2){
        // de costado
        this.sound_guitar.volume(1);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
        this.mvn = "M3: Costado";
      } else {
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
        this.mvn = "M3: Pausa";
      }
    },
    movement_4: function(){
      if( this.x <= 0.3 && this.y <= 0.3 && this.z <= 0.3 ){
        this.mvn = "M4: Pausa";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(0);
      } else{
        this.mvn = "M4: Inverso";
        this.sound_guitar.volume(0);
        this.sound_claps.volume(0);
        this.sound_corum.volume(0);
        this.sound_vocals.volume(1);
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
