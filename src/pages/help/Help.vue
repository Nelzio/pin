<template>
  <q-page padding>
    <div class="q-gutter-y-lg q-pa-lg">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-pt-xs text-justify">Superativo</div>
            <div
              :class="getFont.text" class="text-justify"
            >Superativo é um aplicativo de ofertas de emprego e de auto empregabilidade. <br>
            Os usuários podem encontrar e disponibilizar ofertas de emprego e publicar seus produtos e serviços. <br>
            Existem dois tipos de usuários no aplicativo, nomeadamente, usuários particulares e entidades ou empresas ou organizações legais. <br>
            O aplicativo não descrimina a ninguém, por isso foi desenvolvido pensando em todo tipo de usuário, não para pessoas com uma deficiência específica. Pode usar o aplicativo todo tipo de usuário.</div>
          </q-card-section>

          <q-card-section class="col-7">
            <q-video src="https://www.youtube.com/embed/_tyjqozrEPY" :ratio="16/9"/>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/djob.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Vagas de emprego</div>
            <div
              :class="getFont.text"
            >Publique e encontre vagas de emprego na plataforma. A plataforma é inclusiva, no sentido de que todos pode usar de igual forma, sendo assim, todos os utilizadores da plataforma podem publicar vagas de emprego e se candidatar a uma delas. Tanto pessoas singulares como coletivas.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-pt-xs text-justify">Negócio</div>
            <div
              :class="getFont.text"
            >Exponha os seus produtos e serviços e também encontre produtos e serviços de outros utilizadores da plataforma. Alcance mais fácil os seu clientes e encontre rápido o que deseja.</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/business.png" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/inclusive.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-pt-xs text-justify">Inclusão</div>
            <div
              :class="getFont.text"
            >A plataforma é inclusiva e tem recurso de acessibilidade indispensável. Pessoas com e sem deficiência podem usar a plataforma de igual forma, assim todos interagem e as diferenças são eliminadas.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  // name: 'PageName',
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"])
  },
}
</script>
