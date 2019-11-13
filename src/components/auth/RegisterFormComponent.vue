<template>
    <div class="row login justify-center q-gutter-y-lg">
        <q-icon color="blue-9"
                size="100px" name="person_add"
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
                        label="Nome completo"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                        standout="bg-grey"
                        color="blue-9"
                        dense
                        type="email"
                        v-model="email"
                        label="Email"
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
                <div class="q-gutter-y-md">
                    <q-btn rounded label="Registar" type="login" color="primary" class="full-width"/>
                    <q-btn rounded outline label="Entrar" type="login" color="primary" class="full-width" @click="tab = 'login'"/>
                </div>

                <!-- <q-item>
                  <q-item-section>
                    <q-checkbox v-model="teal" label="Remenber me" />
                  </q-item-section>
                  <q-item-section>
                    <router-link to="/">
                      Recuperar senha
                    </router-link>
                  </q-item-section>
                </q-item> -->
            </q-form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "RegisterFormComponent",
        data () {
            return {
                authObject: {
                    email: '',
                    password: '',
                }
            }
        },

        methods: {
            ...mapActions ('auth', [
                'loginUser',
                'registerUser',
            ]),

            isPasswordValid (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(email).toLowerCase())
            },

            onSubmit () {

                this.$refs.email.validate ()
                this.$refs.password.validate ()

                if (!this.$refs.email.hasError && !this.$refs.password.hasError) {

                    if (this.tab === 'login') {

                        this.loginUser (this.authObject)

                    } else {

                        this.registerUser (this.authObject)

                    }

                }

            }

        },

        filters: {
            captalizeFirstLetter (val) {
                return val.charAt(0).toUpperCase() + '' + val.slice(1)
            }
        }
    }
</script>

<style scoped>

</style>