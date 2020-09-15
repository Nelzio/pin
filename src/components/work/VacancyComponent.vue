<template>
  <div ref="imgProduct">
    <q-card
      :id="vacancy.key"
      class="my-card"
      v-touch-hold:300.mouse="handleHold"
      v-touch-swipe.mouse.left.right="handleSwipe"
      role="group"
      :aria-label="'Vaga para ' +   vacancy.title"
    >
      <q-item
        role="group"
        :aria-label="'Anunciante da vaga ' + user.displayName"
      >
        <q-item-section avatar>
          <q-btn
            round
            @click="detailUser(user)"
            role="link"
            aria-label="Ir ao perfil do anunciante"
          >
            <q-avatar text-color="white">
              <q-img
                :src="user.photoURL"
                spinner-color="white"
                ref="imgProfile"
                role="img"
                alt="Imagem do anunciante da vaga"
              />
            </q-avatar>
          </q-btn>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.displayName }}</q-item-label>
          <q-item-label
            v-if="user.email.split('@')[user.email.split('@').length - 1] !== 'superactive.com'"
            caption
          >{{ user.email }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-skeleton
        v-if="!imgLoaded"
        height="230px"
        square
      />
      <q-img
        v-ripple
        v-else-if="vacancy.img && imgLoaded"
        :src="vacancy.img"
        style="min-height: 200px;"
        @click="$router.push('/vacancies/details/'+vacancy.key)"
        role="img"
        alt="Imagem da vaga"
        :aria-label="'Clicar para ir a página de detalhes da vaga de ' +   vacancy.title"
      />
      <q-img
        v-ripple
        v-else
        src="statics/img/nophoto.png"
        style="min-height: 180px;"
        @click="$router.push('/vacancies/details/'+vacancy.key)"
        role="img"
        alt="Imagem da vaga"
        :aria-label="'Clicar para ir a página de detalhes da vaga de ' +   vacancy.title"
      />

      <q-card-section class="q-pb-none">
        <div :class="getFont.title">{{ vacancy.title }}</div>
      </q-card-section>

      <!-- <q-card-section class="q-pt-none q-pb-none">{{ vacancy.description }}</q-card-section> -->

      <q-card-actions
        align="right"
        :title="vacancy.key"
      >
        <q-btn
          rounded
          outline
          :color="darkModeConf.iconVar"
          icon="details"
          label="Detalhes"
          :to="'/vacancies/details/'+vacancy.key"
          role="button"
          :aria-label="'Clicar para ir a página de detalhes da vaga de ' +   vacancy.title"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDB } from "../../boot/firebase";
export default {
  name: "VacancyComponent",
  props: ["lorem", "vacancy"],
  data () {
    return {
      user: {
        displayName: "",
        email: "",
        photoURL: "",
        phoneNumber: "",
        address: "",
        profession: "",
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
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getVibrate"]),
    ...mapGetters("settings", ["getFont"])
  },
  methods: {
    ...mapActions("user", ["detailUser"]),

    detailVacancyUser (id) {
      // Details of a user
      const ref = firestoreDB.collection("users").doc(id);
      let data = {};
      ref.get().then(doc => {
        if (doc.exists) {
          this.user = {
            id: doc.id,
            displayName: doc.data().displayName,
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            phoneNumber: doc.data().phoneNumber,
            address: doc.data().address,
            profession: doc.data().profession,
            education: doc.data().education,
            profileType: doc.data().profileType,
            description: doc.data().description,
            date: doc.data().date
          };
        } else {
          // If user desen't exist
          data = {
            id: null,
            displayName: "",
            email: "",
            photoURL: "",
            phoneNumber: "",
            address: "",
            profession: "",
            education: "",
            profileType: "",
            description: "",
            date: ""
          };
        }
      });
    },

    handleHold ({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      if (this.vibrateState && this.getVibrate) {
        this.$root.$emit("textToSpeech", {
          vacancy: this.vacancy,
          user: this.user.displayName
        });
      }
      // console.log(this.vacancy)
    },

    layzeImg () {
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
            setTimeout(() => {
              this.imgLoaded = true;
            }, 1000);
          }
        }
      }
    },

    handleSwipe (val) {
      if (val.direction === "left") {
        this.$router.push("/store");
      }

      if (val.direction === "right") {
        this.$router.push("/home");
      }
    }
  },

  mounted () {
    setTimeout(() => {
      this.layzeImg();
    }, 1000);
    window.addEventListener("scroll", this.layzeImg);
    window.addEventListener("resize", this.layzeImg);
    window.addEventListener("orientationchange", this.layzeImg);

    this.detailVacancyUser(this.vacancy.user);
  },

  watch: {
    vacancy () {
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