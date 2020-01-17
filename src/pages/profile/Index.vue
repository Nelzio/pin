<template>
  <q-page class="q-gutter-y-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img
              src="https://www.correio24horas.com.br/fileadmin/_processed_/8/1/csm_samai_cunha_quanta_8cdb15efa4.jpg"
              spinner-color="white"
            />
          </q-avatar>

          <div class="text-h5">Antonio Velas</div>
          <!-- <div class="text-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi unde vitae eaque labore
          </div>-->
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
              <q-tab name="bio" label="Contacto" icon="assignment_ind" />
              <q-tab name="ocupacao" label="Sobre" icon="work" />
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
                      <q-item-label>+258 84 122 4724</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Email</q-item-label>
                      <q-item-label>nelziositoe@gmail.com</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Endereço</q-item-label>
                      <q-item-label class="text-body2">Maputo</q-item-label>
                      <q-item-label class="text-body2">Bairro Laulane</q-item-label>
                      <q-item-label class="text-body2">Rua 10, Q 14, casa 65</q-item-label>
                      <q-item-label class="text-body2">Associacao</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="local">Bairro da Polana caniço</q-tab-panel>

              <q-tab-panel name="ocupacao">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Profissão</q-item-label>
                      <q-item-label>Contabilista</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Experiencia</q-item-label>
                      <q-item-label>12</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Formação</q-item-label>
                      <q-item-label class="text-body2">Licenciatura em contabilidade</q-item-label>
                      <q-item-label class="text-body2">Especialização em direito</q-item-label>
                      <q-item-label class="text-body2">Curso de culinaria</q-item-label>
                    </q-item-section>
                  </q-item>

                  
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>

        <!-- btn conect -->
        <div class="row justify-center q-pa-md">
          <q-btn rounded class="full-width" :color="darkModeConf.color" :class="darkModeConf.textBtn" label="Contactar" />
        </div>

        <q-separator />

        <!-- sec4 -->
        <div>
          <q-toolbar :class="darkModeConf.bgColor">
            <q-toolbar-title>Produtos</q-toolbar-title>
            <q-btn flat round dense icon="add" />
          </q-toolbar>
          <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="i in 4" :key="i">
              <q-card class="my-card">
                <q-img
                  src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg"
                  spinner-color="white"
                />
                <q-card-section>
                  <div class="row">
                    <div class="col-6">Chinelos de pneu.</div>
                    <div class="col-6 text-right">800 mt</div>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn outline rounded label="Detalhes" />
                  <q-btn outline rounded icon="edit" />
                  <q-btn outline rounded color="red" icon="delete" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todos" />
          </div>
        </div>

        <!-- sec 5 -->

        <q-separator />

        <div>
          <q-toolbar :class="darkModeConf.bgColor">
            <q-toolbar-title>Serviços</q-toolbar-title>
            <q-btn flat round dense icon="add" />
          </q-toolbar>
          <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="i in 4" :key="i">
              <q-card class="my-card">
                <q-img
                  src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg"
                  spinner-color="white"
                />
                <q-card-section>
                  <div class="row">
                    <div class="col-12">Carpintaria</div>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn outline rounded label="Detalhes" />
                  <q-btn outline rounded icon="edit" />
                  <q-btn outline rounded color="red" icon="delete" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todos" />
          </div>
        </div>

        <q-separator />
        <!-- sec 6 -->
        <div>
          <!-- <div class="text-h5 q-pl-md col-12">Vagas de emprego</div> -->
          <q-toolbar :class="darkModeConf.bgColor">
            <q-toolbar-title>Vagas de emprego</q-toolbar-title>
            <q-btn flat round dense icon="add" to="/profile/vacancy/add" />
          </q-toolbar>

          <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="vacancy in vacancies" :key="vacancy.key">
              <q-card class="my-card">
                <q-img
                  src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg"
                  spinner-color="white"
                />
                <q-card-section>{{ vacancy.title }}</q-card-section>
                <q-card-actions align="right">
                  <q-btn outline rounded label="Detalhes" :to="'/profile/vacancy/details/'+vacancy.key" />
                  <q-btn outline rounded icon="edit" :to="'/profile/vacancy/edit/'+vacancy.key" />
                  <q-btn outline rounded color="red" icon="delete" @click="vacancyDtlFunc(vacancy.key)" />
                  <q-btn outline rounded :icon="isPublic ? 'visibility_off' : 'visibility'" @click="isPublic = !isPublic" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todas" />
          </div>
        </div>
      </div>
      <div>
      <q-dialog v-model="confirDelete">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h5">Confirmar</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-h6">Deletar vaga de {{ vacancyDel.title }}?</q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn rounded outline color="red" label="Deletar" @click="deleteVacancyThis(vacancyDel.key)" />
            <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio",
      confirDelete: false,
      isPublic: true,
      vacancyDel: {
        title: '',
        key: null
      }
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl"]),
    
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "createVacancy", "detailVacancy", "updateVacancy", "deleteVacancy"]),
    deleteVacancyThis (id) {
      this.deleteVacancy(id)
      this.confirDelete = false
    },
    vacancyDtlFunc (id) {
      console.log(id)
      this.detailVacancy(id)
      console.log("Nelzio Sitoe delll")
      console.log(this.vacancyDtl)
      this.vacancyDel = this.vacancyDtl
      this.confirDelete = true
    }
  },
  created () {
    this.listVacancy()
  },
  mounted() {
    this.$root.$emit("isHomePage", "Perfil");
  }
};
</script>
