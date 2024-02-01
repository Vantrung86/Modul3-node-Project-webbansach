import React, { useEffect, useState } from "react";
import "../components/css/Cart.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { VND } from "../Until/Until";
import publicAxios from "../config/publicAxios";
function Cart() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const userId = userLogin ? userLogin.id : null;
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [obj, setObj] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const handleGetDataCity = async () => {
    let data = await axios.get(`https://provinces.open-api.vn/api/`);
    setDataCity(data.data);
  };
  useEffect(() => {
    handleGetDataCity();
  }, []);
  const handleCity = async (e) => {
    let idCity = +e.target.value;
    const nameCity = dataCity.find((item) => item.code === idCity);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/p/${idCity}?depth=2`
    );
    setCity(nameCity.name);
    setDataDistrict(data.data.districts);
  };
  const handleDistrict = async (e) => {
    let idDistrict = +e.target.value;
    const nameDistrict = dataDistrict.find((item) => item.code === idDistrict);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
    );
    setDistrict(nameDistrict.name);
    setDataWard(data.data.wards);
  };

  // gọi giỏ hàng từ Mysql theo từng user
  const [dataCart, setdataCart] = useState([]);
  const loadBook = async () => {
    try {
      if (userId) {
        const response = await publicAxios.get(`/api/v1/cart/${userId}`);
        setdataCart(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadBook();
  }, [flag]);

  // hàm xoá sản phẩm trong giỏ hàng giỏ hàng
  const deleteProduct = async (cartId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá ?")) {
      try {
        const response = await publicAxios.delete(`/api/v1/cart/${cartId}`);
        alert(response.data.message);
        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //giam quantity
  const decreaseQuantity = async (cartId) => {
    try {
      const response = await publicAxios.put(`/api/v1/decrease/${cartId}`);
      alert(response.data.message);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  //tang quantity
  const increaseQuantity = async (cartId) => {
    try {
      const response = await publicAxios.put(`/api/v1/increase/${cartId}`);
      alert(response.data.message);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm tính tổng tiền cần thanh toán
  let totalMoney = 0;
  for (let i = 0; i < dataCart.length; i++) {
    totalMoney += dataCart[i].quantity * dataCart[i].price;
  }

  // hàm thanh toán
  const handleFinish = async () => {
    try {
      let d = new Date();
      let newOrder = {
        userId: userLogin.id,
        totalOrderpay: totalMoney,
        dayOrder: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
        nameOrder: userLogin.username,
        address: `${ward}-${district}-${city}`,
        name: obj.name,
        SDT: obj.phone,
      };
      const response = await publicAxios.post("/api/v1/order", newOrder)
      let orderDetail = {
          orderId:response.data.idOrder,
          dataCart
      }
      await publicAxios.post("/api/v1/orderDetail", orderDetail);
      await publicAxios.delete(`/api/v1/carts/${userLogin.id}`);
      setdataCart([])
      setFlag(!flag);
      swal({
        icon: "success",
        title: "Thành công!",
      });
      handleClose();
      navigate("/bill");
    } catch (error) {
      console.log(error);
    }

  };

  //Modal checkout
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Lấy thông tin người nhận hàng
  const handleChangleInput = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  //input quantity
 const [valueInput,setValueInput] = useState("")
  return (
    <div>
      <Header />
      <div className="product-table container">
        <h4>GIỎ HÀNG CỦA BẠN</h4>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản Phẩm</th>
              <th>Tên sách</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {dataCart.map((element, index) => (
              
              <tr key={element.cartId} >
                <td>{index + 1}</td>
                <td>
                  <img src={element.src} alt="" />
                </td>
                <td>{element.nameProduct}</td>
                <td>{VND.format(element.price)}</td>
                <td>        
                  {/* <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-minus"
                    disabled={element.quantity<=1}
                    onClick={() => decreaseQuantity(element.cartId)}
                  ></i> */}
                    <button disabled={element.quantity<=1}  onClick={() => decreaseQuantity(element.cartId)} style={{border:"none",backgroundColor:"rgb(255,255,255)",cursor:"pointer",marginRight:"10px"}}>-</button>
                  <span>{element.quantity}</span>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-plus"
                    onClick={() => increaseQuantity(element.cartId)}
                  ></i>
                </td>
                <td>{VND.format(element.price * element.quantity)}</td>
                <td>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => deleteProduct(element.cartId)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total_money">
          <h5>
            Tổng tiền: <span>{VND.format(totalMoney)}</span>
          </h5>
          <button onClick={handleShow}>Thanh Toán</button>
        </div>
        <hr />
      </div>

      {/* Modal Checkout */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Đơn Hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "start" }}>
              <h5>Thông tin giao hàng</h5>
              <input
                type="text"
                placeholder="Họ và tên"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                }}
                name="name"
                value={obj.name}
                onChange={handleChangleInput}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                }}
                name="phone"
                value={obj.phone}
                onChange={handleChangleInput}
              />
              <input
                type="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  paddingLeft: "5px",
                }}
                name="email"
                value={obj.email}
                onChange={handleChangleInput}
              />
              <select onChange={handleCity} name="" id="">
                <option value="">Chọn thành phố</option>
                {dataCity.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select onChange={handleDistrict} name="" id="">
                <option>Chọn Quận/Huyện</option>
                {dataDistrict.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setWard(e.target.value)} name="" id="">
                <option value="">Chọn Phường/Xã</option>
                {dataWard.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="primary" onClick={handleFinish}>
              Đặt Hàng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
