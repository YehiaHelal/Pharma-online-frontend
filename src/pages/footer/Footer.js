export default function Footer() {
  return (
    <div className="footer">
      <div className="grid-container-footer">
        <div className="footer-row">
          <div className="medium-text-bold">Pharmacy Online</div>
          <div>Order medicines online from pharmacies in Egypt, </div>
          <div>now order all your needs from the pharmacy easily.</div>
          <div>Tax number: 000</div>
        </div>
        <div className="footer-row">
          <div>
            <a href="http://localhost:3000/about">About Us</a>
          </div>

          <div>
            <a href="http://localhost:3000/contact">Contact</a>
          </div>
          <div>
            <a href="http://localhost:3000/help">FAQ Page</a>
          </div>
          <div>Are you a pharmacy owner?</div>
        </div>
        <div className="footer-row">
          <div>
            <a href="http://localhost:3000/contact">Our Services</a>
          </div>

          <div>
            <a href="http://localhost:3000/contact">Our branches</a>
          </div>
        </div>
        <div className="footer-row">
          <div>Download Our App</div>
          <img
            src={require(`./../../img/downloadapp/appGallery.webp`)}
            alt="offer2-three"
          />
          <img
            src={require(`./../../img/downloadapp/appStore.webp`)}
            alt="offer2-three"
          />
          <img
            src={require(`./../../img/downloadapp/googlePlay.webp`)}
            alt="offer2-three"
          />
        </div>
      </div>
    </div>
  );
}
