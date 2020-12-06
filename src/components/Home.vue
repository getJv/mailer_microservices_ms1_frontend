<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-10">
          What's next?
        </h2>
        <v-row justify="center">
          <v-card
            class="mx-2"
            max-width="300"
            v-for="(ms, index) in importantLinks"
            :key="index"
          >
            <v-img
              class="white--text align-end"
              height="150"
              contain
              :src="ms.card_image"
            >
            </v-img>

            <v-card-subtitle class="pb-0">{{ ms.title }}</v-card-subtitle>

            <v-card-text class="text--primary mt-3">
              <div>{{ ms.text }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" :href="ms.site_url" text>
                Visit
              </v-btn>

              <v-btn color="orange" :href="ms.repo_url" text>
                Repository
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <a
            href="https://getjv.github.io"
            class="caption mx-3"
            target="_blank"
          >
            Developed by Jhonatan Morais
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Ms1Image from "../assets/ms1-card.png";
import Ms2Image from "../assets/ms2-card.png";

export default {
  name: "Home",
  data: () => ({
    importantLinks: [
      {
        title: "MS1-Frontend",
        text: "Developed with VueJS, Vuetify, axios, vuex and vue-router",
        site_url: "/mailer",
        repo_url: "https://github.com/getJv/mailer_microservices_ms1_frontend",
        card_image: Ms1Image,
      },
      {
        title: "MS2-Backend",
        text:
          "Developed with Laravel and async queue with redis and mysql as database",
        site_url: "http://localhost",
        repo_url: "https://github.com/getJv/mailer_microservices_ms2_backend",
        card_image: Ms2Image,
      },
    ],
  }),
};
</script>
