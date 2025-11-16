import { useState } from 'react';

export default function Form({
  shopData,
  inStoreLocationData,
  onAddItem,
  importanceOption,
}) {
  const [item, setItem] = useState('');
  const [shop, setShop] = useState('');
  const [importance, setImportance] = useState('');
  const [inStoreLocation, setInStoreLocation] = useState('');

  let isItem = false;

  if (item && shop && importance && inStoreLocation) {
    isItem = true;
  } else {
    isItem = false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newItem = {
      id,
      item,
      shop,
      importance,
      inStoreLocation,
      status: true,
    };

    if (!isItem) return;
    onAddItem(newItem);

    setItem('');
    setShop('');
    setImportance('');
    setInStoreLocation('');
  }

  return (
    <div className='container'>
      <h2>Vnesi izdelek</h2>
      <form className='form' onSubmit={handleSubmit} named='collect-data'>
        <input
          type='text'
          id='input-item'
          placeholder='Vnesi izdelek'
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <select
          id='select-shop'
          type='text'
          value={shop ? shop : 'TRGOVINA'}
          onChange={(e) => setShop(e.target.value)}
        >
          <option disabled>TRGOVINA</option>

          {shopData.map((el, index) => (
            <option key={index} value={el}>
              {el}
            </option>
          ))}
        </select>

        <select
          id='select-instore-location'
          type='text'
          value={inStoreLocation ? inStoreLocation : 'RAZDELEK'}
          onChange={(e) => setInStoreLocation(e.target.value)}
        >
          <option disabled>RAZDELEK</option>

          {inStoreLocationData.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select
          id='select-importance'
          type='text'
          value={importance ? importance : 'POMEMBNOST'}
          onChange={(e) => setImportance(e.target.value)}
        >
          <option disabled>POMEMBNOST</option>
          {importanceOption.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}

          {/* <option value='visoko'>Visoko</option>
          <option value='srednje'>Srednje</option>
          <option value='nizko'>Nizko</option> */}
        </select>

        <button
          type='submit'
          className={!isItem ? 'button btn-disabled' : 'button'}
        >
          {!isItem ? 'IZPOLNI VSA POLJA' : 'SHRANI V SEZNAM'}{' '}
        </button>
      </form>
    </div>
  );
}
