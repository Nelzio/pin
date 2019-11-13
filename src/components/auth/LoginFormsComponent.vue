<template>
    <div class="row login justify-center q-gutter-y-lg">
        <q-icon color="blue-9"
                size="100px" name="account_circle"
        />
        <!-- <div class="col-12">
          Entrar ou se Inscrever
        </div> -->
        <div class="bg-grey-3 q-pa-lg shadow-10 col-md-4 col-12">
            <q-form
                    ref="loginForm"
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
            >
                <q-input
                        standout="bg-grey"
                        color="blue-9"
                        dense
                        v-model="user"
                        label="Nome do usuario"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                        standout="bg-grey"
                        color="blue-9"
                        @keyup.enter="login_account"
                        dense
                        placeholder="password"
                        v-model="password"
                        :type="isPwd ? 'password' : 'text'"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type pass']"
                >
                    <template v-slot:append>
                        <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
                <div>
                    <q-btn label="login" type="login" color="primary" class="full-width"/>
                </div>

                <q-item>
                    <!-- <q-item-section>
                      <q-checkbox v-model="teal" label="Remenber me" />
                    </q-item-section> -->
                    <q-item-section>
                        <q-btn rounded outline size="sm" color="primary" label="Criar conta" @click="tab = 'create'" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/">
                            Recuperar senha
                        </router-link>

                    </q-item-section>
                </q-item>
            </q-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginFormsComponent"
    }
</script>

<style scoped>

</style>