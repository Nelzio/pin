<template>
  <q-page v-touch-swipe.mouse.right.left.down="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
			<div class="col-12 text-center">
        <q-icon color="primary"
			  size="100px" name="account_circle"
        />
			</div>
        <div class="q-pa-lg col-md-4 col-12">
					<q-form
						ref="loginForm"
						@submit="onSubmit"
						@reset="onReset"
						class="q-gutter-md"
					>
						<q-input
							rounded
							outlined
							color="primary"
							dense
							ref="email"
							v-model="authObject.email"
							label="Numero de telefone"
							placeholder="Numero de telefone"
							mask="#########"
							lazy-rules
							:rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
						/>

						<div>
							<q-btn
								rounded
								label="Enviar"
								color="primary"
								class="full-width"
                to="resetpwd2"
							/>
						</div>
					</q-form>
        </div>
    </div>

    
  </q-page>
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

      },
      accountSwipe (val) {
        if (val.direction === 'left') {
          this.$router.push('/account/create')
          }

        if (val.direction === 'right') {
          this.$router.push('/')
        }
        if (val.direction === 'down') {
          this.$router.push('/')
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

<style lang="sass">
</style>