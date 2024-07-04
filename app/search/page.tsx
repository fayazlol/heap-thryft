import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/models/user';
import ProductListing from '@/models/ProductListing';
import SearchResults from '@/components/SearchResults';

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
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

  const query = searchParams.query;
  if (!query) {
    return (
      <div>
        <p>No query provided</p>
      </div>
    );
  }

  const searchKeywords = query.split(' ').map(keyword => ({
    $or: [
      { productName: { $regex: keyword, $options: 'i' } },
      { productDescription: { $regex: keyword, $options: 'i' } }
    ]
  }));

  const results = await ProductListing.find({ $and: searchKeywords });

  return <SearchResults user={user} results={results} searchQuery={query} />;
}
