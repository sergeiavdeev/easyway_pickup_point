<template>
  <div id="app">
    <NavBar v-if="isAuth"></NavBar>
    <AuthForm v-if="!isAuth"></AuthForm>    
    <div class="container-fluid" v-if="isAuth">
      <div class="row">
        <div class="col-0 col-lg-2">
          <OrderListNav v-if="navPage==0"></OrderListNav>
        </div>
        <div class="col">
          <OrderList v-if="navPage==0"></OrderList>
        </div>  
        <div class="col-0 col-lg-2">
        </div>      
      </div>
      
    </div>
  </div>
</template>

<script>
import ('bootstrap');
import ('bootstrap/dist/css/bootstrap.min.css');
import NavBar from "@/components/NavBar";
import AuthForm from "@/components/Auth/AuthForm";
import OrderList from "@/components/Orders/OrderList";
import OrderListNav from "@/components/Orders/OrderListNav";

import {mapGetters} from 'vuex';

export default {
  name: 'App',
  computed: mapGetters(["isAuth", "navPage"]),
  components: {
    NavBar,
    AuthForm,
    OrderList,
    OrderListNav
  }
}
</script>

<style>
body {
  margin-top: 60px !important;
}
</style>
