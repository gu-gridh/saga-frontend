<template>
  <v-app :theme="theme">
    <v-app-bar class="main-nav">
      <v-toolbar-title><router-link to="/"><v-btn icon="mdi-home"></v-btn></router-link> SagaArkivet</v-toolbar-title>     
      <router-link to="/tidslinje"><v-btn>Tidslinje</v-btn></router-link>
      <v-btn>Förlagsarbetet</v-btn>
      <router-link to="/produktioner"><v-btn>Produktionerna</v-btn></router-link>
      <v-btn>Arkivförteckningarna</v-btn>
      <v-spacer></v-spacer>
      <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
    </v-app-bar>
    <v-main class="">
      <div class="main">
        <RouterView />
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {RouterView } from 'vue-router'
import Footer from './components/Footer.vue'

const theme = ref('light')  

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}


</script>



<style scoped>
.main {
  padding-top: 50px;
}

.main-nav {
  color: #E77F11 !important;
  font-family: "Barlow Condensed", serif;
  font-weight: 500;
  font-style: normal;
}

.main-nav .v-btn {
  font-size: 16px !important;
  color: #E77F11 !important;
}
</style>
