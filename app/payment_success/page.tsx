// app/payment_success/page.tsx

import { getServerSession } from 'next-auth';
import dbConnect from '../lib/dbConnect';
import User from '@/models/user';
import { redirect } from 'next/navigation';
import PaymentSuccess from '../../components/PaymentSuccess';

const PaymentSuccessPage = async () => {
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

  const userData = { username: user.username };

  return <PaymentSuccess session={session} user={userData} />;
};

export default PaymentSuccessPage;
