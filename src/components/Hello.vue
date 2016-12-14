<template>
  <header id="vHeader" class="page-topbar">
    <!-- start header nav-->
    <div class="navbar-fixed">
      <nav class="navbar-color">
        <div class="nav-wrapper">
          <ul class="left">
            <li><h1 class="logo-wrapper"><a href="index.html" class="brand-logo darken-1"><img src='~assets/images/materialize-logo.png' alt="materialize logo"></a> <span class="logo-text">Materialize</span></h1></li>
          </ul>
          <div class="header-search-wrapper hide-on-med-and-down">
            <i class="mdi-action-search"></i>
            <input type="text" name="Search" class="header-search-input z-depth-2" placeholder="Explore Materialize"/>
          </div>
          <ul class="right hide-on-med-and-down">
            <li><a href="javascript:void(0);" class="waves-effect waves-block waves-light toggle-fullscreen"><i class="mdi-action-settings-overscan"></i></a>
            </li>
            <li><a href="javascript:void(0);" class="waves-effect waves-block waves-light notification-button" data-activates="notifications-dropdown">
                <i class="mdi-social-notifications"><small class="notification-badge">5</small></i>
                c
            </a>
            </li>
            <li><a href="#" data-activates="chat-out" class="waves-effect waves-block waves-light chat-collapse"><i class="mdi-communication-chat"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <!-- end header nav-->
  </header>
</template>
<script>
export default {
  name: 'vHeader'
}
</script>
