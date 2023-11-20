import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [items, setItems] = useState([])
  const [initialItems, setInitialItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {

    const getItems = async () => {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/item.json');
        const allItems = Object.values(response.data.data);
        setItems(allItems);
        setInitialItems(allItems);
      } catch (error) {
        console.log(error);
      }
    };

    getItems();


  }, [])

  const searchItem = (searchText) => {
    if (searchText === '') {
      setItems(initialItems);
    } else {
      const filteredItems = initialItems.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setItems(filteredItems);
    }
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);

  }


  return (
    <div className="w-screen h-screen bg-blue-300 p-24">


      <div className="container mx-auto border-4 overflow-y-scroll h-full flex" style={{ borderColor: "#A38450" }}>

        <div className='w-2/3 flex flex-col text-white' style={{ backgroundColor: "#071A20" }}>
          <input onChange={(e) => { searchItem(e.target.value) }} className="m-2 appearance-none border-2 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="text" placeholder="Search item" style={{ borderColor: "#A38450" }} />

          <div className='flex flex-wrap overflow-y-scroll justify-between'>
            {
              items.length > 0 ? (
                items.map((item, index) =>
                (
                  <div onClick={() => handleItemClick(item)} className='border-2 m-2 flex flex-col items-center cursor-pointer hover:border-fuchsia-700 border-gray-700' key={index}>
                    <img src={"https://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/" + item.image.full} width="64px" height="64px" />
                    <h1 className='font-bold mt-2 text-xl' style={{ color: "#C2B488" }}>{item.gold.base}</h1>
                    {/* <h2>fiyat : {item.gold.base}</h2>
                  {/* <h2>özellik : {item.description}</h2> */
                  /*Özellik: <div dangerouslySetInnerHTML={{ __html: item.description }} /> */}
                  </div>

                )
                )
              ) : (
                <p>Veri Bulunamadı</p>
              )
            }
          </div>
        </div>

        <div className='border w-1/3 p-4'>
          {selectedItem ? (
            <div className="flex">
              <div className="w-1/3">
                <img src={"https://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/" + selectedItem.image.full} className="w-full" />
              </div>
              <div className="w-2/3 pl-4">
                <h2 className="text-xl font-bold">{selectedItem.name}</h2>
                <p className="text-lg text-gray-600">Fiyat: {selectedItem.gold.base}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Özellikler:</h3>
                  <p className="text-sm"><div dangerouslySetInnerHTML={{ __html: selectedItem.description }} /></p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl">Öğe seçilmedi</p>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;
