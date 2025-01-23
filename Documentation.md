## Comprehensive API Documentation

### **1. API Endpoint Specifications**

#### **Auth APIs**
- **POST** `/auth/token`
  - **Description**: Generates a JWT token for a user with a specific role.
  - **Request Body**:
    ```json
    {
        "userId": "string",
        "role": "string", // Allowed values: "superadmin", "school_admin", "student"
        "schoolId": "string" // Required if role is "school_admin"
    }
    ```
  - **Response**:
    ```json
    {
        "token": "string"
    }
    ```
  - **Errors**:
    - `400`: Missing required fields (userId, role, or schoolId for school_admin).
    - `500`: Error during token generation.

#### **School APIs**
- **POST** `/schools`
  - **Description**: Creates a new school. Only accessible to `superadmin`.
  - **Request Body**:
    ```json
    {
        "name": "string",
        "address": "string",
        "contact": "string"
    }
    ```
  - **Response**:
    ```json
    {
        "_id": "string",
        "name": "string",
        "address": "string",
        "contact": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
  - **Errors**:
    - `401`: Unauthorized.
    - `500`: Error creating school.

#### **Classroom APIs**
- **PATCH** `/classrooms/:id/resources`
  - **Description**: Updates the capacity and resources of a classroom. Accessible to `school_admin`.
  - **Request Body**:
    ```json
    {
        "capacity": "number",
        "resources": ["string"]
    }
    ```
  - **Response**:
    ```json
    {
        "_id": "string",
        "name": "string",
        "capacity": "number",
        "resources": ["string"],
        "school": "string",
        "updatedAt": "date"
    }
    ```
  - **Errors**:
    - `401`: Unauthorized.
    - `403`: Forbidden (not assigned to the school).
    - `500`: Error updating resources.

#### **Student APIs**
- **POST** `/schools/:schoolId/students`
  - **Description**: Enrolls a new student in a school. Accessible to `school_admin`.
  - **Request Body**:
    ```json
    {
        "firstName": "string",
        "lastName": "string",
        "age": "number"
    }
    ```
  - **Response**:
    ```json
    {
        "_id": "string",
        "firstName": "string",
        "lastName": "string",
        "age": "number",
        "school": "string",
        "createdAt": "date"
    }
    ```
  - **Errors**:
    - `401`: Unauthorized.
    - `403`: Forbidden (not assigned to the school).
    - `500`: Error enrolling student.

---

### **2. Request/Response Formats**
- **Authentication**:
  - Bearer token must be included in the `Authorization` header for protected routes.
    ```
    Authorization: Bearer <token>
    ```
- **Standard Response Format**:
  ```json
  {
      "ok": "boolean",
      "data": "object | array",
      "message": "string",
      "errors": "array"
  }
  ```

---

### **3. Authentication Flow**
1. Client requests a token by hitting `/auth/token` with user credentials and role.
2. Token is returned and stored on the client side (e.g., in localStorage or session cookies).
3. Client includes the token in the `Authorization` header for all subsequent requests.
4. Server validates the token on each request using the `authenticate` middleware.

---

### **4. Error Codes and Handling**
- **400**: Bad Request (e.g., validation errors, missing fields).
- **401**: Unauthorized (e.g., missing or invalid token).
- **403**: Forbidden (e.g., access denied due to role restrictions).
- **404**: Not Found (e.g., invalid resource ID).
- **500**: Internal Server Error.

---

### **5. Database Schema Diagram**
#### **Users**
| Field       | Type      | Description                       |
|-------------|-----------|-----------------------------------|
| _id         | String    | Primary key (userId alias)        |
| role        | String    | Role of the user                 |
| schoolId    | ObjectId  | Reference to the School (optional for school_admin) |
| token       | String    | JWT token                        |
| createdAt   | Date      | Record creation timestamp        |
| updatedAt   | Date      | Record update timestamp          |

#### **Schools**
| Field       | Type      | Description                       |
|-------------|-----------|-----------------------------------|
| _id         | ObjectId  | Primary key                      |
| name        | String    | Name of the school               |
| address     | String    | Address of the school            |
| contact     | String    | Contact information              |
| createdAt   | Date      | Record creation timestamp        |
| updatedAt   | Date      | Record update timestamp          |

#### **Classrooms**
| Field       | Type      | Description                       |
|-------------|-----------|-----------------------------------|
| _id         | ObjectId  | Primary key                      |
| name        | String    | Name of the classroom            |
| capacity    | Number    | Maximum number of students       |
| resources   | Array     | List of classroom resources       |
| school      | ObjectId  | Reference to the School          |
| createdAt   | Date      | Record creation timestamp        |
| updatedAt   | Date      | Record update timestamp          |

#### **Students**
| Field       | Type      | Description                       |
|-------------|-----------|-----------------------------------|
| _id         | ObjectId  | Primary key                      |
| firstName   | String    | First name of the student        |
| lastName    | String    | Last name of the student         |
| age         | Number    | Age of the student               |
| school      | ObjectId  | Reference to the School          |
| enrolledClassroom | ObjectId | Reference to the Classroom (optional) |
| createdAt   | Date      | Record creation timestamp        |
| updatedAt   | Date      | Record update timestamp          |

---

Let me know if additional details are needed!

