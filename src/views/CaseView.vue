<template>

</template>

<script setup lang="ts">
import { fetchCaseSite } from '@/assets/db';
import { onMounted, ref } from 'vue';


onMounted (() => {
    const response = fetchCaseSite()
    console.log(response);
});
</script>

<style scoped>
</style>