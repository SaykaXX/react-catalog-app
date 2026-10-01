import React, { useState } from 'react';

// Данные о товарах (data)
const initialProducts = [
  { id: 1, name: 'Ноутбук', price: 80000, discount: 0 },
  { id: 2, name: 'Смартфон', price: 40000, discount: 0 },
  { id: 3, name: 'Наушники', price: 10000, discount: 0 },
];

export default function App() {
  // Состояния для управления отображением
  const [currentView, setCurrentView] = useState('Catalog'); // Окно: Catalog, ProductCard, DiscountButton
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);

  // Функция для применения скидки (discount) в 10% на все товары
  const applyDiscount = () => {
    const updatedProducts = products.map(product => ({
      ...product,
      discount: 10 // Устанавливаем скидку 10%
    }));
    setProducts(updatedProducts);
    
    // Обновляем также выбранный товар, чтобы изменения применились в карточке
    const currentSelected = updatedProducts.find(p => p.id === selectedProduct.id);
    setSelectedProduct(currentSelected);
    
    alert('Скидка 10% успешно применена ко всем товарам!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      
      {/* Навигационная панель с КНОПКАМИ из желтого квадрата */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentView('Catalog')}
          style={{ padding: '10px', backgroundColor: currentView === 'Catalog' ? '#ddd' : '#f0f0f0', cursor: 'pointer' }}
        >
          Catalog
        </button>
        <button 
          onClick={() => setCurrentView('ProductCard')}
          style={{ padding: '10px', backgroundColor: currentView === 'ProductCard' ? '#ddd' : '#f0f0f0', cursor: 'pointer' }}
        >
          Product Card
        </button>
        <button 
          onClick={() => setCurrentView('DiscountButton')}
          style={{ padding: '10px', backgroundColor: currentView === 'DiscountButton' ? '#ddd' : '#f0f0f0', cursor: 'pointer' }}
        >
          Discount Button
        </button>
      </div>

      <hr />

      {/* Отрисовка контента в зависимости от активной кнопки */}
      <div style={{ marginTop: '20px' }}>
        
        {/* 1. Экран CATALOG (Использует метод MAP) */}
        {currentView === 'Catalog' && (
          <div>
            <h2>Каталог товаров</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentView('ProductCard'); // При клике переходим на карточку товара
                  }}
                  style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer', borderRadius: '4px' }}
                >
                  {/* Использование свойств NAME и PRICE из синего квадрата */}
                  <strong>{product.name}</strong> — {product.price} руб.
                  {product.discount > 0 && <span style={{ color: 'green' }}> (Скидка {product.discount}%)</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Экран PRODUCT CARD (Компонент карточки с пропсами) */}
        {currentView === 'ProductCard' && (
          <ProductCard 
            name={selectedProduct.name} 
            price={selectedProduct.price} 
            discount={selectedProduct.discount} 
          />
        )}

        {/* 3. Экран DISCOUNT BUTTON (Кнопка применения скидки) */}
        {currentView === 'DiscountButton' && (
          <div>
            <h2>Управление скидками</h2>
            <p>Нажмите на кнопку ниже, чтобы дать всем товарам скидку 10%.</p>
            <button 
              onClick={applyDiscount}
              style={{ padding: '12px 24px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Применить скидку 10%
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// Отдельный компонент для карточки товара, принимающий пропсы {...props}
function ProductCard({ name, price, discount }) {
  // Вычисление финальной цены с учетом скидки
  const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <div style={{ border: '2px solid #3498db', padding: '20px', borderRadius: '8px', backgroundColor: '#fcfcfc' }}>
      <h2>Карточка товара</h2>
      <p><strong>Название (name):</strong> {name}</p>
      <p><strong>Базовая цена (price):</strong> {price} руб.</p>
      {discount > 0 ? (
        <div>
          <p><strong>Скидка (discount):</strong> {discount}%</p>
          <p style={{ color: 'green', fontSize: '18px' }}><strong>Цена со скидкой:</strong> {finalPrice} руб.</p>
        </div>
      ) : (
        <p style={{ color: '#555' }}>Скидка не применена</p>
      )}
    </div>
  );
}