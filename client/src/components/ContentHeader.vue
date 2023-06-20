<template>
  <nav class="bg-custom-blue">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="flex items-baseline space-x-4">
              <div class="left-buttons">
                <button class="button">Popular</button>
                <button class="button">Newest</button>
                <button class="button">Following</button>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-1">
            <button
                class="glass bg-custom-blue-dark bg-custom-blue-darker text-white font-semibold px-4 py-2 rounded-md">
              <router-link to="/new-post">Create a Canvas</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="flex items-center justify-center">
    <div class="divider"></div>
  </div>
</template>

<style scoped>
.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.button-group {
  display: flex;
}

.button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.button.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.create-button {
  background-color: #8f83f3;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.divider {
  height: 1px;
  width: calc(95%);
  margin: 10px;
  background-color: white;
}

.bg-custom-blue-darker:hover {
  background-color: #372fc8;
}

</style>


<script setup>
</script>