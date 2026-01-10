<template>
  <article class="vehicle-card-skeleton">
    <div class="skeleton-image">
      <div class="skeleton-badge"></div>
      <div class="skeleton-carousel-controls">
        <div class="skeleton-counter"></div>
        <div class="skeleton-carousel-btn"></div>
        <div class="skeleton-carousel-btn"></div>
      </div>
      <div class="skeleton-pills">
        <div class="skeleton-pill"></div>
        <div class="skeleton-pill"></div>
        <div class="skeleton-pill"></div>
        <div class="skeleton-pill"></div>
      </div>
    </div>
    <div class="skeleton-info">
      <div class="skeleton-title"></div>
      <div class="skeleton-subtitle"></div>
      <div class="skeleton-footer">
        <div class="skeleton-price"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

// Skeleton gradient mixin
@mixin skeleton-gradient {
  background: linear-gradient(
    90deg,
    #e8e8e8 0%,
    #f0f0f0 50%,
    #e8e8e8 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.vehicle-card-skeleton {
  position: relative;
  display: block;
  background: $white;
  border-radius: $border-radius-xl;
  overflow: hidden;
  box-shadow: $shadow;
}

.skeleton-image {
  position: relative;
  width: 100%;
  height: 250px;
  background-color: $background-light;
}

.skeleton-badge {
  position: absolute;
  top: $spacing-sm;
  left: $spacing-sm;
  // Match .classification-badge: padding: $spacing-xs $spacing-sm with font-size: $font-size-base
  width: 50px;
  height: calc(#{$font-size-base} + #{$spacing-xs} * 2 + 2px); // font + padding + border
  @include skeleton-gradient;
  border-radius: $border-radius;
}

.skeleton-carousel-controls {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

.skeleton-counter {
  width: 40px;
  height: calc(#{$font-size-xs} + #{$spacing-xs} * 2); // Match .image-counter
  @include skeleton-gradient;
  border-radius: $border-radius-sm;
}

.skeleton-carousel-btn {
  width: 24px;
  height: 24px;
  @include skeleton-gradient;
  border-radius: $border-radius;
}

.skeleton-pills {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: $spacing-xs;
  flex-wrap: wrap;
  margin: $spacing-sm;
}

.skeleton-pill {
  // Match .pill: padding: 1px $spacing-sm with font-size: $font-size-xs
  width: 55px;
  height: calc(#{$font-size-xs} + 2px + 2px); // font + padding + border
  @include skeleton-gradient;
  border-radius: $border-radius;
}

.skeleton-info {
  padding: $spacing-sm;
}

.skeleton-title {
  // Match .vehicle-name: font-size: $font-size-lg
  height: $font-size-lg;
  @include skeleton-gradient;
  border-radius: $border-radius-sm;
  margin-bottom: $spacing-xs;
  width: 75%;
}

.skeleton-subtitle {
  // Match .vehicle-derivative: font-size: $font-size-sm
  height: $font-size-sm;
  @include skeleton-gradient;
  border-radius: $border-radius-sm;
  margin-bottom: $spacing-md;
  width: 55%;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-md;
}

.skeleton-price {
  // Match .price-value: font-size: $font-size-xxl
  height: $font-size-xxl;
  width: 100px;
  @include skeleton-gradient;
  border-radius: $border-radius-sm;
}

.skeleton-button {
  // Match .view-btn: padding: $spacing-sm $spacing-xl with font-size: $font-size-base
  height: calc(#{$font-size-base} + #{$spacing-sm} * 2);
  width: 75px;
  @include skeleton-gradient;
  border-radius: $border-radius;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
