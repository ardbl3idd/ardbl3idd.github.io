<script>
import VueBasicAlert from "vue-basic-alert";
import photoEdit from './components/photoEdit.vue';

export default {
  data() {
    return {
      name: "",
      surname: "",
      position: "",
      phone_number: "",
      email: "",
      imgSrc: "",
      text: "Tutaj wygenerowana zostanie stopka...",
    };
  },
  components: {
    VueBasicAlert,
    photoEdit,
  },
  methods: {
    onFile(e) {
      const files = e.target.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.imgSrc = reader.result);
    },
    m1: function () {
      this.$refs.myinput.focus();
      document.execCommand("copy");
    },
    m2: function () {
      this.$refs.alert.showAlert(
        "success",
        "Udało się skopiować kod", // Header of the alert
        "Skopiowano!" // Message of the alert
      );
    },
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      const button1 = document.getElementById("button1");
      const preview = document.getElementById("preview");
      const codeText = document.getElementById("code-text");
    
      button1.addEventListener("click", () => {
        codeText.value = preview.innerHTML;
      });
    });
  },
};
</script>

<template>
  <div class="container pb-3 pt-3">
    <hr class="hrcenter pb-3" />
    <h2 class="text-center pb-4">Generator zdjęcia profilowego</h2>
    <div class="pb-5" ref="printcontent">
      <div class="row justify-content-center">
       <photoEdit />
      </div>
    </div>
    <div class="container-fluid">
      <hr class="hrcenter pb-3 mt-5" />
      <h2 class="text-center mb-4">Generator stopki HTML</h2>
      <div class="row ct-1">
        <div class="col-lg-8 col-sm-12 p-3 border rounded bg-white">
          <div id="preview">
            <p>Best regards / Pozdrawiam</p>
            <table
              class="sc-gPEVay eQYmiW"
              style="
                vertical-align: -webkit-baseline-middle;
                font-family: Arial;
              "
              cellspacing="0"
              cellpadding="0"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="sc-gPEVay eQYmiW"
                      style="
                        vertical-align: -webkit-baseline-middle;
                        font-family: Arial;
                      "
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td style="vertical-align: top; width: 170px">
                            <table
                              class="sc-gPEVay eQYmiW"
                              style="
                                vertical-align: -webkit-baseline-middle;
                                font-family: Arial;
                                height: 85px;
                              "
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="sc-TOsTZ kjYrri"
                                    style="text-align: center; width: 171px"
                                  >
                                    <img placeholder="https://codema.io/storage/app/media/mailfooter/codema.png"
                                      :src="'https://codema.io/storage/app/media/mailfooter/codema.png'" alt="logo Codema"
                                      v-if="imgSrc"
                                      id="profile_picture"
                                      class="sc-cHGsZl bHiaRe"
                                      style="background: rgb(255,255,255)';
  background: linear-gradient(90deg, rgba(255,255,255,1) 13%, rgba(0,0,0,0) 100%); max-width: 170px; display: block;  "
                                      role="presentation"
                                      width="170"
                                    />
                                  </td>
                                </tr>
                                <tr style="height: 30px">
                                  <td
                                    height="30"
                                    style="height: 30px; width: 171px"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr style="height: 32px">
                                  <td
                                    style="
                                      text-align: center;
                                      height: 32px;
                                      width: 171px;
                                    "
                                  >
                                    <table
                                      class="sc-gPEVay eQYmiW"
                                      style="
                                        vertical-align: -webkit-baseline-middle;
                                        font-family: Arial;
                                        display: inline-block;
                                      "
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr style="text-align: center">
                                          <td>
                                            <a
                                              class="sc-hzDkRC kpsoyz"
                                              style="
                                                display: inline-block;
                                                padding: 0px;
                                                background-color: #224f89;
                                              "
                                              href="https://www.facebook.com/codema.io"
                                              ><img
                                                class="sc-bRBYWo ccSRck"
                                                style="
                                                  background-color: #224f89;
                                                  max-width: 135px;
                                                  display: block;
                                                "
                                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon-2x.png"
                                                alt="facebook"
                                                height="24"
                                            /></a>
                                          </td>
                                          <td width="5">
                                            <div>&nbsp;</div>
                                          </td>
                                          <td>
                                            <a
                                              class="sc-hzDkRC kpsoyz"
                                              style="
                                                display: inline-block;
                                                padding: 0px;
                                                background-color: #224f89;
                                              "
                                              href="https://www.linkedin.com/company/codema-software-house"
                                              ><img
                                                class="sc-bRBYWo ccSRck"
                                                style="
                                                  background-color: #224f89;
                                                  max-width: 135px;
                                                  display: block;
                                                "
                                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/linkedin-icon-2x.png"
                                                alt="linkedin"
                                                height="24"
                                            /></a>
                                          </td>
                                          <td width="5">
                                            <div>&nbsp;</div>
                                          </td>
                                          <td>
                                            <a
                                              class="sc-hzDkRC kpsoyz"
                                              style="
                                                display: inline-block;
                                                padding: 0px;
                                                background-color: #224f89;
                                              "
                                              href="https://www.instagram.com/codemasoftwarehouse/"
                                              ><img
                                                class="sc-bRBYWo ccSRck"
                                                style="
                                                  background-color: #224f89;
                                                  max-width: 135px;
                                                  display: block;
                                                "
                                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png"
                                                alt="instagram"
                                                height="24"
                                            /></a>
                                          </td>
                                          <td width="5">
                                            <div>&nbsp;</div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td style="width: 28px">
                            <div>&nbsp;</div>
                          </td>
                          <td
                            style="
                              padding: 0px;
                              vertical-align: middle;
                              width: 365px;
                            "
                          >
                            <h3
                              class="sc-fBuWsC eeihxG"
                              style="
                                margin: 0px;
                                font-size: 18px;
                                font-weight: bold;
                                color: #000000;
                              "
                            >
                              {{ name }}
                            </h3>
                            <p
                              class="sc-fMiknA bxZCMx"
                              style="
                                margin: 0px;
                                color: #000000;
                                font-size: 14px;
                                line-height: 22px;
                              "
                            >
                              {{ position }}
                            </p>
                            <p
                              class="sc-dVhcbM fghLuF"
                              style="
                                margin: 0px;
                                font-weight: 500;
                                color: #000000;
                                font-size: 14px;
                                line-height: 22px;
                              "
                            >
                              CODEMA Software House
                            </p>
                            <p
                              class="sc-eqIVtm kRufpp"
                              style="
                                color: #000000;
                                margin: 0px;
                                font-size: 14px;
                                line-height: 22px;
                              "
                            >
                              PHP, Python, Java, React.js, Vue.js, React Native
                            </p>
                            <table
                              class="sc-gPEVay eQYmiW"
                              style="
                                vertical-align: -webkit-baseline-middle;
                                font-family: Arial;
                                width: 100%;
                              "
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="sc-jhAzac hmXDXQ"
                                    style="
                                      width: 100%;
                                      border-bottom: 1px solid #224f89;
                                      border-left: none;
                                      display: block;
                                    "
                                    height="1"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              class="sc-gPEVay eQYmiW"
                              style="
                                vertical-align: -webkit-baseline-middle;
                                font-family: Arial;
                                height: 72px;
                              "
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr style="vertical-align: middle">
                                  <td
                                    style="
                                      vertical-align: middle;
                                      height: 18px;
                                      width: 30px;
                                    "
                                  >
                                    <table
                                      class="sc-gPEVay eQYmiW"
                                      style="
                                        vertical-align: -webkit-baseline-middle;
                                        font-family: Arial;
                                      "
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="vertical-align: bottom">
                                            <span
                                              class="sc-jlyJG bbyJzT"
                                              style="
                                                display: block;
                                                background-color: #224f89;
                                              "
                                              ><img
                                                class="sc-iRbamj blSEcj"
                                                style="
                                                  display: block;
                                                  background-color: #224f89;
                                                "
                                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png"
                                                width="13"
                                            /></span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    style="
                                      padding: 0px;
                                      color: #000000;
                                      height: 18px;
                                      width: 303.094px;
                                    "
                                  >
                                    <a
                                      class="sc-gipzik iyhjGb"
                                      style="
                                        text-decoration: none;
                                        color: #000000;
                                        font-size: 12px;
                                      "
                                      href="tel:+48 numer telefonu"
                                      >+48&nbsp;<span>{{
                                        phone_number
                                      }}</span></a
                                    >
                                  </td>
                                </tr>
                                <tr style="vertical-align: middle">
                                  <td
                                    style="
                                      vertical-align: middle;
                                      height: 18px;
                                      width: 30px;
                                    "
                                  >
                                    <table
                                      class="sc-gPEVay eQYmiW"
                                      style="
                                        vertical-align: -webkit-baseline-middle;
                                        font-family: Arial;
                                      "
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="vertical-align: bottom">
                                            <span
                                              class="sc-jlyJG bbyJzT"
                                              style="
                                                display: block;
                                                background-color: #224f89;
                                              "
                                              ><img
                                                class="sc-iRbamj blSEcj"
                                                style="
                                                  display: block;
                                                  background-color: #224f89;
                                                "
                                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png"
                                                width="13"
                                            /></span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    style="
                                      padding: 0px;
                                      height: 18px;
                                      width: 303.094px;
                                      font-size: 12px;
                                    "
                                  >
                                    {{ email }}
                                  </td>
                                </tr>
                                <tr style="vertical-align: middle">
                                  <td
                                    style="
                                      vertical-align: middle;
                                      height: 18px;
                                      width: 30px;
                                    "
                                  >
                                    <table
                                      class="sc-gPEVay eQYmiW"
                                      style="
                                        vertical-align: -webkit-baseline-middle;
                                        font-family: Arial;
                                      "
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="vertical-align: bottom">
                                            <span
                                              class="sc-jlyJG bbyJzT"
                                              style="
                                                display: block;
                                                background-color: #224f89;
                                              "
                                              ><img
                                                class="sc-iRbamj blSEcj"
                                                style="
                                                  display: block;
                                                  background-color: #224f89;
                                                "
                                                src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png"
                                                width="13"
                                            /></span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    style="
                                      padding: 0px;
                                      height: 18px;
                                      width: 303.094px;
                                    "
                                  >
                                    <a
                                      class="sc-gipzik iyhjGb"
                                      style="
                                        text-decoration: none;
                                        color: #000000;
                                        font-size: 12px;
                                      "
                                      href="https://codema.io"
                                      >https://codema.io</a
                                    >
                                  </td>
                                </tr>
                                <tr style="vertical-align: middle">
                                  <td
                                    style="
                                      vertical-align: middle;
                                      height: 18px;
                                      width: 30px;
                                    "
                                  >
                                    <table
                                      class="sc-gPEVay eQYmiW"
                                      style="
                                        vertical-align: -webkit-baseline-middle;
                                        font-family: Arial;
                                      "
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="vertical-align: bottom">
                                            <a
                                              title="CODEMA - location"
                                              href="https://g.page/codema-software?share"
                                              target="_blank"
                                              rel="noopener"
                                              ><span
                                                class="sc-jlyJG bbyJzT"
                                                style="
                                                  display: block;
                                                  background-color: #224f89;
                                                "
                                                ><img
                                                  class="sc-iRbamj blSEcj"
                                                  style="
                                                    display: block;
                                                    background-color: #224f89;
                                                  "
                                                  src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/address-icon-2x.png"
                                                  width="13" /></span
                                            ></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    style="
                                      padding: 0px;
                                      height: 18px;
                                      width: 303.094px;
                                    "
                                  >
                                    <span
                                      class="sc-csuQGl CQhxV"
                                      style="font-size: 12px; color: #000000"
                                      >ul. Anny Walentynowicz 10, 20-328 Lublin,
                                      Poland</span
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <br />
                            <table
                              class="sc-gPEVay eQYmiW"
                              style="
                                vertical-align: -webkit-baseline-middle;
                                font-family: Arial;
                                width: 341px;
                                height: 89px;
                              "
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td style="width: 337px" height="30">
                                    <span
                                      style="display: block; text-align: left"
                                      ><a
                                        class="sc-fAjcbJ byigni"
                                        style="
                                          border-width: 6px 12px;
                                          border-style: solid;
                                          border-color: #224f89;
                                          display: inline-block;
                                          background-color: #224f89;
                                          color: #ffffff;
                                          font-weight: bold;
                                          text-decoration: none;
                                          text-align: center;
                                          line-height: 40px;
                                          font-size: 12px;
                                          border-radius: 3px;
                                        "
                                        href="https://codema.io/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >Visit our website</a
                                      ></span
                                    >
                                    <br /><img
                                      src="https://static.codema.pl/files/nagroda_codema_350x1024.jpeg"
                                      alt=""
                                      width="361"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <br /><span style="display: block; text-align: left"
                              ><span style="color: #808080; font-size: 9px"
                                >The content of this email is confidential and
                                intended for the recipient specified in message
                                only. It is strictly forbidden to share any part
                                of this message with any third party, without a
                                written consent of the sender. If you received
                                this message by mistake, please reply to this
                                message and follow with its deletion, so that we
                                can ensure such a mistake does not occur in the
                                future. Thank You in advance.</span
                              ><br
                            /></span>
                          </td>
                        </tr>
                        <tr>
                          <td style="vertical-align: top; width: 134px"></td>
                          <td style="width: 28px">
                            <div></div>
                          </td>
                          <td
                            style="
                              padding: 0px;
                              vertical-align: middle;
                              width: 365px;
                            "
                          >
                            <h3
                              class="sc-fBuWsC eeihxG"
                              style="
                                margin: 0px;
                                font-size: 18px;
                                color: #000000;
                              "
                            ></h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="col-lg-4 col-sm-12 heading-type-1 animate__animated animate__fadeIn form-container"
        >
          <div class="logo mt-2"></div>
          <h3>Uzupełnij dane</h3>

          <form class="pt-4">
            <div class="group">
              <input type="text" id="name" v-model="name" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Imię i nazwisko</label>
            </div>
            <div class="group">
              <input type="text" id="name" v-model="position" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Stanowisko</label>
            </div>
            <div class="group">
              <input type="phone" id="name" v-model="phone_number" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Numer telefonu</label>
            </div>
            <div class="group">
              <input type="text" id="name" v-model="email" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Adres e-mail</label>
            </div>
            <div class="group mt-5">
              <input type="text" id="name" v-model="imgSrc" @change="onFile" />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Link do zdjęcia</label>
            </div>
          </form>
          <!-- <form class="form-group pb-2">
       
              <input class="form-control" id="name" v-model="name" placeholder="Imię i nazwisko" />
              <input id="position" class="form-control mt-3" v-model="position" placeholder="Stanowisko" />
      
              <input id="phone_number" class="form-control mt-3" v-model="phone_number"
                placeholder="Numer telefonu np. 123-345-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required />
              <input id="email" class="form-control mt-3" v-model="email" placeholder="E-mail" />

              <input id="url" v-model="imgSrc" placeholder="Link do zdjęcia" class="form-control mt-3" type="url"
                @change="onFile" />
            </form> -->
          <button
            id="button1"
            class="btn btn-custom float-end px-5 btn-lg"
            type="button"
          >
            <i class="fa fa-refresh fa-fw" aria-hidden="true"></i>Generuj kod
          </button>
        </div>
      </div>
      <div></div>
    </div>
  </div>

  <div class="container textarea-container">
    <div class="pt-3">
      <div class="col-md-12">
        <form action="">
          <div class="form-group">
            <textarea
              v-on:focus="$event.target.select()"
              ref="myinput"
              readonly
              :value="text"
              type="text"
              class="form-control"
              placeholder="kod html"
              id="code-text"
              rows="4"
              cols="10"
            ></textarea>
          </div>
        </form>
      </div>
    </div>

    <div class="col-md-12">
      <span class="input-group-btn">
        <button
          @click="
            m1();
            m2();
          "
          class="btn btn-outline-secondary pt-2 mt-2 float-end px-5 mb-3"
          type="button"
          id="copy-button"
          data-placement="button"
          title="Skopiuj do schowka"
        >
          <i class="fa fa-clone fa-fw" aria-hidden="true"></i>
          Kopiuj
        </button>

        <vue-basic-alert :duration="400" :closeIn="1500" ref="alert" />
      </span>
    </div>
  </div>
</template>
