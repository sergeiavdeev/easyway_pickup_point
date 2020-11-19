<template>
    <form>
        <h1>Авторизация</h1>
        <div class="form-label-group">
            <input type="text" id="inputEmail" class="form-control" placeholder="Имя пользователя" required=""
                   autofocus="" v-model="login" :readonly="userIsWaiting">
            <label for="inputEmail">Имя пользователя</label>
        </div>
        <div class="form-label-group">
            <input type="password" id="inputPassword" class="form-control" placeholder="Пароль" required="" 
                v-model="password" :readonly="userIsWaiting">
            <label for="inputPassword">Пароль</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block mb-3" :disabled="userIsWaiting" v-on:click="auth({login, password})" type="button">Войти</button>
        <Wait v-if="userIsWaiting" />
    </form>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import Wait from '../Wait';

  export default {
    name: "AuthForm",
    data: () => {
      return {
        login: "ЯНВАРЬ1",
        password: "DGEFDKWO"
      }
    },
    components: {
        Wait
    },
    methods: mapActions(["auth"]),
    computed: mapGetters(["userIsWaiting"])
  }
</script>

<style scoped>

    form {
        width: 100%;
        max-width: 420px;
        padding: 15px;
        margin: auto;
    }

    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-label-group input,
    .form-label-group label {
        height: 3.125rem;
        padding: .75rem;
    }

    .form-label-group label {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        margin-bottom: 0; /* Override default `<label>` margin */
        line-height: 1.5;
        color: #495057;
        pointer-events: none;
        cursor: text; /* Match the input under the label */
        border: 1px solid transparent;
        border-radius: .25rem;
        transition: all .1s ease-in-out;
    }

    .form-label-group input::-webkit-input-placeholder {
        color: transparent;
    }

    .form-label-group input::-moz-placeholder {
        color: transparent;
    }

    .form-label-group input:-ms-input-placeholder {
        color: transparent;
    }

    .form-label-group input::-ms-input-placeholder {
        color: transparent;
    }

    .form-label-group input::placeholder {
        color: transparent;
    }

    .form-label-group input:not(:-moz-placeholder-shown) {
        padding-top: 1.25rem;
        padding-bottom: .25rem;
    }

    .form-label-group input:not(:-ms-input-placeholder) {
        padding-top: 1.25rem;
        padding-bottom: .25rem;
    }

    .form-label-group input:not(:placeholder-shown) {
        padding-top: 1.25rem;
        padding-bottom: .25rem;
    }

    .form-label-group input:not(:-moz-placeholder-shown) ~ label {
        padding-top: .25rem;
        padding-bottom: .25rem;
        font-size: 12px;
        color: #777;
    }

    .form-label-group input:not(:-ms-input-placeholder) ~ label {
        padding-top: .25rem;
        padding-bottom: .25rem;
        font-size: 12px;
        color: #777;
    }

    .form-label-group input:not(:placeholder-shown) ~ label {
        padding-top: .25rem;
        padding-bottom: .25rem;
        font-size: 12px;
        color: #777;
    }


</style>
