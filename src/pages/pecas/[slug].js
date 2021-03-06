import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './peca.module.scss'
import NumberInput from "../../components/NumberInput";
import isNode from 'is-node'
import { useEffect, useState } from "react"

export default function Details(item) {

  const [qtd,setQtd]=useState(1);
  const [size,setSize]=useState("M - (72 x 54 cm)");
  return (
    <div className={styles.containerDetails}>
      <Carousel width='calc((100%/1.45))' dynamicHeight='true' thumbWidth='50px' autoPlay="true" axis="vertical" infiniteLoop="true" showArrows={false} showStatus={false} >
        <div >
          <img src={item.item.productimage1.url} />
        </div>
        <div>
          <img src={item.item.productimage2.url} />
        </div>
        <div>
          <img src={item.item.productimage3.url} />
        </div>
      </Carousel>
      <div className={styles.info}>
        <h1 >{item.item.productname}</h1>
        <p className={styles.txt}>{item.item.productname}</p>
        <p className={styles.txt}>R${item.item.productprice}</p>
        <form >
          <div style={item.item.productcategory != "Ecobags" ? ({ display: "block" }) : ({ display: "none" })}>
            <div className={styles.imputArea}>
              <select className={styles.dropdown} id="size" onChange={(e)=>{setSize(e.target.value)}}>
                <option >PP - (65 x 48 cm)</option>
                <option>P - (70 x 52 cm)</option>
                <option selected="selected">M - (72 x 54 cm)</option>
                <option>G - (76 x 56 cm)</option>
                <option>GG - (80 x 60 cm)</option>
                <option>XG - (84 x 66 cm)</option>
              </select>
            </div>
          </div>
          <div >
          
            <div className={styles.imputArea}>
              <NumberInput qtd={(e)=>{setQtd(e.target.value)}}/>
              <button className="snipcart-add-item"
                data-item-id={item.item.id}
                data-item-image={item.item.productimage1.url}
                data-item-name={item.item.productname}
                data-item-url={`/pecas/${item.item.id}`}
                data-item-price={item.item.productprice}
                data-item-quantity={qtd }
                data-item-custom1-name="Tamanho"
                data-item-custom1-options="PP - (65 x 48 cm)|P - (70 x 52 cm)|M - (72 x 54 cm)|G - (76 x 56 cm)|GG - (80 x 60 cm)|XG - (84 x 66 cm)"
                data-item-custom1-value={size}
                >Adicionar ao carrinho</button>
            </div>
          </div>
        </form>
        <h3>MATERIAIS</h3>
        <p >
          Trabalhamos com programas de acompanhamento para garantir o cumprimento das normas de seguran??a, de sa??de e de qualidade dos nossos produtos.
        </p>
        <h3 >EXTERIOR</h3>
        <p >100% ALGOD??O</p>
      </div>
    </div>
  )
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
export async function getStaticProps(ctx) {
  const { slug } = ctx.params
  const item = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': 'bc8cfcbf61595dac891e0678afe05f',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      "query": `query{
        product(filter:{id:{eq:${slug}}}){
          id
        productname
        productcategory
      productimage1{
        url
      }
      productimage2{
        url
      }
      productimage3{
        url
      }
      productprice
            }
           }`})
  }).then((response) => response.json()).then((resposta) => { return resposta.data.product; })
  return {
    props: {
      item,
    },
    revalidate: 60 * 60 * 24
  }
}