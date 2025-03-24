// CommonJS version of the script
const bcrypt = require("bcryptjs")
const mysql = require("mysql2/promise")

async function resetAdminPassword() {
  try {
    // Create a database connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "seif_law_firm_db",
    })

    // Define the admin username and new password
    const adminUsername = "admin@seiflawfirm.com"
    const newPassword = "admin123" // You can change this to any password you want

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    console.log(`Generated hash: ${hashedPassword}`)

    // Update the admin password in the database
    const [result] = await connection.execute("UPDATE admins SET password = ? WHERE username = ?", [
      hashedPassword,
      adminUsername,
    ])

    if (result.affectedRows > 0) {
      console.log(`Password for ${adminUsername} has been reset successfully.`)
      console.log(`New password: ${newPassword}`)
    } else {
      console.log(`User ${adminUsername} not found. Creating new admin user...`)

      // Insert a new admin user if one doesn't exist
      await connection.execute(
        "INSERT INTO admins (username, password, full_name, email, role, is_active) VALUES (?, ?, ?, ?, ?, ?)",
        [adminUsername, hashedPassword, "Admin User", adminUsername, "admin", 1],
      )

      console.log(`New admin user created with username: ${adminUsername} and password: ${newPassword}`)
    }

    // Close the connection
    await connection.end()
  } catch (error) {
    console.error("Error resetting admin password:", error)
  }
}

// Run the function
resetAdminPassword()

