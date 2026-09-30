import "./shop.css";

function Shop() {

  const gems =
    Number(
      localStorage.getItem("gems")
    ) || 0;

  const buyAvatar = (
    avatar,
    cost
  ) => {

    if (gems < cost) {

      alert(
        "❌ Not enough Gems!"
      );

      return;
    }

    localStorage.setItem(
      "gems",
      gems - cost
    );

    localStorage.setItem(
      "avatar",
      avatar
    );

    alert(
      "🎉 Avatar Purchased!"
    );

    window.location.reload();
  };

  return (
    <div className="shop-page">

      <h1>
        💎 Gem Shop
      </h1>

      <h2>
        Your Gems: {gems}
      </h2>

      <div className="shop-grid">

        <div className="shop-card">

          <h1>🥷</h1>

          <h3>
            Ninja Avatar
          </h3>

          <p>
            Cost: 50 Gems
          </p>

          <button
            onClick={() =>
              buyAvatar(
                "🥷",
                50
              )
            }
          >
            Buy
          </button>

        </div>

        <div className="shop-card">

          <h1>🧑‍🚀</h1>

          <h3>
            Space Avatar
          </h3>

          <p>
            Cost: 100 Gems
          </p>

          <button
            onClick={() =>
              buyAvatar(
                "🧑‍🚀",
                100
              )
            }
          >
            Buy
          </button>

        </div>

        <div className="shop-card">

          <h1>🤖</h1>

          <h3>
            AI Master
          </h3>

          <p>
            Cost: 150 Gems
          </p>

          <button
            onClick={() =>
              buyAvatar(
                "🤖",
                150
              )
            }
          >
            Buy
          </button>

        </div>

      </div>

    </div>
  );
}

export default Shop;