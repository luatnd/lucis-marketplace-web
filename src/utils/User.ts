export const getLoyaltyInfo = (level: number) => {
  switch (level) {
    case 1:
      return {
        name: "Basic",
        image: "/assets/loyalty/0.png",
      }
    case 2:
      return {
        name: "Silver",
        image: "/assets/loyalty/1.png",
      }
    case 3:
      return {
        name: "Gold",
        image: "/assets/loyalty/2.png",
      }
    case 4:
      return {
        name: "Platinum",
        image: "/assets/loyalty/3.png",
      }
    case 5:
      return {
        name: "Ruby",
        image: "/assets/loyalty/4.png",
      }
    case 6:
      return {
        name: "Diamond",
        image: "/assets/loyalty/5.png",
      }
    default:
      return {
        name: "",
        image: "",
      }
  }
}
