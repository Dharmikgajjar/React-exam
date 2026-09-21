<img width="1897" height="871" alt="image" src="https://github.com/user-attachments/assets/2c20d129-9b7b-44c4-abb3-7c7303d3d6f4" />
<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/b302dfa8-e8b4-4cca-8309-2cfdf4469400" />
<img width="1896" height="865" alt="image" src="https://github.com/user-attachments/assets/8783b6a7-6223-42aa-92fa-1dd0de899f68" />

Screen Recording>
https://drive.google.com/drive/folders/14SjCO4K2bckMUTYHUFkhH5Kavecx_0Ob?usp=sharing

This project is a React and Redux based Student Management System. I have divided the project into different components and Redux files so that it is easier to manage.

Main File

App.jsx
This is the main file of the application. It handles the different screens like login, student list, add student and edit student. It also checks whether the user is logged in before allowing access to the main pages.

Components

Login.jsx
This component is used for teacher login. The username and password are taken from the form and sent to Redux. After successful login, the user can access the application.

Navbar.jsx
This is the navigation bar of the application. It shows the available navigation options, the logged-in teacher's information and also has the logout option.

StudentList.jsx
This is the main student dashboard. It displays the student exam records in a table. It also shows some overall statistics and provides options to sort and filter the student data.

StudentDetails.jsx
This component displays the details of one student in a table row. It also contains Edit and Delete buttons. These buttons are available for users who have admin access.

StudentForm.jsx
This is a common form used for both adding and editing students. When adding a new student, the form is empty. When editing a student, the existing student information is loaded into the form.

Redux State Management

store.js and reducers/index.js
These files are used to create and configure the Redux store. redux-thunk is used so that we can perform API calls and handle asynchronous operations.

authActions.js and authReducer.js
These files handle the login and logout functionality. They also store authentication errors and use localStorage to keep the user logged in after refreshing the page.

studentActions.js and studentReducer.js
These files handle the student related operations such as adding, getting, updating and deleting student records. The data is sent to and received from the local json-server backend, and the Redux state is updated based on the response.
