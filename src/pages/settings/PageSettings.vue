<template>
    <div class="q-pa-md" style="max-width: 350px">
        <q-list padding>

            <q-item-label header>Modo da app:</q-item-label>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Light Mode</q-item-label>
                </q-item-section>
                <q-item-section side >
                    <q-radio v-model="settings.mode" checked-icon="check" val="light" />
                </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
                <q-item-section>
                    <q-item-label>Dark Mode</q-item-label>
                    <!--<q-item-label caption>Allow notification</q-item-label>-->
                </q-item-section>
                <q-item-section side top>
                    <q-radio v-model="settings.mode" checked-icon="check" val="dark" />
                    <!--<q-toggle-->
                        <!--color="green"-->
                        <!--v-model="settings.mode"-->
                        <!--checked-icon="check"-->
                        <!--unchecked-icon="clear"-->
                        <!--val="dark"-->
                    <!--/>-->
                </q-item-section>
            </q-item>

        </q-list>

        <q-separator />
    </div>
</template>

<script>
    export default {
        name: "PageSettings",
        data () {
            return {
                settings: {
                    mode: ''
                }
            }
        },
        mounted () {
            this.$root.$emit('isHomePage', false)
        }
    }
</script>

<style scoped>

</style>