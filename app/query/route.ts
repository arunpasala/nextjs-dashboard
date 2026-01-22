import postgres from "postgres";
import { NextResponse } from "next/server";

// ✅ Use the SAME direct connection (non-pooling)
const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
  ssl: "require",
  prepare: false,
});

async function listInvoices() {
  return sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
