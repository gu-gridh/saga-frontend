<template>
    <v-container>
        <v-sheet :elevation="2" class="mx-auto pa info">
        <v-sheet :elevation="2" class="mx-auto pa-5">
            <h1>Produktionerna</h1>
            <p>Produktionerna är en viktig del av Saga-arkivet. Här kan du läsa om de olika produktionerna som gjordes under årens lopp.</p>
        </v-sheet>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { fetchItems } from '@/assets/db';
import { onMounted } from 'vue';

onMounted( async() => {
    const response = await fetchItems('items/203');
    console.log('fetching items', response);
});
</script>

<style scoped>
.info {
    width: 90%;
}

</style>