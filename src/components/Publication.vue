<template>
  <v-container>
      <div class="content">
          <h1>Barnbiblioteket Saga</h1>
          <h2>Serier</h2>
              <v-row>
                  <v-col v-for="child in items" :key="child['o:id']" cols="12" xs="12" sm="6" md="3"  >
                    <router-link :to="{ name: 'serie', params: { id: child['o:id'] } }">
                      <v-card>
                          <v-card-text class="card-text">
                          <span class="bookNr" v-if="child['bibo:number']?.[0]?.['@value']">Barnbiblioteket Saga: {{ child['bibo:number'][0]['@value'] }}</span>
                              <v-img 
                                  :src="child['thumbnail_display_urls']?.['medium'] || 'default-placeholder.jpg'" 
                                  height="200px"
                                  >
                              </v-img>

                              {{ child['o:title'] }}
                              <v-icon class="fwd-icon">mdi-chevron-right</v-icon>
                          </v-card-text>
                      </v-card>
                    </router-link>
                  </v-col>
              </v-row>
              <!--pager-->
            <div class="pager">
                <v-row justify="center">
                  <v-col cols="11">
                      <v-pagination
                        v-model="page"
                        :length="totalpages"
                        :total-visible="7"
                        class="my-4"
                      ></v-pagination>
                      <!-- input for page selection -->
                  </v-col>
                  <v-col cols="1">
                    <v-text-field
                      v-model="page"
                      label="Välj sida"
                      variant="solo"
                      type="number"
                      min="1"
                      :max="totalpages"
                      class="pageSelect"
                    ></v-text-field>
                  </v-col>
                </v-row>

            </div>
      </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { SagaVerk } from '@/types'

const num = ref(24) // Number of items per page
const totNum = ref() // Total number of items
const page = ref(1) //as number or string
const totalpages = ref(100) //todo fetch from api

const items = ref<SagaVerk[]>([]) 


const api = computed(() => 
`https://saga.dh.gu.se/api/items?pretty_print=1&amp;resource_template_id=11&per_page=${num.value}&page=${page.value}&amp;property[0][property]=dcterms:isPartOf&property[0][text]=5989&property[0][type]=eq`
)

const getItem = async () => {
try {
  const response = await fetch(api.value, {
    method: 'GET',
    credentials: "include"
  })
  items.value = await response.json()
  console.log(items.value)
  
} catch (error) {
  console.error("Error fetching data:", error)
} 
}

//watch for page change
watch(page, async () => {
  await getItem()
})

onMounted(async () => {
  getItem()
  //get total items
  await fetch('https://saga.dh.gu.se/api/infos/items?resource_template_id=11&property[0][property]=%22dcterms:isPartOf%22&property[0][text]=5989&property[0][type]=%22eq%22&sort_by=bibo:number&sort_order=asc', {
    method: 'GET',
    credentials: "include"
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    totNum.value = data.total
    totalpages.value = Math.ceil(totNum.value / num.value)
    console.log(totalpages.value)
  })
})


</script>

<style scoped>
.card-text {
  text-align: center;
  font-size: 18px;
  
}

a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
  text-decoration: none;
}

.expand {
  display: flex;
  justify-content: right;
  cursor: pointer;
  font-size: 10px;
}

.scroller {
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
  padding-right: 5px;
}

.fwd-icon {
  cursor: pointer;
  color: #93272C;
}


.pager {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pageSelect {
  margin-top: 10px;

}

.bookNr {
  font-size: 14px;
  color: #93272C;
}
</style>