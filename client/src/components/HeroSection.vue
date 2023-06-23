<template>
  <!-- Landing Page -->
  <div class="landing-page shadow-lg shadow-black/20">
    <div class="banner h-full">
      <!-- Hero Section -->
      <div class="hero-section">
        <h1 class="title py-6 orbitron">Welcome to the CyberCanvas</h1>
        <p class="description">Embrace the digital revolution on CyberCanvas: Inspiring discussions for visionary artists and designers.</p>
      </div>
      <!-- Features Section -->
      <div class="p-9 features-section">
        <div class="feature">
          <div class="icon">🌐</div>
          <h2 class="feature-title orbitron">Global Community</h2>
          <p class="feature-description">Connect with fellow enthusiasts from around the world.</p>
        </div>
        <div class="feature">
          <div class="icon">💡</div>
          <h2 class="feature-title orbitron">Innovative Ideas</h2>
          <p class="feature-description">Explore and share cutting-edge concepts and technologies.</p>
        </div>
        <div class="feature">
          <div class="icon">🗣️</div>
          <h2 class="feature-title orbitron">Engaging Discussions</h2>
          <p class="feature-description">Participate in thought-provoking conversations with like-minded individuals.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Landing Page styles */
.landing-page {
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
  text-align: center;
  width: 100vw;
  pointer-events: none;
}

.hero-section {
  margin-bottom: 40px;
}

.title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}

.description {
  font-size: 24px;
  margin-bottom: 30px;
}

.features-section {
  display: flex;
  justify-content: center;
}

.feature {
  width: 300px;
  margin: 0 20px;
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.feature-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 16px;
}

.banner {
  background-image: url("../../src/assets/illustration.svg");
  width: 100vw;
  background-position: center;
}

</style>
<script setup></script>
