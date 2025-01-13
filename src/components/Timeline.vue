<template>
    <div class="container">
        <v-timeline start="1890" end="1912" direction="horizontal">
            <v-timeline-item
                v-for="(entry, index) in timelineData"
                :key="index"
                :dot-color="getColor()"
                size="x-small"
                class="timeline-item"
                @click="toggleExpand(index)"
            >
                <!-- Year Label -->
                <template v-slot:opposite>
                {{ entry.year }}
                </template>

                <!-- Expandable Content -->
                <div class="expandable-content">
                <!-- Line Connecting Dot to Card -->
                <div
                    v-show="expandedIndex === index"
                    class="line-connector"
                ></div>

                <!-- Expandable Card -->
                <v-card
                    v-show="expandedIndex === index"
                    class="ma-4 expandable-card"
                    elevation="2"
                    variant="tonal"
                >
                    <v-card-text>
                    <!-- SLF Events -->
                    <div v-if="entry.events.SLF.length">
                        <h3 class="headline font-weight-light mb-2 text-primary">Svensk Läraretidnings förlag</h3>
                        <p v-for="(event, idx) in entry.events.SLF" :key="`slf-${idx}`">
                            {{ event }}
                        </p>
                    </div>

                    <!-- FBF Events -->
                    <div v-if="entry.events.FBF.length" class="mt-4">
                        <h3 class="headline font-weight-light mb-2 text-secondary">Folkskolans barntidining förlag</h3>
                        <p v-for="(event, idx) in entry.events.FBF" :key="`fbf-${idx}`">
                            {{ event }}
                        </p>
                    </div>
                    </v-card-text>
                </v-card>
                </div>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import timeline from '@/assets/timeline.json'

const timelineData = ref(timeline.data)
const colors = ['pink', 'indigo', 'green', 'orange', 'teal', 'red', 'purple']
const expandedIndex = ref<number | null>(null)

const toggleExpand = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

const getColor = () => { 
  return "hsl(" + 360 * Math.random() + ',' +
             (75 + 70 * Math.random()) + '%,' + 
             (65 + 10 * Math.random()) + '%)'
}

</script>

<style scoped>
.container {
  position: relative;
}

.expandable-content {
  position: relative;
}

.expandable-card {
  position: absolute;
  top: 150px; /* Place the card 150px below the timeline dot */
  left: 50%;
  transform: translateX(-50%); /* Center the card horizontally */
  width: 300px; /* Adjust as needed */
  z-index: 1; /* Ensure the card is above the line connector */
    
}

.line-connector {
  position: absolute;
  top: 20px; /* Adjust to align with the timeline dot */
  left: 50%;
  height: 200px; /* Ensure it connects to the card */
  width: 3px;
  background-color: grey; /* Customize the line color */
  transform: translateX(-50%);
  
}
</style>