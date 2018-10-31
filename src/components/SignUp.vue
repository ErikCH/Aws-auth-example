<template>
<div>
<div v-if="!user">
    <h1>Sign Up</h1>
    <input v-model="login" type="text" placeholder="Login"><br> 
    <input v-model="password" type="password" placeholder="Password"> <br>
    <input v-model="email" type="email" placeholder="Email"><br> 
    <button @click="submit">Submit</button>

</div>
<div v-if="user">
<h2>Confirm Sign Up</h2>
<input v-model="code" type="text" placeholder="Code"><br> 
<button @click="confirm">Submit</button>

</div>
</div>
</template>
<script>
import { Auth } from 'aws-amplify';
export default {
    data(){
        return {
            login: '',
            email: '',
            password: '',
            code: '',
            user: ''
        }
    },
    methods: {
        confirm() {
            // After retrieveing the confirmation code from the user
            Auth.confirmSignUp(this.login, this.code, {
                // Optional. Force user confirmation irrespective of existing alias. By default set to True.
                forceAliasCreation: true
            }).then(data => this.$router.push("/"))
              .catch(err => console.log(err));
        },
        submit(){
            Auth.signUp({
                username: this.login,
                password: this.password,
                attributes: {
                    email: this.email
                },
                validationData: [],  // optional
                })
                .then(data => this.user = data.user)
                .catch(err => console.log(err));
        }
    }
    
}
</script>
<style>
input {
    margin: 10px;
    padding: 16px;
}
</style>


