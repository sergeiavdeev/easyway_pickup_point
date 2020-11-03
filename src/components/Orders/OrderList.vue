<template>
    <div class="">        
        <div v-if="ordersTab==0">            
            <Order v-for="item in ordersAll" v-bind:key="item.id" v-bind:order="item"/>            
        </div>
        <div v-if="ordersTab==1">
            <Order v-for="item in ordersAccept" v-bind:key="item.id" v-bind:order="item"/>
        </div>
        <div v-if="ordersTab==2">
            <Order v-for="item in ordersGiveOut" v-bind:key="item.id" v-bind:order="item"/>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Order from './Order';

  export default {
    name: "OrderList",
    computed: mapGetters(["ordersAll", "ordersTab", "ordersAccept", "ordersGiveOut" ,"ordersError", "ordersErrorObject"]),
    methods: mapActions(["getOrders", "ordersSetTab"]),
    components: {
        Order
    },
    mounted() {
      if (this.ordersAll.length == 0) {
        this.getOrders();  
      }
    }
  }
</script>

<style scoped>
    
</style>
