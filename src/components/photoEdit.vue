<template>
   <div id="render" class="col-lg-3 col-md-12 pb-3">
          <div id="filter">
            <img
              id="previewImg"
              src=".\src\assets\SnFy9OC.png"
              alt="Placeholder"
            />
          </div>
        </div>
        <div
          class="col-lg-4 col-md-12 ml-5 align-self-center text-center m-5 animate__animated animate__fadeIn"
        >
          <h3>Dostosuj gradient</h3>
          <div class="mt-4">
            <input
              type="range"
              min="15"
              max="40"
              value="0"
              class="slider"
              id="range"
            />
            <p>Ustawienie gradientu</p>
          </div>
          <div class="mt-4">
            <input
              type="range"
              min="2"
              max="30"
              value="0"
              class="slider2"
              id="range2"
            />
            <p>Ustawienie logo</p>
          </div>
          <p>
            <input
              type="file"
              name="photo"
              onchange="previewFile(this);"
              required
            />
          </p>
          <p>
            <button
              class="btn btn-block btn-custom btn-lg mt-2 mb-3"
              id="btnDownload"
            >
              <i class="fa-solid fa-download fa-fw"></i>Pobierz zdjęcie
            </button>
          </p>
        </div>
</template>

<script>
export default {
  mounted() {

      const sliderValue = document.getElementById("range");
      const sliderValue2 = document.getElementById("range2");
      sliderValue.addEventListener("input", function () {
        var val1 = this.value / 100;
        var val2 = 1 + val1;
        var style = document.createElement("style");
        style.innerHTML =
          "#filter:before {background: linear-gradient(to top, rgba(255,255,255,1.0) " +
          val1 * 100 +
          "%, rgba(255,255,255,0) " +
          val2 * 40 +
          "%);}";
        document.getElementById("filter").appendChild(style);
      });
      sliderValue2.addEventListener("input", function () {
        var val3 = this.value / 100;
        var val4 = 1 - val3;
        var style = document.createElement("style");
        style.innerHTML = "#filter:after { top:" + val4 * 430 + "px;}";
        document.getElementById("filter").appendChild(style);
      });
  }
  
}

</script>
