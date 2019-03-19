<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <router-link to="/">Главная</router-link>
        <router-link to="/1">Перейти к State1</router-link>
        <router-link to="/2">Перейти к State2</router-link>
        <router-link to="/3">Перейти к State3</router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Navigation Semaphore'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        text-align: center;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #ff2f2f;
    }
</style>
