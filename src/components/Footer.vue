<template>
  <footer class="page-footer indigo darken-4">
    <div class="container" id="container90">
      <div class="row center">
          <div class="col l4 s12 ">
            <h5 class="white-text">DesApp</h5>
            <p class="grey-text text-lighten-4">{{$t("message.desappFooter")}}</p>
          </div>
          
          <div class="col l4 s12">
            <h5 class="white-text">{{$t("message.subjectPage")}}</h5>
            <ul>
                <li><a class="white-text" href="https://sites.google.com/view/unq-desarrollo-de-aplicaciones">
                  {{$t("message.desapp")}} - UNQ</a></li>
            </ul>
          </div>
          
          <div class="col l4 s12">
            <h5 class="white-text">Github</h5>
            <ul>
                <li><a class="white-text" href="https://github.com/SanchezSDario/DesAppProject/">Backend</a></li>
            </ul>
            <ul>
                <li><a class="white-text" href="https://github.com/Jenami/DesAppProjectWeb/">Frontend</a></li>
            </ul>
          </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container ">
         <div class="section">
          <div class="row">
            <div class="center">
              Made with <a class="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
            </div>
          </div>
         </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
#container90 {
    width: 90%;
}
</style>