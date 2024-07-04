// app/userprofile/orders/page.tsx

import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import dbConnect from '../../../app/lib/dbConnect';
import User from '../../../models/user';
import OrdersComponent from '../../../components/OrdersComponent';

const MyOrdersPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect('/');
    return null;
  }

  const userData = { username: user.username, email: user.email };
  return <OrdersComponent user={userData} />;
};

export default MyOrdersPage;
