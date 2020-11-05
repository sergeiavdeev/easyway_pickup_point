<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand d-none d-lg-block" href="#">ПЭК:EayWay</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <form class="form-inline w-75 d-lg-none">             
            <input class="form-control form-control-sm d-lg-none w-100" type="search" placeholder="Поиск" aria-label="Search" 
                :value="navSearchText" 
                @input="navSetSearchText" 
            />               
        </form> 
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-bind:class="{active: navPage == 0}">
                    <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#" v-on:click="navSetPage(0)">Грузы</a>
                </li>
                <li class="nav-item" v-bind:class="{active: navPage == 1}">
                    <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#"  v-on:click="navSetPage(1)">Документы</a>
                </li>
                <li class="nav-item" v-bind:class="{active: navPage == 2}">
                    <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#" v-on:click="navSetPage(2)">Отчеты</a>
                </li>
            </ul>    
            <input class="form-control mr-sm-5 ml-sm-5 d-none d-lg-block" type="search" placeholder="Поиск" aria-label="Search" 
                :value="navSearchText" 
                @input="navSetSearchText" 
            />        
            <button class="btn btn-outline-light my-2 my-sm-0" type="button" v-on:click="exit">Выйти</button>
        </div>
        
    </nav>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "NavBar",
    computed: mapGetters(["navPage", "navSearchText"]),
    methods: mapActions(["exit", "navSetPage", "navSetSearchText"])    
  }
</script>

<style scoped>

</style>
