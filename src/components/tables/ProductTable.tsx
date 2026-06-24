import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product.types";

// import { Product } from "@/types/product.types";

interface Props {
  products: Product[];

  categoryMap: Record<string, string>;

  onEdit: (id: string) => void;

  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  categoryMap,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>SKU</TableHead>

          <TableHead>Category</TableHead>

          <TableHead>Price</TableHead>

          <TableHead>MRP</TableHead>

          <TableHead>Status</TableHead>

          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>

            <TableCell>{product.sku}</TableCell>

            <TableCell>{product.category_id ? categoryMap[product.category_id] || "-" : "-"}</TableCell>

            <TableCell>₹{product.selling_price}</TableCell>

            <TableCell>₹{product.mrp}</TableCell>

            <TableCell>
              <Badge>{product.is_active ? "Active" : "Inactive"}</Badge>
            </TableCell>

            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(product.id)}
                >
                  <Pencil size={16} />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="destructive">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction onClick={() => onDelete(product.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
