<template>
    <v-container>
        <div class="content">
            <h1>{{item.title}}</h1>
            <p>Grundat {{ item.dateOfEstablishment }}</p>
            <p><em v-for="label in item.altLabels">{{ label }}, </em></p>
            <h2>Sökingångar</h2>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Barnbiblioteket Saga</v-card-title>
                        <v-card-text>
                            <p>Titel</p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>Barnteatern</v-card-title>
                        <v-card-text>
                            <p>Titel</p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>Fågel Blå</v-card-title>
                        <v-card-text>
                            <p>Titel</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

<!--             <h3>Medverkade i utgivningen av:</h3>
            <v-row>
                <v-col v-for="contributor in item.contributors" :key="contributor.id">
                    {{contributor.title}}
                </v-col>
            </v-row>  -->
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

onMounted( async() => {
    const response = await fetchItems('items/203'); //fetches the item with id 203 which is svensk läraretidnings förlag
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



</style>