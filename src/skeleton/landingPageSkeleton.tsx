import { motion } from 'framer-motion'

// export const LandingPageSkeleton = () => {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navbar Skeleton */}
//       <nav className="fixed w-full z-50 bg-gray-900 py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <div className="w-32 h-8 bg-gray-800 rounded"></div>
//           <div className="hidden md:flex space-x-4">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="w-20 h-8 bg-gray-800 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section Skeleton */}
//       <section className="pt-32 pb-20 px-4">
//         <div className="container mx-auto text-center">
//           <div className="w-3/4 h-12 bg-gray-800 rounded mx-auto mb-6"></div>
//           <div className="w-1/2 h-8 bg-gray-800 rounded mx-auto mb-8"></div>
//           <div className="w-40 h-12 bg-gray-800 rounded mx-auto"></div>
//         </div>
//       </section>

//       {/* Features Section Skeleton */}
//       <section className="py-20 bg-gray-900">
//         <div className="container mx-auto px-4">
//           <div className="w-1/2 h-10 bg-gray-800 rounded mx-auto mb-12"></div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-black p-6 rounded-lg">
//                 <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4"></div>
//                 <div className="w-3/4 h-6 bg-gray-800 rounded mx-auto mb-4"></div>
//                 <div className="w-full h-4 bg-gray-800 rounded mb-2"></div>
//                 <div className="w-full h-4 bg-gray-800 rounded mb-2"></div>
//                 <div className="w-2/3 h-4 bg-gray-800 rounded"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section Skeleton */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 text-center">
//           <div className="w-3/4 h-10 bg-gray-300 rounded mx-auto mb-8"></div>
//           <div className="w-1/2 h-6 bg-gray-300 rounded mx-auto mb-12"></div>
//           <div className="w-40 h-12 bg-gray-300 rounded mx-auto"></div>
//         </div>
//       </section>
//     </div>
//   )
// }

export const WelcomePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar Skeleton */}
      <nav className="fixed w-full z-50 bg-gray-900 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="w-32 h-8 bg-gray-800 rounded"></div>
          <div className="hidden md:flex space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-8 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="w-3/4 h-12 bg-gray-800 rounded mx-auto mb-6"></div>
          <div className="w-1/2 h-8 bg-gray-800 rounded mx-auto mb-8"></div>
          <div className="w-40 h-12 bg-gray-800 rounded mx-auto"></div>
        </div>
      </section>

      {/* Recent Forms Section Skeleton */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="w-1/2 h-10 bg-gray-800 rounded mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black p-6 rounded-lg">
                <div className="w-3/4 h-6 bg-gray-800 rounded mb-4"></div>
                <div className="w-1/2 h-4 bg-gray-800 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="w-24 h-8 bg-gray-800 rounded"></div>
                  <div className="w-16 h-8 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section Skeleton */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="w-3/4 h-10 bg-gray-800 rounded mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4"></div>
                <div className="w-3/4 h-6 bg-gray-800 rounded mx-auto mb-2"></div>
                <div className="w-1/2 h-8 bg-gray-800 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-3/4 h-10 bg-gray-300 rounded mx-auto mb-8"></div>
          <div className="w-1/2 h-6 bg-gray-300 rounded mx-auto mb-12"></div>
          <div className="w-40 h-12 bg-gray-300 rounded mx-auto"></div>
        </div>
      </section>
    </div>
  )
}