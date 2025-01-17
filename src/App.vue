<template>
  <v-app :theme="theme">
    <v-app-bar class="main-nav">
      <v-toolbar-title>SagaArkivet</v-toolbar-title>     
      <router-link to="/tidslinje"><v-btn>Tidslinje</v-btn></router-link>
      <v-btn>Förlagsarbetet</v-btn>
      <v-btn>Produktionerna</v-btn>
      <v-btn>Arkivförteckningarna</v-btn>
      <v-spacer></v-spacer>
      <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
    </v-app-bar>
    <v-main>
      <div class="main">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {RouterView } from 'vue-router'

const theme = ref('light')  

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}


</script>



<style scoped>
.main {
  padding-top: 50px;
  max-width: 100vw;
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
