<template>
    <div>
        <ul class="nav nav-tabs mb-3 mt-3">
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: ordersTab==0}" href="#" v-on:click="ordersSetTab(0)">Все</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: ordersTab==1}" href="#" v-on:click="ordersSetTab(1)">Принять</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: ordersTab==2}" href="#" v-on:click="ordersSetTab(2)">Выдать</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: ordersTab==3}" href="#" v-on:click="ordersSetTab(3)">Оприходовать</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: ordersTab==4}" href="#" v-on:click="ordersSetTab(4)">Вернуть</a>
            </li>
        </ul>

        <div v-if="ordersTab==0">
            <div class="card mt-1" v-for="item in ordersAll" v-bind:key="item.id">
                <p>{{item.common ? item.common.cargoIndex: ""}} статус: {{item.statusName}}</p>
                <p>Мест: {{item.common ? item.common.placeCount : ""}}</p>
                <p>Получатель: {{item.contact ? item.contact.name : ""}}</p>
            </div>
        </div>
        <div v-if="ordersTab==1">
            <div class="card mt-1" v-for="item in ordersAccept" v-bind:key="item.id">
                <p>{{item.common ? item.common.cargoIndex: ""}} статус: {{item.statusName}}</p>
                <p>Мест: {{item.common ? item.common.placeCount : ""}}</p>
                <p>Получатель: {{item.contact ? item.contact.name : ""}}</p>
            </div>
        </div>
        <div v-if="ordersTab==2">
            <div class="card mt-1" v-for="item in ordersGiveOut" v-bind:key="item.id">
                <p>{{item.common ? item.common.cargoIndex: ""}} статус: {{item.statusName}}</p>
                <p>Мест: {{item.common ? item.common.placeCount : ""}}</p>
                <p>Получатель: {{item.contact ? item.contact.name : ""}}</p>
            </div>
        </div>
        <div v-if="ordersError">
            <p>{{ordersErrorObject}}</p>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "OrderList",
    computed: mapGetters(["ordersAll", "ordersTab", "ordersAccept", "ordersGiveOut" ,"ordersError", "ordersErrorObject"]),
    methods: mapActions(["getOrders", "ordersSetTab"]),
    mounted() {
      this.getOrders();
    }
  }
</script>

<style scoped>
</style>
