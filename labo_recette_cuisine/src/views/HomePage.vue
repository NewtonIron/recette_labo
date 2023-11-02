<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="secondary">
        <ion-title>Recette du moment</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container" class="ion-text-center ion-justify-content-center">
        <!-- Utilisez la syntaxe de liaison de données pour l'image -->
        <ion-img :src="recette.strMealThumb" v-if="imageLoaded" class="resize-image"></ion-img>
        <IonText>
          <h1>{{ recette.strMeal }}</h1>
          <p>origine: {{ recette.strArea }}</p>
          <p>categorie: {{ recette.strCategory }}</p>
          <h2>ingredient</h2>
        </IonText>
        <ion-list>
          <!-- Utilisez ion-item pour chaque ingrédient -->
          <ion-item v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }}
          </ion-item>
        </ion-list>
        <h2>recette</h2>
        <p>{{ recette.strInstructions }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter, IonImg, IonItem, IonList, IonText } from '@ionic/vue';
import { ref } from 'vue';

const components = {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonList,
  IonText
};

// Déclarez une interface pour la structure de l'objet recette.
interface Recette {
  [key: string]: string | undefined;
}

let recette: Recette = {}; // Utilisez l'interface pour le typage.

let ingredients: any[] = []; // Variable pour stocker les ingrédients de la recette.

const imageLoaded = ref(false);

async function getUneRecette() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();

    recette = data.meals[0] as Recette; // Utilisez l'interface pour le typage.

    // Stockez les ingrédients de la recette dans la variable 'ingredients'.
    ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recette['strIngredient' + i];
      const measure = recette['strMeasure' + i];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    // Affichez la réponse dans la console.
    console.log('Réponse de l\'API:', recette);

    // Affichez les ingrédients de la recette.
    console.log('Ingrédients de la recette:', ingredients);
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette :', error);
  }
}

onIonViewWillEnter(() => {
  setTimeout(() => {
    getUneRecette().then(() => {
      imageLoaded.value = true;
    });
  }, 100); // Attendre 2 secondes (2000 millisecondes) avant d'afficher l'image.
});
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .resize-image {
    margin: 0 auto; /* Centrez l'image horizontalement en utilisant des marges automatiques */
    width: 55%; 
  }
}
</style>