<template>
    <div class="container-fluid">
        <div class="row">
            <div class="nav-side">
                <div :class="{ 'slide-nav' : menuLink, 'adjust-width' : !menuLink }">
                    <Nav @close-nav="closeNav"/>
                </div>
            </div>
            <div class="body-view">
                <router-view />
            </div>
        </div>
        <div class="toggle" @click="togglenavLinks">
            <i class="pi pi-bars"></i>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import Nav from './Nav.vue'
export default {
    components: {
        Nav
    },
    setup () {
        const menuLink = ref(false)

        const togglenavLinks = () => {
            menuLink.value = !menuLink.value
            console.log(menuLink.value)
        }

        const closeNav = (payload) => {
            menuLink.value = payload
        }
        return {
            menuLink, togglenavLinks, closeNav
        }
    }
}
</script>

<style scoped>
.adjust-width {
    width: 266px;
}

.nav-side {
    max-width: 25%;
}

.body-view {
    width: 75%;
}

.toggle {
  display: none;
  width: 30px;
  text-align: center;
  position: absolute;
  top: 4px;
  right: 8px;
  font-size: 30px;
}

.slide-nav {
    width: 266px;
    position: fixed;
    left: 0;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}

@media (max-width: 1036px) {
    .nav-side {
        max-width: 266px;
        position: absolute;
        z-index: 1;
    }

    .body-view {
        width: 100%;
    }

    .adjust-width {
        position: fixed;
        left: -266px;
        z-index: 9;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .toggle {
        display: block;
    }
}

</style>