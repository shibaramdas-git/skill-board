- /login username & password
  1. admin has full access to dashboard
  2. moderator has less access to dashboard
  3. users login leads to store front not dashboard.
     nothing else.

1. crypto dashboard section
2. Ecommerce dashboard section
   /products
   1. filters : search, sorting, pagination, filter by category.
   2. products table
   3. crud operation
      /users
   4. users table
   5. filters - search , sort, pagination etc.
   6. view user profile, view cart (table inside a popup), create users, suspend user
3. /staff roles and permissions (only for admins )
   1. roles list , CRUD roles with permissions
   2. staff table.
   3. staff - view, update, suspend, change password, update permissions etc.
4. /chat support section - firebase based.
5. media handling
   images gallery with filters
   music spotify section
   video youtube stream section
6. others
   1. firebase auth
   2. forms handling
   3. web api - location, related feature
   4. web storage
   5. text to speech, speech to text related etc.

---

key features to include..

1.  Authentication & Role-Based Access Control
    1.  auth using dummyjson jwt, - understand session , cookie, and local storage
    2.  implement RBAC
    3.  protect API routes & dashboard pages based on user roles
2.  API Integration & Data Fetching (all sections)
    1.  Use React Query for API requests & caching.
    2.  Show loading states, error handling, and optimistic updates.
        i.e. Fetch live data (e.g., from CoinGecko, GitHub API, or News API).
        i.e. Display real-time updates (polling, WebSockets, or Server-Sent Events).
3.  Data Visualization (Charts & Graphs)
    1.  Use Recharts or Chart.js for interactive graphs.
    2.  Fetch API data & display as bar, line, pie charts.
4.  Redux state
    1.  Store theme settings, user preferences, and API data efficiently.
    2.  use ecommerce page - rtk query.
5.  Performance optimization
    Use React Suspense & lazy loading.
    Optimize bundle size, images, and API calls.
    Implement server-side rendering (SSR) and static site generation (SSG) in Next.js.
6.  Forms & Validations
    custom multistep form. use nextjs backend for validation and submission.
7.  Dynamic themes with colors

---design references ---
https://flowbite.com/application-ui/demo/homepages/car-service/
