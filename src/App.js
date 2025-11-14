import './index.css';
import { useState } from 'react';

const shopData = [
  'Hofer',
  'DM',
  'Lidl',
  'Spar',
  'Euro Spin',
  'Tuš',
  'Merkator',
];
const inStoreLocationData = [
  'Sokovi',
  'Oreščki',
  'Kosmiči',
  'riž in testenine',
  'Izdelki za dojenčke',
  'Bonboni',
  'Trajno mleko in smetana',
  'Čips',
  'Trajno pecivo',
  'Pekarna',
  'Papir',
  'Konzervirana živila',
  'Izdelki za peko',
  'Čistila',
  'Vino',
  'Piškoti',
  'Jajca',
  'Pivo',
  'Vina',
  'Žganje',
  'Sokovi',
  'Folije in vrečke',
  'Pralna sredstva',
  'Hrana za živali',
  'Gospodinjski pripomočki',
];

const itemsData = [
  {
    id: 1,
    item: 'Persil',
    shop: 'Hofer',
    inStoreLocation: 'Čistila',
    importance: 'visoko',
  },
  {
    id: 2,
    item: 'Kosmiči',
    shop: 'Spar',
    inStoreLocation: 'Kosmiči',
    importance: 'srednje',
  },
  {
    id: 3,
    item: 'Jogurti',
    shop: 'Lidl',
    inStoreLocation: 'Mlečni izdelki',
    importance: 'nizko',
  },
  {
    id: 4,
    item: 'Pizza',
    shop: 'Lidl',
    inStoreLocation: 'Zamrznjena živila',
    importance: 'visoko',
  },
  {
    id: 5,
    item: 'Sok',
    shop: 'Lidl',
    inStoreLocation: 'pecivo',
    importance: 'srednje',
  },
];

function App() {
  const [shoppingItems, setShoppingItems] = useState(itemsData);
  const [sortItemsByOption, setSortItemsByOption] = useState([]);

  function addItem(newItem) {
    if (!newItem) return;
    setShoppingItems((items) => [...items, newItem].toSorted((a, b) => a - b));
    // console.log(shopData);
  }

  function deleteItem(reducedItems) {
    if (!reducedItems) return;
    setShoppingItems(() => [...reducedItems]);
    // console.log(itemToDelete);
  }

  // console.log(shoppingItems);
  // console.log(input);
  // console.log(selectedShop);
  // console.log(selectedImportance);

  return (
    <div className='app'>
      <Form
        shopData={shopData}
        inStoreLocationData={inStoreLocationData}
        onAddItem={addItem}
      />
      <List shoppingItems={shoppingItems} deleteItem={deleteItem} />
      <PrintedList shoppingItems={shoppingItems} deleteItem={deleteItem} />
    </div>
  );
}

function Form({ shopData, inStoreLocationData, onAddItem }) {
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

  // console.log(`is Item: ${isItem}`);

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
  // console.log(`Shop: ${shop}, Item:  ${item}, importance: ${importance}`);

  return (
    <div className='form-container'>
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

          <option value='high'>Visoko</option>
          <option value='mid'>Srednje</option>
          <option value='low '>Ni pomembno</option>
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

function List({ shoppingItems, deleteItem }) {
  return (
    <div className='list'>
      <Items shoppingItems={shoppingItems} onDeleteItem={deleteItem} />
      <SortPrint shoppingItems={shoppingItems} />
    </div>
  );
}

function Items({ shoppingItems, onDeleteItem }) {
  // console.log(shoppingItems);

  function handleClick(itemToDelete) {
    let reducedItems = shoppingItems.filter((item) => item !== itemToDelete);

    if (!itemToDelete) return;
    console.log(reducedItems);
    console.log(itemToDelete);
    onDeleteItem(reducedItems);
  }

  return (
    <div className='table-container'>
      <table>
        <thead className='table-header'>
          <tr>
            <th>Izdelki</th>
            <th>Trgovina</th>
            <th>Oddelek</th>
            <th>(!)</th>
            <th className='margin-left'>Izbriši</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {shoppingItems.map((item) => (
            <tr key={item.id} className='v-divider'>
              <td>{item.item.charAt(0).toUpperCase() + item.item.slice(1)}</td>

              <td>{item.shop}</td>
              <td>{item.inStoreLocation}</td>
              <td>
                <div className={`color ${item.importance}`}></div>
              </td>
              <td className='delete'>
                <button
                  className='btn-delete'
                  onClick={() => handleClick(item)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortPrint({ shoppingItems }) {
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
    const printShopItems = shoppingItems.filter(
      (el) => el.shop === shopToPrint
    );
    console.log(printShopItems);
  }

  if (!shoppingItems) return;
  console.log(isItem);
  console.log(`Shop: ${shopToPrint}`);
  console.log(`Importance: ${importanceToPrint}`);

  const uniqueShops = [...new Set(shoppingItems.map((item) => item.shop))];
  const uniqueImportance = [
    ...new Set(shoppingItems.map((item) => item.importance)),
  ];
  console.log(uniqueShops);
  console.log(uniqueImportance);

  return (
    <div className='sort-print'>
      <h2>PRIPRAVI LISTEK</h2>
      <p>Izberi opcijo in sortiraj izdelke.</p>

      <form action='submit' className='form'>
        <select
          id='select-shop'
          className='sort'
          value={!shopToPrint ? 'TRGOVINA' : shopToPrint}
          onChange={handleShop}
          // disabled={importanceToPrint ? true : null}
        >
          <option disabled>TRGOVINA</option>
          {uniqueShops.map((item, index) => (
            <option id={index + 200} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          id='importance'
          value={!importanceToPrint ? 'POMEMBNOST' : importanceToPrint}
          onChange={handleImportance}
          // disabled={shopToPrint ? true : null}
        >
          <option disabled>POMEMBNOST</option>
          {uniqueImportance.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <button
          onSubmit={handleSubmit}
          type='submit'
          className={!isItem ? 'button btn-disabled' : 'button'}
        >
          {!isItem ? 'IZBERI OPCIJO' : 'NATISNI LISTEK'}{' '}
        </button>
      </form>
    </div>
  );
}
function PrintedList() {
  return (
    <div className='print-list'>
      <h2>Printed list</h2>
    </div>
  );
}

export default App;
