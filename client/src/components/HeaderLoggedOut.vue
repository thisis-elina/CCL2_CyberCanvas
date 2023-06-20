<script setup></script>

<template>
  <nav class="bg-custom-blue shadow-xl sticky">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="/" alt="Logo"/>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="text-white btn btn-ghost">Home</router-link>
              <router-link to="/" class="text-white btn btn-ghost">About</router-link>
            </div>
          </div>
        </div>
        <div class="justify-center">
          <input type="text" placeholder="Search"
                 class="px-4 py-2 bg-gray-700 border border-custom-gray rounded focus:outline-none focus:border-custom-blue-dark"/>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-1">
            <button class="text-white text-m px-4 py-2 rounded-md underline-on-hover">
              <router-link to="/login" class="underline">Connect</router-link>
            </button>
            <button
                class="glass bg-custom-blue-dark bg-custom-blue-darker text-white font-semibold px-4 py-2 rounded-md">
              <router-link to="/register">Join the Net</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.btn {
  font-size: 14px;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.bg-custom-blue {
  background-color: #111827;
}

.shadow-xl {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 0 4px 10px -5px rgba(0, 0, 0, 0.3);
}

.bg-custom-blue-dark {
  background-color: #4f46e5;
}

.bg-custom-blue-darker:hover {
  background-color: #372fc8;
}

.underline-on-hover:hover {
  text-decoration: underline;
}

.border-custom-gray {
  border-color: #87878c;
}
</style>