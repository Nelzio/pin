<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/stories/Imagem.png"
            style="width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/stories/Imagem.png"
              style="width: 20vw"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Página de Produto e serviços
            </div>
            <div :class="getFont.text">
              A página de produtos e serviços lista todos os produtos e serviços
              publicados pelos usuários com deficiência da plataforma. É
              possível ver detalhes dos produtos e serviços e na página de
              descrição do produto ou serviço é possível contactar o provedor do
              produto ou serviço. Em cada produto e serviço, aparece o seu
              provedor, os usuários podem ver detalhes do perfil dos provedores
              clicando na sua imagem ou no nome. Na página de perfil do provedor
              da vaga é possível contactar e ver os produtos e serviços
              publicadas por um determinado usuário.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/stories/add.png"
            style="width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Adição de produto ou serviço
            </div>
            <div :class="getFont.text">
              <p>
                Na página de negócio ou produtos e serviços aparece no canto
                inferior direito um botão flutuante com sinal de adição
                <b class="text-h5">+</b>. Clicando nesse botão flutuante
                <b class="text-h5">+</b>,
                <q-img
                  class="rounded-borders"
                  src="statics/help/stories/addbtn.png"
                  style="width: 150px"
                />
                o usuário é redirecionado a página de adição de produtos e
                serviços. <br />
                O usuário pode também através do seu perfil clicando no item que
                conta o número de produtos e serviços por si publicados, caso
                apareça, será redirecionado a página de seus produtos e
                serviços. Nessa página no canto inferior direito aparecerá um
                botão flutuante com sinal de adição
                <b class="text-h5">+</b> e clicando nesse botão será
                redirecionado para a página de adição de vaga. <br />
                Na página de adição de vaga o usuário deve fornecer dados sobre
                a vaga:
              </p>
              <p>
                <b>Imagem da vaga:</b> A imagem deve ser auto explicativa sobre
                a o produto ou serviço para facilitar a compreensão dos usuários
                que tenham alguma dificuldade de leitura.
              </p>

              <p><b>Título:</b> Título do produto ou serviço;</p>
              <p><b>Categoria:</b> Indica se é um produto ou serviço;</p>
              <p>
                <b>Província:</b> Província em que o produto ou serviço está
                disponível;
              </p>
              <p><b>Subcategoria:</b> Categoria do produto ou serviço;</p>
              <p>
                <b>Preço:</b> O produto ou serviço pode ter um preço ou não e
                ser negociável.
              </p>
              <p>
                <b>Descrição:</b>
                Descrição completa e clara sobre o produto ou serviço.
              </p>
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/stories/add.png"
              style="width: 20vw"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/stories/edit.png"
            style="width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Edição de produto ou serviço
            </div>
            <div :class="getFont.text">
              <p>
                A Partir do seu perfil, nas actividades o usuário deve clicar no
                item que conta os seus produtos e serviços para ser
                redirecionado a página de seus produtos e serviços. Na página de
                seus produtos e serviços, em cada produto ou serviço listado tem
                botões que dão opção de ver detalhes, editar, apagar e ocultar o
                produto ou serviço.
              </p>
              <p>
                <b>Ocultar vaga:</b> O botão com icon de um olho deixa a o
                produto ou serviço público ou restrito para apenas o usuário que
                publica.
              </p>
              <div>
                <b>Detalhes das vagas:</b> O botão de detalhes do produto ou
                serviço redireciona o usuário para a página de detalhes de seu o
                produto ou serviço onde pode para além de ver a descrição, pode
                editar, apagar, ocultar e partilhar a publicação nas redes
                sociais.
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/stories/edit.png"
              style="width: 20vw"
            />
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
  data() {
    return {}
  },
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart", "getVibrate"]),
  },
}
</script>
