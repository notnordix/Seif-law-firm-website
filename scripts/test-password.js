const bcrypt = require("bcryptjs")
const mysql = require("mysql2/promise")

async function testPassword() {
  try {
    // Get username and password from command line arguments
    const username = process.argv[2]
    const password = process.argv[3]

    if (!username || !password) {
      console.error("Usage: node test-password.js <username> <password>")
      process.exit(1)
    }

    // Create a database connection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "seif_law_firm_db",
    })

    // Find user in database
    const [rows] = await connection.execute(
      "SELECT id, username, password, full_name, email, role FROM admins WHERE username = ?",
      [username],
    )

    if (rows.length === 0) {
      console.log("User not found")
      process.exit(1)
    }

    const user = rows[0]
    console.log("Found user:", { ...user, password: "HIDDEN" })

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    console.log("Password valid:", isValid)

    // Close the connection
    await connection.end()
  } catch (error) {
    console.error("Error testing password:", error)
  }
}

// Run the function
testPassword()

