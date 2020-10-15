<template>
  <div>
    <div>
      <q-drawer
        side="right"
        v-model="drawer"
        :width="430"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
        class="fixed-right"
        role="aside"
      >
        <q-scroll-area class="fit">
          <q-toolbar class="text-primary">
            <q-btn
              flat
              round
              dense
              icon="arrow_forward"
              @click="drawer = false"
              role="button"
              lang="pt-PT"
              aria-label="Fechar detalhes da empresa"
            />
            <q-toolbar-title>Empresa</q-toolbar-title>
            <q-icon
              color="green"
              v-if="company.status == 'approved'"
              name="verified"
              size="md"
            />
            <q-icon
              color="red"
              v-else-if="company.status == 'rejected'"
              name="cancel"
              size="md"
            />
          </q-toolbar>
          <div class="q-gutter-y-md">
            <div class="row justify-center">
              <div class="col-12">
                <!-- sec1 -->
                <div class="text-center">
                  <q-avatar size="100px">
                    <q-img
                      :src="company.photoURL"
                      spinner-color="white"
                      role="img"
                      lang="pt-PT"
                      aria-label="Imagem do perfil da empresa"
                    />
                  </q-avatar>

                  <div :class="getFont.title">{{ company.displayName }}</div>
                </div>

                <q-separator />
                <!-- sec2 -->
                <div class="row justify-center">
                  <q-card class="col-12">
                    <q-tabs
                      v-model="tab"
                      dense
                      :active-color="darkModeConf.iconVar"
                      :indicator-color="darkModeConf.iconVar"
                      class="text-grey"
                      align="justify"
                      narrow-indicator
                      role="tablist"
                    >
                      <q-tab
                        name="bio"
                        label="Contacto"
                        icon="contacts"
                        role="tab"
                      />
                      <q-tab
                        name="description"
                        label="Sobre"
                        icon="description"
                        role="tab"
                      />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels
                      v-model="tab"
                      animated
                    >
                      <q-tab-panel
                        name="bio"
                        role="tabpanel"
                        lang="pt-PT"
                        aria-label="Contacto da empresa"
                      >
                        <q-list>
                          <q-item class="text-left">
                            <q-item-section
                              top
                              avatar
                            >
                              <q-icon
                                :color="darkModeConf.iconVar"
                                name="phone"
                              />
                            </q-item-section>

                            <q-item-section>
                              <q-item-label :class="getFont.title">Telefone</q-item-label>
                              <q-item-label :class="getFont.text">{{company.phoneNumber}}</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-separator
                            spaced
                            inset="item"
                          />

                          <q-item class="text-left">
                            <q-item-section
                              top
                              avatar
                            >
                              <q-icon
                                :color="darkModeConf.iconVar"
                                name="email"
                              />
                            </q-item-section>

                            <q-item-section>
                              <q-item-label :class="getFont.title">Email</q-item-label>
                              <q-item-label :class="getFont.text">{{company.email}}</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-separator
                            spaced
                            inset="item"
                          />

                          <q-item class="text-left">
                            <q-item-section
                              avatar
                              top
                            >
                              <q-icon
                                :color="darkModeConf.iconVar"
                                name="place"
                              />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label :class="getFont.title">Endereço</q-item-label>
                              <q-item-label :class="getFont.text">{{company.address}}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-tab-panel>

                      <q-tab-panel
                        name="description"
                        role="tabpanel"
                        lang="pt-PT"
                        aria-label="Descrição da empresa"
                      >
                        <q-list>
                          <q-item class="text-left">
                            <q-item-section>
                              <q-item-label :class="getFont.title">Descrição</q-item-label>
                              <q-item-label
                                :class="getFont.text"
                                v-html="company.description"
                              ></q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>
                </div>
              </div>
            </div>
            <div
              class="col-12"
              v-if="userData.access[1] == 'w'"
            >
              <q-btn-group
                class="full-width"
                spread
                rounded
                role="button"
              >
                <q-btn
                  push
                  color="primary"
                  label="Aprovar"
                  icon="check"
                  @click="dialogApprove = true"
                  role="button"
                />
                <q-btn
                  push
                  color="red"
                  label="Rejeitar"
                  icon="cancel"
                  @click="dialogRejected = true"
                  role="button"
                />
              </q-btn-group>
            </div>
          </div>
        </q-scroll-area>
      </q-drawer>
    </div>
    <div>
      <q-dialog
        v-if="userData.access[1] == 'w'"
        v-model="dialogApprove"
        role="alertdialog"
        lang="pt-PT"
        aria-label="Alerta de sucesso"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text">Aprovar empresa {{ company.displayName }}?</q-card-section>
          <q-card-actions align="right">
            <q-btn
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              rounded
              label="Aprovar"
              role="button"
              @click="approveCompony()"
            />
            <q-btn
              :color="darkModeConf.iconVar"
              outline
              rounded
              label="Cancelar"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-if="userData.access[1] == 'w'"
        v-model="dialogRejected"
        role="alertdialog"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div
              class="text-h6"
              :class="getFont.title"
            >Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text">Rejeitar empresa {{ company.displayName }}?</q-card-section>
          <q-card-actions align="right">
            <q-btn
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              rounded
              label="Rejeitar"
              role="button"
              @click="rejectCompony()"
            />
            <q-btn
              :color="darkModeConf.iconVar"
              outline
              rounded
              label="Cancelar"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firestoreDB } from "boot/firebase";
export default {
  data () {
    return {
      dialogApprove: false,
      dialogRejected: false,
      drawer: false,
      tab: "bio",
      company: { status: "approved" },
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["userData"])
  },
  methods: {
    changeCompany () {
      const vm = this;
      this.$root.$on("companyToEvaluation", (val) => {
        vm.company = val;
        vm.drawer = true;
      });
    },
    approveCompony () {
      Loading.show();
      const ref = firestoreDB.collection("users").doc(this.company.id);
      var company = this.company;
      const vm = this;
      delete company.id;
      company["status"] = "approved";
      ref
        .set(company)
        .then(() => {
          Loading.hide();
          vm.dialogApprove = false;
        })
        .catch((error) => {
          Loading.hide();
          console.log(error);
        });
    },
    rejectCompony () {
      Loading.show();
      const ref = firestoreDB.collection("users").doc(this.company.id);
      var company = this.company;
      const vm = this;
      delete company.id;
      company["status"] = "rejected";
      ref
        .set(company)
        .then(() => {
          Loading.hide();
          vm.dialogRejected = false;
        })
        .catch((error) => {
          Loading.hide();
          console.log(error);
        });
    },
  },
  mounted () {
    this.changeCompany();
  },
};
</script>

<style>
</style>