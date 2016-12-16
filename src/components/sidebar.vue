<template>
    <div id="sidebar" class="nav-wrapper">
      <!-- START LEFT SIDEBAR NAV-->
      <aside id="left-sidebar-nav">
        <ul id="slide-out" class="side-nav fixed leftside-navigation">
          <li class="user-details cyan darken-2">
            <div class="row">
              <div class="col col s4 m4 l4">
                <img src="~assets/images/avatar.jpg" alt="" class="circle responsive-img valign profile-image">
              </div>
              <div class="col col s8 m8 l8">
                <ul id="profile-dropdown" class="dropdown-content">
                  <li><a href="#"><i class="mdi-action-face-unlock"></i> Profile</a>
                  </li>
                  <li><a href="#"><i class="mdi-action-settings"></i> Settings</a>
                  </li>
                  <li><a href="#"><i class="mdi-communication-live-help"></i> Help</a>
                  </li>
                  <li class="divider"></li>
                  <li><a href="#"><i class="mdi-action-lock-outline"></i> Lock</a>
                  </li>
                  <li><a href="#"><i class="mdi-hardware-keyboard-tab"></i> Logout</a>
                  </li>
                </ul>
                <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates="profile-dropdown">John Doe<i class="mdi-navigation-arrow-drop-down right"></i></a>
                <p class="user-roal">Admin</p>
              </div>
            </div>
          </li>
          <li class="bold active"><a href="/" class="waves-effect waves-cyan"><i class="mdi-action-home"></i> 主页</a></li>
          <li class="no-padding">
            <ul class="collapsible collapsible-accordion">
              <li v-for="menu in menus" class="bold" @click="selected(menu.name)" :class="{ active: menu.name===select }">
                  <a class="collapsible-header  waves-effect waves-cyan"><i :class='menu.iconClass'></i>{{menu.name}}</a>
                  <div class="collapsible-body">
                    <ul>
                      <li v-for='item in menu.items'>
                        <router-link :to="{ name: item.herf }">{{item.name}}</router-link>
                    </ul>
                  </div>
              </li>
            </ul>
          </li>
        </ul>
        <a href="#" data-activates="slide-out" class="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only cyan"><i class="mdi-navigation-menu"></i></a>
      </aside>
      <!-- END LEFT SIDEBAR NAV-->
    </div>
 </template>
<script>
export default {
  name: 'sidebar',
  data () {
    return {
      select: {},
      menus: [{
        name: '基础信息采集',
        herf: 'home',
        iconClass: 'mdi-action-description',
        items: [{
          name: '雏鸡信息',
          description: '蛋鸡批次信息维护',
          herf: '404',
          iconClass: 'fa-home'
        },
        {
          name: '其他成本管理',
          description: '用于计算其他成本',
          herf: 'otherCost',
          iconClass: 'fa-home'
        }
        ]},
      {
        name: '鸡蛋信息',
        herf: 'home',
        iconClass: 'mdi-editor-insert-comment',
        items: [{
          name: '日产量',
          description: '跟踪每日产量',
          herf: 'dailyInfo',
          iconClass: 'fa-home'
        },
        {
          name: '雏鸡信息',
          description: '跟踪每日产量',
          herf: 'chickInfo',
          iconClass: 'fa-home'
        }]
      },
      {
        name: '疫苗',
        herf: 'home',
        iconClass: 'mdi-action-invert-colors',
        items: [{
          name: '疫苗',
          description: '蛋鸡批次信息维护',
          herf: 'vaccine',
          iconClass: 'fa-home'
        }]
      },
      {
        name: '饲料',
        herf: 'home',
        iconClass: 'mdi-action-shopping-cart',
        items: [{
          name: '全价料',
          description: '直接购买的混合料',
          herf: 'fullPrice',
          iconClass: 'fa-home'
        },
        {
          name: '混合料',
          description: '砂,玉米,豆柏',
          herf: 'mixedFeed',
          iconClass: 'fa-home'
        }
        ]
      },
      {
        name: '统计信息',
        herf: 'home',
        iconClass: 'mdi-editor-insert-chart',
        items: [{
          name: '成本统计',
          description: '某批次雏鸡成本统计',
          herf: 'costTotal',
          iconClass: 'fa-home'
        },
        {
          name: '产蛋量情况一览',
          description: '区域时间内产蛋率',
          herf: 'eggProRate',
          iconClass: 'fa-home'
        },
        {
          name: '盈利统计',
          description: '批次盈利情况',
          herf: 'profit',
          iconClass: 'fa-home'
        }
        ]
      }]
    }
  },
  methods: {
    selected: function (value) {
      this.select = this.select === value ? {} : value
    }
  }
}
</script>
<style>
.active .collapsible-body
{
  display:block;
}
</style>






