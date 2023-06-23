<template>
  <div class="sidebar">
    <!-- PopularTags box -->
    <div class="sidebar-box">
      <h2 class="box-title">Popular Tags</h2>
      <div class="tag-list">
        <span class="tag">Art</span>
        <span class="tag">Technology</span>
        <span class="tag">AI</span>
        <span class="tag">Future</span>
        <span class="tag">VR</span>
      </div>
    </div>

    <!-- News box -->
    <div class="sidebar-box">
      <h2 class="box-title">News</h2>
      <div class="news-list">
        <div class="news-item">
          <span class="news-title">New Cybernetic Enhancements Released</span>
          <span class="news-date px-2">June 10, 2023</span>
        </div>
        <div class="news-item">
          <span class="news-title">Quantum Hacking: Threats and Countermeasures</span>
          <span class="news-date px-2">June 8, 2023</span>
        </div>
        <div class="news-item">
          <span class="news-title">Upcoming Cyberpunk Convention in NeoCity</span>
          <span class="news-date px-2">June 5, 2023</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  /* Styling for the sidebar container */
  flex: 1;
  padding: 10px;
}

.sidebar-box {
  /* Styling for the sidebar boxes */
  margin-bottom: 30px;
  border: 2px solid #262e5e;
  border-radius: 5px;
  padding: 10px;
}

.box-title {
  /* Styling for the box title */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tag-list {
  /* Styling for the tag list */
  display: flex;
  flex-wrap: wrap;
}

.tag {
  /* Styling for the individual tags */
  background-color: #4453aa;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.news-list {
  /* Styling for the news list */
  display: flex;
  flex-direction: column;
}

.news-item {
  /* Styling for each news item */
  margin-bottom: 10px;
}

.news-title {
  /* Styling for the news title */
  font-weight: bold;
}

.news-date {
  /* Styling for the news date */
  font-size: 14px;
  color: whitesmoke;
}
</style>

<script setup>
// No script logic is present in the component
</script>
