import mongoose, { Model, Schema } from "mongoose";

export interface AdminDoc {
  email: string;
  password: string;
}

const AdminSchema = new Schema<AdminDoc>({
  email: { type: String, unique: true },
  password: String
});

const Admin: Model<AdminDoc> =
  mongoose.models.Admin ||
  mongoose.model<AdminDoc>("Admin", AdminSchema);

export default Admin;
