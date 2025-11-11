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
    importance: 'high',
  },
  {
    id: 2,
    item: 'Kosmiči',
    shop: 'Spar',
    inStoreLocation: 'Kosmiči',
    importance: '',
  },
  {
    id: 3,
    item: 'Jogurti',
    shop: 'Lidl',
    inStoreLocation: 'Mlečni izdelki',
    importance: 'low',
  },
  {
    id: 4,
    item: 'Pizza',
    shop: 'Lidl',
    inStoreLocation: 'Zamrznjena živila',
    importance: 'high',
  },
  {
    id: 5,
    item: 'Sok',
    shop: 'Lidl',
    inStoreLocation: 'pecivo',
    importance: 'low',
  },
];

function App() {
  const [inputItems, setInputItems] = useState(itemsData);

  function addItem(newItem) {
    if (!newItem) return;
    setInputItems((items) => [...items, newItem].toSorted((a, b) => a - b));
    console.log(shopData);
  }

  function deleteItem(reducedItems) {
    if (!reducedItems) return;
    setInputItems(() => [...reducedItems]);
    // console.log(itemToDelete);
  }

  // console.log(inputItems);
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
      <List inputItems={inputItems} deleteItem={deleteItem} />
      <PrintList />
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
          <option value='high'>Nujno</option>
          <option value='medium'>Bo potrebno</option>
          <option value='low '>Ni potrebno</option>
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

function List({ inputItems, deleteItem }) {
  return (
    <div className='list'>
      <Item inputItems={inputItems} onDeleteItem={deleteItem} />
    </div>
  );
}

function Item({ inputItems, onDeleteItem }) {
  console.log(inputItems);

  function handleClick(itemToDelete) {
    let reducedItems = inputItems.filter((item) => item !== itemToDelete);

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
        <tbody>
          {inputItems.map((item) => (
            <tr key={item.id} className='v-divider'>
              <td>{item.item.charAt(0).toUpperCase() + item.item.slice(1)}</td>

              <td>{item.shop}</td>
              <td>{item.inStoreLocation}</td>
              <td>
                <div
                  className={item.importance === 'high' ? 'red' : 'orange'}
                ></div>
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
      <SortPrint />
    </div>
  );
}

function SortPrint() {
  return <div className='sort-print'></div>;
}
function PrintList() {
  return (
    <div className='print-list'>
      <h2>Listek izdelkov</h2>
    </div>
  );
}

export default App;
