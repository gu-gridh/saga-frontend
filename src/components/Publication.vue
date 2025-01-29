<template>
    <v-container>

    </v-container>
</template>

<script setup lang="ts">
import { fetchItems } from '@/assets/db';
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const item = ref({})
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
    altTitle: response["dcterms:alternative"],
    publisher: response["dcterms:publisher"],
    title: response["o:title"],  
    itemSet: response["o:item_set"],

  }
}   
</script>

<style scoped>

</style>