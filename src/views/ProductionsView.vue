<template>
    <v-container>
        <div class="content">
            <h1>{{item.title}}</h1>
            <p>Grundat {{ item.dateOfEstablishment }}</p>
            <p><em v-for="label in item.altLabels">{{ label }}, </em></p>
            <h2>Sökingångar</h2>
            <masonry-wall :items="mockData" :gap="20" :ssr-columns="1" :column-width="320">
                <template #default="{ item }">
                    <v-hover 
                        v-slot="{ isHovering, props }"
                        open-delay="50"
                    >

                    <v-card 
                        :elevation="isHovering ? 10 : 2"
                         v-bind="props"
                         @click="() => $router.push(`/publikation/${item.id}`)"
                    >
                        <img :src="getImageUrl(item.image)" :alt="item.title" class="smallImg">
                        <v-card-title>{{item.title}}</v-card-title>
                    </v-card>
                </v-hover>
                </template>
            </masonry-wall>

        </div>
    </v-container>
</template>

<script setup lang="ts">
import { fetchItems } from '@/assets/db';
import { ref, onMounted } from 'vue';

interface Contributor {
    id: string;
    title: string;
}

interface Item {
    title: string;
    dateOfEstablishment: string;
    contributors: Contributor[];
    altLabels: string[];
}

const item = ref<Item>({
    title: '',
    dateOfEstablishment: '',
    contributors: [],
    altLabels: [],
});

function getImageUrl(imageName: string): string {
    return new URL(`../images/${imageName}`, import.meta.url).href;
}

const mockData = [
    {
        title: 'Barnbiblioteket Saga',
        image: 'saga.jpg',
        id: 5989,
    },
    {
        title: 'Barnteatern',
        image: 'barnteatern.jpg',
        id: 6000,
    },
    {
        title: 'Fågel Blå',
        image: 'fagelbla.jpg',
        id: 6015,
    },
    {
        title: 'Jultomten',
        image: 'jultomten.jpg',
        id: 6013,
    },
    {
        title: 'Saga B',
        image: 'sagaB.jpg',
        id: 19075,
    },
    {
        title: 'Sagas Julbok',
        image: 'sagasjulbok.jpg',
        id: 19074,
    },
    {
        title: 'Silvervit',
        image: 'silvervit.jpg',
        id: 6016,
    },
    {
        title: 'Stjärnböckerna',
        image: 'stjarnbockerna.jpg',
        id: 5990,
    },
    {
        title: 'Titteli-Ture',
        image: 'titteliture.jpg',
        id: 6014,
    }
]

onMounted( async() => {
    const response = await fetchItems('items', '203'); //fetches the item with id 203 which is svensk läraretidnings förlag
    item.value = await transformApiResponse(response);
});

//this function is used to transform the API response to a more readable format
function transformApiResponse(apiResponse: any): any {
  return {
    context: apiResponse["@context"],
    id: apiResponse["@id"],
    type: apiResponse["@type"],
    itemId: apiResponse["o:id"],
    isPublic: apiResponse["o:is_public"],
    owner: apiResponse["o:owner"],
    resourceClass: apiResponse["o:resource_class"],
    resourceTemplate: apiResponse["o:resource_template"],
    title: apiResponse["o:title"],
    thumbnailUrls: apiResponse["thumbnail_display_urls"],
    created: apiResponse["o:created"]["@value"],
    modified: apiResponse["o:modified"]["@value"],
    primaryMedia: apiResponse["o:primary_media"],
    media: apiResponse["o:media"],
    itemSet: apiResponse["o:item_set"],
    site: apiResponse["o:site"],
    name: apiResponse["foaf:name"]?.[0]?.["@value"],
    altLabels: apiResponse["skos:altLabel"]?.map((label: any) => label["@value"]),
    dateOfEstablishment: apiResponse["rdau:P60524"]?.[0]?.["@value"],
    categoryOfResource: apiResponse["rdau:P60058"]?.[0]?.["@value"],
    contributors: apiResponse["@reverse"]?.["dcterms:contributor"]?.map((contributor: any) => ({
      id: contributor["@id"],
      title: contributor["o:title"],
    })),
  };
}
</script>

<style scoped>
.info {
    width: 90%;
}

.v-card {
    text-align: center;
    cursor: pointer;
    padding-top: 5px;
    max-width: 320px;
}

.v-card img {
    width: 300px;
    height: auto;
}

.smallImg {
    border-radius: 5px;
}

.masonry-column {
    flex-basis: 0px !important;
}

</style>