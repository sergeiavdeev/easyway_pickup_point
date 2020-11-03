<template>
<div>
    <div class="nav flex-column fixed-top d-none d-lg-block" aria-orientation="vertical" id="v-pills-tab" role="tablist">        
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==0}" href="#" v-on:click="ordersSetTab(0)">Все</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==1}" href="#" v-on:click="ordersSetTab(1)">Принять</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==2}" href="#" v-on:click="ordersSetTab(2)">Выдать</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==3}" href="#" v-on:click="ordersSetTab(3)">Оприходовать</a>
        <a class="nav-link" data-toggle="pill" role="tab" v-bind:class="{active: ordersTab==4}" href="#" v-on:click="ordersSetTab(4)">Вернуть</a>
    </div>

    <nav class="navbar navbar-expand navbar-light bg-light fixed-bottom d-lg-none">
        <div class="collapse navbar-collapse" id="navbar_bottom">
            <ul class="navbar-nav justify-content-center">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        </div>       
    </nav>
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