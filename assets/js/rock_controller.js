import Vue from 'vue'
import socket from "./socket"

export const app = new Vue({
  el:"#app",
  data: {
    message: "Socket abajo!"
  },
  created: function() {
    console.log("Rock Controller Here!!");
    let channel = socket.channel("rock:you", {})
    channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp)
        this.message = "Socket arriba!"
      })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }
});
