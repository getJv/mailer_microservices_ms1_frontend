<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col cols="12">
            <v-img
              :src="require('./assets/logo.svg')"
              class="my-3"
              contain
              height="100"
              @click="$router.push('/')"
            />
          </v-col>

          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
              Distributed Mailer Systems Test
            </h1>
          </v-col>
        </v-row>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
