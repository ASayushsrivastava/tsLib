import readline from "readline";
import { Library } from "./libraryNamespace";
import { Role } from "./enum/role";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q: string) =>
  new Promise<string>((res) => rl.question(q, (ans) => res(ans)));

async function pause() {
  await question("\nPress Enter to continue...");
}

// ========================== ADMIN FLOW ==========================
async function adminFlow() {
  console.log("=== Admin Login ===");
  const email = await question("Email: ");
  const pwd = await question("Password: ");
  const ok = Library.adminLogin(email.trim(), pwd.trim());

  if (!ok) {
    console.log("Admin login failed.");
    return;
  }

  let exitAdmin = false;
  while (!exitAdmin) {
    console.clear();
    console.log(`
=== Admin Menu ===
1) Add Book
2) Remove Book
3) View All Books
4) Register User
5) View All Users
6) Remove User
7) Issue Book to User
8) Return Book from User
9) View Library Stats
10) Back to Main
`);
    const c = (await question("> ")).trim();

    switch (c) {
      case "1": {
        const title = await question("Title: ");
        const author = await question("Author: ");
        const genre = await question("Genre: ");
        const added = Library.adminAddBook({ title, author, genre });
        console.log(`'${added.title}' added successfully.`);
        await pause();
        break;
      }

      case "2": {
        const id = Number(await question("Book ID to remove: "));
        const ok = Library.adminRemoveBook(id);
        console.log(ok ? "Book removed successfully." : "Book not found.");
        await pause();
        break;
      }

      case "3": {
        console.table(Library.adminViewBooks());
        await pause();
        break;
      }

      case "4": {
        const name = await question("Name: ");
        const email = await question("Email: ");
        const pwd = await question("Password: ");
        const roleStr = (await question("Role (ADMIN/USER): "))
          .trim()
          .toUpperCase();
        const role = roleStr === "ADMIN" ? Role.ADMIN : Role.USER;
        const newUser = Library.adminRegisterUser({
          name,
          email,
          password: pwd,
          role,
        });
        console.log("User registered successfully:");
        console.log(newUser);
        await pause();
        break;
      }

      case "5": {
        console.table(Library.adminViewUsers());
        await pause();
        break;
      }

      case "6": {
        const userId = Number(await question("User ID to remove: "));
        const ok = Library.adminRemoveUser(userId);
        console.log(ok ? "User removed successfully." : "User not found.");
        await pause();
        break;
      }

      case "7": {
        const bookId = Number(await question("Book ID to issue: "));
        const userId = Number(await question("User ID to issue to: "));
        console.log(Library.issueBook(bookId, userId));
        await pause();
        break;
      }

      case "8": {
        const bookId = Number(await question("Book ID to return: "));
        const userId = Number(await question("User ID returning: "));
        console.log(Library.returnBook(bookId, userId));
        await pause();
        break;
      }

      case "9": {
        console.log("Library Statistics:");
        console.log(Library.stats());
        await pause();
        break;
      }

      case "10":
        exitAdmin = true;
        break;

      default:
        console.log("Invalid choice.");
        await pause();
    }
  }
}

// ========================== USER FLOW ==========================
async function userFlow() {
  console.log("=== User Login ===");
  const email = await question("Email: ");
  const pwd = await question("Password: ");
  const ok = Library.userLogin(email.trim(), pwd.trim());

  if (!ok) {
    console.log("User login failed.");
    return;
  }

  let exitUser = false;
  while (!exitUser) {
    console.clear();
    console.log(`
=== User Menu ===
1) Search Books
2) Search Books by Genre
3) View Available Books
4) View My Issued Books
5) View My Due Dates
6) Logout
`);
    const c = (await question("> ")).trim();

    switch (c) {
      case "1": {
        const q = await question("Search query (title/author/genre): ");
        console.table(Library.userSearch(q));
        await pause();
        break;
      }
      case "2": {
        const genre = await question("Genre: ");
        console.table(Library.searchByGenre(genre));
        await pause();
        break;
      }
      case "3": {
        console.table(Library.availableBooks());
        await pause();
        break;
      }
      case "4": {
        console.table(Library.userMyBooks());
        await pause();
        break;
      }
      case "5": {
        const dueDates = Library.userDueDates();
        if (dueDates.length === 0) console.log("No issued books.");
        else
          dueDates.forEach((b) =>
            console.log(
              `Book ID: ${b.bookId}, Due: ${b.dueDate.toDateString()}`
            )
          );
        await pause();
        break;
      }
      case "6":
        Library.userLogout();
        exitUser = true;
        break;
      default:
        console.log("Invalid choice.");
        await pause();
    }
  }
}

// ========================== MAIN ENTRY ==========================
async function main() {
  console.log("=== Library Management Console ===");
  let exitApp = false;

  while (!exitApp) {
    console.clear();
    console.log(`
=== Main Menu ===
1) Admin
2) User
3) Exit
`);
    const c = (await question("> ")).trim();

    switch (c) {
      case "1":
        await adminFlow();
        break;
      case "2":
        await userFlow();
        break;
      case "3":
        exitApp = true;
        break;
      default:
        console.log("Invalid choice.");
        await pause();
    }
  }

  rl.close();
  process.exit(0);
}

// ========================== EXECUTION ==========================
main().catch((e) => {
  console.error("Fatal error:", e);
  rl.close();
  process.exit(1);
});
