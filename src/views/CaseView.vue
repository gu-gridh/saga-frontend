<template>

</template>

<script setup lang="ts">
import { fetchCaseSite } from '@/assets/db';
import { onMounted, ref } from 'vue';

const id = 139 //Lille-Pers vandring

onMounted (() => {
    const response = fetchCaseSite(id as number)
    console.log(response);
});
</script>

<style scoped>
</style>
