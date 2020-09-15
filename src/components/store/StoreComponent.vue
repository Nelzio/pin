<template>
  <div ref="imgProduct">
    <q-card
      :id="store.key"
      class="my-card"
      v-touch-hold:300.mouse="handleHold"
      role="group"
      :aria-label="store.title"
    >
      <q-item
        role="group"
        :aria-label="'Anunciante do. ' + store.category + ': ' + user.displayName"
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
                :alt="'Imagem do anunciante do ' + store.category"
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

      <!-- :src="store.img" -->
      <q-skeleton
        v-if="!imgLoaded"
        height="230px"
        square
      />
      <q-img
        v-ripple
        v-else-if="store.img && imgLoaded"
        :src="store.img"
        style="min-height: 200px;"
        @click="$router.push('/store/details/'+store.key)"
        role="img"
        :alt="'Imagem do ' + store.category"
        :aria-label="'Clicar para ir a página de detalhes do ' + store.category"
      />
      <q-img
        v-ripple
        v-else
        src="statics/img/nophoto.png"
        style="min-height: 200px;"
        @click="$router.push('/store/details/'+store.key)"
        role="img"
        :alt="'Imagem do '  + store.category"
        :aria-label="'Clicar para ir a página de detalhes do '  + store.category"
      />

      <q-card-section class="q-pb-none">
        <div :class="getFont.title">{{ store.title }}</div>
        <div
          v-if="store.price"
          :class="getFont.title"
        >{{ store.price }} MZN</div>
      </q-card-section>

      <q-card-actions
        align="right"
        :title="store.key"
      >
        <q-btn
          rounded
          outline
          :color="darkModeConf.iconVar"
          icon="details"
          label="Detalhes"
          :to="'/store/details/'+store.key"
          :aria-label="'Clicar para ir a página de detalhes do '  + store.category"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDB } from "../../boot/firebase";
export default {
  name: "StoreComponent",
  props: ["lorem", "store"],
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
        date: ""
      },
      lazyImages: [],
      imgLoaded: false
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getVibrate", "getFont"]),
  },
  methods: {
    ...mapActions("user", ["detailUser"]),

    detailStoreUser (id) {
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
            date: doc.data().date
          };
        } else {
          // If user desen't exist
          data = {
            id: "",
            title: "",
            user: "",
            description: "",
            img: "",
            public: false,
            category: "",
            place: "",
            subCategory: "",
            price: "",
            priceVariable: false
          };
        }
      });
    },

    handleHold ({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      if (this.vibrateState && this.getVibrate) {
        this.$root.$emit("textToSpeechStore", {
          store: this.store,
          user: this.user.displayName
        });
      }
      // console.log(this.store)
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
    }
  },

  mounted () {
    setTimeout(() => {
      this.layzeImg();
    }, 1000);
    window.addEventListener("scroll", this.layzeImg);
    window.addEventListener("resize", this.layzeImg);
    window.addEventListener("orientationchange", this.layzeImg);

    this.detailStoreUser(this.store.user);
  },

  watch: {
    store () {
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