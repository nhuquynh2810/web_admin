// import React, { useState, useEffect } from 'react'
// import Swal from 'sweetalert2'

// const Products = () => {

//     const [products, setProducts] = useState([]);
//     useEffect(() => {
//         const getAll = async () => {
//             const response = await fetch('http://localhost:7777/products');
//             const result = await response.json();
//             setProducts(result.data);//set danh sách sản phẩm vào state
//         }
//         getAll();
//         return () => { }
//     }, [])

//     const handleDelete = async (id) => {
//         Swal.fire({
//             title: "Bạn có chắc chắn?",
//             text: "Bạn sẽ không thể hoàn nguyên điều này!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Có, xóa nó!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const response = await fetch(`http://localhost:7777/products/${id}/delete`, {
//                         method: 'POST'
//                     });
//                     const _result = await response.json();
//                     if (_result.status) {
//                         //tạo ra 1 mảng mới không chứa sp có id giống vs id cần xóa
//                         const newProduct = products.filter(item => item._id.toString() !== id.toString());
//                         setProducts(newProduct);//set mảng sản phẩm mới vào database

//                         Swal.fire({
//                             title: "Đã xóa!",
//                             text: "Tệp của bạn đã được xóa.",
//                             icon: "success"
//                         });
//                         // window.location.reload();//để reload lại trang khi xóa sp thành công
//                     }
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//         });
//     }


//     return (
//         <div>
//             <h3>Sản phẩm</h3>
//             <a href='/insert-product' className='btn btn-primary' style={{ marginBottom: 10 }}>Add new</a>
//             <table className="table">
//                 <thead className="table-success">
//                     <tr>
//                         <th>Image</th>
//                         <th>Name</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Options</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         products.map((item, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td>
//                                         <img src={item.images[0]} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover', marginTop: 30 }} />
//                                     </td>
//                                     <td>{item.name}</td>
//                                     <td>{item.price}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>
//                                         <a href={`/update-product/${item._id}`}
//                                             className='btn btn-primary'>Edit</a>
//                                         <button
//                                             style={{ marginLeft: 10 }}
//                                             onClick={() => handleDelete(item._id)}
//                                             type='button' className='btn btn-danger'>Delete</button>
//                                     </td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Products

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            const response = await fetch('http://localhost:7777/products');
            const result = await response.json();
            setProducts(result.data);
        };
        getAll();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn sẽ không thể lấy lại dữ liệu!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:7777/products/${id}/delete`, {
                        method: 'POST'
                    });
                    const _result = await response.json();
                    if (_result.status) {
                        const newProduct = products.filter((item) => item._id.toString() !== id.toString());
                        setProducts(newProduct);

                        Swal.fire({
                            title: 'Đã xóa!',
                            text: 'Tệp của bạn đã được xóa.',
                            icon: 'success'
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    return (
        <div style={{
            // backgroundImage: 'url("https://i.pinimg.com/564x/b0/cf/51/b0cf517597fd9ae3948d3181b1db2736.jpg")',
            width: "100%",
            padding: '50px',
            paddingLeft: '100px',
            paddingRight: '100px'
        }}>
            <h1 style={{ color: '#FFB6C1', textAlign: 'center', marginBottom: '20px', textShadow: "1px 1px 2px black" }}>Sản phẩm</h1>
            <a href='/insert-product' className='btn btn-primary' style={{ marginBottom: 10, float: 'left', fontWeight: 'bold', marginLeft: 10, color: '#000', background: '#FFB6C1', border: '2px solid white' }}>Add Product</a>
            <table className="table" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <thead className="table-light" style={{backgroundColor: '#FFB6C1'}}>
                    <tr>
                        <th style={{ border: '2px solid #FFB6C1' }}>Image</th>
                        <th style={{ border: '2px solid #FFB6C1' }}>Name</th>
                        <th style={{ border: '2px solid #FFB6C1' }}>Price</th>
                        <th style={{ border: '2px solid #FFB6C1' }}>Quantity</th>
                        <th style={{ border: '2px solid #FFB6C1' }}>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ border: '2px solid #FFB6C1' }}>
                                        <img src={item.images[0]} alt="Product" style={{ width: 100, height: 100, objectFit: 'cover', marginTop: 30, justifyContent:'center', alignItems: 'center'}} />
                                    </td>
                                    <td style={{ border: '2px solid #FFB6C1' }}>{item.name}</td>
                                    <td style={{ border: '2px solid #FFB6C1' }}>{item.price}</td>
                                    <td style={{ border: '2px solid #FFB6C1' }}>{item.quantity}</td>
                                    <td style={{ border: '2px solid #FFB6C1' }}>
                                        <a href={`/update-product/${item._id}`}
                                            style={{ color: '#000', background: 'white', border: "2px solid #FFB6C1" }}
                                            className='btn btn-primary'>Edit</a>
                                        <button
                                            style={{ marginLeft: 10, color: '#000', background: '#FFB6C1', border: 0 }}
                                            onClick={() => handleDelete(item._id)}
                                            type='button' className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Products;