import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';

const Home = () => {

  //   const monthlyProductCounts = Array.from({length: 12}, () => 0);

  //   const [isLoading, setIsLoading] = useState(true);
  //   const [data, setData] = useState({
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  //     datasets: [{
  //       label: 'Thống kê bán hàng',
  //       data: monthlyProductCounts,
  //       borderWidth: 1,
  //     }]
  //   })
  //   const [products, setProducts] = useState([]);
  //   const getAllProducts = async () => {
  //     const response = await fetch('http://localhost:7777/products');
  //     const result = await response.json();
  //     setProducts(result.data);//set danh sách sản phẩm vào state
  // }
  //   const getAllOrder = async () =>{
  //     const result = await getAllProducts();
  //     if (result.status && result.data.length > 0) {

  //     }
  //   }

  //   const xulyMang = (mang) =>{
  //     mang.forEach(order => {
  //       const createAt = new Date(Number(order.createAt));
  //       const month = createAt.getMonth();
  //       monthlyProductCounts[month] += order.price
  //       const newData = {...data};
  //       newData.datasets[0].data = monthlyProductCounts;
  //       setData(newData);
  //       setIsLoading(false)
  //     });
  //   }

  //   useEffect(() => {
  //     getAllOrder();
  //   }, [])

  //   if (isLoading) {
  //     return(
  //       <div>
  //         Loading
  //       </div>
  //     )
  //   }

  //vẽ biểu đồ thống kê


  const render = (lables, datas) => {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lables,
        datasets: [{
          label: 'Total',
          data: datas,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  useEffect(() => {
    const getTop10 = async () => {
      try {
        const res = await fetch('http://localhost:7777/products/statisticsByTotal');
        const result = await res.json();
        const lables = [];
        const datas = [];
        result.data.forEach(element => {
          lables.push(element.name);
          datas.push(element.tongSoLuongDaBan);
        });
        render(lables, datas);
        console.log('lable: ', lables, 'datas: ', datas);
      } catch (error) {
        console.log(error);
      }
    }
    getTop10();
  }, [])

  // const [clicked, setClicked] = useState(false);
  // const handleClick = () => {
  //   if (!clicked) {
  //     render();
  //     setClicked(true);
  //   }
  // };

  return (
    <div>
      <h1>Top 10 sản phẩm bán chạy nhất cửa hàng</h1>
      {/* <a onClick={handleClick} className='btn btn-primary'>Render</a> */}
      <a href='/products' className='btn btn-primary' style={{ marginLeft: 10 }}>Product</a>
      <canvas id="myChart"></canvas>
    </div>
  )
}

export default Home