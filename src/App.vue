<template>
  <v-app>
    <header>
      <v-app-bar
      app
      dark
      absolute
      color="#87CEEB"
      src="https://i.picsum.photos/id/957/1920/1080.jpg?hmac=j6IpszzgaWjKITEaLB7QiwR-han900vlNJ5vfezaGQE"
      >
      <!--https://picsum.photos/1920/1080?random-->
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>PokemonJS</v-toolbar-title>
        <v-tabs
          dark
        >
          <!-- :toプロパティを追加 -->
          <v-tab
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :to="menuItem.url"
          >
            {{ menuItem.name }}
          </v-tab>
        </v-tabs>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        temporary
        fixed
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group>
            <!-- :toプロパティを追加 -->
            <v-list-item
              v-for="(menuItem, index) in menuItems"
              :key="index"
              :to="menuItem.url"
            >
              <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>

    <v-main class="main">
      <br>
      <router-view/>
    </v-main>

      <v-footer dark absolute><div class="footer">PokemonJS 2021</div></v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return{
      drawer: false,
      menuItems: [{name:'HOME', url:'/'}, {name:'PARTY', url:'/partyEdit'}, {name:'BATTLE', url:'/battle'},]
  }},
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}
.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}
.v-tabs {
  display: none;
  @include display_pc {
    display: block !important;
  }
}
.footer {
  margin: auto;
}
.main{
  text-align: center;
}
</style>
