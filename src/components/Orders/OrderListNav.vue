<template>
<div>
    <div class="nav flex-column fixed-top d-none d-lg-block" aria-orientation="vertical" id="v-pills-tab" role="tablist">        
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==0}" href="#" v-on:click="ordersSetTab(0)">Все</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==1}" href="#" v-on:click="ordersSetTab(1)">Принять</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==2}" href="#" v-on:click="ordersSetTab(2)">Выдать</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==3}" href="#" v-on:click="ordersSetTab(3)">Оприходовать</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==4}" href="#" v-on:click="ordersSetTab(4)">Вернуть</a>
    </div>
        
    <ul class="nav justify-content-center fixed-bottom d-lg-none bg-light">
        <li class="nav-item">
            <a class="nav-link" href="#" v-bind:class="{active: ordersTab==0}" v-on:click="ordersSetTab(0)"><small>Все</small></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" v-bind:class="{active: ordersTab==1}" v-on:click="ordersSetTab(1)"><small>Принять</small></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" v-bind:class="{active: ordersTab==2}" v-on:click="ordersSetTab(2)"><small>Выдать</small></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" v-bind:class="{active: ordersTab==4}" v-on:click="ordersSetTab(4)"><small>Вернуть</small></a>
        </li>
    </ul>
    
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "OrderListNav",
    computed: mapGetters(["ordersTab"]),
    methods: mapActions(["ordersSetTab"]),
    mounted() {

    } 
}
</script>

<style scoped>

a.active {
    color: black;    
}

.fixed-top {
    top: 70px;
    max-width: 150px;
}



</style>