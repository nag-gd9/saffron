<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <a href="/">
            <img class="mx-auto h-12 w-auto" src="/src/assets/logo.png" alt="SAFFRON" />
        </a>
        <h2 class="mt-6 text-center text-3xl text-gray-900">Sign in to your account</h2>
        
      </div>
      <form @submit.prevent="login" class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-8">
          <div>
            <label for="username" class="sr-only">User Name</label>
            <input v-model="username" id="username" name="username" type="text" required="required" class="appearance-none rounded-full relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="User Name" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-full relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <!-- <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label> -->
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Login",
  data(){
        return{
            username:'',
            password:''
        }
    },
    computed:{
      ...mapGetters('auth',{
        isAuthenticated:'isAuthenticated'
      })
    },
    methods:{
        ...mapActions('auth',{
          actionLogin:'login'
        }),
        async login(){
           await this.actionLogin({username:this.username, password:this.password});
           if(this.isAuthenticated){
            //  alert('login sucess');
           }else{
             alert('failed to login')
           }
        }
  }
};

</script>