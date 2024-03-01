import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams();
  const Navigate =useNavigate()
  const [inputData, setInputData] = useState({
    name: "",
    P_Category: "",
    exp: "",
    rate: "",
    ["Re-order"]: "",
    Qty: "",
  });
  const [error, setError] = useState({});
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(false)

  const validation = (value) => {
    let newErr = {};
    if (!value.name) {
      newErr = { ...newErr, name: "No name" };
    }
    if (!value.P_Category) {
      newErr = { ...newErr, P_Category: "No P_Category" };
    }
    if (!value.rate) {
      newErr = { ...newErr, rate: "No rate" };
    } else if (value.rate < 100) {
      newErr = {
        ...newErr,
        rate: "Rate must be atleast 100",
      };
    }
    if (!value.Qty) {
      newErr = { ...newErr, Qty: "No Qty" };
    }
    return newErr;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setError(validation(inputData));
    setIsValidate(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
 


   const postData = async() => {
    setLoading(true);
    await axios.patch(`http://localhost:3000/invoice/${id}`, inputData).then((res)=>{
      console.log(res)
      Navigate("/invoice")

    })
  }

  const getInvoice = () => {
    axios
      .get(`http://localhost:3000/invoice/?id=${id}`)
      .then((res) => {
        setInputData({
          ...res.data[0],
          P_Category: res?.data[0]?.Category,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    id && getInvoice();
  }, [id]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isValidate) {
      postData();
    }
  }, [error, isValidate]);

  return (
    <div className="bg-slate-700 min-h-screen w-full text-white p-6">
      <h1 className="text-xl text-center">Edit Inovice</h1>
      <form onSubmit={handelSubmit} className="grid grid-cols-2 gap-4 mt-6 my-4">
        <div className="productInput">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={handleChange}
            value={inputData.name}
            name="name"
            id="name"
          />
          <p className="text-sm text-red-500">{error?.name}</p>
        </div>
        <div className="productInput">
          <label htmlFor="P_Category">P_Category</label>
          <input
            type="text"
            onChange={handleChange}
            value={inputData.P_Category}
            name="P_Category"
            id="P_Category"
          />
          <p className="text-sm text-red-500">{error?.P_Category}</p>
        </div>
        <div className="productInput col-span-2">
          <label htmlFor="Exp">Exp Date</label>
          <input
            type="date"
            onChange={handleChange}
            value={inputData.exp}
            name="exp"
            id="Exp"
          />
        </div>
        <div className="productInput col-span-2">
          <label htmlFor="Rate">Rate</label>
          <input
            type="number"
            onChange={handleChange}
            value={inputData.rate}
            name="rate"
            id="Rate"
          />
          <p className="text-sm text-red-500">{error?.rate}</p>
        </div>
        <div className="productInput">
          <label htmlFor="Re-order">Re-order Level</label>
          <input
            type="number"
            onChange={handleChange}
            value={inputData["Re-order"]}
            name="Re-order"
            id="Re-order"
          />
        </div>
        <div className="productInput">
          <label htmlFor="Qty">Qty</label>
          <input
            type="number"
            onChange={handleChange}
            value={inputData.Qty}
            name="Qty"
            id="Qty"
          />
          <p className="text-sm text-red-500">{error?.Qty}</p>
        </div>

        <button
            type="submit"
            className="bg-slate-400 relative py-2 h-10  rounded-lg"
          >
            {loading ? <div className="spinner"></div> : "submit"}
          </button>
        {/* <Button title={"Submit"} type="submit" className="col-span-2" /> */}
      </form>
    </div>
  );
};

export default EditInvoice;
