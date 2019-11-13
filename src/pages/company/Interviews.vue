<template>
  <q-page padding>
    <!-- content -->
    <q-splitter
      v-model="splitterModel"
      style="height: 80vh"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-date
            v-model="date"
            :events="events"
            event-color="orange"
            style="width: 300px;"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="anaregina" class="row justify-center q-gutter-y-md">
            <!-- <div class="text-h4 q-mb-md">Entrevista com Ana Joana</div> -->
            <div class="text-center">
              <div class="absolute" style="left: 5vw;">
                <q-btn flat round color="primary" icon="arrow_back" @click="tab = date" />
              </div>
              <q-avatar size="20rem" text-color="white">
                <q-img src="https://www.w3schools.com/howto/img_avatar2.png" spinner-color="white" />
              </q-avatar>
            </div>
            <q-list bordered class="rounded-borders col-10">
              <!-- <q-item-label header>Ana Raquel</q-item-label> -->
              <q-item>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Ana Raquiel</q-item-label>
                </q-item-section>
                <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="12px" flat dense round icon="clear" />
                    <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                    <!-- <q-btn size="12px" flat dense round icon="more_vert" /> -->
                  </div>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="work" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Contabilista</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <div class="col-10">
              <q-toolbar class="text-white bg-teal">
                <q-toolbar-title class="text-center">
                  Formação
                </q-toolbar-title>
              </q-toolbar>

              <q-list bordered class="rounded-borders">
                <q-item clickable v-ripple>
                  <q-item-section>
                    2000
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Escola Secundaria Josina Machel</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    2000
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Escola Secundaria da Matola</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-10">
              <q-toolbar class="text-white bg-teal">
                <q-toolbar-title class="text-center">
                  Experiencia Profissional
                </q-toolbar-title>
              </q-toolbar>

              <q-list bordered class="rounded-borders">
                <q-item clickable v-ripple>
                  <q-item-section>
                    2000
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Escola Secundaria Josina Machel</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    2000
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Escola Secundaria da Matola</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            
          </q-tab-panel>

          <q-tab-panel name="2019/02/05">
            <div class="text-h4 q-mb-md">Entrevista com Ana Joana</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="2019/02/01">
            <q-list bordered>
              <q-item clickable v-ripple v-for="i in 10" :key="i" @click="tab = 'anaregina'">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>Ana Regina</q-item-section>
              </q-item>

            </q-list>
            
          </q-tab-panel>

          
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { watch } from 'fs'
export default {
  // name: 'PageName',
  data () {
    return {
      splitterModel: 30,
      tab: '2019/02/01',
      date: '2019/02/01',
      events: ['2019/02/01', '2019/02/05', '2019/02/06']
    }
  },

  watch: {
    // whenever question changes, this function will run
    date: function (newVal, oldVal) {
      this.tab = newVal
    }
  },
}
</script>
