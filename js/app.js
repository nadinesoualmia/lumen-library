"use strict";

/* =========================================================
   Lumen Library — app.js (Database-Free Version)
   All data stored in localStorage
   ========================================================= */

const PICKUP_DEADLINE_DAYS = 3;
const LOAN_DURATION_DAYS   = 21;
const PANEL_PREVIEW_LIMIT  = 4;

/* =========================================================
   localStorage Keys
   ========================================================= */
const LS_KEYS = {
  USERS: "lumen_users",
  BOOKS: "lumen_books",
  LOANS: "lumen_loans",
  READING_LIST: "lumen_reading_list",
  NOTIFICATIONS: "lumen_notifications",
  REVIEWS: "lumen_reviews",
  ACTIVITY: "lumen_activity",
  SESSION: "lumen_session",
  VERSION: "lumen_version"
};

const DATA_VERSION = "2";

/* =========================================================
   Default Seed Data
   ========================================================= */
const DEFAULT_USERS = [
  { id: 1, name: "Admin User", email: "admin@lumen.com", phone: "0555000001", password: "admin123", role: "admin", status: "active", createdAt: "2026-01-01" },
  { id: 2, name: "Sarah Librarian", email: "librarian@lumen.com", phone: "0555000002", password: "lib12345", role: "librarian", status: "active", createdAt: "2026-01-01" },
  { id: 3, name: "Demo Reader", email: "reader@lumen.com", phone: "0555000003", password: "reader123", role: "reader", status: "active", createdAt: "2026-01-01" }
];

const DEFAULT_BOOKS = [
  { id: 1,  title: "The Great Gatsby", author: "F. Scott Fitzgerald", cat: "Classic", year: 1925, lang: "English", isbn: "9780743273565", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", desc: "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.", borrows: 12 },
  { id: 2,  title: "To Kill a Mockingbird", author: "Harper Lee", cat: "Classic", year: 1960, lang: "English", isbn: "9780446310789", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780446310789-L.jpg", desc: "Racial injustice and loss of innocence in the American South.", borrows: 8 },
  { id: 3,  title: "1984", author: "George Orwell", cat: "Science Fiction", year: 1949, lang: "English", isbn: "9780451524935", total: 4, avail: 4, coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", desc: "A dystopian novel about totalitarianism and surveillance.", borrows: 15 },
  { id: 4,  title: "Pride and Prejudice", author: "Jane Austen", cat: "Romance", year: 1813, lang: "English", isbn: "9780141439518", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg", desc: "Elizabeth Bennet and Mr. Darcy navigate love and society.", borrows: 10 },
  { id: 5,  title: "The Hobbit", author: "J.R.R. Tolkien", cat: "Fantasy", year: 1937, lang: "English", isbn: "9780547928227", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", desc: "Bilbo Baggins embarks on an epic quest.", borrows: 14 },
  { id: 6,  title: "Dune", author: "Frank Herbert", cat: "Science Fiction", year: 1965, lang: "English", isbn: "9780441172719", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg", desc: "Politics, religion, and ecology on a desert planet.", borrows: 11 },
  { id: 7,  title: "The Catcher in the Rye", author: "J.D. Salinger", cat: "Classic", year: 1951, lang: "English", isbn: "9780316769488", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg", desc: "Teenage alienation and rebellion in New York.", borrows: 7 },
  { id: 8,  title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", cat: "Fantasy", year: 1997, lang: "English", isbn: "9780590353427", total: 5, avail: 5, coverUrl: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg", desc: "A young wizard's first year at Hogwarts.", borrows: 20 },
  { id: 9,  title: "Moby-Dick", author: "Herman Melville", cat: "Classic", year: 1851, lang: "English", isbn: "9781503280786", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9781503280786-L.jpg", desc: "Captain Ahab's obsessive quest for the white whale.", borrows: 5 },
  { id: 10, title: "War and Peace", author: "Leo Tolstoy", cat: "Classic", year: 1869, lang: "English", isbn: "9781400079988", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9781400079988-L.jpg", desc: "Epic tale of Russian aristocracy during the Napoleonic Wars.", borrows: 4 },
  { id: 11, title: "Crime and Punishment", author: "Fyodor Dostoevsky", cat: "Classic", year: 1866, lang: "English", isbn: "9780486415871", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780486415871-L.jpg", desc: "A poor student commits murder and faces psychological torment.", borrows: 9 },
  { id: 12, title: "Jane Eyre", author: "Charlotte Brontë", cat: "Classic", year: 1847, lang: "English", isbn: "9780141441146", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg", desc: "A governess finds love and independence.", borrows: 6 },
  { id: 13, title: "Wuthering Heights", author: "Emily Brontë", cat: "Classic", year: 1847, lang: "English", isbn: "9780141439556", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg", desc: "A tragic love story on the Yorkshire moors.", borrows: 7 },
  { id: 14, title: "The Odyssey", author: "Homer", cat: "Classic", year: 1614, lang: "English", isbn: "9780140268867", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780140268867-L.jpg", desc: "Odysseus's ten-year journey home after the Trojan War.", borrows: 3 },
  { id: 15, title: "Frankenstein", author: "Mary Shelley", cat: "Classic", year: 1818, lang: "English", isbn: "9780486282114", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780486282114-L.jpg", desc: "A scientist creates a monster he cannot control.", borrows: 10 },
  { id: 16, title: "Dracula", author: "Bram Stoker", cat: "Classic", year: 1897, lang: "English", isbn: "9780486411095", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780486411095-L.jpg", desc: "The classic vampire tale of Count Dracula.", borrows: 8 },
  { id: 17, title: "The Picture of Dorian Gray", author: "Oscar Wilde", cat: "Classic", year: 1890, lang: "English", isbn: "9780141439570", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg", desc: "A portrait ages while its subject stays young.", borrows: 6 },
  { id: 18, title: "Les Misérables", author: "Victor Hugo", cat: "Classic", year: 1862, lang: "French", isbn: "9780451419439", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780451419439-L.jpg", desc: "Redemption and revolution in 19th-century France.", borrows: 5 },
  { id: 19, title: "The Count of Monte Cristo", author: "Alexandre Dumas", cat: "Classic", year: 1844, lang: "French", isbn: "9780140449266", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg", desc: "Betrayal, imprisonment, and revenge.", borrows: 9 },
  { id: 20, title: "Don Quixote", author: "Miguel de Cervantes", cat: "Classic", year: 1605, lang: "Spanish", isbn: "9780060934347", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg", desc: "A delusional knight-errant and his loyal squire.", borrows: 3 },
  { id: 21, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", cat: "Fantasy", year: 1954, lang: "English", isbn: "9780547928210", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg", desc: "The first volume of The Lord of the Rings.", borrows: 13 },
  { id: 22, title: "A Game of Thrones", author: "George R.R. Martin", cat: "Fantasy", year: 1996, lang: "English", isbn: "9780553103540", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg", desc: "Noble families vie for control of the Iron Throne.", borrows: 18 },
  { id: 23, title: "The Name of the Wind", author: "Patrick Rothfuss", cat: "Fantasy", year: 2007, lang: "English", isbn: "9780756404741", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg", desc: "A magician tells the story of his life.", borrows: 9 },
  { id: 24, title: "Mistborn: The Final Empire", author: "Brandon Sanderson", cat: "Fantasy", year: 2006, lang: "English", isbn: "9780765311788", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg", desc: "A thief learns to use magical metals.", borrows: 8 },
  { id: 25, title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", cat: "Fantasy", year: 1950, lang: "English", isbn: "9780064471046", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780064471046-L.jpg", desc: "Four children enter the magical land of Narnia.", borrows: 11 },
  { id: 26, title: "Foundation", author: "Isaac Asimov", cat: "Science Fiction", year: 1951, lang: "English", isbn: "9780553293357", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg", desc: "A mathematician predicts the fall of an empire.", borrows: 6 },
  { id: 27, title: "Neuromancer", author: "William Gibson", cat: "Science Fiction", year: 1984, lang: "English", isbn: "9780441569595", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg", desc: "The novel that defined cyberpunk.", borrows: 5 },
  { id: 28, title: "The Martian", author: "Andy Weir", cat: "Science Fiction", year: 2011, lang: "English", isbn: "9780553418026", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg", desc: "An astronaut stranded on Mars must survive.", borrows: 14 },
  { id: 29, title: "Ender's Game", author: "Orson Scott Card", cat: "Science Fiction", year: 1985, lang: "English", isbn: "9780812550702", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg", desc: "A boy trains to lead Earth's space fleet.", borrows: 8 },
  { id: 30, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", cat: "Science Fiction", year: 1979, lang: "English", isbn: "9780345391803", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg", desc: "Arthur Dent's absurd trip across the universe.", borrows: 12 },
  { id: 31, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", cat: "Mystery", year: 2005, lang: "Swedish", isbn: "9780307454546", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg", desc: "A journalist and hacker investigate a cold case.", borrows: 10 },
  { id: 32, title: "Gone Girl", author: "Gillian Flynn", cat: "Mystery", year: 2012, lang: "English", isbn: "9780307588371", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg", desc: "A wife disappears and her husband becomes the suspect.", borrows: 11 },
  { id: 33, title: "The Da Vinci Code", author: "Dan Brown", cat: "Mystery", year: 2003, lang: "English", isbn: "9780307474278", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg", desc: "A symbologist unravels a conspiracy.", borrows: 13 },
  { id: 34, title: "And Then There Were None", author: "Agatha Christie", cat: "Mystery", year: 1939, lang: "English", isbn: "9780062073488", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780062073488-L.jpg", desc: "Ten strangers are murdered one by one on an island.", borrows: 7 },
  { id: 35, title: "The Silence of the Lambs", author: "Thomas Harris", cat: "Mystery", year: 1988, lang: "English", isbn: "9780312924584", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780312924584-L.jpg", desc: "An FBI trainee consults a cannibalistic killer.", borrows: 8 },
  { id: 36, title: "The Notebook", author: "Nicholas Sparks", cat: "Romance", year: 1996, lang: "English", isbn: "9780446605236", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg", desc: "A lifelong love story told through a notebook.", borrows: 9 },
  { id: 37, title: "Outlander", author: "Diana Gabaldon", cat: "Romance", year: 1991, lang: "English", isbn: "9780440212560", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780440212560-L.jpg", desc: "A WWII nurse travels back in time to Scotland.", borrows: 6 },
  { id: 38, title: "Me Before You", author: "Jojo Moyes", cat: "Romance", year: 2012, lang: "English", isbn: "9780143124542", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg", desc: "A caregiver falls for a paralyzed man.", borrows: 7 },
  { id: 39, title: "The Fault in Our Stars", author: "John Green", cat: "Romance", year: 2012, lang: "English", isbn: "9780525478812", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg", desc: "Two teenagers with cancer fall in love.", borrows: 12 },
  { id: 40, title: "Anna Karenina", author: "Leo Tolstoy", cat: "Romance", year: 1877, lang: "Russian", isbn: "9780143035008", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg", desc: "A tragic love affair in imperial Russia.", borrows: 4 },
  { id: 41, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", cat: "Non-Fiction", year: 2011, lang: "English", isbn: "9780062316097", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", desc: "A sweeping history of the human species.", borrows: 15 },
  { id: 42, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cat: "Non-Fiction", year: 2011, lang: "English", isbn: "9780374533557", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg", desc: "Two systems that drive how we think.", borrows: 6 },
  { id: 43, title: "The Power of Habit", author: "Charles Duhigg", cat: "Non-Fiction", year: 2012, lang: "English", isbn: "9780812981605", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg", desc: "How habits shape our lives and businesses.", borrows: 8 },
  { id: 44, title: "Educated", author: "Tara Westover", cat: "Non-Fiction", year: 2018, lang: "English", isbn: "9780399590504", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg", desc: "A woman's journey from survivalist home to Cambridge.", borrows: 11 },
  { id: 45, title: "Becoming", author: "Michelle Obama", cat: "Non-Fiction", year: 2018, lang: "English", isbn: "9781524763138", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg", desc: "The memoir of the former First Lady.", borrows: 14 },
  { id: 46, title: "The Hunger Games", author: "Suzanne Collins", cat: "Young Adult", year: 2008, lang: "English", isbn: "9780439023481", total: 4, avail: 4, coverUrl: "https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg", desc: "Teens fight to the death in a televised event.", borrows: 19 },
  { id: 47, title: "Divergent", author: "Veronica Roth", cat: "Young Adult", year: 2011, lang: "English", isbn: "9780062024022", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780062024022-L.jpg", desc: "A girl discovers she doesn't fit into any faction.", borrows: 9 },
  { id: 48, title: "The Perks of Being a Wallflower", author: "Stephen Chbosky", cat: "Young Adult", year: 1999, lang: "English", isbn: "9781451696196", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9781451696196-L.jpg", desc: "An introverted teen navigates high school.", borrows: 7 },
  { id: 49, title: "Wonder", author: "R.J. Palacio", cat: "Young Adult", year: 2012, lang: "English", isbn: "9780375869020", total: 3, avail: 3, coverUrl: "https://covers.openlibrary.org/b/isbn/9780375869020-L.jpg", desc: "A boy with a facial difference starts school.", borrows: 10 },
  { id: 50, title: "The Book Thief", author: "Markus Zusak", cat: "Young Adult", year: 2005, lang: "English", isbn: "9780375842207", total: 2, avail: 2, coverUrl: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg", desc: "A girl steals books during Nazi Germany, narrated by Death.", borrows: 13 }
];

const DEFAULT_CATEGORIES = ["Classic", "Science Fiction", "Fantasy", "Romance", "Mystery", "Non-Fiction", "Young Adult"];

/* =========================================================
   Data Access Layer
   ========================================================= */
function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("localStorage error:", e);
  }
}

function initData() {
  const storedVersion = localStorage.getItem(LS_KEYS.VERSION);

  if (storedVersion !== DATA_VERSION) {
    lsSet(LS_KEYS.BOOKS, DEFAULT_BOOKS);
    localStorage.setItem(LS_KEYS.VERSION, DATA_VERSION);
  }

  if (!localStorage.getItem(LS_KEYS.USERS))      lsSet(LS_KEYS.USERS, DEFAULT_USERS);
  if (!localStorage.getItem(LS_KEYS.BOOKS))      lsSet(LS_KEYS.BOOKS, DEFAULT_BOOKS);
  if (!localStorage.getItem(LS_KEYS.LOANS))      lsSet(LS_KEYS.LOANS, []);
  if (!localStorage.getItem(LS_KEYS.READING_LIST)) lsSet(LS_KEYS.READING_LIST, {});
  if (!localStorage.getItem(LS_KEYS.NOTIFICATIONS)) lsSet(LS_KEYS.NOTIFICATIONS, {});
  if (!localStorage.getItem(LS_KEYS.REVIEWS))    lsSet(LS_KEYS.REVIEWS, []);
  if (!localStorage.getItem(LS_KEYS.ACTIVITY))   lsSet(LS_KEYS.ACTIVITY, []);
}

/* =========================================================
   Utility Functions
   ========================================================= */
function today() { return new Date().toISOString().slice(0, 10); }

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function nowISO() { return new Date().toISOString(); }

function nextId(arr) { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; }

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[c]);
}

function generateTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < 10; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

/* =========================================================
   Activity Log
   ========================================================= */
function logActivity(type, message) {
  const activity = lsGet(LS_KEYS.ACTIVITY, []);
  activity.unshift({ id: nextId(activity), type, message, date: nowISO() });
  if (activity.length > 200) activity.length = 200;
  lsSet(LS_KEYS.ACTIVITY, activity);
}

/* =========================================================
   API Simulation Layer
   ========================================================= */
async function api(file, action, opts) {
  opts = opts || {};
  await new Promise(r => setTimeout(r, 30));

  try {
    switch (file) {
      case "auth":           return handleAuth(action, opts);
      case "books":          return handleBooks(action, opts);
      case "loans":          return handleLoans(action, opts);
      case "reading_list":   return handleReadingList(action, opts);
      case "notifications":  return handleNotifications(action, opts);
      case "reviews":        return handleReviews(action, opts);
      case "profile":        return handleProfile(action, opts);
      case "admin":          return handleAdmin(action, opts);
      default: return { ok: false, error: "Unknown API endpoint: " + file };
    }
  } catch (e) {
    console.error("API error:", e);
    return { ok: false, error: e.message || "An error occurred." };
  }
}

/* =========================================================
   Auth Handler
   ========================================================= */
function handleAuth(action, opts) {
  const body = opts.body || {};

  if (action === "me") {
    const session = lsGet(LS_KEYS.SESSION, null);
    if (!session) return { ok: false, error: "Not signed in." };
    const users = lsGet(LS_KEYS.USERS, []);
    const user = users.find(u => u.id === session.userId);
    if (!user) return { ok: false, error: "User not found." };
    return { ok: true, user: safeUser(user) };
  }

  if (action === "login") {
    const users = lsGet(LS_KEYS.USERS, []);
    const user = users.find(u =>
      (u.email === body.email || u.phone === body.email) && u.password === body.password
    );
    if (!user) return { ok: false, error: "Invalid credentials." };
    if (user.status === "disabled") return { ok: false, error: "Account is disabled." };
    if (user.role !== body.role) return { ok: false, error: "Invalid role for this account." };

    lsSet(LS_KEYS.SESSION, { userId: user.id, role: user.role });
    return { ok: true, user: safeUser(user) };
  }

  if (action === "register") {
    const users = lsGet(LS_KEYS.USERS, []);
    if (users.some(u => u.email === body.email)) {
      return { ok: false, error: "Email already registered." };
    }
    const newUser = {
      id: nextId(users), name: body.name, email: body.email, phone: body.phone,
      password: body.password, role: "reader", status: "active", createdAt: today()
    };
    users.push(newUser);
    lsSet(LS_KEYS.USERS, users);
    lsSet(LS_KEYS.SESSION, { userId: newUser.id, role: "reader" });
    logActivity("create", "New reader registered: " + body.name);
    return { ok: true, user: safeUser(newUser) };
  }

  if (action === "logout") {
    localStorage.removeItem(LS_KEYS.SESSION);
    return { ok: true };
  }

  return { ok: false, error: "Unknown auth action." };
}

function safeUser(u) {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role, status: u.status };
}

/* =========================================================
   Books Handler
   ========================================================= */
function handleBooks(action, opts) {
  const body = opts.body || {};
  const query = opts.query || {};
  let books = lsGet(LS_KEYS.BOOKS, []);

  if (action === "list") return { ok: true, books };

  if (action === "categories") {
    const cats = [...new Set(books.map(b => b.cat))].sort();
    return { ok: true, categories: cats };
  }

  if (action === "similar") {
    const bookId = Number(query.id);
    const book = books.find(b => b.id === bookId);
    if (!book) return { ok: true, books: [] };
    const similar = books.filter(b => b.id !== bookId && b.cat === book.cat).slice(0, 4);
    return { ok: true, books: similar };
  }

  if (action === "create") {
    const user = getSessionUser();
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const newBook = {
      id: nextId(books), title: body.title, author: body.author, cat: body.cat,
      year: body.year, lang: body.lang || "English", isbn: body.isbn || "",
      total: body.total || 1, avail: body.total || 1, coverUrl: body.coverUrl || "",
      desc: body.desc || "", borrows: 0
    };
    books.push(newBook);
    lsSet(LS_KEYS.BOOKS, books);
    logActivity("create", "Book added: " + body.title);
    return { ok: true, book: newBook };
  }

  if (action === "update") {
    const user = getSessionUser();
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const idx = books.findIndex(b => b.id === body.id);
    if (idx === -1) return { ok: false, error: "Book not found." };
    const oldBook = books[idx];
    const diff = (body.total || oldBook.total) - oldBook.total;
    books[idx] = {
      ...oldBook, title: body.title, author: body.author, cat: body.cat, year: body.year,
      lang: body.lang, isbn: body.isbn, total: body.total,
      avail: Math.max(0, oldBook.avail + diff),
      coverUrl: body.coverUrl,
      desc: body.desc !== undefined ? body.desc : oldBook.desc
    };
    lsSet(LS_KEYS.BOOKS, books);
    logActivity("update", "Book updated: " + body.title);
    return { ok: true, book: books[idx] };
  }

  if (action === "delete") {
    const user = getSessionUser();
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const book = books.find(b => b.id === body.id);
    if (!book) return { ok: false, error: "Book not found." };
    books = books.filter(b => b.id !== body.id);
    lsSet(LS_KEYS.BOOKS, books);
    logActivity("delete", "Book deleted: " + book.title);
    return { ok: true };
  }

  return { ok: false, error: "Unknown books action." };
}

/* =========================================================
   Loans Handler
   ========================================================= */
function handleLoans(action, opts) {
  const body = opts.body || {};
  const query = opts.query || {};
  let loans = lsGet(LS_KEYS.LOANS, []);
  let books = lsGet(LS_KEYS.BOOKS, []);
  const user = getSessionUser();

  if (action === "my") {
    if (!user) return { ok: false, error: "Not signed in." };
    const myLoans = loans.filter(l => l.userEmail === user.email);
    return { ok: true, loans: enrichLoans(myLoans, books) };
  }

  if (action === "list") {
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    return { ok: true, loans: enrichLoans(loans, books) };
  }

  if (action === "reserve") {
    if (!user) return { ok: false, error: "Not signed in." };
    if (user.role !== "reader") return { ok: false, error: "Only readers can reserve." };

    const bookId = Number(body.bookId);
    const book = books.find(b => b.id === bookId);
    if (!book) return { ok: false, error: "Book not found." };
    if (book.avail <= 0) return { ok: false, error: "Book unavailable." };

    const existing = loans.find(l =>
      l.bookId === bookId && l.userEmail === user.email &&
      (l.status === "pending" || l.status === "on-loan")
    );
    if (existing) return { ok: false, error: "You already have this book reserved or on loan." };

    const newLoan = {
      id: nextId(loans), bookId, userEmail: user.email, userName: user.name,
      userPhone: user.phone, status: "pending", requestedOn: today(),
      pickupDeadline: addDays(today(), PICKUP_DEADLINE_DAYS),
      pickedUpOn: null, dueOn: null, returnedOn: null, cancelledOn: null, expiredOn: null
    };
    loans.push(newLoan);

    const bookIdx = books.findIndex(b => b.id === bookId);
    books[bookIdx].avail--;
    lsSet(LS_KEYS.BOOKS, books);
    lsSet(LS_KEYS.LOANS, loans);

    addNotification(user.email, 'Reservation confirmed for "' + book.title + '". Pick up before ' + newLoan.pickupDeadline + '.');
    logActivity("create", user.name + ' reserved "' + book.title + '"');
    return { ok: true, pickupDeadline: newLoan.pickupDeadline };
  }

  if (action === "cancel") {
    if (!user) return { ok: false, error: "Not signed in." };
    const loanId = Number(body.loanId);
    const idx = loans.findIndex(l => l.id === loanId && l.userEmail === user.email && l.status === "pending");
    if (idx === -1) return { ok: false, error: "Loan not found." };

    const loan = loans[idx];
    const book = books.find(b => b.id === loan.bookId);
    loan.status = "cancelled";
    loan.cancelledOn = today();

    if (book) {
      const bookIdx = books.findIndex(b => b.id === loan.bookId);
      books[bookIdx].avail++;
      lsSet(LS_KEYS.BOOKS, books);
    }
    lsSet(LS_KEYS.LOANS, loans);
    logActivity("cancel", user.name + ' cancelled reservation for "' + (book ? book.title : "book") + '"');
    return { ok: true };
  }

  if (action === "cancel_pending") {
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const loanId = Number(body.loanId);
    const idx = loans.findIndex(l => l.id === loanId && l.status === "pending");
    if (idx === -1) return { ok: false, error: "Loan not found." };
    const loan = loans[idx];
    const book = books.find(b => b.id === loan.bookId);
    loan.status = "cancelled";
    loan.cancelledOn = today();
    if (book) {
      const bookIdx = books.findIndex(b => b.id === loan.bookId);
      books[bookIdx].avail++;
      lsSet(LS_KEYS.BOOKS, books);
    }
    lsSet(LS_KEYS.LOANS, loans);
    logActivity("cancel", 'Reservation cancelled for "' + (book ? book.title : "book") + '"');
    return { ok: true };
  }

  if (action === "confirm_pickup") {
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const loanId = Number(body.loanId);
    const loan = loans.find(l => l.id === loanId && l.status === "pending");
    if (!loan) return { ok: false, error: "Loan not found." };
    loan.status = "on-loan";
    loan.pickedUpOn = today();
    loan.dueOn = addDays(today(), LOAN_DURATION_DAYS);
    lsSet(LS_KEYS.LOANS, loans);
    const book = books.find(b => b.id === loan.bookId);
    addNotification(loan.userEmail, '"' + (book ? book.title : "Book") + '" picked up. Due on ' + loan.dueOn + '.');
    logActivity("pickup", 'Pickup confirmed for "' + (book ? book.title : "book") + '"');
    return { ok: true };
  }

  if (action === "return") {
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const loanId = Number(body.loanId);
    const loan = loans.find(l => l.id === loanId && l.status === "on-loan");
    if (!loan) return { ok: false, error: "Loan not found." };
    loan.status = "returned";
    loan.returnedOn = today();
    const bookIdx = books.findIndex(b => b.id === loan.bookId);
    if (bookIdx !== -1) {
      books[bookIdx].avail++;
      books[bookIdx].borrows = (books[bookIdx].borrows || 0) + 1;
      lsSet(LS_KEYS.BOOKS, books);
    }
    lsSet(LS_KEYS.LOANS, loans);
    const book = books.find(b => b.id === loan.bookId);
    addNotification(loan.userEmail, '"' + (book ? book.title : "Book") + '" returned. Thank you!');
    logActivity("return", 'Return confirmed for "' + (book ? book.title : "book") + '"');
    return { ok: true };
  }

  if (action === "desk") {
    if (!user || (user.role !== "librarian" && user.role !== "admin")) {
      return { ok: false, error: "Unauthorized." };
    }
    const bookId = Number(body.bookId);
    const book = books.find(b => b.id === bookId);
    if (!book) return { ok: false, error: "Book not found." };
    if (book.avail <= 0) return { ok: false, error: "Book unavailable." };
    const newLoan = {
      id: nextId(loans), bookId, userEmail: body.email || "", userName: body.name,
      userPhone: body.phone, status: "on-loan", requestedOn: today(),
      pickupDeadline: null, pickedUpOn: today(),
      dueOn: addDays(today(), LOAN_DURATION_DAYS),
      returnedOn: null, cancelledOn: null, expiredOn: null
    };
    loans.push(newLoan);
    const bookIdx = books.findIndex(b => b.id === bookId);
    books[bookIdx].avail--;
    lsSet(LS_KEYS.BOOKS, books);
    lsSet(LS_KEYS.LOANS, loans);
    logActivity("create", 'Desk loan created for "' + book.title + '" to ' + body.name);
    return { ok: true };
  }

  return { ok: false, error: "Unknown loans action." };
}

function enrichLoans(loans, books) {
  return loans.map(l => {
    const book = books.find(b => b.id === l.bookId);
    return { ...l, title: book ? book.title : "Unknown", author: book ? book.author : "" };
  });
}

/* =========================================================
   Reading List Handler
   ========================================================= */
function handleReadingList(action, opts) {
  const body = opts.body || {};
  const user = getSessionUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const lists = lsGet(LS_KEYS.READING_LIST, {});
  const ids = lists[user.email] || [];

  if (action === "list") return { ok: true, ids };

  if (action === "add") {
    const bookId = Number(body.bookId);
    if (!ids.includes(bookId)) {
      ids.push(bookId);
      lists[user.email] = ids;
      lsSet(LS_KEYS.READING_LIST, lists);
    }
    return { ok: true, ids };
  }

  if (action === "remove") {
    const bookId = Number(body.bookId);
    const newIds = ids.filter(id => id !== bookId);
    lists[user.email] = newIds;
    lsSet(LS_KEYS.READING_LIST, lists);
    return { ok: true, ids: newIds };
  }

  if (action === "clear") {
    lists[user.email] = [];
    lsSet(LS_KEYS.READING_LIST, lists);
    return { ok: true, ids: [] };
  }

  return { ok: false, error: "Unknown reading_list action." };
}

/* =========================================================
   Notifications Handler
   ========================================================= */
function handleNotifications(action, opts) {
  const body = opts.body || {};
  const user = getSessionUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const allNotifs = lsGet(LS_KEYS.NOTIFICATIONS, {});
  const userNotifs = allNotifs[user.email] || [];

  if (action === "list") {
    return { ok: true, notifications: userNotifs, unread: userNotifs.filter(n => !n.isRead).length };
  }

  if (action === "mark_read") {
    userNotifs.forEach(n => n.isRead = true);
    allNotifs[user.email] = userNotifs;
    lsSet(LS_KEYS.NOTIFICATIONS, allNotifs);
    return { ok: true };
  }

  if (action === "hide") {
    const id = Number(body.id);
    allNotifs[user.email] = userNotifs.filter(n => n.id !== id);
    lsSet(LS_KEYS.NOTIFICATIONS, allNotifs);
    return { ok: true };
  }

  return { ok: false, error: "Unknown notifications action." };
}

function addNotification(email, message) {
  if (!email) return;
  const allNotifs = lsGet(LS_KEYS.NOTIFICATIONS, {});
  const userNotifs = allNotifs[email] || [];
  userNotifs.unshift({ id: nextId(userNotifs), message, isRead: false, createdAt: nowISO() });
  if (userNotifs.length > 50) userNotifs.length = 50;
  allNotifs[email] = userNotifs;
  lsSet(LS_KEYS.NOTIFICATIONS, allNotifs);
}

/* =========================================================
   Reviews Handler
   ========================================================= */
function handleReviews(action, opts) {
  const body = opts.body || {};
  const query = opts.query || {};
  const user = getSessionUser();
  let reviews = lsGet(LS_KEYS.REVIEWS, []);
  const loans = lsGet(LS_KEYS.LOANS, []);

  if (action === "list") {
    const bookId = Number(query.bookId);
    const bookReviews = reviews.filter(r => r.bookId === bookId);
    const avg = bookReviews.length
      ? (bookReviews.reduce((s, r) => s + r.rating, 0) / bookReviews.length).toFixed(1)
      : 0;
    return {
      ok: true,
      reviews: bookReviews.map(r => ({ ...r, userName: r.userName || "Anonymous" })),
      average: avg,
      count: bookReviews.length
    };
  }

  if (action === "create") {
    if (!user) return { ok: false, error: "Not signed in." };
    const bookId = Number(body.bookId);
    const hasReturned = loans.some(l =>
      l.bookId === bookId && l.userEmail === user.email && l.status === "returned"
    );
    if (!hasReturned) return { ok: false, error: "You must return the book before reviewing." };
    const already = reviews.find(r => r.bookId === bookId && r.userId === user.id);
    if (already) return { ok: false, error: "You already reviewed this book." };
    const newReview = {
      id: nextId(reviews), bookId, userId: user.id, userName: user.name,
      rating: Number(body.rating), comment: body.comment || "", createdAt: today()
    };
    reviews.push(newReview);
    lsSet(LS_KEYS.REVIEWS, reviews);
    return { ok: true, review: newReview };
  }

  if (action === "delete_own") {
    if (!user) return { ok: false, error: "Not signed in." };
    const id = Number(body.id);
    reviews = reviews.filter(r => !(r.id === id && r.userId === user.id));
    lsSet(LS_KEYS.REVIEWS, reviews);
    return { ok: true };
  }

  return { ok: false, error: "Unknown reviews action." };
}

/* =========================================================
   Profile Handler
   ========================================================= */
function handleProfile(action, opts) {
  const body = opts.body || {};
  const user = getSessionUser();
  if (!user) return { ok: false, error: "Not signed in." };

  let users = lsGet(LS_KEYS.USERS, []);
  const userIdx = users.findIndex(u => u.id === user.id);
  if (userIdx === -1) return { ok: false, error: "User not found." };

  if (action === "get") {
    const loans = lsGet(LS_KEYS.LOANS, []);
    const reviews = lsGet(LS_KEYS.REVIEWS, []);
    const myLoans = loans.filter(l => l.userEmail === user.email);
    const myReviews = reviews.filter(r => r.userId === user.id);
    return {
      ok: true,
      stats: {
        totalLoans: myLoans.length,
        activeLoans: myLoans.filter(l => l.status === "on-loan" || l.status === "pending").length,
        totalReviews: myReviews.length
      }
    };
  }

  if (action === "update") {
    users[userIdx].name = body.name;
    users[userIdx].phone = body.phone;
    lsSet(LS_KEYS.USERS, users);
    return { ok: true, user: safeUser(users[userIdx]) };
  }

  if (action === "change_password") {
    if (users[userIdx].password !== body.old_password) {
      return { ok: false, error: "Current password is incorrect." };
    }
    if (body.new_password.length < 8) {
      return { ok: false, error: "New password must be at least 8 characters." };
    }
    if (body.new_password !== body.new_password2) {
      return { ok: false, error: "Passwords do not match." };
    }
    users[userIdx].password = body.new_password;
    lsSet(LS_KEYS.USERS, users);
    return { ok: true };
  }

  return { ok: false, error: "Unknown profile action." };
}

/* =========================================================
   Admin Handler
   ========================================================= */
function handleAdmin(action, opts) {
  const body = opts.body || {};
  const user = getSessionUser();
  if (!user || user.role !== "admin") return { ok: false, error: "Admin access required." };

  let users = lsGet(LS_KEYS.USERS, []);
  let activity = lsGet(LS_KEYS.ACTIVITY, []);

  if (action === "list") {
    const librarians = users.filter(u => u.role === "librarian").map(safeUser);
    const stats = {
      total: librarians.length,
      active: librarians.filter(l => l.status === "active").length,
      disabled: librarians.filter(l => l.status === "disabled").length
    };
    return { ok: true, librarians, activity, stats };
  }

  if (action === "create") {
    if (users.some(u => u.email === body.email)) return { ok: false, error: "Email already in use." };
    const tempPassword = body.password || generateTempPassword();
    const newUser = {
      id: nextId(users), name: body.name, email: body.email, phone: body.phone || "",
      password: tempPassword, role: "librarian", status: "active", createdAt: today()
    };
    users.push(newUser);
    lsSet(LS_KEYS.USERS, users);
    logActivity("create", "Librarian created: " + body.name);
    return { ok: true, tempPassword: body.password ? null : tempPassword };
  }

  if (action === "update") {
    const idx = users.findIndex(u => u.id === body.id && u.role === "librarian");
    if (idx === -1) return { ok: false, error: "Librarian not found." };
    if (body.email !== users[idx].email && users.some(u => u.email === body.email)) {
      return { ok: false, error: "Email already in use." };
    }
    users[idx].name = body.name;
    users[idx].email = body.email;
    users[idx].phone = body.phone || "";
    if (body.password) users[idx].password = body.password;
    lsSet(LS_KEYS.USERS, users);
    logActivity("update", "Librarian updated: " + body.name);
    return { ok: true };
  }

  if (action === "set_status") {
    const idx = users.findIndex(u => u.id === body.id && u.role === "librarian");
    if (idx === -1) return { ok: false, error: "Librarian not found." };
    users[idx].status = body.status;
    lsSet(LS_KEYS.USERS, users);
    logActivity(body.status === "disabled" ? "disable" : "enable",
      "Librarian " + (body.status === "disabled" ? "disabled" : "enabled") + ": " + users[idx].name);
    return { ok: true };
  }

  return { ok: false, error: "Unknown admin action." };
}

/* =========================================================
   Session Helpers
   ========================================================= */
function getSessionUser() {
  const session = lsGet(LS_KEYS.SESSION, null);
  if (!session) return null;
  const users = lsGet(LS_KEYS.USERS, []);
  return users.find(u => u.id === session.userId) || null;
}

/* =========================================================
   State & Public API
   ========================================================= */
const STATE = { user: null, books: [], categories: [], loans: [], notifs: [], unread: 0 };
let borrowed = [];

async function loadSession() {
  const r = await api("auth", "me");
  STATE.user = r.ok ? r.user : null;
}

async function fetchBooks() {
  const r = await api("books", "list");
  if (r.ok) STATE.books = r.books;
}

async function fetchCategories() {
  const r = await api("books", "categories");
  if (r.ok) STATE.categories = r.categories;
}

async function fetchLoans() {
  const u = STATE.user;
  let r = null;
  if (u && u.role === "reader")         r = await api("loans", "my");
  else if (u && u.role === "librarian") r = await api("loans", "list");
  STATE.loans = r && r.ok ? r.loans : [];
}

async function fetchReadingList() {
  const u = STATE.user;
  if (u && u.role === "reader") {
    const r = await api("reading_list", "list");
    borrowed = r.ok ? r.ids.map(Number) : [];
  } else {
    borrowed = [];
  }
}

async function fetchNotifications() {
  if (!STATE.user || STATE.user.role === "admin") {
    STATE.notifs = [];
    STATE.unread = 0;
    return;
  }
  const r = await api("notifications", "list");
  STATE.notifs = r.ok ? r.notifications : [];
  STATE.unread = r.ok ? r.unread : 0;
}

async function refreshData() {
  await fetchBooks();
  await fetchLoans();
  await fetchReadingList();
  await fetchNotifications();
  updateNotifUI();
}

function getAllBooks() { return STATE.books; }
function getCategories() { return STATE.categories; }

async function saveBook(data, id) {
  const body = id ? Object.assign({ id: Number(id) }, data) : data;
  const r = await api("books", id ? "update" : "create", { body });
  if (!r.ok) return { ok: false, msg: r.error };
  await refreshData();
  return { ok: true, book: r.book };
}

async function deleteBook(id) {
  const r = await api("books", "delete", { body: { id: Number(id) } });
  if (!r.ok) return { ok: false, msg: r.error };
  await refreshData();
  return { ok: true };
}

function loadLoans() { return STATE.loans; }

function getOverdueLoans() {
  const loans = loadLoans();
  const today = new Date();
  return loans.filter(l => l.status === "on-loan" && l.dueOn && new Date(l.dueOn) < today);
}

function hasOverdueLoan(email) {
  const loans = loadLoans();
  const today = new Date();
  return loans.some(l =>
    l.status === "on-loan" && l.dueOn && new Date(l.dueOn) < today &&
    (!email || l.userEmail === email)
  );
}

function getLoanStatus(loan) {
  if (loan.status === "cancelled") return { key: "cancelled", label: "Cancelled", cls: "warn" };
  if (loan.status === "expired")   return { key: "expired",   label: "Expired",   cls: "warn" };
  if (loan.status === "returned")  return { key: "returned",  label: "Returned",  cls: "ok" };
  if (loan.status === "pending")   return { key: "pending",   label: "Pending pickup", cls: "wait" };
  if (loan.status === "on-loan") {
    const today = new Date();
    const due = new Date(loan.dueOn);
    const days = Math.ceil((due - today) / (1000 * 3600 * 24));
    if (days < 0)  return { key: "overdue",  label: "Overdue (" + Math.abs(days) + "d)", cls: "warn" };
    if (days <= 7) return { key: "due-soon", label: "Due in " + days + "d", cls: "warn" };
    return { key: "active", label: "On loan", cls: "ok" };
  }
  return { key: "unknown", label: "—", cls: "" };
}

function getNotifications() { return STATE.notifs; }
function hasUnreadNotifications() { return STATE.unread > 0; }

function markNotificationsRead() {
  if (!STATE.user || STATE.unread === 0) return;
  STATE.unread = 0;
  STATE.notifs.forEach(n => { n.isRead = true; });
  api("notifications", "mark_read", { body: {} });
}

function hideNotification(id) {
  id = Number(id);
  STATE.notifs = STATE.notifs.filter(n => n.id !== id);
  STATE.unread = STATE.notifs.filter(n => !n.isRead).length;
  api("notifications", "hide", { body: { id } });
}

function notifItemsHTML() {
  const list = getNotifications();
  if (!list.length) return '<p>No notifications.</p>';
  return list.map(n =>
    '<div class="notif-item">' +
      '<p>' + escapeHtml(n.message) + '</p>' +
      '<button type="button" class="notif-remove" data-remove-notif="' + n.id + '" aria-label="Remove">×</button>' +
    '</div>'
  ).join("");
}

function updateNotifUI() {
  const dd = document.getElementById("notifDd");
  if (dd) dd.innerHTML = notifItemsHTML();
  const dot = document.getElementById("notifDot");
  if (dot) {
    dot.textContent = STATE.unread;
    dot.style.display = STATE.unread > 0 ? "grid" : "none";
  }
}

/* ✅ CORS FIX: Added referrerpolicy="no-referrer" so images load on GitHub Pages */
function coverMarkup(b) {
  const fb = b.coverUrl
    ? '<img src="' + escapeHtml(b.coverUrl) + '" alt="Cover of ' + escapeHtml(b.title) +
      '" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
      '<div class="cover-fallback v' + (b.id % 6) + '" style="display:none">' +
        '<strong>' + escapeHtml(b.title) + '</strong><small>' + escapeHtml(b.author) + '</small>' +
      '</div>'
    : '<div class="cover-fallback v' + (b.id % 6) + '">' +
        '<strong>' + escapeHtml(b.title) + '</strong><small>' + escapeHtml(b.author) + '</small>' +
      '</div>';
  return '<div class="cover-wrap"><div class="book-cover-photo">' + fb + '</div></div>';
}

function statusLabel(b) {
  if (b.avail > 0) return { cls: "is-available", text: "Available" };
  if (b.total > 0) return { cls: "is-borrowed", text: "On loan" };
  return { cls: "is-borrowed", text: "Unavailable" };
}

function getUser() { return STATE.user; }

async function signIn(email, password, role) {
  const r = await api("auth", "login", { body: { email, password, role } });
  if (r.ok) STATE.user = r.user;
  return r;
}

async function signUp(name, email, phone, password, password2) {
  const r = await api("auth", "register", { body: { name, email, phone, password, password2 } });
  if (r.ok) STATE.user = r.user;
  return r;
}

async function logout() {
  const ok = await customConfirm("Sign out", "Are you sure you want to sign out?");
  if (!ok) return;
  await api("auth", "logout", { body: {} });
  STATE.user = null;
  showToast("You have been signed out.");
  setTimeout(() => location.href = "index.html", 500);
}

function requireAuth() {
  if (!getUser()) {
    location.href = "auth.html?next=" + encodeURIComponent(location.pathname + location.search);
    return false;
  }
  return true;
}

function requireLibrarian() {
  const u = getUser();
  if (!u || u.role !== "librarian") {
    showToast("Librarian access only.");
    setTimeout(() => location.href = "auth.html", 700);
    return false;
  }
  return true;
}

function requireAdmin() {
  const u = getUser();
  if (!u || u.role !== "admin") {
    showToast("Admin access only.");
    setTimeout(() => location.href = "auth.html", 700);
    return false;
  }
  return true;
}

function canBorrowForSelf() {
  const user = getUser();
  if (!user) return { ok: false, msg: "Sign in to borrow books." };
  if (user.role === "librarian" || user.role === "admin") {
    return { ok: false, msg: "Staff accounts cannot borrow books. Please use a reader account." };
  }
  return { ok: true };
}

let _toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* =========================================================
   Custom Confirm / Alert Dialogs
   ========================================================= */
let _ccBusy = false;
function customConfirm(title, message) {
  return new Promise(resolve => {
    if (_ccBusy) { resolve(false); return; }
    _ccBusy = true;
    let dlg = document.getElementById("customConfirm");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "customConfirm";
      dlg.className = "confirm-dialog";
      dlg.style.cssText =
        "border:1px solid #e4cfb9;border-radius:18px;padding:26px 28px;" +
        "width:min(440px, calc(100% - 32px));background:#fff8ef;" +
        "color:#3b261b;box-shadow:0 25px 80px rgba(36,32,25,.28);" +
        "font-family:'Inter','DM Sans',system-ui,sans-serif;";
      dlg.innerHTML =
        '<h2 id="ccTitle" style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:1.35rem;font-weight:600;margin:0 0 .7rem;color:#35251E;line-height:1.2;">Confirm</h2>' +
        '<p id="ccMsg" style="font-size:.92rem;color:#604735;line-height:1.6;margin:0 0 1.5rem;white-space:pre-line;">Message</p>' +
        '<div class="cc-actions" style="display:flex;gap:.9rem;justify-content:flex-end;flex-wrap:wrap;align-items:center;">' +
          '<button type="button" id="ccNo" style="min-width:120px;padding:.7rem 1.4rem;border-radius:10px;font-family:Inter,system-ui,sans-serif;font-size:.85rem;font-weight:600;background:#fff;color:#75452e;border:1px solid #d8bda4;cursor:pointer;line-height:1.2;">Cancel</button>' +
          '<button type="button" id="ccYes" style="min-width:120px;padding:.7rem 1.4rem;border-radius:10px;font-family:Inter,system-ui,sans-serif;font-size:.85rem;font-weight:600;background:#B88A5A;color:#fff;border:0;cursor:pointer;line-height:1.2;">Confirm</button>' +
        '</div>';
      document.body.appendChild(dlg);
    }
    const yes = dlg.querySelector("#ccYes");
    const no  = dlg.querySelector("#ccNo");
    const cleanup = (result) => {
      _ccBusy = false;
      if (dlg.open) dlg.close();
      resolve(result);
    };
    const newYes = yes.cloneNode(true);
    const newNo  = no.cloneNode(true);
    yes.replaceWith(newYes);
    no.replaceWith(newNo);
    newNo.addEventListener("mouseenter", () => { newNo.style.background = "#ead8c5"; });
    newNo.addEventListener("mouseleave", () => { newNo.style.background = "#fff"; });
    newYes.addEventListener("mouseenter", () => { newYes.style.background = "#75452e"; });
    newYes.addEventListener("mouseleave", () => { newYes.style.background = "#B88A5A"; });
    newYes.addEventListener("click", () => {
      newYes.disabled = true;
      newYes.textContent = "…";
      setTimeout(() => cleanup(true), 50);
    });
    newNo.addEventListener("click", () => cleanup(false));
    dlg.querySelector("#ccTitle").textContent = title || "Confirm";
    dlg.querySelector("#ccMsg").textContent = message || "";
    newYes.disabled = false;
    newYes.textContent = "Confirm";
    if (!dlg.open) dlg.showModal();
  });
}

let _caBusy = false;
function customAlert(title, message) {
  return new Promise(resolve => {
    if (_caBusy) { resolve(true); return; }
    _caBusy = true;
    let dlg = document.getElementById("customAlert");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "customAlert";
      dlg.className = "confirm-dialog";
      dlg.style.cssText =
        "border:1px solid #e4cfb9;border-radius:18px;padding:26px 28px;" +
        "width:min(440px, calc(100% - 32px));background:#fff8ef;" +
        "color:#3b261b;box-shadow:0 25px 80px rgba(36,32,25,.28);" +
        "font-family:'Inter','DM Sans',system-ui,sans-serif;";
      dlg.innerHTML =
        '<h2 id="caTitle" style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:1.35rem;font-weight:600;margin:0 0 .7rem;color:#35251E;line-height:1.2;">Info</h2>' +
        '<p id="caMsg" style="font-size:.92rem;color:#604735;line-height:1.6;margin:0 0 1.5rem;white-space:pre-line;">Message</p>' +
        '<div class="cc-actions" style="display:flex;gap:.9rem;justify-content:flex-end;flex-wrap:wrap;align-items:center;">' +
          '<button type="button" id="caOk" style="min-width:120px;padding:.7rem 1.4rem;border-radius:10px;font-family:Inter,system-ui,sans-serif;font-size:.85rem;font-weight:600;background:#B88A5A;color:#fff;border:0;cursor:pointer;line-height:1.2;">OK</button>' +
        '</div>';
      document.body.appendChild(dlg);
    }
    const ok = dlg.querySelector("#caOk");
    const newOk = ok.cloneNode(true);
    ok.replaceWith(newOk);
    newOk.addEventListener("mouseenter", () => { newOk.style.background = "#75452e"; });
    newOk.addEventListener("mouseleave", () => { newOk.style.background = "#B88A5A"; });
    newOk.addEventListener("click", () => {
      _caBusy = false;
      if (dlg.open) dlg.close();
      resolve(true);
    });
    dlg.querySelector("#caTitle").textContent = title || "Info";
    dlg.querySelector("#caMsg").textContent = message || "";
    if (!dlg.open) dlg.showModal();
  });
}

function enablePasswordToggles() {
  document.querySelectorAll(".pw-wrap").forEach(wrap => {
    if (wrap.querySelector(".eye")) return;
    const input = wrap.querySelector("input");
    if (!input) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "eye";
    btn.setAttribute("aria-label", "Show password");
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>' +
        '<circle cx="12" cy="12" r="3"/>' +
      '</svg>';
    btn.addEventListener("click", () => {
      input.type = input.type === "password" ? "text" : "password";
    });
    wrap.appendChild(btn);
  });
}

function logoSVG() {
  return '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<rect x="2" y="2" width="44" height="44" rx="10" fill="#35251E"/>' +
    '<path d="M12 12h9c2 0 3 1 3 3v20c0-2-1-3-3-3h-9V12z" fill="#DCC8AD"/>' +
    '<path d="M36 12h-9c-2 0-3 1-3 3v20c0-2 1-3 3-3h9V12z" fill="#B88A5A"/>' +
    '<path d="M24 15v20" stroke="#35251E" stroke-width="1.2"/>' +
  '</svg>';
}

/* =========================================================
   Header
   ========================================================= */
function mountHeader() {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  const user = getUser();
  const showDot = user && user.role === "reader" ? hasUnreadNotifications() : false;
  const showNotif = user && user.role === "reader";

  let menuLinks = '';
  if (user && user.role === "reader") {
    menuLinks =
      '<a href="dashboard.html">👤 My space</a>' +
      '<a href="reading-list.html">♡ Reading list</a>' +
      '<a href="profile.html">⚙ My profile</a>';
  } else if (user && user.role === "librarian") {
    menuLinks = '<a href="librarian.html">📚 Librarian area</a>';
  } else if (user && user.role === "admin") {
    menuLinks = '<a href="admin.html">⚙ Admin panel</a>';
  }

  const authZone = user ? (
    '<div class="user-menu">' +
      '<button class="user-btn" id="userBtn" aria-haspopup="true" aria-expanded="false">' +
        '<span class="avatar">' + escapeHtml((user.name || user.email || "?").trim().charAt(0).toUpperCase()) + '</span>' +
        '<span>' + escapeHtml((user.name || user.email || "User").split(" ")[0]) + '</span>' +
      '</button>' +
      '<div class="dropdown" id="userDd">' +
        '<div class="who"><b>' + escapeHtml(user.name || "User") + '</b>' + escapeHtml(user.email || "") + '</div>' +
        menuLinks +
        '<hr>' +
        '<button type="button" id="logoutBtn">↩ Sign out</button>' +
      '</div>' +
    '</div>'
  ) : (
    '<div class="hdr-auth">' +
      '<a class="btn ghost sm" href="auth.html?mode=signin">Sign in</a>' +
      '<a class="btn caramel sm" href="auth.html?mode=signup">Sign up</a>' +
    '</div>'
  );

  const notifBtnHTML = showNotif ? (
    '<div class="user-menu">' +
      '<button class="icon-btn" id="notifBtn" aria-label="Notifications" aria-haspopup="true" aria-expanded="false">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>' +
        '<span class="dot" id="notifDot" style="display:' + (showDot ? 'grid' : 'none') + '">' + STATE.unread + '</span>' +
      '</button>' +
      '<div class="notif-menu" id="notifDd">' + notifItemsHTML() + '</div>' +
    '</div>'
  ) : '';

  const homeHref = user && user.role === "admin" ? "admin.html"
    : user && user.role === "librarian" ? "librarian.html"
    : "index.html";

  headerEl.innerHTML =
    '<header class="site-header"><div class="hdr" id="hdr">' +
      '<a class="brand" href="' + homeHref + '" aria-label="Lumen Library home">' +
        logoSVG() +
        '<span class="brand-text"><b>Lumen</b><span>Library</span></span>' +
      '</a>' +
      '<button class="burger" aria-label="Menu" aria-expanded="false" id="burger"><span></span><span></span><span></span></button>' +
      '<div class="hdr-actions">' + notifBtnHTML + authZone + '</div>' +
    '</div></header>';

  const burger = document.getElementById("burger");
  const hdr = document.getElementById("hdr");
  if (burger && hdr) {
    burger.addEventListener("click", () => {
      const open = hdr.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const closeAll = () => document.querySelectorAll(".dropdown.open, .notif-menu.open")
    .forEach(d => d.classList.remove("open"));

  const notifBtn = document.getElementById("notifBtn");
  const notifDd = document.getElementById("notifDd");
  if (notifBtn && notifDd) {
    notifBtn.addEventListener("click", e => {
      e.stopPropagation();
      const open = !notifDd.classList.contains("open");
      closeAll();
      if (open) {
        notifDd.classList.add("open");
        setTimeout(() => {
          markNotificationsRead();
          const dot = document.getElementById("notifDot");
          if (dot) dot.style.display = "none";
        }, 600);
      }
    });
    notifDd.addEventListener("click", e => {
      const btn = e.target.closest("[data-remove-notif]");
      if (!btn) return;
      e.stopPropagation();
      hideNotification(btn.getAttribute("data-remove-notif"));
      updateNotifUI();
    });
  }

  const userBtn = document.getElementById("userBtn");
  const userDd = document.getElementById("userDd");
  if (userBtn && userDd) {
    userBtn.addEventListener("click", e => {
      e.stopPropagation();
      const open = !userDd.classList.contains("open");
      closeAll();
      if (open) userDd.classList.add("open");
    });
    const lb = document.getElementById("logoutBtn");
    if (lb) lb.addEventListener("click", logout);
  }

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
}

/* =========================================================
   Sidebar
   ========================================================= */
function buildSidebar() {
  const sb = document.getElementById("sidebar");
  if (!sb) return;
  const user = getUser();
  const page = location.pathname.split("/").pop() || "index.html";

  const svgBooks = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M8 7h9M8 11h9M8 15h5"/></svg>';
  const svgHeart = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  const svgUser = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
  const svgLib = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/></svg>';
  const svgAdmin = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
  const svgProfile = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
  const svgOut = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>';

  const link = (href, label, icon) =>
    '<a class="nav-link ' + (page === href ? "active" : "") + '" href="' + href + '">' +
      '<span class="nav-ico">' + icon + '</span><span>' + label + '</span>' +
    '</a>';

  let nav = '';
  if (!user) {
    nav = link("index.html", "Books", svgBooks);
  } else if (user.role === "reader") {
    nav =
      link("index.html", "Books", svgBooks) +
      link("reading-list.html", "My reading list", svgHeart) +
      link("dashboard.html", "My space", svgUser) +
      link("profile.html", "My profile", svgProfile);
  } else if (user.role === "librarian") {
    nav = link("librarian.html", "Librarian area", svgLib);
  } else if (user.role === "admin") {
    nav = link("admin.html", "Admin panel", svgAdmin);
  }

  sb.innerHTML =
    '<p class="side-label">Menu</p>' +
    '<nav class="nav" aria-label="Main navigation">' + nav + '</nav>' +
    '<div class="sidebar-bottom">' +
      (user ?
        '<div class="profile-mini">' +
          '<div class="avatar">' + escapeHtml((user.name || user.email || "?").trim().charAt(0).toUpperCase()) + '</div>' +
          '<div>' +
            '<strong>' + escapeHtml(user.name || user.email.split("@")[0]) + '</strong>' +
            '<small>' + (user.role === "librarian" ? "Librarian" : user.role === "admin" ? "Administrator" : "Reader") + '</small>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn ghost sm side-logout" id="sbLogout">' +
          '<span class="nav-ico" style="display:inline-grid;margin-right:6px">' + svgOut + '</span>Sign out' +
        '</button>' : '') +
    '</div>';

  const sbLogout = sb.querySelector("#sbLogout");
  if (sbLogout) sbLogout.addEventListener("click", logout);
}

/* =========================================================
   Reading list
   ========================================================= */
async function toggleWishlist(id) {
  const user = getUser();
  const check = canBorrowForSelf();
  if (!check.ok) {
    showToast(check.msg);
    if (!user) setTimeout(() => location.href = "auth.html?next=" + encodeURIComponent(location.pathname + location.search), 800);
    return;
  }
  const b = getAllBooks().find(x => x.id === Number(id));
  if (!b) return;
  const inList = borrowed.includes(b.id);
  const question = inList
    ? 'Remove "' + b.title + '" from your reading list?'
    : 'Add "' + b.title + '" to your reading list?';
  const ok = await customConfirm(inList ? "Remove from list" : "Add to list", question);
  if (!ok) return;
  const r = await api("reading_list", inList ? "remove" : "add", { body: { bookId: b.id } });
  if (!r.ok) { showToast(r.error); return; }
  borrowed = r.ids.map(Number);
  showToast(inList ? "Removed from your reading list." : "Added to your reading list.");
  renderBorrowed();
  refreshAllBookGrids();
}

async function removeFromWishlist(id) {
  const b = getAllBooks().find(x => x.id === Number(id));
  if (b) {
    const ok = await customConfirm("Remove", 'Remove "' + b.title + '" from your reading list?');
    if (!ok) return;
  }
  const r = await api("reading_list", "remove", { body: { bookId: Number(id) } });
  if (!r.ok) { showToast(r.error); return; }
  borrowed = r.ids.map(Number);
  renderBorrowed();
  refreshAllBookGrids();
  showToast("Removed from your reading list.");
}

/* =========================================================
   RESERVE
   ========================================================= */
async function reserveBook(id) {
  const user = getUser();
  const check = canBorrowForSelf();
  if (!check.ok) {
    showToast(check.msg);
    if (!user) setTimeout(() => location.href = "auth.html?next=" + encodeURIComponent(location.pathname + location.search), 800);
    return;
  }

  if (reserveBook._busy) return;
  reserveBook._busy = true;
  setTimeout(() => { reserveBook._busy = false; }, 2000);

  if (hasOverdueLoan(user.email)) {
    reserveBook._busy = false;
    showToast("You have an overdue book. Please return it before reserving another.");
    return;
  }

  const b = getAllBooks().find(x => x.id === Number(id));
  if (!b) { reserveBook._busy = false; return; }
  if (b.avail <= 0) { reserveBook._busy = false; showToast("This book is currently unavailable."); return; }

  const loans = loadLoans();
  if (loans.some(l => l.bookId === b.id && l.status === "pending" && l.userEmail === user.email)) {
    reserveBook._busy = false;
    showToast("You already have a pending reservation for this book.");
    return;
  }
  if (loans.some(l => l.bookId === b.id && l.status === "on-loan" && l.userEmail === user.email)) {
    reserveBook._busy = false;
    showToast("You already have this book on loan.");
    return;
  }

  const ok = await customConfirm("Reserve this book", 'Reserve "' + b.title + '"?\nYou will have ' + PICKUP_DEADLINE_DAYS + ' days to pick it up at the library.');
  if (!ok) { reserveBook._busy = false; return; }

  const r = await api("loans", "reserve", { body: { bookId: b.id } });
  if (!r.ok) {
    reserveBook._busy = false;
    showToast(r.error);
    await refreshData();
    refreshAllBookGrids();
    return;
  }

  await refreshData();
  renderBorrowed();
  refreshAllBookGrids();

  const dlg = document.getElementById("bookDialog");
  if (dlg && dlg.open) dlg.close();

  showToast('Reserved. Pick up "' + b.title + '" before ' + r.pickupDeadline + '.');
  reserveBook._busy = false;
}

/* =========================================================
   NEW LOAN AT DESK
   ========================================================= */
async function newLoanAtDesk(bookId, name, phone, email, isReservation) {
  if (!name || !name.trim()) return { ok: false, msg: "Reader name is required." };
  if (!phone || !phone.trim()) return { ok: false, msg: "Phone is required." };
  const r = await api("loans", "desk", { body: {
    bookId: Number(bookId), name: name.trim(), phone: phone.trim(),
    email: (email || "").trim(), reservation: !!isReservation
  } });
  if (!r.ok) return { ok: false, msg: r.error };
  await refreshData();
  return { ok: true };
}

/* =========================================================
   CANCEL / CONFIRM / RETURN
   ========================================================= */
async function cancelLoan(bookId) {
  const user = getUser();
  if (!user) return;
  const b = getAllBooks().find(x => x.id === Number(bookId));
  const loan = loadLoans().find(l =>
    l.bookId === Number(bookId) && l.status === "pending" && l.userEmail === user.email
  );
  if (!loan) {
    showToast("You can only cancel a pending reservation. Return the book at the library desk.");
    return;
  }
  const ok = await customConfirm("Cancel reservation", 'Cancel your reservation of "' + (b ? b.title : "this book") + '"?\nThe book will return to the library shelf.');
  if (!ok) return;

  const r = await api("loans", "cancel", { body: { loanId: loan.id } });
  if (!r.ok) { showToast(r.error); return; }
  await refreshData();
  refreshAllBookGrids();
  if (typeof renderDashboard === "function") renderDashboard();
  showToast("Reservation cancelled.");
}

async function cancelPending(loanId) {
  const r = await api("loans", "cancel_pending", { body: { loanId: Number(loanId) } });
  if (!r.ok) { showToast(r.error); return false; }
  await refreshData();
  return true;
}

async function confirmPickup(loanId) {
  const r = await api("loans", "confirm_pickup", { body: { loanId: Number(loanId) } });
  if (!r.ok) { showToast(r.error); return false; }
  await refreshData();
  return true;
}

async function markReturned(loanId) {
  const r = await api("loans", "return", { body: { loanId: Number(loanId) } });
  if (!r.ok) { showToast(r.error); return false; }
  await refreshData();
  return true;
}

/* =========================================================
   Right panel
   ========================================================= */
/* ✅ CORS FIX: Added referrerpolicy="no-referrer" here too */
function renderBorrowed() {
  const list = document.getElementById("borrowList");
  const empty = document.getElementById("borrowEmpty");
  const count = document.getElementById("borrowCount");
  if (!list) return;
  const all = getAllBooks();
  if (count) count.textContent = borrowed.length;
  if (empty) empty.hidden = borrowed.length > 0;

  const preview = borrowed.slice(0, PANEL_PREVIEW_LIMIT);
  const remaining = borrowed.length - preview.length;

  let html = preview.map(id => {
    const b = all.find(x => x.id === id);
    if (!b) return "";
    const img = b.coverUrl
      ? '<img class="mini-cover" src="' + escapeHtml(b.coverUrl) + '" alt="" referrerpolicy="no-referrer" ' +
        'onerror="this.style.background=\'#7a5640\';this.removeAttribute(\'src\')">'
      : '<div class="mini-cover" style="background:linear-gradient(160deg,#7a5640,#35251E)"></div>';
    return '<article class="borrow-item">' + img +
      '<div class="borrow-item-info">' +
        '<strong>' + escapeHtml(b.title) + '</strong>' +
        '<small>' + escapeHtml(b.author) + '</small>' +
        '<button class="remove-borrow" type="button" data-remove="' + b.id + '">Remove ×</button>' +
      '</div>' +
    '</article>';
  }).join("");

  if (remaining > 0) {
    html += '<a class="panel-see-all" href="reading-list.html">See all ' + borrowed.length + ' books →</a>';
  }
  list.innerHTML = html;
}

/* =========================================================
   Book detail dialog
   ========================================================= */
/* ✅ CORS FIX: Added referrerpolicy="no-referrer" to the modal cover */
function showDetails(id) {
  const all = getAllBooks();
  const b = all.find(x => x.id === Number(id));
  if (!b) return;
  const dlg = document.getElementById("bookDialog");
  const content = document.getElementById("dialogContent");
  if (!dlg || !content) return;

  const user = getUser();
  const inList = borrowed.includes(b.id);
  const loans = loadLoans();
  const myPending = user ? loans.find(l => l.bookId === b.id && l.status === "pending" && l.userEmail === user.email) : null;
  const myOnLoan  = user ? loans.find(l => l.bookId === b.id && l.status === "on-loan" && l.userEmail === user.email) : null;
  const s = statusLabel(b);
  const coverHtml = b.coverUrl
    ? '<img src="' + escapeHtml(b.coverUrl) + '" alt="Cover" referrerpolicy="no-referrer" onerror="this.style.display=\'none\';this.parentElement.style.background=\'#7a5640\'">'
    : '<div style="width:100%;height:100%;background:linear-gradient(160deg,#7a5640,#35251E)"></div>';

  let borrowBtn = "";
  if (myPending) {
    borrowBtn = '<button class="secondary-button" type="button" data-cancel-loan="' + b.id + '">Cancel reservation</button>';
  } else if (myOnLoan) {
    borrowBtn = '<button class="primary-button" type="button" disabled>On loan</button>';
  } else if (b.avail > 0) {
    borrowBtn = '<button class="primary-button" type="button" data-reserve="' + b.id + '">Reserve this book</button>';
  } else {
    borrowBtn = '<button class="primary-button" type="button" disabled>Unavailable</button>';
  }

  content.innerHTML =
    '<div class="book-detail">' +
      '<div class="dialog-cover">' + coverHtml + '</div>' +
      '<div class="dialog-info">' +
        '<span class="book-category">' + escapeHtml(b.cat) + '</span>' +
        '<h2>' + escapeHtml(b.title) + '</h2>' +
        '<p class="detail-author">' + escapeHtml(b.author) + '</p>' +
        '<div class="detail-facts">' +
          '<div><span>Year</span><strong>' + b.year + '</strong></div>' +
          '<div><span>Language</span><strong>' + escapeHtml(b.lang) + '</strong></div>' +
          '<div><span>ISBN</span><strong>' + escapeHtml(b.isbn || "—") + '</strong></div>' +
          '<div><span>Copies</span><strong>' + b.avail + ' / ' + b.total + '</strong></div>' +
          '<div><span>Status</span><strong>' + s.text + '</strong></div>' +
        '</div>' +
        '<p class="detail-description">' + escapeHtml(b.desc || "No description.") + '</p>' +
        '<div class="dialog-actions">' +
          borrowBtn +
          '<button class="secondary-button" type="button" data-wish="' + b.id + '">' +
            (inList ? "♥ Remove from my list" : "♡ Add to my list") +
          '</button>' +
          '<a class="secondary-button" href="book.html?id=' + b.id + '">Full page →</a>' +
          '<button class="secondary-button" type="button" data-close>← Back</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  if (!dlg.open) dlg.showModal();
}

/* =========================================================
   Book card
   ========================================================= */
function renderBookCard(b) {
  const s = statusLabel(b);
  const user = getUser();
  const inList = borrowed.includes(b.id);
  const loans = loadLoans();
  const myPending = user ? loans.find(l => l.bookId === b.id && l.status === "pending" && l.userEmail === user.email) : null;
  const myOnLoan  = user ? loans.find(l => l.bookId === b.id && l.status === "on-loan" && l.userEmail === user.email) : null;

  let bottom;
  if (myPending) {
    bottom = '<button class="toggle-borrow in-list" type="button" data-cancel-loan="' + b.id + '">✕ Cancel reservation</button>';
  } else if (myOnLoan) {
    bottom = '<button class="toggle-borrow in-list" type="button" disabled>📖 On loan</button>';
  } else {
    bottom = inList
      ? '<button class="toggle-borrow in-list" type="button" data-wish="' + b.id + '">♥ In my list — remove</button>'
      : '<button class="toggle-borrow" type="button" data-wish="' + b.id + '"' + (b.avail <= 0 ? ' disabled' : '') + '>' +
          (b.avail <= 0 ? '✕ Unavailable' : '♡ Add to my list') + '</button>';
  }

  return '<article class="book-card">' +
    '<button class="book-open" type="button" data-details="' + b.id + '" aria-label="View ' + escapeHtml(b.title) + '">' +
      coverMarkup(b) +
    '</button>' +
    '<div class="book-info">' +
      '<span class="book-category">' + escapeHtml(b.cat) + '</span>' +
      '<h3>' + escapeHtml(b.title) + '</h3>' +
      '<p class="book-author">' + escapeHtml(b.author) + ' · ' + b.year + '</p>' +
      '<div class="book-actions">' +
        '<span class="availability ' + s.cls + '">' + s.text + ' · ' + b.avail + '/' + b.total + '</span>' +
        '<button class="details-button" type="button" data-details="' + b.id + '">Details →</button>' +
      '</div>' +
      '<div class="card-actions">' + bottom + '</div>' +
    '</div>' +
  '</article>';
}

function refreshAllBookGrids() {
  if (typeof _booksPageRender === "function") _booksPageRender();
  if (typeof _readingListRender === "function") _readingListRender();
  if (typeof _wishGridRender === "function") _wishGridRender();
  if (typeof _libBooksRender === "function") _libBooksRender();
}

let _booksPageRender = null;
function initBooksPage() {
  const grid = document.getElementById("bookGrid");
  if (!grid) return;
  const searchInput = document.getElementById("searchInput");
  const catSel = document.getElementById("categoryFilter");
  const emptyState = document.getElementById("emptyState");
  const state = { q: "", cat: "all", sort: "title" };

  function render() {
    const all = getAllBooks();
    const q = state.q.trim().toLowerCase();
    const list = all.filter(b => {
      const okQ = !q || [b.title, b.author, b.isbn, b.cat, b.desc].some(v =>
        (v || "").toLowerCase().includes(q));
      const okCat = state.cat === "all" || b.cat === state.cat;
      return okQ && okCat;
    });
    const sortMap = {
      title: (a, b) => a.title.localeCompare(b.title),
      year: (a, b) => b.year - a.year,
      author: (a, b) => a.author.localeCompare(b.author),
      borrows: (a, b) => b.borrows - a.borrows
    };
    list.sort(sortMap[state.sort] || sortMap.title);
    grid.innerHTML = list.map(renderBookCard).join("");
    if (emptyState) emptyState.hidden = list.length > 0;
  }
  _booksPageRender = render;

  if (searchInput) searchInput.addEventListener("input", e => { state.q = e.target.value; render(); });
  if (catSel) catSel.addEventListener("change", e => { state.cat = e.target.value; render(); });

  const clear = document.getElementById("clearFilters");
  if (clear) clear.addEventListener("click", () => {
    state.q = ""; state.cat = "all"; state.sort = "title";
    if (searchInput) searchInput.value = "";
    if (catSel) catSel.value = "all";
    render();
    const cat = document.getElementById("catalogue");
    if (cat) cat.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Showing all books.");
  });

  grid.addEventListener("click", e => {
    const details = e.target.closest("[data-details]");
    if (details) { showDetails(details.dataset.details); return; }
    const wish = e.target.closest("[data-wish]");
    if (wish) { toggleWishlist(wish.dataset.wish); return; }
    const reserve = e.target.closest("[data-reserve]");
    if (reserve) { reserveBook(reserve.dataset.reserve); return; }
    const cancel = e.target.closest("[data-cancel-loan]");
    if (cancel) { cancelLoan(cancel.dataset.cancelLoan); return; }
  });

  const borrowList = document.getElementById("borrowList");
  if (borrowList) borrowList.addEventListener("click", e => {
    const rm = e.target.closest("[data-remove]");
    if (rm) removeFromWishlist(rm.dataset.remove);
  });

  render();
}

let _readingListRender = null;
function initReadingListPage() {
  const grid = document.getElementById("rlGrid");
  if (!grid) return;

  function render() {
    const all = getAllBooks();
    const user = getUser();
    const loans = loadLoans();
    const list = borrowed.map(id => all.find(x => x.id === id)).filter(Boolean);
    const emptyEl = document.getElementById("rlEmpty");
    if (emptyEl) emptyEl.hidden = list.length > 0;

    grid.innerHTML = list.map(b => {
      const myPending = user ? loans.find(l => l.bookId === b.id && l.status === "pending" && l.userEmail === user.email) : null;
      const myOnLoan  = user ? loans.find(l => l.bookId === b.id && l.status === "on-loan" && l.userEmail === user.email) : null;
      const canReserve = b.avail > 0 && !myPending && !myOnLoan;
      return '<article class="book-card rl-card">' +
        '<button class="book-open" type="button" data-details="' + b.id + '" aria-label="View ' + escapeHtml(b.title) + '">' +
          coverMarkup(b) +
        '</button>' +
        '<div class="book-info">' +
          '<span class="book-category">' + escapeHtml(b.cat) + '</span>' +
          '<h3>' + escapeHtml(b.title) + '</h3>' +
          '<p class="book-author">' + escapeHtml(b.author) + ' · ' + b.year + '</p>' +
          '<div class="book-actions">' +
            '<button class="details-button" type="button" data-details="' + b.id + '">Details →</button>' +
            '<button class="remove-btn" type="button" data-remove="' + b.id + '">Remove ×</button>' +
          '</div>' +
          '<div class="card-actions">' +
            (myPending
              ? '<button class="toggle-borrow in-list" type="button" data-cancel-loan="' + b.id + '">✕ Cancel reservation</button>'
              : myOnLoan
                ? '<button class="toggle-borrow in-list" type="button" disabled>📖 On loan</button>'
                : (canReserve
                    ? '<button class="toggle-borrow" type="button" data-reserve="' + b.id + '">Reserve this book</button>'
                    : '<button class="toggle-borrow" type="button" disabled>Unavailable</button>')) +
          '</div>' +
        '</div>' +
      '</article>';
    }).join("");
  }
  _readingListRender = render;

  grid.addEventListener("click", e => {
    const details = e.target.closest("[data-details]");
    if (details) { showDetails(details.dataset.details); return; }
    const wish = e.target.closest("[data-wish]");
    if (wish) { toggleWishlist(wish.dataset.wish); return; }
    const rm = e.target.closest("[data-remove]");
    if (rm) { removeFromWishlist(rm.dataset.remove); return; }
    const reserve = e.target.closest("[data-reserve]");
    if (reserve) { reserveBook(reserve.dataset.reserve); return; }
    const cancel = e.target.closest("[data-cancel-loan]");
    if (cancel) { cancelLoan(cancel.dataset.cancelLoan); return; }
  });

  const clear = document.getElementById("rlClear");
  if (clear) clear.addEventListener("click", async () => {
    if (!borrowed.length) return;
    const ok = await customConfirm("Clear reading list", "Clear your entire reading list?");
    if (!ok) return;
    const r = await api("reading_list", "clear", { body: {} });
    if (!r.ok) { showToast(r.error); return; }
    borrowed = [];
    render();
    renderBorrowed();
    showToast("Reading list cleared.");
  });

  const dlg = document.getElementById("bookDialog");
  if (dlg) dlg.addEventListener("close", render);
  render();
}

function initDialog() {
  const dlg = document.getElementById("bookDialog");
  const content = document.getElementById("dialogContent");
  if (!dlg || !content) return;
  content.addEventListener("click", e => {
    const wish = e.target.closest("[data-wish]");
    if (wish) { toggleWishlist(wish.dataset.wish); dlg.close(); return; }
    const reserve = e.target.closest("[data-reserve]");
    if (reserve) { reserveBook(reserve.dataset.reserve); return; }
    const cancel = e.target.closest("[data-cancel-loan]");
    if (cancel) { cancelLoan(cancel.dataset.cancelLoan); dlg.close(); return; }
    if (e.target.closest("[data-close]")) dlg.close();
  });
  const closer = document.getElementById("closeDialog");
  if (closer) closer.addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
}

/* =========================================================
   Boot
   ========================================================= */
window.appReady = (async function () {
  initData();

  if (document.readyState === "loading") {
    await new Promise(resolve => document.addEventListener("DOMContentLoaded", resolve));
  }

  try {
    await loadSession();
    await fetchCategories();
    await refreshData();
  } catch (e) { console.error("load:", e); }

  try { mountHeader(); } catch (e) { console.error("mountHeader:", e); }
  try { enablePasswordToggles(); } catch (e) {}
  try { buildSidebar(); } catch (e) { console.error("buildSidebar:", e); }
  try { initDialog(); } catch (e) { console.error("initDialog:", e); }

  const heroVisual = document.getElementById("heroVisual");
  if (heroVisual) {
    heroVisual.innerHTML =
      '<div class="sun"></div>' +
      '<div class="book-stack stack-one"><i></i><i></i><i></i></div>' +
      '<div class="book-stack stack-two"><i></i><i></i><i></i></div>' +
      '<div class="hero-shelf"></div>';
  }

  try { renderBorrowed(); } catch (e) { console.error("renderBorrowed:", e); }
  try { initBooksPage(); } catch (e) { console.error("initBooksPage:", e); }
  try { initReadingListPage(); } catch (e) { console.error("initReadingListPage:", e); }
})();
