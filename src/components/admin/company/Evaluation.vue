<template>
  <q-drawer
    side="right"
    v-model="drawer"
    :width="430"
    :breakpoint="500"
    bordered
    content-class="bg-grey-3"
    class="fixed-right"
  >
    <q-scroll-area class="fit">
      <q-toolbar class="text-primary">
        <q-btn flat round dense icon="arrow_forward" @click="drawer = false" />
        <q-toolbar-title>Empresa</q-toolbar-title>
        <q-icon v-if="company.status == 'approved'" name="check" size="md" />
        <q-icon v-else-if="company.status == 'rejected'" name="check" size="md" />
        
      </q-toolbar>
      <div class="q-gutter-y-md">
        <div class="row justify-center">
          <div class="col-12">
            <!-- sec1 -->
            <div class="text-center">
              <q-avatar size="100px">
                <!-- <q-img src="user.photoURL" spinner-color="white" /> -->
                <q-icon :color="darkModeConf.iconVar" name="person" />
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
                >
                  <q-tab name="bio" label="Contacto" icon="contacts" />
                  <q-tab name="ocupacao" label="Sobre" icon="description" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="bio">
                    <q-list>
                      <q-item class="text-left">
                        <q-item-section top avatar>
                          <q-icon :color="darkModeConf.iconVar" name="phone" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label :class="getFont.title">Telefone</q-item-label>
                          <q-item-label :class="getFont.text">{{company.phoneNumber}}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator spaced inset="item" />

                      <q-item class="text-left">
                        <q-item-section top avatar>
                          <q-icon :color="darkModeConf.iconVar" name="email" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label :class="getFont.title">Email</q-item-label>
                          <q-item-label :class="getFont.text">{{company.email}}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator spaced inset="item" />

                      <q-item class="text-left">
                        <q-item-section avatar top>
                          <q-icon :color="darkModeConf.iconVar" name="place" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label :class="getFont.title">Endereço</q-item-label>
                          <q-item-label :class="getFont.text">{{company.address}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="ocupacao">
                    <q-list>
                      <q-item class="text-left">
                        <q-item-section top avatar>
                          <q-icon :color="darkModeConf.iconVar" name="calendar_today" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label :class="getFont.title">Data de nascimento</q-item-label>
                          <q-item-label :class="getFont.text">company.date</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item class="text-left">
                        <q-item-section top avatar>
                          <q-icon :color="darkModeConf.iconVar" name="work" />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label :class="getFont.title">Profissão</q-item-label>
                          <q-item-label :class="getFont.text">company.profession</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-12">
          <q-btn-group class="full-width" spread rounded>
            <q-btn
              push
              color="primary"
              label="Aprovar"
              icon="check"
              @click="approveCompony('add')"
            />
            <q-btn
              push
              color="red"
              label="Rejeitar"
              icon="cancel"
              @click="rejectCompony('remove')"
            />
          </q-btn-group>
        </div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from 'quasar';
export default {
  data() {
    return {
      drawer: false,
      tab: "bio",
      company: {status: "approved"}
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    changeCompany() {
      const vm = this;
      this.$root.$on("companyIdToEvaluation", (val) => {
        console.log(val);
        vm.company = val
        vm.drawer = true;
      });
    },
    approveCompony() {
      Loading.show()
      setTimeout(() => {
        Loading.hide()
        console.log("Approved")
      }, 3000);
    },
    rejectCompony() {
      Loading.show()
      setTimeout(() => {
        Loading.hide()
        console.log("Rejected")
      }, 3000);
    },
  },
  mounted() {
    this.changeCompany();
  },
};
</script>

<style>
</style>