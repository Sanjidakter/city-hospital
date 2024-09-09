<template>
    <footer class="">
      <footer id="footer" class="footer light-background">
        <div class="container footer-top">
          <div class="row gy-4">
            <div class="col-lg-4 col-md-6 footer-about">
              <a href="index.html" class="logo d-flex align-items-center">
                <span class="sitename">City Hospital Limited</span>
              </a>
              <div class="footer-contact pt-3">
                <p>1/8, Block-E, Lalmatia, Satmosjid</p>
                <p>Road, Mohammadpur, Dhaka - 1207.</p>
                <p class="mt-3">
                  <strong>Phone:</strong>
                  <span>8143312, 8143437, 8143166, 8143167, 9124436</span>
                </p>
                <p><strong>Email:</strong> <span>info@cityhospital.com</span></p>
              </div>
              <div class="social-links d-flex mt-4">
                <a href=""><i class="bi bi-twitter-x"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
  
            <div class="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
  
            <div class="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href="http://cityhospital.techecosys.net//news_and_events"
                    >News &amp; Events</a
                  >
                </li>
                <li>
                  <a
                    href="http://cityhospital.techecosys.net//education-and-career"
                    >Education &amp; Career</a
                  >
                </li>
                <li><a href="http://cityhospital.techecosys.net//faq">FAQ</a></li>
                <li>
                  <a href="http://cityhospital.techecosys.net//location"
                    >Location</a
                  >
                </li>
                <!--<li><a href="#">Graphic Design</a></li>-->
              </ul>
            </div>
  
            <div class="col-lg-4 col-md-6 footer-links">
              <h4>Doctors</h4>
              <ul>
                <li><a href="#">Prof. Dr. Shahidul Bari</a></li>
                <li><a href="#"> Prof. Dr. Nasima Begum</a></li>
                <li><a href="#">Prof. (Dr.) Paritosh Kumar Baral</a></li>
                <li><a href="#">Prof. Dr. Md. Faizul Islam Chowdhury</a></li>
                <li><a href="#"> Prof. Dr. Mahmood Hasan</a></li>
                <li><a href="#"> Prof. Dr. Md. Ehteshamul Hoque</a></li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>
            <strong class="px-1 sitename">City Hospital Limited</strong>
            <span>All Rights Reserved</span>
          </p>
          <div class="credits">
            <!-- All the links in the footer should remain intact. -->
            <!-- You can delete the links only if you've purchased the pro version. -->
            <!-- Licensing information: https://bootstrapmade.com/license/ -->
            <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
            Designed by
            <a href="https://autofysolutions.com/">Autofy Solutions</a>
          </div>
        </div>
      </footer>
    </footer>
  </template>
  
  <script>
   export default {
      name: "FooterElement",
    };
  </script>
  
  <style scoped>
  
  
  /*--------------------------------------------------------------
  # Global Footer
  --------------------------------------------------------------*/
  .footer {
      color: #444444;
      background-color: #f7fcfc;
      font-size: 14px;
      position: relative;
  }
  
  .footer .footer-top {
      padding-top: 50px;
  }
  
  .footer .footer-about .logo {
      line-height: 1;
      margin-bottom: 25px;
  }
  
  .footer .footer-about .logo img {
      max-height: 40px;
      margin-right: 6px;
  }
  
  .footer .footer-about .logo span {
      color: var(--heading-color);
      font-family: var(--heading-font);
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 1px;
  }
  
  .footer .footer-about p {
      /*font-size: 14px;*/
      font-family: var(--heading-font);
  }
  
  .footer .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid color-mix(in srgb, var(--default-color), transparent 50%);
      font-size: 16px;
      color: color-mix(in srgb, var(--default-color), transparent 20%);
      margin-right: 10px;
      transition: 0.3s;
  }
  
  .footer .social-links a:hover {
      color: var(--accent-color);
      border-color: var(--accent-color);
  }
  
  .footer h4 {
      font-size: 16px;
      font-weight: bold;
      position: relative;
      padding-bottom: 12px;
  }
  
  .footer .footer-links {
      margin-bottom: 30px;
  }
  
  .footer .footer-links ul {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  
  .footer .footer-links ul i {
      padding-right: 2px;
      font-size: 12px;
      line-height: 0;
  }
  
  .footer .footer-links ul li {
      padding: 10px 0;
      display: flex;
      align-items: center;
  }
  
  .footer .footer-links ul li:first-child {
      padding-top: 0;
  }
  
  .footer .footer-links ul a {
      color: color-mix(in srgb, var(--default-color), transparent 30%);
      display: inline-block;
      line-height: 1;
  }
  
  .footer .footer-links ul a:hover {
      color: var(--accent-color);
  }
  
  .footer .footer-contact p {
      margin-bottom: 5px;
  }
  
  .footer .copyright {
      padding: 25px 0;
      border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  }
  
  .footer .copyright p {
      margin-bottom: 0;
  }
  
  .footer .credits {
      margin-top: 8px;
      font-size: 13px;
  }
  
  </style>
  
  