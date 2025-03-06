// // components/withAuth.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const withAuth = (WrappedComponent: React.FC) => {
//   return function ProtectedRoute() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.replace('/'); // Redirect to login if not authenticated
//       } else {
//         setLoading(false);
//       }
//     }, []);

//     if (loading) return <p>Loading...</p>;

//     return <WrappedComponent />;
//   };
// };

// export default withAuth;
