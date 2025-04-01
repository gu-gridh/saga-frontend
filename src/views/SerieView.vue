<template>
    <v-container>
        <div class="content">
            <h1>{{ serie?.title }}</h1>
            <h2>Serier</h2>
            <ul>
                <li v-for="(serie, index) in serie?.isPartOf || []" :key="index">
                    <!-- <router-link :to="{ name: 'serie', params: { id: serie['o:id'] } }"> -->
                        {{ serie['o:title'] }}
                    <!-- </router-link> -->
                </li>
            </ul>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { fetchItems } from '@/assets/db';
import type { SagaSerie } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';



const id = useRoute().params.id; 
const serie = ref<SagaSerie | null>(null);

onMounted(async () => {
    //fetch the serie
    const response = await fetchItems('items', id as string);
    console.log(response);
    serie.value = translateResponse(response);
    console.log(serie.value);
});

const translateResponse = (item: any): SagaSerie => {
        return {
            id: item['o:id'],
            title: item['o:title'],
            isPartOf: item['@reverse']['dcterms:isPartOf'], //array
        };
};
</script>

<style scoped>
</style>