<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ category ? category : "no category" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list v-if="showList">
        <!-- Utilisez la syntaxe ':href' pour générer des liens dynamiques -->
        <ion-item v-for="item in dessertList" :key="item.idMeal" :href="'/detail/' + item.idMeal">
          <ion-img :src="item.strMealThumb" class="resize-image2"></ion-img>
          {{ item.strMeal }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonImg, IonMenuButton, IonButtons } from '@ionic/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showList = ref(false);
const dessertList = ref<any[]>([]);
const category = route.params.category; // Accédez à la valeur de category depuis la route

const getMealList = async () => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    dessertList.value = data.meals;
    showList.value = true;
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste de repas :', error);
  }
};

onMounted(() => {
  getMealList();
});
</script>

<style scoped>
.resize-image2 {
  height: 50px;
  width: auto;
}
</style>
