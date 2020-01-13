<template>
  <q-page padding>
    <!-- content -->
    <div>
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
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
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
                    <q-icon color="primary" name="phone" />
                  </q-item-section>

                  <q-item-section class="text-black">
                    <q-item-label class="text-h6">Telefone</q-item-label>
                    <q-item-label>+258 84 122 4724</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item class="text-left">
                  <q-item-section top avatar>
                    <q-icon color="primary" name="email" />
                  </q-item-section>

                  <q-item-section class="text-black">
                    <q-item-label class="text-h6">Email</q-item-label>
                    <q-item-label>nelziositoe@gmail.com</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item class="text-left">
                  <q-item-section avatar top>
                    <q-icon color="primary" name="place" />
                  </q-item-section>
                  <q-item-section class="text-black">
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
                    <q-icon color="primary" name="phone" />
                  </q-item-section>

                  <q-item-section class="text-black">
                    <q-item-label class="text-h6">Profissão</q-item-label>
                    <q-item-label>Contabilista</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item class="text-left">
                  <q-item-section top avatar>
                    <q-icon color="primary" name="email" />
                  </q-item-section>

                  <q-item-section class="text-black">
                    <q-item-label class="text-h6">Experiencia</q-item-label>
                    <q-item-label>12</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item class="text-left">
                  <q-item-section avatar top>
                    <q-icon color="primary" name="place" />
                  </q-item-section>
                  <q-item-section class="text-black">
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
        <q-btn rounded class="full-width" color="primary" label="Contratar" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      tab: "bio",
    }
  }
}
</script>
