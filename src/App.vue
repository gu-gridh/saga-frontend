<template>
  <v-app :theme="theme" >
    <!--if mobile. use navigation drawer-->
    <v-app-bar v-if="width < 1000">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><router-link to="/"></router-link> SagaArkivet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>

    </v-app-bar>
    <!--if desktop, use regular app bar-->
    <v-app-bar app class="main-nav" v-else>
      <v-toolbar-title><router-link to="/"><img src="https://saga.dh.gu.se/files/asset/622a1fdd562c8a7358d57204ec5220a73b29a7e4.png" class="icon"/></router-link></v-toolbar-title>     
      <router-link to="/tidslinje"><v-btn>Tidslinje</v-btn></router-link>
      <v-btn>Förlagsarbetet</v-btn>
      <router-link to="/publikationer"><v-btn>Publikationer</v-btn></router-link>
      <router-link to="/case"><v-btn>Tematiska fördjupningar</v-btn></router-link>
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
        <!-- nav drawer if mobile-->
         <v-navigation-drawer v-model="drawer" app v-if="width < 1000">
          <v-list>
            <v-list-item>

                <v-list-item-title>Tidslinje</v-list-item-title>

            </v-list-item>
            <v-list-item>

                <v-list-item-title>Produktioner</v-list-item-title>

            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <RouterView />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'
import Footer from '@/components/Footer.vue'

const theme = ref('light')  
const drawer = ref(false)

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const { mobile, width } = useDisplay()



onMounted(() => {
  if (mobile.value) {
    drawer.value = false // Close drawer if mobile
    console.log('Mobile device detected')
  }
})

</script>



<style scoped>
.main {
  padding-top: 50px;
  padding-bottom: 90px;
}

.main-nav {
  color: #93272C !important;
  font-family: "Barlow Condensed", serif;
  font-weight: 500;
  font-style: normal;
}

.main-nav .v-btn {
  font-size: 18px !important;
  color: #93272C !important;
  font-style: 700 !important;
}

.router-link-active  {
  border-bottom: 2px solid #93272C;
  color: #93272C !important; /* Optional: Different color for active link */
}

.icon {
  width: 35px;
  height: auto;
}
</style>
