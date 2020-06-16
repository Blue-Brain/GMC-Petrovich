import React from 'react';
import Product from './components/Product';
const data = require('./products.json');

function App() {
  const renderProducts = () => {
      data.forEach(product=>{
        return (
          <div key={product.productId}>
            <Product
              productId={product.productId}
              code={product.code}
              title={product.title}
              description={product.description}
              primaryImageUrl={product.primaryImageUrl}
              assocProducts={product.assocProducts}
              weight={product.weight}
              unit={product.unit}
              unitFull={product.unitFull}
              unitRatio={product.unitRatio}
              unitAlt={product.unitAlt}
              unitRatioAlt={product.unitRatioAlt}
              unitFullAlt={product.unitFullAlt}
              priceRetail={product.priceRetail}
              priceRetailAlt={product.priceRetailAlt}
              priceGold={product.priceGold}
              priceGoldAlt={product.priceGoldAlt}
              bonusAmount={product.bonusAmount}
              hasAlternateUnit={product.hasAlternateUnit}
              isActive={product.isActive}
              modified={product.modified}
            />
          </div>
        )
      })
  }

  return (
    <div className="App">
      {renderProducts()}
    </div>
  );
}

export default App;
