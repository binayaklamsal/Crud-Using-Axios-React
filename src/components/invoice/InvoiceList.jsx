import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const getInvoiceList = () => {
    axios
      .get("http://localhost:3000/invoice/")
      .then((res) => {
        setInvoiceList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getInvoiceList();
  }, []);

  const deleteInvoice = async (id) => {
    await axios
      .delete(`http://localhost:3000/invoice/${id}`)
      .then((res) => {
        console.log(res);
        getInvoiceList();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getInvoiceList();
  }, []);

  return (
    <div className="bg-slate-700 min-h-screen w-full text-white p-6">
      <div className="flex gap-2 justify-between">
        <h1 className="text-xl">Inovice List</h1>
        <Link
          to={"/invoice/add"}
          className="bg-blue-500 rounded-full px-6 py-1">
          Add
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>sn</th>
            <th>name</th>
            <th>qty</th>
            <th>price</th>
            <th>amount</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {invoiceList?.map((item, index) => {
            return (
              <tr className="even:bg-slate-500" key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.Qty}</td>
                <td>{item?.rate}</td>
                <td>{item?.Qty * item?.rate}</td>
                <td className="flex gap-6 justify-center">
                  <button
                    onClick={() => {
                      deleteInvoice(item?.id);
                    }}
                    className="py-0.5 flex items-center px-4 rounded-md bg-red-400">
                    del
                  </button>
                  <Link
                    to={`/invoice/${item?.id}`}
                    className="py-0.5 flex items-center px-4 rounded-md bg-green-400">
                    edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
