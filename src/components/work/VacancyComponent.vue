<template>
  <div ref="imgProduct">
    <q-card
      :id="vacancy.key"
      class="my-card"
      v-touch-hold:300.mouse="handleHold"
      v-touch-swipe.mouse.left.right="handleSwipe"
    >
      <q-item>
        <q-item-section avatar>
          <q-btn round @click="detailUser(user)">
            <q-avatar text-color="white">
              <q-img :src="user.photoURL" spinner-color="white" ref="imgProfile" />
            </q-avatar>
          </q-btn>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.displayName }}</q-item-label>
          <q-item-label caption>{{ user.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-img
        v-ripple
        v-if="vacancy.img && imgLoaded"
        :src="vacancy.img"
        style="min-height: 200px;"
        @click="$router.push('/vacancies/details/'+vacancy.key)"
      />
      <q-img
        v-ripple
        v-else
        src="statics/img/nophoto.png"
        style="min-height: 180px;"
        @click="$router.push('/vacancies/details/'+vacancy.key)"
      />
      

      <q-card-section class="q-pb-none">
        <div :class="getFont.title">{{ vacancy.title }}</div>
      </q-card-section>

      <!-- <q-card-section class="q-pt-none q-pb-none">{{ vacancy.description }}</q-card-section> -->

      <q-card-actions align="right" :title="vacancy.key">
        <q-btn
          rounded
          outline
          :color="darkModeConf.iconVar"
          icon="details"
          label="Detalhes"
          :to="'/vacancies/details/'+vacancy.key"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "../../boot/firebase";
export default {
  name: "VacancyComponent",
  props: ["lorem", "vacancy"],
  data() {
    return {
      user: {
        displayName:"",
        email: "",
        photoURL: "",
        phoneNumber: "",
        adress: "",
        profission: "",
        education: "",
        profileType: "",
        description: "",
        date: ""
      },
      lazyImages: [],
      imgLoaded: false
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"])
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
            phoneNumber: doc.data().phoneNumber,
            adress: doc.data().adress,
            profission: doc.data().profission,
            education: doc.data().education,
            profileType: doc.data().profileType,
            description: doc.data().description,
            date: doc.data().date
          };
        } else {
          // If user desen't exist
          data = {
            id: null,
            displayName:"",
            email: "",
            photoURL: "",
            phoneNumber: "",
            adress: "",
            profission: "",
            education: "",
            profileType: "",
            description: "",
            date: ""
          };
        }
      });
    },

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      this.$root.$emit("textToSpeech", {
        vacancy: this.vacancy,
        user: this.user.displayName
      });
      // console.log(this.vacancy)
    },

    layzeImg() {
      if (!this.imgLoaded) {
        if (!(this.lazyImages == this.$refs.imgProduct)) {
          this.lazyImages = this.$refs.imgProduct;
        }

        if (this.lazyImages) {
          if (
            this.lazyImages.getBoundingClientRect().top <= window.innerHeight &&
            this.lazyImages.getBoundingClientRect().bottom >= 0 &&
            getComputedStyle(this.lazyImages).display !== "none"
          ) {
            this.imgLoaded = true;
          }
        }
      }
    },

    handleSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/store");
      }

      if (val.direction === "right") {
        this.$router.push("/home");
      }
    }
  },

  mounted() {
    this.layzeImg();
    window.addEventListener("scroll", this.layzeImg);
    window.addEventListener("resize", this.layzeImg);
    window.addEventListener("orientationchange", this.layzeImg);

    this.detailVacancyUser(this.vacancy.user);
  },

  watch: {
    vacancy() {
      this.layzeImg();
      window.addEventListener("scroll", this.layzeImg);
      window.addEventListener("resize", this.layzeImg);
      window.addEventListener("orientationchange", this.layzeImg);
    }
  }
};
</script>

<style scoped>
</style>