<template>
  <v-app :theme="theme">
    <v-app-bar color="primary">
      <v-toolbar-title>SagaArkivet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
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

</style>
