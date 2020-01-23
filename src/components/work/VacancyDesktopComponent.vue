<template>
  <q-card class="my-card">
    <q-item>
      <q-item-section avatar>
        <q-btn round @click="detailUser(user)">
          <q-avatar text-color="white">
            <q-img :src="user.photoURL" spinner-color="white" />
          </q-avatar>
        </q-btn>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.displayName }}</q-item-label>
        <q-item-label caption>{{ user.email }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-img v-if="vacancy.img" :src="vacancy.img" style="min-height: 200px;" />

    <q-card-section class="q-pb-none">
      <div class="text-h5">{{ vacancy.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-none">{{ vacancy.description }}</q-card-section>

    <q-card-actions align="right">
      <q-btn
        rounded
        outline
        :color="darkModeConf.colorBtn"
        :text-color="darkModeConf.textBtn"
        label="Detalhes"
        :to="'/vacancies/details/'+vacancy.key"
      />
      <!-- <q-btn
					round
					outline
					size="sm"
					flat
					:color="appMode.modeName === 'dark' ? 'white' : ''"
					icon="volume_up"
      />-->
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "../../boot/firebase";
export default {
  name: "VacancyDesktopComponent",
  props: ["lorem", "vacancy"],
  data() {
    return {
      user: {
        displayName: "",
        email: "",
        photoURL: "",
        telephone: "",
        adress: "",
        profission: "",
        education: "",
        date: ""
      }
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("user", ["detailUser"]),

    detailVacancyUser(id) {
      // Details of a user
      const ref = firestoreDb.collection("users").doc(id);
      let data = {};
      ref.get().then(doc => {
        if (doc.exists) {
          this.user = {
            id: doc.id,
            displayName: doc.data().displayName,
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            telephone: doc.data().telephone,
            adress: doc.data().adress,
            profission: doc.data().profission,
            education: doc.data().education,
            date: doc.data().date
          };
        } else {
          // If user desen't exist
          data = {
            id: null,
            displayName: "",
            email: "",
            photoURL: "",
            telephone: "",
            adress: "",
            profission: "",
            education: "",
            date: ""
          };
        }
      });
    }
  },
  mounted() {
    this.detailVacancyUser(this.vacancy.user);
  }
};
</script>

<style scoped>
</style>