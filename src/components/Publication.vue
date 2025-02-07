<template>
    <v-container>
        <div class="content">
            <h1>{{ item.title }}</h1>
            <p><b>Utgivare:</b></p>
            <p v-for="pub in item.publisher">{{ pub.display_title }}</p>
            <p><b>Alternativa titlar:</b></p>
            <p v-for="title in item.altTitles">{{ title['@value']['@value'] }}</p>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { fetchItems } from '@/assets/db';
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Item, Publisher } from '@/types'



const item = ref<Item>({
  title: '',
  altTitles: [],
  publisher: [{} as Publisher],
  children: null,

})
const id = ref('')

const route = useRoute()

const getItem = async (id: string) => {
    const response = await fetchItems('items', id)
    console.log(response)
    item.value = transformApiResponse(response)
}

watch(
  () => route.params.id,
  (newId, oldId) => {
    id.value = Array.isArray(newId) ? newId[0] : newId
    getItem(id.value)
  }
)

onMounted(() => {
  id.value = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  getItem(id.value)
})

const transformApiResponse = (response: any) => {
  return {
    children: response["@context"],
    altTitles: response["dcterms:alternative"].map((alt: any) => ({ '@value': alt })),
    publisher: response["dcterms:publisher"],
    title: response["o:title"],  
  }
}   
</script>

<style scoped>

</style>