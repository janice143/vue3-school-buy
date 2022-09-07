<template>
  <div class="banner">
    <div class="container">
      <div class="slider-container has-scrollbar">
        <div class="slider-item">
          <!-- "https://cdn.jsdelivr.net/gh/janice143/pic_sweet_bed@main/vue3_school_buy/banner-1.webp" -->
          <img
            src="@/assets/images/banner-1.webp"
            alt="women's latest fashion sale"
            class="banner-img"
          />

          <div class="banner-content">
            <p class="banner-subtitle">热卖商品</p>

            <h2 class="banner-title">女士时尚羊毛衣</h2>

            <p class="banner-text">只要 ￥ <b>20</b>.00</p>

            <a href="#" class="banner-btn">现在购买</a>
          </div>
        </div>

        <div class="slider-item">
          <img
            src="@/assets/images/banner-2.webp"
            alt="modern sunglasses"
            class="banner-img"
          />

          <div class="banner-content">
            <p class="banner-subtitle">热卖商品</p>

            <h2 class="banner-title">女士时尚羊毛衣</h2>

            <p class="banner-text">只要 ￥ <b>20</b>.00</p>

            <a href="#" class="banner-btn">现在购买</a>
          </div>
        </div>

        <div class="slider-item">
          <img
            src="@/assets/images/banner-3.webp"
            alt="new fashion summer sale"
            class="banner-img"
          />

          <div class="banner-content">
            <p class="banner-subtitle">热卖商品</p>

            <h2 class="banner-title">女士时尚羊毛衣</h2>

            <p class="banner-text">只要 ￥ <b>20</b>.00</p>

            <a href="#" class="banner-btn">现在购买</a>
          </div>
        </div>

        <div class="slider-item">
          <img
            src="@/assets/images/banner-4.webp"
            alt="new fashion summer sale"
            class="banner-img"
          />

          <div class="banner-content">
            <p class="banner-subtitle">热卖商品</p>

            <h2 class="banner-title">女士时尚羊毛衣</h2>

            <p class="banner-text">只要 ￥ <b>20</b>.00</p>

            <a href="#" class="banner-btn">现在购买</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="less">
.banner {
  //   margin: 30px 0;
  //   border: 1px solid red;
  .slider-container {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: @border-radius-md;
    overflow: auto hidden;
    scroll-snap-type: inline mandatory;
    overscroll-behavior-inline: contain;
    .slider-item {
      position: relative;
      min-width: 100%;
      max-height: 450px;
      aspect-ratio: 5 / 3;
      border-radius: @border-radius-md;
      overflow: hidden;
      scroll-snap-align: start;
      .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right;
      }
      .banner-content {
        // border: 1px solid red;
        // width: 40%;
        // height: 60%;

        position: absolute;
        bottom: 30%;
        left: 10%;
        padding: 20px 25px;
        border-radius: @border-radius-md;
        & > * {
          margin-bottom: 2rem;
        }
        .banner-subtitle {
          color: @salmon-pink;
          font-size: calc(2 * @fs-7);
          font-weight: @weight-500;
          text-transform: capitalize;
          letter-spacing: 2px;
        }

        .banner-title {
          color: @eerie-black;
          font-size: calc(2 * @fs-1);
          line-height: 1;
        }

        .banner-text {
          display: block;
          color: @sonic-silver;
          font-size: calc(2 * @fs-7);
          font-weight: @weight-500;

          //   border: 1px solid red;
        }

        .banner-btn {
          background: @salmon-pink;
          color: @white;
          font-size: calc(2 * @fs-11);
          font-weight: @weight-600;
          padding: 0.8em 1em;
          border-radius: @border-radius-sm;
          transition: @transition-timing;
        }

        .banner-btn:hover {
          background: @eerie-black;
        }
      }
      @media screen and (max-width: 900px) {
        aspect-ratio: 1 / 1;
        .banner-content {
          width: auto;
          background: hsla(0, 0%, 100%, 0.8);
          position: absolute;

          bottom: 25px;
          left: 25px;
          right: 25px;
          padding: 20px 25px;
          & > * {
            margin-bottom: 1rem;
          }
        }
        //   height: 100%;
        .banner-text {
          display: none;
        }
      }
    }
  }
}
</style>
