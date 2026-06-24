export interface Customer {
  id: string;

  tenant_id: string;

  customer_name: string;

  phone: string | null;

  email: string | null;

  address: string | null;

  gst_number: string | null;

  notes: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export interface CustomerPayload {
  customer_name: string;

  phone?: string;

  email?: string;

  address?: string;

  gst_number?: string;

  notes?: string;
}