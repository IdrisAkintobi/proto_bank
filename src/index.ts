import app from "./app";
import db from "./database/db.connect";

const PORT = process.env.NODE_PORT || 5000;

const startServer = async () => {
  try {
    //Test database connection
    db.raw("SELECT 'test connection';").then(() =>
      console.log("🗄  Database is connected")
    );
    //Start listening
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    throw error;
  }
};

// On Interrupt
process.on("SIGINT", async () => {
  console.log("👋 Bye bye!");
  process.exit();
});

//Start server
startServer().catch(console.log);
