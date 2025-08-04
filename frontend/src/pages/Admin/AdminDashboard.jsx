import { useState } from 'react';
import UserList from '../../components/UserList';
import BookingList from '../../components/BookingList';
import HotelList from '../../components/HotelList';

export default function AdminDashboard() {
  const [tab, setTab] = useState('users');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab('users')} className="border px-4 py-2 rounded">Users</button>
        <button onClick={() => setTab('bookings')} className="border px-4 py-2 rounded">Bookings</button>
        <button onClick={() => setTab('hotels')} className="border px-4 py-2 rounded">Hotels</button>
      </div>

      {tab === 'users' && <UserList />}
      {tab === 'bookings' && <BookingList />}
      {tab === 'hotels' && <HotelList />}
    </div>
  );
}
