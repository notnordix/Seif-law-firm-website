const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

async function addAdminUser() {
  try {
    // Create a database connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "seif_law_firm_db",
    });

    // Define the new admin credentials
    const newAdmin = {
      username: "new_admin@seiflawfirm.com", // Change this to the desired username
      password: "secure_password123", // Change this to a secure password
      fullName: "New Admin User", // Change this to the admin's name
      email: "new_admin@seiflawfirm.com", // Change this to the admin's email
      role: "admin", // You can use different roles if you have role-based permissions
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(newAdmin.password, 10);

    // Check if the username already exists
    const [existingUsers] = await connection.execute(
      "SELECT id FROM admins WHERE username = ?",
      [newAdmin.username]
    );

    if (existingUsers.length > 0) {
      console.log(`User ${newAdmin.username} already exists.`);
      await connection.end();
      return;
    }

    // Insert the new admin user
    await connection.execute(
      "INSERT INTO admins (username, password, full_name, email, role, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [
        newAdmin.username,
        hashedPassword,
        newAdmin.fullName,
        newAdmin.email,
        newAdmin.role,
        1, // is_active = 1 means the user is active
      ]
    );

    console.log(`New admin user created successfully:`);
    console.log(`Username: ${newAdmin.username}`);
    console.log(`Password: ${newAdmin.password}`);
    console.log(`Full Name: ${newAdmin.fullName}`);
    console.log(`Role: ${newAdmin.role}`);

    // Close the connection
    await connection.end();
  } catch (error) {
    console.error("Error adding admin user:", error);
  }
}

// Run the function
addAdminUser();