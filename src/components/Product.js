import React, { useState, useRef } from 'react';

const Product = (
    {
        productId,
        code,
        title,
        description,
        primaryImageUrl,
        assocProducts,
        weight,
        unit,
        unitFull,
        unitRatio,
        unitAlt,
        unitRatioAlt,
        unitFullAlt,
        priceRetail, 
        priceRetailAlt,
        priceGold,
        priceGoldAlt, 
        bonusAmount,
        hasAlternateUnit,
        isActive,
        modified
    }
) => {
    const [unitIsPackaging,setUnitIsPackaging] = useState(false);
    const refNumberProduct = useRef(null);

    // --------- RENDER --------------
    const addModificator = (argPrimaryImageUrl) => {
        let splitUrl = argPrimaryImageUrl.split(".");
        splitUrl[1] = splitUrl[1]+"_220x220_1";
        return `http:${splitUrl.join('.')}`
    }

    const renderAssociatedProducts = () => {
        const arrayProducts = assocProducts.split(";");
        arrayProducts.splice(-1,1);
        let render = arrayProducts.map((productName, index) => {
            let splitter = index===arrayProducts.length-1 ? "." : ","
            if (productName) {
                return (
                        <a href="#" className="url--link"> {productName}{splitter}</a>
                )
            }
        })
        return render;
    }

    const renderProductUnits = () => {
        let unit = false;
        if (unitFull==="упаковка") {
            unit = true;
        }
        return (
                unit ?
                    <>
                        <div className="unit--select unit--active">
                            <p className="ng-binding">За м. кв.</p>
                        </div>
                        <div className="unit--select">
                            <p className="ng-binding">За упаковку</p>
                        </div>
                    </>
                :
                    <div className="unit--select unit--active">
                        <p className="ng-binding">За штуку</p>
                    </div>
        )
    }

    const convertPrice = price => {
        return ` ${price.toFixed(2).replace(".", ",")} `;
    }

    // --------- CLICK --------------

    const incrementNumberProduct = () => {
        refNumberProduct.current.value = ++refNumberProduct.current.value
    }

    const decrementNumberProduct = () => {
        if (refNumberProduct.current.value>1) {
            refNumberProduct.current.value = --refNumberProduct.current.value
        }
    }

    return (
        <div id="products_section">
            <div className="products_page pg_0">
                <div className="product product_horizontal">                                
                    <span className="product_code">Код: {+code}</span>
                    <div className="product_status_tooltip_container">
                        <span className="product_status">Наличие</span>
                    </div>                                
                    <div className="product_photo">
                        <a href="#" className="url--link product__link">
                            <img src={addModificator(primaryImageUrl)} alt="photo"/>
                        </a>                                    
                    </div>
                    <div className="product_description">
                        <a href="#" className="product__link">{title}</a>
                    </div>
                    <div className="product_tags hidden-sm">
                        <p>Могут понадобиться: </p>
                         {renderAssociatedProducts()}
                    </div>
                    <div className="product_units">
                        <div className="unit--wrapper">
                           {renderProductUnits()}
                        </div>
                    </div>
                    <p className="product_price_club_card">
                        <span className="product_price_club_card_text">По карте<br/>клуба</span>
                        <span className="goldPrice">  
                            {
                                !unitIsPackaging 
                                    ? convertPrice(priceRetailAlt)
                                    : convertPrice(priceGold)
                            }
                        </span>
                        <span className="rouble__i black__i">
                            <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xmlSpace="preserve">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rouble_black"></use>
                            </svg>
                        </span>
                    </p>
                    <p className="product_price_default">
                        <span className="retailPrice">
                            {
                                !unitIsPackaging 
                                    ? convertPrice(priceGoldAlt)
                                    : convertPrice(priceRetail)
                            }
                        </span>
                        <span className="rouble__i black__i">
                            <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xmlSpace="preserve">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rouble_gray"></use>
                            </svg>
                        </span>
                    </p>
                    <div className="product_price_points">
                        <p className="ng-binding">Можно купить за 231,75 балла</p>
                    </div>
                    <div className="list--unit-padd"></div>
                    {
                        unitFull==="упаковка" ? 
                            <div className="list--unit-desc">
                                <div className="unit--info">
                                    <div className="unit--desc-i"></div>
                                    <div className="unit--desc-t">
                                        <p>
                                            <span className="ng-binding">Продается упаковками:</span>
                                            <span className="unit--infoInn">1 упак. = 2.47 м. кв. </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        :
                            ""
                    }   
                    <div className="product__wrapper">
                        <div className="product_count_wrapper">
                            <div className="stepper">
                                <input className="product__count stepper-input" type="text" value="1" ref={refNumberProduct}/>
                                <span className="stepper-arrow up" onClick={()=>incrementNumberProduct()}></span>
                                <span className="stepper-arrow down" onClick={()=>decrementNumberProduct()}></span>                                            
                            </div>
                        </div>
                        <span className="btn btn_cart" data-url="/cart/" data-product-id={productId}>
                            <svg className="ic ic_cart">
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#cart"></use>
                            </svg>
                            <span className="ng-binding">В корзину</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;