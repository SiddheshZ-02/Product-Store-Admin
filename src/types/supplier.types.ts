export interface Supplier {
  id: string;

  tenant_id: string;

  supplier_name: string;

  contact_person: string | null;

  phone: string | null;

  email: string | null;

  gst_number: string | null;

  address: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export interface SupplierPayload {
  supplier_name: string;

  contact_person?: string;

  phone?: string;

  email?: string;

  gst_number?: string;

  address?: string;
}