<template>
  <q-page class="q-gutter-y-md q-pt-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="getUser.photoURL" spinner-color="white" />
          </q-avatar>

          <div class="text-h5">{{ getUser.displayName }}</div>
        </div>

        <q-separator />
        <!-- sec2 -->
        <div class="row text-center justify-center">
          <q-card class="col-12">
            <q-tabs
              v-model="tab"
              dense
              :active-color="darkModeConf.color"
              :indicator-color="darkModeConf.color"
              class="text-grey"
              align="justify"
              narrow-indicator
            >
              <q-tab name="bio" label="Contacto" icon="contacts" />
              <q-tab name="ocupacao" label="Sobre" icon="assignment_ind" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="bio">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Telefone</q-item-label>
                      <q-item-label>{{ getUser.telephone }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Email</q-item-label>
                      <q-item-label>{{ getUser.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Endereço</q-item-label>
                      <q-item-label class="text-body2">{{ getUser.adress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="local">Bairro da Polana caniço</q-tab-panel>

              <q-tab-panel name="ocupacao">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="calendar_today" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Data de nascimento</q-item-label>
                      <q-item-label>{{ getUser.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Profissão</q-item-label>
                      <q-item-label>{{ getUser.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Formação</q-item-label>
                      <q-item-label class="text-body2">{{ getUser.education }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <q-separator />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio"
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("user", ["getUser"])
  },
  methods: {
      ...mapActions("user", ["detailUser"])
    // getUserProfile(email) {
    //   firestoreDb
    //     .collection("users")
    //     .where("email", "==", email)
    //     .get()
    //     .then(function(querySnapshot) {
    //       querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //       });
    //     })
    //     .catch(function(error) {
    //       console.log("Error getting documents: ", error);
    //     });
    // }
  },
  created() {},
  mounted() {}
};
</script>
