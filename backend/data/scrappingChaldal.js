newProd = prod.hits.map((pd) => {
  const newProd1 = {
    name: pd.name,
    price: pd.price,
    description: " ",
    images: [
      {
        public_id: " ",
        url: pd.picturesUrls[0],
      },
    ],
    category: "Electronics",
    seller: "chaldal",
    stock: 50,
    reviews: [],
  };
  return newProd1;
});
