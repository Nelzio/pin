<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <!-- <q-video
          v-if="!$q.screen.gt.sm"
          src="https://www.youtube.com/embed/h9ll1gwwahQ"
          :ratio="16/9"
        /> -->
        <q-video
          v-if="!$q.screen.gt.sm"
          src="https://www.youtube.com/embed/6mKt3z4ysuA"
          :ratio="16 / 9"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-pt-xs text-justify">
              Emprego Inclusivo
            </div>
            <div :class="getFont.text" class="text-justify">
              <p>
                Emprego Inclusivo é um aplicativo de oferta de emprego e de auto
                empregabilidade.
              </p>
              <p>
                Os usuários podem encontrar e disponibilizar ofertas de emprego
                e publicar seus produtos e serviços.
              </p>
              <p>
                Existem dois tipos de usuários no aplicativo, nomeadamente,
                usuários particulares e entidades ou empresas ou organizações
                legais.
              </p>
              <p>
                O aplicativo foi feito especialmente para pessoas com
                deficiência no geral.
              </p>
            </div>
          </q-card-section>

          <q-card-section v-if="$q.screen.gt.sm" class="col-7">
            <!-- <q-video src="https://www.youtube.com/embed/h9ll1gwwahQ" :ratio="16/9" /> -->
            <q-video
              src="https://www.youtube.com/embed/6mKt3z4ysuA"
              :ratio="16 / 9"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/img/home/djob.png"
        />
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/djob.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Vagas de emprego
            </div>
            <div :class="getFont.text">
              Empresas podem publicar vagas de emprego e os usuários podem
              facilmente encontrar na plataforma. Apenas empresas autorizadas
              podem divulgar vagas de emprego e elas serão aprovadas pela gestão
              do aplicativo, o FAMOD. Todos os usuários com deficiência podem se
              candidatar a qualquer vaga disponível na plataforma e
              posteriormente serão contactado para uma avaliação ou entrevista.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/img/home/business.png"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-pt-xs text-justify">
              Negócio
            </div>
            <div :class="getFont.text">
              Os usuários podem expor seus produtos e serviços e também
              encontrar produtos e serviços de outros usuários da plataforma.
              Pessoas sem deficiência podem usar o aplicativo para poder
              requisitar produtos e serviços de pessoas com deficiência.
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/img/home/business.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/img/home/inclusive.png"
        />
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/img/home/inclusive.png"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-pt-xs text-justify">
              Inclusão
            </div>
            <div :class="getFont.text">
              A plataforma é inclusiva e tem recursos de acessibilidade
              indispensáveis. Pessoas com e sem deficiência podem usar a
              plataforma de igual forma, assim todos interagem e as diferenças
              são eliminadas. Mas, somente pessoas com deficiência podem fazer
              candidaturas a vagas e podem publicar produtos e serviços.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  // name: 'PageName',
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart", "getVibrate"]),
  },
  mounted() {
    // console.log(this.$q.screen.lt);
  },
}
</script>
