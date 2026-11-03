import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingPage = async() => {

const session = await auth.api.getSession({
  headers: await headers()
})
const user = session?.user
const res = await fetch(`http://localhost:8000/my-bookings/${user?.email}`)
const booking =await res.json() 
console.log(booking, 'after fetch api');





  return (
    <div>
      MyBookingPage
    </div>
  );
};

export default MyBookingPage;