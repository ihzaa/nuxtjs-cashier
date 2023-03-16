<template>
  <v-app>
    <v-navigation-drawer disable-resize-watcher v-model="sideDrawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in sideMenu" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation horizontal height="10vh" fixed app>
      <v-app-bar-nav-icon @click.stop="sideDrawer = !sideDrawer" v-ripple="false" plain />
      <v-btn v-for="(item, i) in bottomMenu" :to="item.to" :key="i" :ripped="false" plain>
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-bottom-navigation>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DefaultLayout',
  data() {
    return {
      sideDrawer: false,
      sideMenu: [],
      allSideMenu: [
        {
          icon: 'mdi-view-dashboard-variant',
          title: 'Dashboard',
          to: '/dashboard',
          middleware: ['authenticated']
        },
        {
          icon: 'mdi-application',
          title: 'Casher',
          to: '/',
          middleware: ['admin', 'casher']
        },
        {
          icon: 'mdi-fingerprint',
          title: 'Absence',
          to: '/absence',
          middleware: ['authenticated']
        },
        {
          icon: 'mdi-account',
          title: 'User Management',
          to: '/users',
          middleware: ['admin', 'casher']
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login',
          middleware: ['unauthenticated']
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout',
          middleware: ['authenticated']
        },
      ],
      bottomMenu: [
        {
          icon: 'mdi-application',
          title: 'App',
          to: '/',
        }
      ],
    }
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (this.$router.currentRoute.path != '/regsiter' &&
          this.$router.currentRoute.path != '/login') {
          this.$router.push('/register')
        }
      }
    },
    filterSideMenu() {
      let auth = this.authenticated ? 'authenticated' : 'unauthenticated'
      this.sideMenu = this.allSideMenu.filter(item => {
        if (item.middleware.includes(this.user.role)) return true;
        if (this.authenticated) {
          return item.middleware.includes(auth)
        }
      });
    }
  },
  watch: {
    $route() {
      this.isWelcomeScreen();
    },
    authenticated() {
      this.filterSideMenu();
    }
  },
  mounted() {
    // localStorage.setItem("welcomeScreen", true);
    this.isWelcomeScreen();
    this.filterSideMenu();
    console.log(this.user);
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'user']),
  }
}
</script>
