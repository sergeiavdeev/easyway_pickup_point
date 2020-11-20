<template>
    <div class="">
        <Wait v-if="ordersIsWaiting" />        
        <div v-if="ordersTab==0">            
            <Order v-for="item in allFilter" v-bind:key="item.id" v-bind:order="item"/>            
        </div>       
        <div v-if="ordersTab==2">
            <Order v-for="item in giveOutFilter" v-bind:key="item.id" v-bind:order="item"/>
        </div>        
         <div v-if="ordersTab==3">
            <Order v-for="item in acceptFilter" v-bind:key="item.id" v-bind:order="item"/>
        </div>
        <p v-if="ordersHasReadyAccept">Есть чего принять</p>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Order from './Order';
  import Wait from '../Wait';

  export default {
    name: "OrderList",
    computed: {
      ...mapGetters(["ordersAll", "ordersTab", "ordersAccept", "ordersGiveOut" ,"ordersError", "ordersErrorObject", "ordersIsWaiting", "navSearchText", "ordersHasReadyAccept"]),
      allFilter: function() {
        return this.ordersAll.filter((item) => {
          return this.search(item);
        });
      },
      giveOutFilter: function() {
        return this.ordersGiveOut.filter((item) => {
          return this.search(item);
        });
      },
      acceptFilter: function() {
        return this.ordersAccept.filter((item) => {
          return this.search(item);
        });
      }
      },
    methods: {
      ...mapActions(["getOrders", "ordersSetTab"]),

      search: function(order) {
        if (this.navSearchText != "") {
            return order.common.cargoIndex.toUpperCase().includes(this.navSearchText.toUpperCase()) || 
              order.contact.name.toUpperCase().includes(this.navSearchText.toUpperCase())
        }
        return true;  
      }
    },
    components: {
        Order,
        Wait
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
