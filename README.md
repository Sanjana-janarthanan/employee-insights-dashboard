# Employee Insights Dashboard

## Overview
This project is a *4-screen Employee Insights Dashboard* built with React and raw CSS/Tailwind. It demonstrates:

- Handling browser hardware (camera)  
- Custom virtualization for large datasets  
- Data visualization using *Chart.js* and *react-leaflet* (for initial implementation)  
- React state management and routing  

> Note: Chart.js and react-leaflet were used for development, but the assignment specifies no charting libraries. This is documented below.

---

## Features Implemented

### 1. Secure Authentication (Login)
- Login page with *username:* testuser and *password:* Test123  
- Persistent session using localStorage  
- Redirects to login if /list is accessed without authentication  



---

### 2. Employee List (High-Performance Grid)
- Displays a list of employees using *VirtualizedTable.jsx*  
- Custom virtualization implemented (renders only visible rows + small buffer)  
- Clicking a row navigates dynamically to /details/:id  
- Employee data persisted using localStorage   

---

### 3. Identity Verification (Details Page)
- Dynamic routing /details/:id  
- *Camera API* captures employee photo  
- *HTML5 Canvas overlay* for signature  
- Merges photo + signature into a single image (Base64)  


---

### 4. Data Visualization (Analytics Page)
- Displays *merged photo + signature* from Details page  
- *Salary distribution per city* displayed using *Chart.js bars* initially  
- *Leaflet map* shows employee cities with markers and popups  
 

---

## Intentional Bug (Developer Note)
- *File:* VirtualizedTable.jsx  
- *Function:* handleScroll  
- *Bug Description:* scrollTop state uses a *stale closure*, which may cause row jumps during fast scrolling  
- *Purpose:* Required for assignment to demonstrate understanding of React state lifecycle  
- *Observation:* Scroll quickly on List page with large datasets → some rows may flicker or jump  

---


