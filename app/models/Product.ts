import mongoose, { Schema, Model } from "mongoose";

export interface ProductDoc {
  name: string;
  category: string;
  units: number;
  mrp: number;
  imageUrl?: string;
}

const ProductSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    units: { type: Number, required: true },
    mrp: { type: Number, required: true },
    imageUrl: { type: String } // ✅ THIS WAS MISSING
  },
  {
    timestamps: true
  }
);

const Product: Model<ProductDoc> =
  mongoose.models.Product ||
  mongoose.model<ProductDoc>("Product", ProductSchema);

export default Product;
