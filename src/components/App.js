import '../index.css';
import { useState } from 'react';
import Form from './Form';
import List from './List';
import ShoppingList from './ShoppingList';

const shopData = [
  'hofer',
  'dm',
  'lidl',
  'spar',
  'eurospin',
  'tus',
  'merkator',
  'spar',
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
  'Izdelki za kuhanje',
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
const importance = ['visoko', 'srednje', 'nizko'];

const itemsData = [
  // {
  //   id: 1,
  //   item: 'Persil',
  //   shop: 'Hofer',
  //   inStoreLocation: 'Čistila',
  //   importance: 'visoko',
  // },
  // {
  //   id: 2,
  //   item: 'Kosmiči',
  //   shop: 'Spar',
  //   inStoreLocation: 'Kosmiči',
  //   importance: 'srednje',
  // },
  // {
  //   id: 3,
  //   item: 'Jogurti',
  //   shop: 'Lidl',
  //   inStoreLocation: 'Mlečni izdelki',
  //   importance: 'nizko',
  // },
  // {
  //   id: 4,
  //   item: 'Pizza',
  //   shop: 'Lidl',
  //   inStoreLocation: 'Zamrznjena živila',
  //   importance: 'visoko',
  // },
  // {
  //   id: 5,
  //   item: 'Sok',
  //   shop: 'Lidl',
  //   inStoreLocation: 'pecivo',
  //   importance: 'srednje',
  // },
];

function App() {
  const [shoppingItems, setShoppingItems] = useState(itemsData);
  const [itemsToPrint, setItemsToPrint] = useState([]);

  function addItem(newItem) {
    if (!newItem) return;
    setShoppingItems((items) => [...items, newItem].toSorted((a, b) => a - b));
  }

  function deleteItem(reducedItems) {
    if (!reducedItems) return;
    setShoppingItems(() => [...reducedItems]);
  }

  function deleteShoppingListItem(reducedItems) {
    if (!reducedItems) return;
    setItemsToPrint(() => [...reducedItems]);
  }

  function printItems(shop, importance) {
    console.log(shop);

    if (shop) {
      setItemsToPrint(shoppingItems.filter((item) => item.shop === shop));
    } else if (importance) {
      setItemsToPrint(
        shoppingItems.filter((item) => item.importance === importance)
      );
      console.log(itemsToPrint);
    }
  }

  return (
    <div className='app'>
      <Form
        shopData={shopData}
        importanceOption={importance}
        inStoreLocationData={inStoreLocationData}
        onAddItem={addItem}
      />
      <List
        shoppingItems={shoppingItems}
        deleteItem={deleteItem}
        printItems={printItems}
      />

      <ShoppingList
        shoppingItems={shoppingItems}
        onDeleteItem={deleteShoppingListItem}
        itemsToPrint={itemsToPrint}
      />
    </div>
  );
}

export default App;
