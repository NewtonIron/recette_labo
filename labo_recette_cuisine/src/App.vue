<template>
  <ion-app>
    <!-- Barre de navigation en haut -->
    <ion-header>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-header>

    <!-- Menu latéral -->
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list>
            <ion-list-header>My Menu</ion-list-header>
            <ion-menu-toggle :auto-hide="false">
              <!-- Lien vers la page d'accueil avec un délai de 2 secondes -->       
              <ion-item class="menu_item" href="/">
                <ion-icon slot="start" :ios="home" :md="home"></ion-icon>
                <ion-label>Accueil</ion-label>
              </ion-item>
              <!-- Lien vers la page "liste" (ou "poulet") -->
              <ion-item class="menu_item" :href="'/liste/' + 'Chicken'">
                <ion-icon slot="start" :ios="fish" :md="fish"></ion-icon>
                <ion-label>Chicken</ion-label>
              </ion-item>
              <ion-item class="menu_item" :href="'/liste/' + 'Dessert'">
                <ion-icon slot="start" :ios="iceCream" :md="iceCream"></ion-icon>
                <ion-label>Dessert</ion-label>
              </ion-item>         
              <ion-item class="menu_item" :href="'/liste/' + 'Seafood'">
                <ion-icon slot="start" :ios="fish" :md="fish"></ion-icon>
                <ion-label>Seafood</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <!-- Sortie du routeur -->
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonIcon,
  IonHeader,
  IonButtons,
  IonMenuButton,
} from '@ionic/vue';
import { fish, iceCream, home } from 'ionicons/icons';

</script>

<style scoped>
/* Style pour les liens du menu */
.menu_item {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
