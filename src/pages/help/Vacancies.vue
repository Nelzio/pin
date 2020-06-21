<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/vacancies/Imagem1.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/vacancies/Imagem1.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Página de vagas</div>
            <div :class="getFont.text">{{ homeTxt}}</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/vacancies/candidature.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div
              :class="getFont.title"
              class="q-mt-sm q-mb-xs"
            >Candidatar-se a vaga e cancelar candidatura</div>
            <div :class="getFont.text">{{ candidature }}</div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/vacancies/candidature.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/vacancies/add.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Adição de vaga</div>
            <div :class="getFont.text">
              <p>
                Clicando no botão flutuante + no canto inferior direito na página de vagas
                <q-img
                  class="rounded-borders"
                  src="statics/help/vacancies/addbtn.png"
                  style="width: 150px"
                />o usuário é redirecionado a página de adição de vaga. O usuário pode também através do seu perfil clicando no item que conta o número de vagas por si publicadas, caso apareça, ser redirecionado a página de suas vagas e seguir o mesmo procedimento da página de vagas.
                Na página de adição de vaga o usuário deve fornecer algumas informações sobre a vaga:
              </p>
              <div>
                <b>Imagem da vaga:</b> A imagem sobre a vaga deve ser auto explicativa sobre a vaga para facilitar a compreensão dos usuários que tenham alguma dificuldade de leitura.
                <br />
                <b>Título:</b> Título da vaga;
                <br />
                <b>Categoria:</b> Categoria da vaga em termos de profissões ou áreas;
                <br />
                <b>Província:</b> Província em que a vaga está disponível;
                <br />
                <b>Data de validade:</b> O dia em que as candidaturas terminam;
                <br />
                <b>Descrição:</b> Descrição completa e clara sobre a vaga.
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/vacancies/add.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/vacancies/edit.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Edição de vaga</div>
            <div :class="getFont.text">
              <p>
                A Partir do seu perfil, nas actividades o usuário deve clicar no item que conta as vagas publicadas por si para ser redirecionado a pagina de suas vagas.
                Na página de suas vagas, em cada vaga listada tem botões que dão opção de editar, apagar e ocultar a vaga.
              </p>
              <p>
                <b>Edição de vagas:</b> Clicando no botão para editar vaga, o usuário será redirecionado para a página de edição de vaga que é idêntico ao de publicar vaga.
              </p>
              <div>
                <b>Apagar vagas:</b> Clicando em delete vaga, aparecerá uma dialog de confirmação onde o usuário pode confirmar ou cancelar.
                <br />
                <b>Ocultar vaga:</b> Clicando no ícone de um olho é possível deixar a vaga pública ou restrita para apenas o usuário que publica.
                <br />
                <b>Detalhes das vagas:</b> Clicando no botão de detalhes da vaga o usuário será redirecionado para a página de detalhes de sua vaga onde podem para além de ver a descrição da vaga, vê também os candidatos a vaga por si publicada e contactá-los.
                <br />
                <b>Data de validade:</b> O dia em que as candidaturas terminam;
                <br />
                <b>Descrição:</b> Descrição completa e clara sobre a vaga.
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/vacancies/edit.png"
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
    return {
      homeTxt:
        "A página de vaga lista todas as vagas listadas pelos usuários da plataforma. É possível ver detalhes da vaga e na página de descrição da vaga é possível se candidatar ou cancelar a sua candidatura. Em cada vaga, aparece o provedor da vaga, os usuários podem ver detalhes do perfil dos provedores da vaga clicando na sua imagem ou nome. Na página de perfil do provedor da vaga é possível contactar e ver os produtos, serviços e vagas publicadas por um determinado usuário.",
      candidature:
        "Para candidatar-se a uma vaga, o usuário precisa a partir da página de vagas, identificar a vaga, ver detalhes da vaga e clicar no botão que vem depois da descrição da vaga de candidatar-se ou clicar repetidas vezes na tela até o telefone vibrar, caso tenha o modo de narrar e vibrar ativo. Para remover candidatura o processo é o mesmo, muda apenas o botão, em vez de Candidatar-se, aparece Cancelar."
    };
  },
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"])
  }
};
</script>
