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
              role="button"
              lang="pt-PT"
              aria-label="Fechar Detalhes da empresa"
              @click="drawer = false"
            />
            <q-toolbar-title>Empresa</q-toolbar-title>
            <div class="q-gutter-sm">
              <q-btn
                rounded
                color="primary"
                label="Editar"
                icon="edit"
                role="button"
                @click="openEditDialog()"
              />
              <q-btn
                rounded
                color="red"
                label="Apagar"
                icon="delete"
                role="button"
                @click="dialogDelete = true"
              />
            </div>
          </q-toolbar>
          <div class="q-gutter-y-md">
            <div class="row justify-center">
              <div class="col-12">
                <!-- sec1 -->
                <div class="text-center">
                  <q-avatar size="100px">
                    <!-- <q-img :src="association.photoURL" spinner-color="white" /> -->
                    <q-icon
                      name="groups"
                      size="xl"
                    />
                  </q-avatar>

                  <div :class="getFont.title">{{ association.name }}</div>
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
                        aria-label="Identidade e contacto"
                      >
                        <q-list role="list">
                          <q-item
                            class="text-left"
                            role="listitem"
                          >
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
                              <q-item-label :class="getFont.text">{{association.phoneNumber}}</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-separator
                            spaced
                            inset="item"
                          />

                          <q-item
                            class="text-left"
                            role="listitem"
                          >
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
                              <q-item-label :class="getFont.text">{{association.email}}</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-separator
                            spaced
                            inset="item"
                          />

                          <q-item
                            class="text-left"
                            role="listitem"
                          >
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
                              <q-item-label :class="getFont.text">{{association.address}}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-tab-panel>

                      <q-tab-panel
                        name="description"
                        role="tabpanel"
                      >
                        <q-list role="list">
                          <q-item
                            class="text-left"
                            role="listitem"
                          >
                            <q-item-section
                              top
                              avatar
                            >
                              <q-icon
                                :color="darkModeConf.iconVar"
                                name="accessibility_new"
                              />
                            </q-item-section>

                            <q-item-section>
                              <q-item-label :class="getFont.title">Tipos de deficiência</q-item-label>
                              <q-item
                                class="text-left"
                                v-for="(type, index) in association.types"
                                :key="index"
                              >
                                <q-item-section :class="getFont.text">{{type}}</q-item-section>
                              </q-item>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-drawer>
    </div>
    <div>
      <q-dialog
        v-model="dialogDelete"
        role="dialog"
        lang="pt-PT"
        aria-label="Dialogo de confirmação"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text">Remover associação {{ association.name }}?</q-card-section>
          <q-card-actions align="right">
            <q-btn
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              rounded
              label="Remover"
              @click="deleteAssociation()"
              role="button"
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

      <div>
        <q-dialog
          v-model="confirmDialog"
          role="dialog"
          lang="pt-PT"
          aria-label="Dialogo de confirmação"
        >
          <q-card style="width: 400px; max-width: 50vw;">
            <q-card-section>
              <div :class="[getFont.title, 'text-'+darkModeConf.iconVar]">Remoção de associação</div>
            </q-card-section>
            <q-card-section
              :class="getFont.text"
              class="text-center"
            >
              <q-icon
                name="check_circle"
                color="green"
                size="80px"
              />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="OK"
                :color="darkModeConf.iconVar"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="errorDialog"
          role="alertdialog"
          lang="pt-PT"
          aria-label="Alerta de erro"
        >
          <q-card style="width: 400px; max-width: 50vw;">
            <q-card-section>
              <div :class="[getFont.title, 'text-'+darkModeConf.iconVar]">Erro ao remover</div>
            </q-card-section>
            <q-card-section
              :class="getFont.text"
              class="text-center"
            >
              <q-icon
                name="mood_bad"
                color="red"
                size="80px"
              />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="OK"
                role="button"
                :color="darkModeConf.iconVar"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
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
      confirmDialog: false,
      errorDialog: false,
      dialogDelete: false,
      drawer: false,
      tab: "bio",
      association: {},
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    openEditDialog () {
      this.$root.$emit("editAssociation", this.association);
    },
    changeAssociation () {
      const vm = this;
      this.$root.$on("associationDetails", (val) => {
        vm.association = val;
        vm.drawer = false;
        setTimeout(() => {
          vm.drawer = true;
        }, 100);
      });
      this.$root.$on("associationDetailsClose", () => {
        vm.drawer = false;
      });
    },
    getNewData () {
      const vm = this;
      this.$root.$on("newData", function (data) {
        if (Object.keys(data).length === 0 && data.constructor === Object) vm.drawer = false;
        vm.association = data;
      });
    },
    deleteAssociation () {
      Loading.show();
      const vm = this;
      const ref = firestoreDB
        .collection("associations")
        .doc(this.association.id);
      ref
        .delete()
        .then(function () {
          vm.$root.$emit("pleaseNewData", vm.association.id);
          Loading.hide();
          vm.dialogDelete = false;
          vm.confirmDialog = true;
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          Loading.hide();
          vm.errorDialog = true;
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted () {
    this.changeAssociation();
    this.getNewData();
  },
};
</script>

<style>
</style>