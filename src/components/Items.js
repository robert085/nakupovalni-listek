export default function Items({ shoppingItems, onDeleteItem }) {
  function handleDelete(itemToDelete) {
    let reducedItems = shoppingItems.filter((item) => item !== itemToDelete);

    if (!itemToDelete) return;

    onDeleteItem(reducedItems);
  }

  return (
    <div className='table-container'>
      <h2>Nakupovalni seznam</h2>
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
