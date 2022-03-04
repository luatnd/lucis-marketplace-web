export const Listing = () => {
  return (
    <div className="listing">
      <div className="listing-body">
        <div className="listing-label">Listing</div>
        <img src="/home/listing-img.png" />
        <div className="listing-content">
          <span className="marquee-content">
            Animverse sold to <span className="cyan-text">Nhinty </span>
            from <span className="cyan-text">Animverse123456789</span> for
            0,12BNB
          </span>
        </div>
        <div className="time cyan-text">1 minutes ago</div>
      </div>
    </div>
  )
}
