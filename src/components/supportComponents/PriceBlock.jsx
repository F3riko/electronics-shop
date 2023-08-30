const PriceBlock = ({ price, discount }) => {
  return discount > 0 ? (
    <span className="price-font">
      <span className="me-2 price-font price-discount">
        {price - discount}$
      </span>
      <span className="me-2 price-without-discount">{price} $</span>
      <span className="discount">-{Math.round((discount / price) * 100)}%</span>
    </span>
  ) : (
    <span className="price-font">{parseInt(price).toFixed(0)} $</span>
  );
};

export default PriceBlock;
