export default function ShoppingList({ itemsToPrint, onDeleteItem }) {
  console.log(itemsToPrint);

  function handleDelete(itemToDelete) {
    let reducedItems = itemsToPrint.filter((item) => item !== itemToDelete);

    if (!itemToDelete) return;

    onDeleteItem(reducedItems);
  }

  return (
    <div className='container shopping-list'>
      <h2>Nakupovalni listek</h2>

      <table>
        <thead className='table-header'>
          <tr>
            <th>Izdelki</th>
            <th>Trgovina</th>
            <th>Oddelek</th>
            <th>(!)</th>
            <th className='margin-left'>Izbriši</th>
            {/* <th className='margin-left'>Izbriši</th> */}
          </tr>
        </thead>
        <tbody className='table-body'>
          {itemsToPrint.map((item) => (
            <tr key={item.id} className='v-divider'>
              <td>{item.item.charAt(0).toUpperCase() + item.item.slice(1)}</td>

              <td>
                <img
                  src={`./img/${item.shop}.jpg`}
                  alt={item.shop}
                  className='logo-image'
                />
              </td>
              <td>{item.inStoreLocation}</td>
              <td>
                <div className={`color ${item.importance}`}></div>
              </td>
              <td className='delete'>
                <button
                  className='btn-delete'
                  onClick={() => handleDelete(item)}
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
