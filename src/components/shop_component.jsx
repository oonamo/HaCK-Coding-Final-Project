export default function ShopItem({ name, cost, bought, description, image, attemptPurchase }) {
  return (
    <div className="shop-item-card">
      {
        image
          ? <img className="item-image" src={image} />
          : <p className="item-image placeholder">Image Here</p>
      }
      <div className="item-info">
        <p className="item-description">{description}</p>
        <p className="item-bought-amount">x{bought}</p>
        <button className="item-buy-button" onClick={attemptPurchase}>Buy ${cost}</button>
      </div>
    </div>
  )
}
