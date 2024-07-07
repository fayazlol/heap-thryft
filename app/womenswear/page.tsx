import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import dbConnect from '../../app/lib/dbConnect';
import User from '../../models/user';
import ProductListing from '../../models/ProductListing';
import WomenswearClient from '../../components/WomenswearClient';



export default async function WomenswearPage() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect('/login');
    return null;
  }

  const initialListings = await ProductListing.find({ gender: { $in: ['Womenswear', 'Unisex'] },    isSold: false
});

  return <WomenswearClient user={user} initialListings={initialListings} />;
}
