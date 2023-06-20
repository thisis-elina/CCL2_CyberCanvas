<template>
  <div class="sidebar">
    <div class="sidebar-box">
      <h2 class="box-title">PopularTags</h2>
      <div class="tag-list">
        <span class="tag">Art</span>
        <span class="tag">Technology</span>
        <span class="tag">AI</span>
        <span class="tag">Future</span>
        <span class="tag">VR</span>
      </div>
    </div>
    <div class="sidebar-box">
      <h2 class="box-title">Placeholder Box</h2>
      <div class="news-list">
        <div class="news-item">
          <span class="news-title">New Cybernetic Enhancements Released</span>
          <span class="news-date">June 10, 2023</span>
        </div>
        <div class="news-item">
          <span class="news-title">Quantum Hacking: Threats and Countermeasures</span>
          <span class="news-date">June 8, 2023</span>
        </div>
        <div class="news-item">
          <span class="news-title">Upcoming Cyberpunk Convention in NeoCity</span>
          <span class="news-date">June 5, 2023</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  flex: 1;
  padding: 10px;
}

.sidebar-box {
  margin-bottom: 30px;
  border: 2px solid #4f46e5;
  border-radius: 5px;
  padding: 10px;
}

.box-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: #4f46e5;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.news-list {
  display: flex;
  flex-direction: column;
}

.news-item {
  margin-bottom: 10px;
}

.news-title {
  font-weight: bold;
}

.news-date {
  font-size: 14px;
  color: #777;
}

</style>
<script setup></script>