// import React, { useState } from 'react'
// import Swal from 'sweetalert2'

// const Login = (props) => {

//     const { saveUser } = props;
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('')

//     const handleLogin = async () => {
//         try {

//             // Kiểm tra dữ liệu nhập vào trước khi gửi yêu cầu POST
//             if (!email.trim() || !password.trim()) {
//                 // Nếu một trong các trường chỉ chứa khoảng trắng, hiển thị thông báo lỗi cho người dùng
//                 Swal.fire({
//                     icon: "error",
//                     title: "Vui lòng điền đầy đủ thông tin!",
//                     text: "Bạn cần nhập đầy đủ thông tin vào tất cả các trường.",
//                 });
//                 return; // Ngăn việc gửi yêu cầu nếu dữ liệu không hợp lệ
//             }

            

//             const body = {
//                 email: email,
//                 password: password
//             }

//             const response = await fetch('http://localhost:7777/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             });
//             const result = await response.json();
//             // debugger; //dùng để debug nha
//             if (result.status) {
//                 console.log('....Ket qua: ', result.data);
//                 //lưu vào storage
//                 saveUser(result.data);
//             } else {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Đăng nhập không thành công",
//                 });
//             }

//         } catch (error) {
//             console.log('...Loi:', error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Đăng nhập không thành công",
//             });
//         }
//     }

//     return (
//         <form>
//             <div className="mb-3 mt-3">
//                 <label htmlFor="email" className="form-label">Email:</label>
//                 <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email" />
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="pwd" className="form-label">Password:</label>
//                 <input
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password" />
//             </div>
//             <button
//                 onClick={handleLogin}
//                 type="button"
//                 className="btn btn-primary">Submit</button>
//         </form>
//     )
// }

// export default Login
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
    const { saveUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Kiểm tra dữ liệu nhập vào trước khi gửi yêu cầu POST
            if (!email.trim() || !password.trim()) {
                // Nếu một trong các trường chỉ chứa khoảng trắng, hiển thị thông báo lỗi cho người dùng
                Swal.fire({
                    icon: "error",
                    title: "Vui lòng điền đầy đủ thông tin!",
                    text: "Bạn cần nhập đầy đủ thông tin vào tất cả các trường.",
                });
                return; // Ngăn việc gửi yêu cầu nếu dữ liệu không hợp lệ
            }
            const body = {
                email: email,
                password: password
            }

            //Gọi api gửi body kiểm tra thông tin đăng nhập
            const response = await fetch('http://localhost:7777/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();
            if (result.status) {
                console.log('....Ket qua: ', result.data);
                //lưu vào storage
                saveUser(result.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Đăng nhập không thành công",
                });
            }

        } catch (error) {
            console.log('...Loi:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Đăng nhập không thành công",
            });
        }
    }

    return (
        <div 
        className="container-fluid" style={{  backgroundSize: 'cover', height: "80vh", width: "120vh", display: "flex", backgroundSize: 'cover', height: "80vh", width: "120vh", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginTop: 50 }}
        >
            <div className="card p-4" style={{ width: "500px", borderRadius: "15px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                <h3 className="card-title text-center mb-4" style={{ color: "#FFB6C1", fontWeight: "bold"}}>Login</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: "#FFB6C1", fontWeight: "bold" }}>Email:</label>
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            style={{ borderColor: "#FFB6C1" }}
                            placeholder="Enter email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: "#FFB6C1", fontWeight: "bold" }}>Password:</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            style={{ borderColor: "#FFB6C1" }}
                            placeholder="Enter password" />
                    </div>
                    <div className="d-grid">
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="btn btn-dark" style={{ fontWeight: "bold", background: "#FFB6C1", borderColor: "#FFB6C1" }}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;