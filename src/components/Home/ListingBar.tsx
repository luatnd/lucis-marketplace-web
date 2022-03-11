import Link from "next/link"

export const ListingBar = () => {
  return (
    <div className="listing-bar">
      <div className="listing-body">
        <div className="listing-label">Listing</div>
        <img src="/home/listing-img.png" />
        <div className="listing-content">
          <span className="marquee-content">
            <Link href="/nft/1">
              <a>
                <span className="cyan-text">Animverse </span>
              </a>
            </Link>
            sold to
            <span className="cyan-text">
              <Link href="/user/1"> Nhinty </Link>
            </span>
            from{" "}
            <span className="cyan-text">
              <Link href="/user/1"> Animverse123456789 </Link>
            </span>{" "}
            for0,12BNB
          </span>
        </div>
        <div className="time cyan-text">1 minutes ago</div>
      </div>
    </div>
  )
}
