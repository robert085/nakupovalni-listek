import { useState } from 'react';

export default function SortPrint({ shoppingItems, printItems }) {
  const [shopToPrint, setShopToPrint] = useState('');
  const [importanceToPrint, setImportanceToPrint] = useState('');

  let isItem = false;

  if (shopToPrint || importanceToPrint) {
    isItem = true;
  } else isItem = false;

  function handleShop(e) {
    setShopToPrint(e.target.value);
    setImportanceToPrint('');
  }
  function handleImportance(e) {
    setImportanceToPrint(e.target.value);
    setShopToPrint('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    printItems(shopToPrint, importanceToPrint);
  }

  if (!shoppingItems) return;

  const uniqueShops = [...new Set(shoppingItems.map((item) => item.shop))];
  const uniqueImportance = [
    ...new Set(shoppingItems.map((item) => item.importance)),
  ];

  return (
    <div className='sort-print'>
      <h2>PRIPRAVI LISTEK</h2>
      <p>Izberi opcijo in sortiraj izdelke.</p>

      <form action='submit' className='form' onSubmit={handleSubmit}>
        <select
          id='select-shop'
          className='sort'
          value={!shopToPrint ? 'TRGOVINA' : shopToPrint}
          onChange={handleShop}
        >
          <option key='trgovina-disabled' disabled>
            TRGOVINA
          </option>
          {uniqueShops.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          id='importance'
          value={!importanceToPrint ? 'POMEMBNOST' : importanceToPrint}
          onChange={handleImportance}
        >
          <option key='pomembnost-disabled' disabled>
            POMEMBNOST
          </option>
          {uniqueImportance.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          type='submit'
          className={!isItem ? 'button btn-disabled' : 'button'}
        >
          {!isItem ? 'IZBERI OPCIJO' : 'NATISNI LISTEK'}{' '}
        </button>
      </form>
    </div>
  );
}
