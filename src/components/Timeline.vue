<template>
    <div class="container">
      <v-timeline start="1890" end="1912"  class="time">
    <v-timeline-item
        v-for="(entry, index) in timelineData"
        :key="index"
        dot-color="green-lighten-1"
        size="x-small"
        class="timeline-item"
        :side="entry.SLF.length ? 'start' : 'end'" 
    >
        <template v-slot:opposite>
            {{ entry.year }}
        </template>
            <v-card class="ma-4 expandable-card" elevation="2" variant="tonal">
                <v-card-text>
                    <!-- SLF Events (Left) -->
                    <div v-if="entry.SLF.length">
                        <h3 class="headline font-weight-light mb-2 text-primary">
                            Svensk Läraretidnings förlag
                        </h3>
                        <p v-for="(event, idx) in entry.SLF" :key="`slf-${idx}`">
                            {{ event }}
                        </p>
                    </div>

                    <!-- FBF Events (Right) -->
                    <div v-if="entry.FBF.length" class="mt-4">
                        <h3 class="headline font-weight-light mb-2 text-secondary">
                            Folkskolans barntidning förlag
                        </h3>
                        <p v-for="(event, idx) in entry.FBF" :key="`fbf-${idx}`">
                            {{ event }}
                        </p>
                    </div>
                </v-card-text>
            </v-card>
        
    </v-timeline-item>
</v-timeline>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import timeline from '@/assets/timeline.json'

const timelineData = ref(timeline.data)
const expandedIndex = ref<number | null>(null)

const toggleExpand = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}



</script>

<style scoped>
.container {
display: flex;
  position: relative;
    justify-content: center;
}

.time {
  position: relative;
}

.expandable-content {
  position: relative;
}



.timeline-item {
  cursor: pointer;
} 


</style>