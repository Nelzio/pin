<template>
  <div>
    
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
            mask="#########"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
          />

          <q-input
            rounded
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

						<div>
							<q-btn
								rounded
								label="Entrar"
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
    </div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "RegisterFormComponent",
  data() {
    return {
      authObject: {
        name: "",
        email: "",
        password: ""
      },
      isPwd: true
    };
  },

  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset() {
      alert("must reset form.");
    },
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.$emit("loginUser", this.authObject);
      }
    },
    accountSwipe (val) {
        if (val.direction === 'right') {
          this.$router.push('/account')
        }

        // if (val.direction === 'left') {
        //   this.$router.push('/account/reset')
        // }

        if (val.direction === 'down') {
          this.$router.push('/')
        }
      }
  },

  filters: {
    captalizeFirstLetter(val) {
      return val.charAt(0).toUpperCase() + "" + val.slice(1);
    }
  }
};
</script>

<style lang="sass">
</style>
