import { redirect } from "next/navigation";
import { isValidAdmin } from "@/lib/auth";

export default function LoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  async function login(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const ok = await isValidAdmin(email, password);

    if (ok) {
      redirect("/dashboard");
    } else {
      redirect("/?error=auth");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-green-100">
        {/* Header */}
        <div className="bg-green-600 text-white px-8 py-6 rounded-t-xl">
          <h1 className="text-2xl font-bold">
            Inventory Admin
          </h1>
          <p className="text-sm text-green-100 mt-1">
            Secure Admin Access
          </p>
        </div>

        {/* Error Message */}
        {searchParams?.error === "auth" && (
          <div className="mx-8 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
            Not an authenticated user
          </div>
        )}

        {/* Form */}
        <form action={login} className="px-8 py-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 pb-6 text-center text-xs text-gray-500">
          Authorized personnel only
        </div>
      </div>
    </div>
  );
}
