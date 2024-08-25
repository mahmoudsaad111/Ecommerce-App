const dbConnection = require("../config/mongodb")
const User = require("../models/userModel"); // Adjust the path as needed

const users = [
    { name: "Alice Johnson", email: "alice.johnson@example.com", password: "password123", passwordConfirm: "password123", phone: "1234567890" },
    { name: "Bob Smith", email: "bob.smith@example.com", password: "password123", passwordConfirm: "password123", phone: "2345678901" },
    { name: "Charlie Brown", email: "charlie.brown@example.com", password: "password123", passwordConfirm: "password123", phone: "3456789012" },
    { name: "David Wilson", email: "david.wilson@example.com", password: "password123", passwordConfirm: "password123", phone: "4567890123" },
    { name: "Eve Davis", email: "eve.davis@example.com", password: "password123", passwordConfirm: "password123", phone: "5678901234" },
    { name: "Frank Harris", email: "frank.harris@example.com", password: "password123", passwordConfirm: "password123", phone: "6789012345" },
    { name: "Grace Lee", email: "grace.lee@example.com", password: "password123", passwordConfirm: "password123", phone: "7890123456" },
    { name: "Henry Walker", email: "henry.walker@example.com", password: "password123", passwordConfirm: "password123", phone: "8901234567" },
    { name: "Ivy Young", email: "ivy.young@example.com", password: "password123", passwordConfirm: "password123", phone: "9012345678" },
    { name: "Jack King", email: "jack.king@example.com", password: "password123", passwordConfirm: "password123", phone: "1234509876" },
    { name: "Kara Scott", email: "kara.scott@example.com", password: "password123", passwordConfirm: "password123", phone: "2345610987" },
    { name: "Leo Allen", email: "leo.allen@example.com", password: "password123", passwordConfirm: "password123", phone: "3456721098" },
    { name: "Mia Wright", email: "mia.wright@example.com", password: "password123", passwordConfirm: "password123", phone: "4567832109" },
    { name: "Noah Green", email: "noah.green@example.com", password: "password123", passwordConfirm: "password123", phone: "5678943210" },
    { name: "Olivia Adams", email: "olivia.adams@example.com", password: "password123", passwordConfirm: "password123", phone: "6789054321" },
    { name: "Paul Baker", email: "paul.baker@example.com", password: "password123", passwordConfirm: "password123", phone: "7890165432" },
    { name: "Quincy Rivera", email: "quincy.rivera@example.com", password: "password123", passwordConfirm: "password123", phone: "8901276543" },
    { name: "Rita Martinez", email: "rita.martinez@example.com", password: "password123", passwordConfirm: "password123", phone: "9012387654" },
    { name: "Sam Turner", email: "sam.turner@example.com", password: "password123", passwordConfirm: "password123", phone: "1234498765" },
    { name: "Tina Roberts", email: "tina.roberts@example.com", password: "password123", passwordConfirm: "password123", phone: "2345510987" },
    { name: "Uma Perez", email: "uma.perez@example.com", password: "password123", passwordConfirm: "password123", phone: "3456621098" },
    { name: "Vince Cox", email: "vince.cox@example.com", password: "password123", passwordConfirm: "password123", phone: "4567732109" },
    { name: "Wendy Hill", email: "wendy.hill@example.com", password: "password123", passwordConfirm: "password123", phone: "5678843210" },
    { name: "Xander Clark", email: "xander.clark@example.com", password: "password123", passwordConfirm: "password123", phone: "6789954321" },
    { name: "Yara Lewis", email: "yara.lewis@example.com", password: "password123", passwordConfirm: "password123", phone: "7891065432" },
    { name: "Zane Walker", email: "zane.walker@example.com", password: "password123", passwordConfirm: "password123", phone: "8902176543" },
    { name: "Ava Robinson", email: "ava.robinson@example.com", password: "password123", passwordConfirm: "password123", phone: "9013287654" },
    { name: "Ben Young", email: "ben.young@example.com", password: "password123", passwordConfirm: "password123", phone: "1235598765" },
    { name: "Cathy Stewart", email: "cathy.stewart@example.com", password: "password123", passwordConfirm: "password123", phone: "2346610987" },
    { name: "Dylan Howard", email: "dylan.howard@example.com", password: "password123", passwordConfirm: "password123", phone: "3457721098" },
    { name: "Ella Cox", email: "ella.cox@example.com", password: "password123", passwordConfirm: "password123", phone: "4568832109" },
    { name: "Felix Torres", email: "felix.torres@example.com", password: "password123", passwordConfirm: "password123", phone: "5679943210" },
    { name: "Gina Morgan", email: "gina.morgan@example.com", password: "password123", passwordConfirm: "password123", phone: "6781054321" },
    { name: "Harry Kelly", email: "harry.kelly@example.com", password: "password123", passwordConfirm: "password123", phone: "7892165432" },
    { name: "Iris Reed", email: "iris.reed@example.com", password: "password123", passwordConfirm: "password123", phone: "8903276543" },
    { name: "Jake Bell", email: "jake.bell@example.com", password: "password123", passwordConfirm: "password123", phone: "9014387654" },
    { name: "Karen Powell", email: "karen.powell@example.com", password: "password123", passwordConfirm: "password123", phone: "1236698765" },
    { name: "Liam Bailey", email: "liam.bailey@example.com", password: "password123", passwordConfirm: "password123", phone: "2347710987" },
    { name: "Maya Sanders", email: "maya.sanders@example.com", password: "password123", passwordConfirm: "password123", phone: "3458821098" },
    { name: "Nina Price", email: "nina.price@example.com", password: "password123", passwordConfirm: "password123", phone: "4569932109" },
    { name: "Oscar Hayes", email: "oscar.hayes@example.com", password: "password123", passwordConfirm: "password123", phone: "5671043210" },
    { name: "Penny Morris", email: "penny.morris@example.com", password: "password123", passwordConfirm: "password123", phone: "6782154321" },
    { name: "Quinn Foster", email: "quinn.foster@example.com", password: "password123", passwordConfirm: "password123", phone: "7893265432" },
    { name: "Rose Jenkins", email: "rose.jenkins@example.com", password: "password123", passwordConfirm: "password123", phone: "8904376543" },
    { name: "Steve Fisher", email: "steve.fisher@example.com", password: "password123", passwordConfirm: "password123", phone: "9015487654" },
    { name: "Tara Long", email: "tara.long@example.com", password: "password123", passwordConfirm: "password123", phone: "1237798765" },
    { name: "Umar Patterson", email: "umar.patterson@example.com", password: "password123", passwordConfirm: "password123", phone: "2348810987" },
    { name: "Vivian Richards", email: "vivian.richards@example.com", password: "password123", passwordConfirm: "password123", phone: "3459921098" },
    { name: "Will Edwards", email: "will.edwards@example.com", password: "password123", passwordConfirm: "password123", phone: "4561032109" },
    { name: "Xena Cook", email: "xena.cook@example.com", password: "password123", passwordConfirm: "password123", phone: "5672143210" },
    { name: "Yosef Ortiz", email: "yosef.ortiz@example.com", password: "password123", passwordConfirm: "password123", phone: "6783254321" },
    { name: "Zoe Ramirez", email: "zoe.ramirez@example.com", password: "password123", passwordConfirm: "password123", phone: "7894365432" }
  ];
  
async function seedUsers() {
  try {
    // Insert users using model to apply password hashing middleware
    for (let userData of users) {
      const newUser = new User(userData);
      await newUser.save(); // The middleware will hash the password here
    }

    console.log("Users successfully seeded!");
    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();

