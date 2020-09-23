<template>
  <div id="app">
    <NavBar v-if="isAuth"></NavBar>
    <AuthForm v-if="!isAuth"></AuthForm>
    <div class="container mt-5 pt-3" v-if="isAuth">
      <OrderList v-if="navPage==0"></OrderList>
    </div>
  </div>
</template>

<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "@/components/NavBar";
import AuthForm from "@/components/Auth/AuthForm";
import OrderList from "@/components/Orders/OrderList";

import {mapGetters} from 'vuex';

export default {
  name: 'App',
  computed: mapGetters(["isAuth", "navPage"]),
  components: {
    NavBar,
    AuthForm,
    OrderList
  }
}
</script>

<style>

</style>
