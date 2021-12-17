import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../src/assets/A.gif"
import { AlcoholUsage } from './model/AlcoholUsage';
import { LineChart, Line, YAxis, XAxis, CartesianGrid } from 'recharts';
import Chart from './components/Chart';


function App() {

  const [entries, setentries] = useState([])
  const [search, setsearch] = useState("Vodka")
  const [alcoholList, setalcoholList] = useState([])
  const [timeh, settimeh] = useState(20)
  const [timem, settimem] = useState(0)

  const [data, setdata] = useState([{ name: '20:00', per: 0.0 }, { name: '20:30', per: 40.0 },
  { name: '21:00', per: 70.0 }, { name: '21:30', per: 30.0 },
  { name: '22:00', per: 60.0 }, { name: '22:30', per: 50.0 },
  { name: '23:00', per: 40.0 }, { name: '23:30', per: 60.0 },
  { name: '24:00', per: 30.0 }]);

  const getData = async () => {

    if (search === "") {
      setsearch("Raki")
    }

    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search;
    let res = await axios.get(url);

    if (res.data.drinks != null) {
      setalcoholList(res.data.drinks.slice(0, 7))
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {

    getData()

  }, [search])

  useEffect(() => {

    setsearch("Vodka")
    getData()

  }, [])

  function cheers(drink) {
    alert("Cheers on the " + drink.strDrink + "!")
    let percentage = getRandomInt(50) + 10;
    let usage = new AlcoholUsage(drink.strDrink, timeh, timem, percentage);
    setentries([...entries, usage])

    let i = (timeh - 20) * 2;
    if (timem == 30) i = i + 1;

    let data2 = data;
    for (let j = i; j < 9; j++) {
      data2[j].per = data2[j].per + percentage;
    }
    console.log(data2)
    setdata(data2)
    this.forceUpdate()

  }

  function chart() {
    return <>
      <Chart data={data} /></>
  }

  return (
    <div className='content container p-5'>

      <div class="columns">
        <div class="column is-one-fifth"><img src={Logo} /></div>
        <div class="column"> <div className='mb-5'>
          <h1>Search for some booze...</h1>
          <hr />
          <div class="columns">
            <div class="column"><input class="input is-medium mb-4 mt-3" type="text" placeholder="(づ｡◕‿‿◕｡)づ cheers~" onChange={(e) => setsearch(e.target.value)} />
            </div>

            <div class="column mt-4">
              <div class="columns">
                <div class="column">
                  <span class="control">
                    <input class="input" type="number" min="20" max="24" placeholder="20" onChange={(e) => settimeh(e.target.value)} />
                  </span>
                </div>
                <div class="column">
                  <div className='control'>
                    <input class="input" type="number" min="0" max="45" placeholder="0" step="30" onChange={(e) => settimem(e.target.value)} />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {alcoholList.map((m) => (<button class="button is-danger mx-3 my-1" onClick={() => cheers(m)} key={m.idDrink}>{m.strDrink}</button>))}

        </div>
        </div>


      </div>
      <hr />

      <div class="columns">
        <div class="column">
          <div class="column">
            <table class="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Alcohol</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              {entries.map((e) => (
                <tr>
                  <td>
                    {e.timeh}:{e.timem}
                  </td>
                  <td>
                    {e.alcohol}
                  </td>
                  <td>
                    {e.percentage}%
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div class="column">
          {chart()}
        </div>
      </div>

    </div>
  );
}

export default App;
