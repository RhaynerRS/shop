import { useEffect } from "react";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import SeachBar from "../components/SearchBar";
import styles from '../styles/products.module.scss'

export default function pecas(products) {
    const produtos=products.products
    /**/
    return (
        <>
            <Filters />
            <SeachBar />
            <body className={styles.productsContainer}>
                <ul className={styles.ul}>
                    {produtos.map((product) => { return <ProductCard key={product.id} image={product.productimage1.url} id={product.id} price={product.productprice} name={product.productname} /> })}
                </ul>
            </body>
        </>)
}

export async function getStaticProps() {
    const products = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'Authorization': 'bc8cfcbf61595dac891e0678afe05f',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "query": `query{
                 allProducts {
                    id
                    productname
                    productcategory
                    productprice
                    productimage1{url}
                }
             }`})
    }).then((response) => response.json()).then((resposta) => { return resposta.data.allProducts })
    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 5
    };
}