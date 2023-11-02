<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button color="primary" class="ion-button" :defaultHref="'/liste/' + recette.strCategory" ></ion-back-button>
        </ion-buttons>
        <ion-title>Détail de la recette</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-text-center ion-justify-content-center">
        <ion-img :src="recette.strMealThumb" v-if="imageLoaded" class="resize-image"></ion-img>
        <h1>{{ recette.strMeal }}</h1>
        <p>Origine: {{ recette.strArea }}</p>
        <p>Catégorie: {{ recette.strCategory }}</p>
        <h2>Ingrédients</h2>
        <ion-list>
          <ion-item v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }}
          </ion-item>
        </ion-list>
        <h2>Recette</h2>
        <p>{{ recette.strInstructions }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter, IonImg, IonItem, IonList, IonButton, IonButtons, IonBackButton, IonIcon} from '@ionic/vue';

// Déclarez une interface pour la structure de l'objet recette.value
interface RecetteValue {
  [key: string]: string | undefined;
}

const route = useRoute();



const recette = ref<RecetteValue>({});
const ingredients = ref<string[]>([]);
const imageLoaded = ref(false);


const getUneRecette = async () => {
  const recipeId = route.params.id;
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    recette.value = data.meals[0];
    ingredients.value = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recette.value['strIngredient' + i];
      const measure = recette.value['strMeasure' + i];
      if (ingredient && measure) {
        ingredients.value.push(`${measure} ${ingredient}`);
      }
    }
    imageLoaded.value = true;
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette :', error);
  }
};

onMounted(() => {
  setTimeout(() => {
    getUneRecette();
  }, 100);
});
</script>

<style scoped>

@media screen and (min-width: 1024px) {
  .resize-image {
    margin: 0 auto; /* Centrez l'image horizontalement en utilisant des marges automatiques */
    width: 55%; /* Réduisez la largeur de l'image à 50% sur les écrans larges */
  }
}
.ion-button {
  margin-left: 30px;
}
</style>
