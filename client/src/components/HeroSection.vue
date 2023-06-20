<template>
  <div class="landing-page bg-gray-900">
    <div class="hero-section">
      <h1 class="title">Welcome to the CyberCanvas</h1>
      <p class="description">Embrace the digital revolution on CyberCanvas: Inspiring discussions for visionary artists
        and designers.</p>
    </div>
    <div class="features-section">
      <div class="feature">
        <div class="icon">🌐</div>
        <h2 class="feature-title">Global Community</h2>
        <p class="feature-description">Connect with fellow enthusiasts from around the world.</p>
      </div>
      <div class="feature">
        <div class="icon">💡</div>
        <h2 class="feature-title">Innovative Ideas</h2>
        <p class="feature-description">Explore and share cutting-edge concepts and technologies.</p>
      </div>
      <div class="feature">
        <div class="icon">🗣️</div>
        <h2 class="feature-title">Engaging Discussions</h2>
        <p class="feature-description">Participate in thought-provoking conversations with like-minded individuals.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
  text-align: center;
  padding: 40px;
  width: 100vw;
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

.cta-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #8f83f3;
  color: white;
  font-size: 20px;
  text-decoration: none;
  border-radius: 5px;
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
</style>
<script setup></script>