
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to generate random dates
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Seed data
async function seed() {
  console.log("Starting seed...");

  try {
    // 1. Seed Categories
    console.log("Seeding categories...");
    const { data: categories, error: categoryError } = await supabase
      .from("categories")
      .insert([
        { name: "Whiskey" },
        { name: "Vodka" },
        { name: "Rum" },
        { name: "Gin" },
        { name: "Tequila" },
        { name: "Wine" },
        { name: "Beer" },
      ])
      .select();
    if (categoryError) throw categoryError;
    console.log(`Inserted ${categories?.length || 0} categories`);

    // 2. Seed Products
    console.log("Seeding products...");
    const { data: products, error: productError } = await supabase
      .from("products")
      .insert([
        { name: "Johnnie Walker Black Label", sku: "JWBL001", purchase_price: 2500, selling_price: 3500, mrp: 3999, min_stock: 10, category_id: categories[0].id, liquor_type: "Scotch", brand: "Johnnie Walker", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Johnnie Walker Red Label", sku: "JWRL002", purchase_price: 1200, selling_price: 1600, mrp: 1899, min_stock: 15, category_id: categories[0].id, liquor_type: "Scotch", brand: "Johnnie Walker", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Grey Goose", sku: "GG003", purchase_price: 3800, selling_price: 5200, mrp: 5899, min_stock: 8, category_id: categories[1].id, liquor_type: "Vodka", brand: "Grey Goose", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Smirnoff Red", sku: "SR004", purchase_price: 650, selling_price: 900, mrp: 1099, min_stock: 20, category_id: categories[1].id, liquor_type: "Vodka", brand: "Smirnoff", volume_ml: 750, alcohol_percentage: 37.5 },
        { name: "Bacardi Superior", sku: "BS005", purchase_price: 850, selling_price: 1150, mrp: 1399, min_stock: 18, category_id: categories[2].id, liquor_type: "White Rum", brand: "Bacardi", volume_ml: 750, alcohol_percentage: 37.5 },
        { name: "Captain Morgan Spiced", sku: "CMS006", purchase_price: 1400, selling_price: 1850, mrp: 2199, min_stock: 12, category_id: categories[2].id, liquor_type: "Spiced Rum", brand: "Captain Morgan", volume_ml: 750, alcohol_percentage: 35 },
        { name: "Tanqueray London Dry", sku: "TLD007", purchase_price: 1600, selling_price: 2100, mrp: 2499, min_stock: 10, category_id: categories[3].id, liquor_type: "London Dry Gin", brand: "Tanqueray", volume_ml: 750, alcohol_percentage: 43.1 },
        { name: "Bombay Sapphire", sku: "BS008", purchase_price: 1800, selling_price: 2350, mrp: 2799, min_stock: 10, category_id: categories[3].id, liquor_type: "London Dry Gin", brand: "Bombay Sapphire", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Patron Silver", sku: "PS009", purchase_price: 4200, selling_price: 5600, mrp: 6299, min_stock: 6, category_id: categories[4].id, liquor_type: "Blanco Tequila", brand: "Patron", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Jose Cuervo Gold", sku: "JCG010", purchase_price: 1000, selling_price: 1350, mrp: 1599, min_stock: 15, category_id: categories[4].id, liquor_type: "Gold Tequila", brand: "Jose Cuervo", volume_ml: 750, alcohol_percentage: 38 },
        { name: "Sula Cabernet Sauvignon", sku: "SCS011", purchase_price: 900, selling_price: 1250, mrp: 1499, min_stock: 25, category_id: categories[5].id, liquor_type: "Red Wine", brand: "Sula", volume_ml: 750, alcohol_percentage: 13 },
        { name: "Sula Chenin Blanc", sku: "SCB012", purchase_price: 700, selling_price: 950, mrp: 1199, min_stock: 25, category_id: categories[5].id, liquor_type: "White Wine", brand: "Sula", volume_ml: 750, alcohol_percentage: 12 },
        { name: "Kingfisher Premium", sku: "KP013", purchase_price: 120, selling_price: 160, mrp: 180, min_stock: 60, category_id: categories[6].id, liquor_type: "Lager", brand: "Kingfisher", volume_ml: 650, alcohol_percentage: 4.5 },
        { name: "Budweiser", sku: "BW014", purchase_price: 150, selling_price: 190, mrp: 220, min_stock: 50, category_id: categories[6].id, liquor_type: "Lager", brand: "Budweiser", volume_ml: 650, alcohol_percentage: 5 },
        { name: "Heineken", sku: "HK015", purchase_price: 180, selling_price: 230, mrp: 260, min_stock: 45, category_id: categories[6].id, liquor_type: "Lager", brand: "Heineken", volume_ml: 650, alcohol_percentage: 5 },
        { name: "Jack Daniel's Old No. 7", sku: "JD016", purchase_price: 3200, selling_price: 4300, mrp: 4899, min_stock: 10, category_id: categories[0].id, liquor_type: "Tennessee Whiskey", brand: "Jack Daniel's", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Ballantine's Finest", sku: "BF017", purchase_price: 1800, selling_price: 2400, mrp: 2799, min_stock: 12, category_id: categories[0].id, liquor_type: "Scotch", brand: "Ballantine's", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Chivas Regal 12", sku: "CR018", purchase_price: 3500, selling_price: 4700, mrp: 5299, min_stock: 8, category_id: categories[0].id, liquor_type: "Scotch", brand: "Chivas Regal", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Absolut Vodka", sku: "AV019", purchase_price: 1400, selling_price: 1850, mrp: 2199, min_stock: 15, category_id: categories[1].id, liquor_type: "Vodka", brand: "Absolut", volume_ml: 750, alcohol_percentage: 40 },
        { name: "Malibu Coconut Rum", sku: "MC020", purchase_price: 1100, selling_price: 1450, mrp: 1699, min_stock: 14, category_id: categories[2].id, liquor_type: "Flavored Rum", brand: "Malibu", volume_ml: 750, alcohol_percentage: 21 },
      ])
      .select();
    if (productError) throw productError;
    console.log(`Inserted ${products?.length || 0} products`);

    // 3. Seed Suppliers
    console.log("Seeding suppliers...");
    const { data: suppliers, error: supplierError } = await supabase
      .from("suppliers")
      .insert([
        { supplier_name: "United Spirits Ltd", contact_person: "Rahul Sharma", phone: "9876543210", email: "rahul@unitedspirits.com", address: "Bangalore, Karnataka" },
        { supplier_name: "Pernod Ricard India", contact_person: "Priya Patel", phone: "9876543211", email: "priya@pernodricard.com", address: "Mumbai, Maharashtra" },
        { supplier_name: "Sula Vineyards", contact_person: "Amit Desai", phone: "9876543212", email: "amit@sulavineyards.com", address: "Nashik, Maharashtra" },
        { supplier_name: "Bacardi India", contact_person: "Neha Singh", phone: "9876543213", email: "neha@bacardi.com", address: "Delhi" },
      ])
      .select();
    if (supplierError) throw supplierError;
    console.log(`Inserted ${suppliers?.length || 0} suppliers`);

    // 4. Seed Customers
    console.log("Seeding customers...");
    const { data: customers, error: customerError } = await supabase
      .from("customers")
      .insert([
        { customer_name: "Rajesh Kumar", phone: "9998887771", email: "rajesh.kumar@gmail.com", address: "123 Main St, City A" },
        { customer_name: "Sneha Verma", phone: "9998887772", email: "sneha.verma@gmail.com", address: "456 Oak Ave, City B" },
        { customer_name: "Amit Singh", phone: "9998887773", email: "amit.singh@gmail.com", address: "789 Pine Rd, City C" },
        { customer_name: "Priya Mehta", phone: "9998887774", email: "priya.mehta@gmail.com", address: "101 Cedar Ln, City D" },
        { customer_name: "Vikram Joshi", phone: "9998887775", email: "vikram.joshi@gmail.com", address: "202 Maple Dr, City E" },
        { customer_name: "Neha Gupta", phone: "9998887776", email: "neha.gupta@gmail.com", address: "303 Birch Pl, City F" },
        { customer_name: "Rohit Sharma", phone: "9998887777", email: "rohit.sharma@gmail.com", address: "404 Walnut St, City G" },
        { customer_name: "Ananya Patel", phone: "9998887778", email: "ananya.patel@gmail.com", address: "505 Cherry Rd, City H" },
      ])
      .select();
    if (customerError) throw customerError;
    console.log(`Inserted ${customers?.length || 0} customers`);

    // 5. Seed Expense Categories
    console.log("Seeding expense categories...");
    const { data: expenseCategories, error: expCatError } = await supabase
      .from("expense_categories")
      .insert([
        { name: "Rent" },
        { name: "Electricity" },
        { name: "Salaries" },
        { name: "Utilities" },
        { name: "Marketing" },
      ])
      .select();
    if (expCatError) throw expCatError;
    console.log(`Inserted ${expenseCategories?.length || 0} expense categories`);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
