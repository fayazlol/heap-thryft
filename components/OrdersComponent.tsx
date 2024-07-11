//completely fucked atm sorry gang...

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrdersComponentProps {
  user: {
    username: string;
    email: string;
  };
}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ user }) => {
  const router = useRouter();
  const [toReceive, setToReceive] = useState([]);
  const [toSend, setToSend] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const resReceive = await fetch(`/api/orders/receive?username=${user.username}`);
        const dataReceive = await resReceive.json();

        const resSend = await fetch(`/api/orders/send?username=${user.username}`);
        const dataSend = await resSend.json();

        setToReceive(dataReceive);
        setToSend(dataSend);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user.username]);

  const handleUpdateStatus = async (orderId, type) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [type]: true,
        }),
      });

      
      const resReceive = await fetch(`/api/orders/receive?username=${user.username}`);
      const dataReceive = await resReceive.json();
      setToReceive(dataReceive);

      const resSend = await fetch(`/api/orders/send?username=${user.username}`);
      const dataSend = await resSend.json();
      setToSend(dataSend);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const renderOrder = (order, type) => (
    <div key={order._id} className="p-4 border rounded-lg shadow-md mb-4 bg-white">
      <div className="flex items-center">
        <Image src={order.productId.productImage1} alt={order.productId.productName} width={100} height={100} className="rounded-lg" />
        <div className="ml-4">
        <p className=" text-black">@{order.productId.username}'s</p>
          <h3 className="text-xl font-bold text-black">{order.productId.productName}</h3>
          <p className='text-black'>Size: {order.productId.productSize}</p>
          <p className='text-black'>Category: {order.productId.category}</p>
          <p className='text-black'>Gender: {order.productId.gender}</p>
          <p className='text-black'>Condition: {order.productId.productCondition}</p>
          <p className='text-black'>Price: ${order.productId.isDiscounted ? order.productId.discountPrice : order.productId.price}</p>
          <p className='text-black'>Sent: {order.isSent ? 'Yes' : 'No'}</p>
          <p className='text-black'>Received: {order.isReceived ? 'Yes' : 'No'}</p>
          {type === 'toSend' && !order.isSent && (
            <button
              onClick={() => handleUpdateStatus(order._id, 'isSent')}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Mark as Sent
            </button>
          )}
          {type === 'toReceive' && !order.isReceived && (
            <button
              onClick={() => handleUpdateStatus(order._id, 'isReceived')}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Mark as Received
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-[#fafafa] min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Your Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">To Receive</h2>
            {toReceive.length === 0 ? (
              <p>No items to receive.</p>
            ) : (
              toReceive.map(order => renderOrder(order, 'toReceive'))
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-black">To Send</h2>
            {toSend.length === 0 ? (
              <p>No items to send.</p>
            ) : (
              toSend.map(order => renderOrder(order, 'toSend'))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrdersComponent;
