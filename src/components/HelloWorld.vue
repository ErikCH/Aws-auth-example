<template>
  <div class="hello">
    <div v-if="!signedIn">
      <!-- <amplify-authenticator></amplify-authenticator> -->
      <input v-model="login" type="text" name="" placeholder="Login" ><br>
      <input v-model="password" type="password" name="" placeholder="Password" ><br>
      <button @click="signIn">Sign in</button>
    </div>
    <div v-if="signedIn">
      <!-- <amplify-sign-out></amplify-sign-out> -->
      <button @click="signOut">Sign Out</button>
    </div>

  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue';
export default {
  name: 'HelloWorld',
  data() {
    return {
      login: '',
      password: ''
      // signedIn: false
    }
  },
  props: {
    msg: String,
  },
  created(){
    this.findUser();

    AmplifyEventBus.$on('authState', info => {
      if(info === "signedIn") {
        this.findUser();
      } else {
        this.$store.state.signedIn = false;
        // this.signedIn = false;
        this.$store.state.user = null;
      }
    });
  },
  computed: {
    signedIn(){
      return this.$store.state.signedIn;
    }
  },
  methods: {
    signIn(){
      Auth.signIn(this.login, this.password)
        .then(user =>{
            this.$store.state.signedIn = !!user;
            this.$store.state.user = user;
        } )
        .catch(err => console.log(err));
    },
    signOut() {
      Auth.signOut()
        .then(data =>{
          this.$store.state.signedIn = !!data;
        } )
        .catch(err => console.log(err));
    },
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        // this.signedIn = true;
        this.$store.state.signedIn = true;
        this.$store.state.user = user;
        console.log(user);

      } catch(err) {
        // this.signedIn = false;
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  padding: 16px;
  margin: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
