<template>
    <v-container>
        <div class="content">
            <h1>Barnbiblioteket Saga</h1>
            <h2>Serier</h2>
            <v-infinite-scroll :items="items" :onLoad="loadMore" :height="1000" :offset="600" class="scroller">
                <v-row>
                    <v-col v-for="child in items" :key="child['o:id']" cols="3" v-memo="[child['o:id']]">
                        <v-card>
                            <v-card-text class="card-text">
                              <v-img 
                                :src="child['thumbnail_display_urls']['large']" height="350px"
                                contain
                                v-lazy>
                              </v-img>
                                  {{ child['o:title'] }}
                                  <v-icon color="#93272C" class="align-end" @click="expand(child['o:id'])">mdi-chevron-down</v-icon>

                                <!--expendable content-->
                                <!-- <div class="expand">
                                  <p v-for="vers in child['@reverse']['dcterms:isPartOf']" :key="vers['o:id']">fetch data with id</p>
                                </div> -->
                                
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-infinite-scroll>
        </div>
    </v-container>
</template>

<script setup lang="ts">

import {  ref, onMounted, computed, shallowRef } from 'vue'
import type { SagaVerk } from '@/types'

const num = ref(30) //used for pagination
const page = ref(1)
const isLoading = ref(false) 
const hasMoreData = ref(true) 

const items = shallowRef<SagaVerk[]>([]) // better performace than ref for this amount of data

const api = computed (() => `https://saga.dh.gu.se/api/items?pretty_print=1&amp;resource_template_id=11&per_page=${num.value}&page=${page.value}&amp;property[0][property]=dcterms:isPartOf&property[0][text]=5989&property[0][type]=eq`)

const getItem = async () => {
  if (isLoading.value || !hasMoreData.value) return
  isLoading.value = true

  try {
    const response = await fetch(api.value, {
      method: 'GET',
      credentials: "include"
    })
    const data = await response.json()

    if (data.length === 0) {
      hasMoreData.value = false
    } else {
      requestIdleCallback(() => {
        data.forEach(item => items.value.push(item))
      })
      page.value++
    }
  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async ({ done }: { done: () => void }) => {
  console.log('Load more triggered')
  await getItem()
  done() // Tell v-infinite-scroll that loading is complete
}

onMounted(() => {
  getItem()
})

const expand = (id: number) => {
  console.log('expand', id)
}
 
</script>

<style scoped>

.card-text {
    text-align: center;
    font-size: 18px;
}

.expand {
    display: flex;
    justify-content: right;
    cursor: pointer;
}

.scroller {
    overflow-x: hidden;
    overflow-y: none;
}

</style>