<template>
  <div id="app" class="app">
    <!--<loaderWrapper></loaderWrapper>-->
    <vHeader></vHeader>
    <!-- START MAIN -->
    <div id="main">
      <!-- START WRAPPER -->
      <div class="wrapper">
        <div class="nav-container nav-fixed nav-vertical bg-dark">
          <sidebar></sidebar>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from './components/Hello'
import sidebar from './components/sidebar'
import loaderWrapper from './components/loader'
import './assets/css/materialize.css'
import './assets/css/style.css'
import './assets/css/layout.css'

export default {
  name: 'app',
  components: {
    sidebar,
    vHeader,
    loaderWrapper
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
li{
   list-style-type: none;
}
a {
 text-decoration: none;
}
</style>
