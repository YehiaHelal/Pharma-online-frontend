const Offers = () => {
  return (
    <>
      <div className="offers-selected-page-main-text">
        please call us to give you more details about our offers, our numbers
        are on the contact page
        <a href="http://localhost:3000/contact">
          <div>Contact Page</div>
        </a>
      </div>

      <div className="offers-selected-page">
        <img src={require(`./../../img/offers/our-app.webp`)} alt="offer-one" />
        <div>Offers One</div>

        <img src={require(`./../../img/offers/offer-2.webp`)} alt="offer-one" />
        <div>Offers Two</div>

        <img src={require(`./../../img/offers/offer-3.webp`)} alt="offer-one" />
        <div>Offers three</div>

        <img
          src={require(`./../../img/offers2/offers2-1.webp`)}
          alt="offer2-one"
        />
        <div>Offers four</div>

        <img
          src={require(`./../../img/offers2/offers2-2.webp`)}
          alt="offer2-two"
        />
        <div>Offers five</div>
        <img
          src={require(`./../../img/offers2/offers2-3.webp`)}
          alt="offer2-three"
        />
        <div>Offers six</div>
      </div>
    </>
  );
};

export default Offers;
