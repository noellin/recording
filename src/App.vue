<template>
  <div id="app  ">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html {
  height: 100%;
  overflow-y: overlay;
}
body {
  font-size: 16px;
  // font-size:calc(0.5em + 0.5vw);
  background-color: #fff;
  min-height: 100%;
  position: relative;
  padding-bottom: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
