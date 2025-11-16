import Items from './Items';
import SortPrint from './SortPrint';

export default function List({ shoppingItems, deleteItem, printItems }) {
  return (
    <div className='container list'>
      <Items shoppingItems={shoppingItems} onDeleteItem={deleteItem} />
      <SortPrint shoppingItems={shoppingItems} printItems={printItems} />
    </div>
  );
}
