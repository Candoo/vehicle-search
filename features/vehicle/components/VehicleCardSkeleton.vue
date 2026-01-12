<template>
  <article class="card">
    <div class="image">
      <!-- Mobile: skeleton gallery thumbnails -->
      <div class="mobile-gallery-skeleton">
        <div class="mobile-gallery-item"></div>
        <div class="mobile-gallery-item"></div>
        <div class="mobile-gallery-item"></div>
        <div class="mobile-gallery-item"></div>
      </div>
      <!-- Desktop: skeleton overlays -->
      <div class="desktop-skeleton">
        <div class="badge"></div>
        <div class="carousel-controls">
          <div class="counter"></div>
          <div class="carousel-btn"></div>
          <div class="carousel-btn"></div>
        </div>
        <div class="pills">
          <div class="pill"></div>
          <div class="pill"></div>
          <div class="pill"></div>
          <div class="pill"></div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="header">
        <div class="title"></div>
        <!-- Mobile: badge + star -->
        <div class="header-actions">
          <div class="badge-mobile"></div>
          <div class="star"></div>
        </div>
      </div>
      <div class="subtitle"></div>
      <!-- Mobile: specs rows -->
      <div class="footer-grid-skeleton">
        <div class="mobile-specs-skeleton">
          <div class="spec-row"></div>
          <div class="spec-row"></div>
        </div>
        <div class="footer">
          <div class="price-block">
            <div class="price"></div>
            <div class="price-secondary"></div>
          </div>
          <div class="button"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped src="~/assets/styles/components/_vehicle-card-skeleton.scss"></style>
