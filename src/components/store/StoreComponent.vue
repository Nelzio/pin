<template>
  <div ref="imgProduct">
    <q-card :id="store.key" class="my-card" v-touch-hold:300.mouse="handleHold">
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

      <q-skeleton v-if="!imgLoaded" height="230px" square />
      <q-img
        v-ripple
        v-else-if="store.img && imgLoaded"
        :src="store.img"
        style="min-height: 200px;"
        @click="$router.push('/store/details/'+store.key)"
      />
      <q-img
        v-ripple
        v-else
        src="statics/img/nophoto.png"
        style="min-height: 200px;"
        @click="$router.push('/store/details/'+store.key)"
      />

      <q-card-section class="q-pb-none">
        <div :class="getFont.title">{{ store.title }}</div>
        <div :class="getFont.title">{{ store.price }} MZN</div>
      </q-card-section>

      <q-card-actions align="right" :title="store.key">
        <q-btn
          rounded
          outline
          :color="darkModeConf.iconVar"
          icon="details"
          label="Detalhes"
          :to="'/store/details/'+store.key"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "../../boot/firebase";
export default {
  name: "StoreComponent",
  props: ["lorem", "store"],
  data() {
    return {
      user: {
        displayName: "",
        email: "",
        photoURL: "",
        phoneNumber: "",
        adress: "",
        profission: "",
        education: "",
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

    detailStoreUser(id) {
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

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      this.$root.$emit("textToSpeechStore", {
        store: this.store,
        user: this.user.displayName
      });
      // console.log(this.store)
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
    }
  },

  mounted() {
    this.layzeImg();
    window.addEventListener("scroll", this.layzeImg);
    window.addEventListener("resize", this.layzeImg);
    window.addEventListener("orientationchange", this.layzeImg);

    this.detailStoreUser(this.store.user);
  },

  watch: {
    store() {
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