<template>
    <div class="row login justify-center q-gutter-y-lg">
        <div class="col-12">
        <q-icon color="primary"
					size="100px" name="person_add"
        />
        </div>
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
                    outlined
                    color="primary"
                    dense
                    v-model="authObject.name"
                    ref="name"
                    label="Nome completo"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor, indique o su nome']"
                />

                <!-- <q-input
                    outlined
                    color="primary"
                    dense
                    type="email"
                    ref="email"
                    v-model="authObject.email"
                    label="Email"
                    lazy-rules
                    :rules="[ val => isEmailValid(val) || 'Por favor, indique um email válido!']"
                /> -->
                <q-input
                    outlined
                    color="primary"
                    dense
                    ref="email"
                    v-model="authObject.email"
                    label="Numero de telefone"
                    mask="#########"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
                />

                <q-input
                    outlined
                    color="primary"
                    @keyup.enter="login_account"
                    dense
                    placeholder="password"
                    ref="password"
                    v-model="authObject.password"
                    :type="isPwd ? 'password' : 'text'"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor, insira uma senha válida']"
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
                    <q-btn
                        rounded
                        label="Registar"
                        type="login"
                        color="primary"
                        class="full-width"
                    />
                    <q-btn
                       rounded
                       outline
                       label="Entrar"
                       type="login"
                       color="primary"
                       class="full-width"
                       @click="$emit('tab', 'login')"
                    />
                </div>

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
                    name: '',
                    email: '',
                    password: '',
                },
                isPwd: true,
            }
        },

        methods: {
            ...mapActions ('auth', [
                'loginUser',
                'registerUser',
            ]),

            isEmailValid (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(email).toLowerCase())
            },

            onReset () {
                alert('must reset form.')
            },
            onSubmit () {

                this.$refs.email.validate ()
                this.$refs.password.validate ()

                if (!this.$refs.email.hasError && !this.$refs.password.hasError) {

                    this.$emit('loginUser', this.authObject)

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