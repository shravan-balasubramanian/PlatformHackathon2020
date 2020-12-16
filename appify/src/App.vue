<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  margin: 0;
  min-height: 100%;
  padding: 0;
  position: relative;
  width: 100%;
}
</style>
