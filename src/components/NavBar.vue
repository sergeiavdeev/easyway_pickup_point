<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">ПЭК:EayWay</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-bind:class="{active: navPage == 0}">
                    <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#" v-on:click="navSetPage(0)">Грузы<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item" v-bind:class="{active: navPage == 1}">
                    <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#"  v-on:click="navSetPage(1)">Документы</a>
                </li>
                <li class="nav-item" v-bind:class="{active: navPage == 2}">
                    <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" href="#" v-on:click="navSetPage(2)">Отчеты</a>
                </li>
            </ul>
            <button class="btn btn-outline-light my-2 my-sm-0" type="button" v-on:click="exit">Выйти</button>
        </div>
    </nav>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "NavBar",
    computed: mapGetters(["navPage"]),
    methods: mapActions(["exit", "navSetPage"])
  }
</script>

<style scoped>

</style>
