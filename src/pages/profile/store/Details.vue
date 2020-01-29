<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <q-card flat>
        <q-img :src="getStore.img" />
        </q-card>

        <div class="row no-wrap items-center">
          <div class="col ellipsis" :class="getFont.title">{{ getStore.title }}</div>
        </div>

        <q-list>
          <q-item>
          <q-item-section avatar top>
              <q-icon name="attach_money" />
          </q-item-section>
              <q-item-section>
              <q-item-label :class="getFont.title">
                  {{ getStore.price }} MZN
              </q-item-label>
              </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />

          <q-item class="text-left">
            <q-item-section top avatar>
              <q-icon name="phone" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="getFont.title">Telefone</q-item-label>
              <q-item-label :class="getFont.text">{{ userData.phoneNumber }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />
          

          <q-item>
          <q-item-section top avatar>
              <q-icon name="description" />
          </q-item-section>

          <q-item-section>
              <q-item-label :class="getFont.title">Descrição</q-item-label>
              <q-item-label :class="getFont.text">
              {{ getStore.description }}
              </q-item-label>
          </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
import { QSpinnerRings, QSpinnerRadio } from 'quasar';
import offline from "v-offline";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details",
      candidates: []
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("store", ["stories", "storeDtl"]),
    ...mapGetters("store", ["getStories", "getStore"]),
    ...mapGetters("auth", ["userData"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    ...mapActions("store", [
      "listStore",
      "createStore",
      "detailStore",
      "updateStore",
      "deleteStore"
    ]),
    ...mapActions("user", ["detailUser"]),
  },
  created() {
    this.detailStore(this.$route.params.idPS);
  }
};
</script>
