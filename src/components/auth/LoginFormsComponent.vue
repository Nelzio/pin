<template>
    <div class="row login justify-center q-gutter-y-lg">
			<div class="col-12">
        <q-icon color="blue-9"
					size="100px" name="account_circle"
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
							color="blue-9"
							dense
							ref="email"
							v-model="authObject.email"
							label="Email"
							lazy-rules
							:rules="[ val => val && val.length > 0 || 'Please type something']"
						/>

						<q-input
							outlined
							color="blue-9"
							@keyup.enter="login_account"
							dense
							ref="password"
							placeholder="password"
							v-model="authObject.password"
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
							<q-btn
								label="login"
								type="submit"
								color="primary"
								class="full-width"
							/>
						</div>

						<q-item>
							<q-item-section>
								<q-btn
									rounded
									outline
									size="sm"
									color="primary"
									label="Criar conta"
									@click="$emit('tab', 'create')"
								/>
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
    import { mapActions } from 'vuex'
    export default {
        name: "LoginFormsComponent",
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

            isPasswordValid (email) {
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