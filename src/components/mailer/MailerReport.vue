<template>
  <div>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="items"
      :search="search"
      :loading="$store.getters.loadingMails"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          append-icon="mdi-filter"
          label="Search"
          class="mx-2 mb-3"
          single-line
          hide-details
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "MailerReport",
  created() {
    this.fetchMails();
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    items() {
      return this.$store.getters.mails === null
        ? []
        : this.$store.getters.mails.data.map((item) => {
            return {
              id: item.data.id,
              title: item.data.attributes.title,
              body: item.data.attributes.body,
              contentType: item.data.attributes.content_type,
              recipients: item.data.attributes.recipients,
              status: item.data.attributes.status,
            };
          });
    },
    headers() {
      return [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Recipients",
          value: "recipients",
        },
        {
          text: "Title",
          value: "title",
        },
        { text: "Processing Status", value: "status" },
      ];
    },
  },
  methods: {
    fetchMails() {
      this.$store.dispatch("fetchMails");
    },
  },
};
</script>
