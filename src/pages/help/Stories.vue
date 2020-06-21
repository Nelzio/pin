<template>
  <q-page padding>
    <div class="q-gutter-y-lg q-pa-lg">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/stories/Imagem.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Página de Produto e serviços</div>
            <div :class="getFont.text">
              A página de produtos e serviços lista todos os produtos e serviços publicados pelos usuários da plataforma.
              É possível ver detalhes dos produtos e serviços e na página de descrição do produto ou serviço é possível contactar o provedor do produto ou serviço.
              Em cada produto e serviço, aparece o seu provedor, os usuários podem ver detalhes do perfil dos provedores clicando na sua imagem ou no nome. Na página de perfil do provedor da vaga é possível contactar e ver os produtos, serviços e vagas publicadas por um determinado usuário.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Adição de produto ou serviço</div>
            <div :class="getFont.text">
              <br /><p>Imagem da vaga: A imagem deve ser auto explicativa sobre a o produto ou serviço para facilitar a compreensão dos usuários que tenham alguma dificuldade de leitura.</p>
              <br /><b>Título:</b> Título do produto ou serviço;
              <br /><b>Categoria:</b> Indica se é um produto ou serviço;
              <br /><b>Província:</b> Província em que o produto ou serviço está disponível;
              <br /><b>Subcategoria:</b> Categoria do produto ou serviço;
              <br /><b>Preço:</b> O produto ou serviço pode ter um preço ou não e ser negociável.
              <br /><b>Descrição:</b>
              Descrição completa e clara sobre o produto ou serviço.
            </div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/stories/add.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Edição de produto ou serviço</div>
            <div :class="getFont.text">
              <p>
                A Partir do seu perfil, nas actividades o usuário deve clicar no item que conta os seus produtos e serviços para ser redirecionado a página de seus produtos e serviços.
                Na página de seus produtos e serviços, em cada produto ou serviço listado tem botões que dão opção de ver detalhes, editar, apagar e ocultar o produto ou serviço.
              </p>
              <p>Ocultar vaga: O botão com icon de um olho deixa a o produto ou serviço público ou restrito para apenas o usuário que publica.</p>
              <div>Detalhes das vagas: O botão de detalhes do produto ou serviço redireciona o usuário para a página de detalhes de seu o produto ou serviço onde pode para além de ver a descrição, pode editar, apagar, ocultar e partilhar a publicação nas redes sociais.</div>
            </div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/stories/edit.png"
              style="height: 100%; width: 20vw;"
            />
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
  data() {
    return {};
  },
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"])
  }
};
</script>
