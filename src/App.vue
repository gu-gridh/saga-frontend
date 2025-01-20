<template>
  <v-app :theme="theme" >
    <!--if mobile. use navigation drawer-->
    <v-app-bar v-if="width < 1000">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><router-link to="/"><v-btn icon="mdi-home"></v-btn></router-link> SagaArkivet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>

    </v-app-bar>
    <!--if desktop, use regular app bar-->
    <v-app-bar app class="main-nav" v-else>
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
        <!-- nav drawer if mobile-->
         <v-navigation-drawer v-model="drawer" app v-if="width < 1000">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Tidslinje</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Produktioner</v-list-item-title>
              </v-list-item-content>
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
  console.log(width.value)
  if (mobile.value) {
    drawer.value = true
    console.log('Mobile device detected')
  }
})

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
