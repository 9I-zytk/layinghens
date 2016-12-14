<template>
    <!-- START MAIN -->
 <div id="main">
    <vHeader></vHeader>
    <!-- START WRAPPER -->
    <div class="wrapper">
      <div class="nav-container nav-fixed nav-vertical bg-dark">
        <left-sidebar></left-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
  import vHeader from './components/Hello'
  import LeftSidebar from '../SideBar'
  export default {
    components: {
      LeftSidebar,
      vHeader
    }
  }
</script>
