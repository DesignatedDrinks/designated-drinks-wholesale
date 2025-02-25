import { useState, useEffect } from "react";
import Head from "next/head";

const SHEET_ID = "1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s";
const API_KEY = https://docs.google.com/spreadsheets/d/1m-2ap-loUD7rByaFh-mzbwlvTK0QZNp6uzLzdCVrX7s/edit?usp=sharing;
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((response) => response.json())
      .then((data) => {
        const rows = data.values;
        const formattedProducts = rows.slice(1).map((row) => ({
          name: row[0],
          brand: row[1],
          size: row[2],
          price: row[3],
        }));
        setProducts(formattedProducts);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Head>
        <title>Wholesale Catalog - Designated Drinks</title>
        <meta name="description" content="Browse our non-alcoholic wholesale product catalog." />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Wholesale Catalog</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-gray-600">Size: {product.size}</p>
              <p className="text-gray-800 font-bold">${product.price} CAD</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
