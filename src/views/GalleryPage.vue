<template>
  <div class="gallery-page">
    <h1 class="album-title">Image Gallery</h1>
    <!-- Albums Section -->
    <div class="albums">
      <h2>Albums</h2>
      <div class="album-list">
        <div
          class="album"
          v-for="(album, index) in albums"
          :key="index"
          @click="showSlider(album)"
        >
          <img :src="album.coverImage" alt="Album Cover" class="album-cover" />
          <p>{{ album.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albums: [
        {
          name: "Emergency",
          coverImage:
            "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600",
          images: [
            "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=600",
          ],
        },
        {
          name: "Medicine",
          coverImage:
            "https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg?auto=compress&cs=tinysrgb&w=600",
          images: [
            "https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/3873135/pexels-photo-3873135.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=600",
          ],
        },
        // Add more albums as necessary
      ],
      selectedAlbum: null, // Will store the selected album when an album is clicked
    };
  },
  methods: {
    showSlider(album) {
      localStorage.setItem("selectedAlbum", JSON.stringify(album));
      this.$router.push({
        path: "/gallery/photos",
        query: {
          name: album.name,
          // images: JSON.stringify(album.images), // Pass the album images as query params
        },
      });
    },
  },
};
</script>
