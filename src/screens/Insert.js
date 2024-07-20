import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const Insert = () => {
    //lấy danh sách danh mục
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getAll = async () => {
            const response = await fetch('http://localhost:7777/categories');
            const result = await response.json();
            setCategories(result.data);
        }
        getAll();
        return () => { }
    }, []);

    //hàm upload ảnh lên clouds
    const [images, setImages] = useState([]);
    const uploadToCloundinary = async () => {
        try {
            const file = document.getElementById('image').files[0];
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'ml_default');
            const response = await
                fetch('https://api.cloudinary.com/v1_1/ddnu25ofk/image/upload', {
                    method: 'POST',
                    body: data
                });
            const result = await response.json();
            setImages([...images, result.secure_url]);
        } catch (error) {

        }
    }

    //xóa ảnh
    const removeImage = (img) => {
        const newImages = images.filter(item => item.toString() !== img.toString());
        setImages(newImages);
    }

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');


    const handleSubmit = async () => {
        try {
            // Kiểm tra dữ liệu nhập vào trước khi gửi yêu cầu POST
            if (!name.trim() || !price.trim() || !quantity.trim() || !description.trim()) {
                // Nếu một trong các trường chỉ chứa khoảng trắng, hiển thị thông báo lỗi cho người dùng
                Swal.fire({
                    icon: "error",
                    title: "Vui lòng điền đầy đủ thông tin!",
                    text: "Bạn cần nhập đầy đủ thông tin vào tất cả các trường.",
                });
                return; // Ngăn việc gửi yêu cầu nếu dữ liệu không hợp lệ
            }
            if (Number(price) <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Không hợp lệ",
                    text: "Bạn cần nhập số tiền lớn hơn 0",
                });
                return; // Ngăn việc gửi yêu cầu nếu dữ liệu không hợp lệ
            }
            if (Number(quantity) <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Không hợp lệ",
                    text: "Bạn cần nhập số lượng sản phẩm lớn hơn 0",
                });
                return; // Ngăn việc gửi yêu cầu nếu dữ liệu không hợp lệ
            }

            const body = {
                name: name,
                price: price,
                quantity: quantity,
                description: description,
                category: category,
                images: images
            }
            const result = await fetch('http://localhost:7777/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const response = await result.json();
            if (response.status) {
                Swal.fire({
                    title: "Thành công!",
                    text: "Thêm sản phẩm thành công!",
                    icon: "success"
                });
                //reset form
                setName('');
                setPrice('');
                setQuantity('');
                setDescription('');
                setImages([]);
                setCategory('');
                //quay về trang danh sách
                window.location.href = '/products';
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Có lỗi...",
                    text: "Thêm sản phẩm không thành công!!!",
                });
            }
        } catch (error) {
            console.log('....Loi:', error);
            alert('Thêm sản phẩm không thành công');
        }
    }

    return (
        <div>
            <h1 style={{ color: '#FFB6C1', textAlign: 'center', marginBottom: '20px', textShadow: "1px 1px 2px black" }}>Thêm sản phẩm</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label" style={{ color: '#000', }}>Name:</label>
                    <input
                        style={{ borderColor: '#FFB6C1', }}
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#000', }}>Price:</label>
                    <input
                        style={{ borderColor: '#FFB6C1', }}
                        type="number" className="form-control"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#000', }}>Quantity:</label>
                    <input
                        style={{ borderColor: '#FFB6C1', }}
                        type="number"
                        className="form-control"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#000', }}>Description:</label>
                    <input
                        style={{ borderColor: '#FFB6C1', }}
                        type="text"
                        className="form-control"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#000', }}>Category:</label>
                    <select className="form-select" value={category}
                        style={{ borderColor: '#FFB6C1', }}
                        onChange={(a) => setCategory(a.target.value)}>
                        {
                            categories.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: '#000', }}>Images:</label>
                    <input type="file" className="form-control" id='image'
                        onChange={uploadToCloundinary}
                        style={{ borderColor: '#FFB6C1', }} />
                    {
                        images.map((item, index) => {
                            return (
                                <div style={{ position: 'relative', }}>
                                    <img key={index} src={item} alt=""
                                        style={{ width: 100, height: 100, objectFit: 'cover', marginTop: 30, }} />
                                    <div onClick={() => removeImage(item)} style={{ position: 'absolute', top: 25, left: 90, color: 'red', backgroundColor: '#fff', width: 30, height: 20, opacity: '80%', }}>
                                        X
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                    style={{ marginBottom: 10, float: 'left', fontWeight: 'bold', marginLeft: 10, color: '#000', background: '#FFB6C1', border: '2px solid white' }}
                >Save</button>
            </form>
        </div>
    )
}

export default Insert