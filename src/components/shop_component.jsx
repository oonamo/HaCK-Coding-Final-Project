export default function ShopItem({ name, cost, bought, description, image, attemptPurchase }) {
  return (
    <div className={name}>
      <p className="item-image">Image Here</p>
      <p className="item-bought-amount">x{bought}</p>
      <p className="item-description">{description}</p>
      <button className="item-buy-button" onClick={attemptPurchase}>Buy ${cost}</button>
    </div>
  )
}
