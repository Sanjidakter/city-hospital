<template>
  <section id="hero" class="hero section">
    <div
      id="hero-carousel"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div class="carousel-item">
        <img
          src="http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/hero-carousel/hero-carousel-1.jpg"
          alt=""
        />
        <!--          <div class="container">
                    <h2>Welcome to Medicio</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#about" class="btn-get-started">Read More</a>
                  </div>-->
      </div>
      <!-- End Carousel Item -->

      <div class="carousel-item">
        <img
          src="http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/hero-carousel/hero-carousel-2.jpg"
          alt=""
        />
        <!--          <div class="container">
                    <h2>At vero eos et accusamus</h2>
                    <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.</p>
                    <a href="#about" class="btn-get-started">Read More</a>
                  </div>-->
      </div>
      <!-- End Carousel Item -->

      <div class="carousel-item active">
        <img
          src="http://cityhospital.techecosys.net/includes/themes/primary/hospital/hospital/assets/img/hero-carousel/hero-carousel-3.jpg"
          alt=""
        />
        <!--          <div class="container">
                    <h2>Temporibus autem quibusdam</h2>
                    <p>Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt omnis iste natus error sit voluptatem accusantium.</p>
                    <a href="#about" class="btn-get-started">Read More</a>
                  </div>-->
      </div>
      <!-- End Carousel Item -->

      <a
        class="carousel-control-prev"
        href="#hero-carousel"
        role="button"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon bi bi-chevron-left"
          aria-hidden="true"
        ></span>
      </a>

      <a
        class="carousel-control-next"
        href="#hero-carousel"
        role="button"
        data-bs-slide="next"
      >
        <span
          class="carousel-control-next-icon bi bi-chevron-right"
          aria-hidden="true"
        ></span>
      </a>

      <ol class="carousel-indicators">
        <li data-bs-target="#hero-carousel" data-bs-slide-to="0" class=""></li>
        <li data-bs-target="#hero-carousel" data-bs-slide-to="1" class=""></li>
        <li
          data-bs-target="#hero-carousel"
          data-bs-slide-to="2"
          class="active"
          aria-current="true"
        ></li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
/*--------------------------------------------------------------
# Hero Section
--------------------------------------------------------------*/
.hero {
  padding: 0;
}

.hero .carousel {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  position: relative;
}

@media (max-height: 500px), (max-width: 580px) {
  .hero .carousel {
    min-height: 100vh;
  }
}

.hero img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero .carousel-item {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.hero .container {
  background: color-mix(in srgb, var(--surface-color), transparent 10%);
  position: relative;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 50px;
  border-top: 4px solid var(--accent-color);
  z-index: 3;
}

@media (max-width: 1200px) {
  .hero .container {
    margin-left: 50px;
    margin-right: 50px;
  }
}

.hero h2 {
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .hero h2 {
    font-size: 30px;
  }
}

.hero .btn-get-started {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 8px 32px;
  transition: 0.3s;
  margin: 10px;
  border-radius: 5px;
  color: var(--contrast-color);
  background: var(--accent-color);
}

.hero .btn-get-started:hover {
  background: color-mix(in srgb, var(--accent-color) 90%, white 15%);
}

.hero .carousel-control-prev {
  justify-content: start;
}

@media (min-width: 640px) {
  .hero .carousel-control-prev {
    padding-left: 15px;
  }
}

.hero .carousel-control-next {
  justify-content: end;
}

@media (min-width: 640px) {
  .hero .carousel-control-next {
    padding-right: 15px;
  }
}

.hero .carousel-control-next-icon,
.hero .carousel-control-prev-icon {
  background: none;
  font-size: 26px;
  line-height: 0;
  background: color-mix(in srgb,#444444, transparent 90%);
  border-radius: 50px;
  color: #ffffff;
  transition: 0.3s;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero .carousel-control-prev,
.hero .carousel-control-next {
  transition: 0.3s;
  opacity: 0.5;
}

.hero .carousel-control-prev:focus,
.hero .carousel-control-next:focus {
  opacity: 0.5;
}

.hero .carousel-control-prev:hover,
.hero .carousel-control-next:hover {
  opacity: 0.9;
}

.hero .carousel-control-prev:hover .carousel-control-next-icon,
.hero .carousel-control-prev:hover .carousel-control-prev-icon,
.hero .carousel-control-next:hover .carousel-control-next-icon,
.hero .carousel-control-next:hover .carousel-control-prev-icon {
  background: #00A550;
  color: #ffffff;
}

.hero .carousel-indicators li {
  cursor: pointer;
  background: #ffffff;
  overflow: hidden;
  border: 0;
  width: 12px;
  height: 12px;
  border-radius: 50px;
  opacity: 1;
  transition: 0.3s;
}

.hero .carousel-indicators li.active {
  opacity: 1;
  background: var(--accent-color);
}
</style>
