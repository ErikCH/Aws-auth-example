<template>
  <div class="hello">
    <div v-if="!signedIn">
      <amplify-authenticator></amplify-authenticator>
    </div>
    <div v-if="signedIn">
      <amplify-sign-out></amplify-sign-out>
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
