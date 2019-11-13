<template>
    <div class="q-pa-md">
        <div class="flex flex-center" :class="[appMode.textColor, appMode.bgColor]">
            <div
                class="text-center q-pr-lg"
                style="height: 180px;border-right: 2px solid rgba(0,0,0,.1);border-bottom: 2px solid rgba(0,0,0,.1)"
                @click="$router.push('/work')"
            >
                <q-icon
                    size="100px"
                    name="work"
                />
                <br>
                <span>Vagas</span>
            </div>
            <div
                class="text-center q-pl-lg"
                style="height: 180px;border-bottom: 2px solid rgba(0,0,0,.1)"
                @click="$router.push('/store')"
            >
                <q-icon
                    size="100px"
                    name="storefront"
                />
                <br>
                <span>Exposição</span>
            </div>
        </div>
        <div class="flex flex-center" :class="[appMode.textColor, appMode.bgColor]">
            <div
                class="text-center q-pr-lg q-pt-lg "
                style="height: 180px;border-right: 2px solid rgba(0,0,0,.1)"
            >
                <q-icon
                    size="100px"
                    name="account_circle"
                    @click="$router.push('/profile')"
                />
                <br>
                <span>Perfil</span>
            </div>
            <div class="text-center q-pl-lg q-pt-lg" style="height: 180px">
                <q-icon
                    size="100px"
                    name="settings"
                    @click="$router.push('/settings')"
                />
                <br>
                <span>Preferências</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeContent",
        props: ['appMode'],
        mounted () {
            console.log('appMode: ', this.appMode)
        }
    }
</script>

<style scoped>

</style>