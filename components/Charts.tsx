"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

/* ---------------- TYPES ---------------- */

type Product = {
  name: string;
  category: string;
  units: number;
  mrp: number;
};

type PieData = {
  name: string;
  value: number;
};

type BarData = {
  name: string;
  units: number;
  value: number;
};

/* ---------------- COLORS ---------------- */

const COLORS = [
  "#ec4899",
  "#f472b6",
  "#fb7185",
  "#fda4af",
  "#f9a8d4",
  "#e879f9"
];

/* ---------------- COMPONENT ---------------- */

export default function Charts({
  products
}: {
  products: Product[];
}) {
  /* ---------- CATEGORY PIE DATA ---------- */

  const categoryMap: Record<string, PieData> = {};

  products.forEach(p => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = {
        name: p.category,
        value: 0
      };
    }
    categoryMap[p.category].value += p.units * p.mrp;
  });

  const categoryData: PieData[] = Object.values(categoryMap);

  /* ---------- PRODUCT BAR DATA ---------- */

  const productBarData: BarData[] = products.map(p => ({
    name: p.name,
    units: p.units,
    value: p.units * p.mrp
  }));

  /* ---------- PRODUCT PIE DATA ---------- */

  const productPieData: PieData[] = products.map(p => ({
    name: p.name,
    value: p.units * p.mrp
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

      {/* CATEGORY PIE CHART */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="font-semibold mb-4 text-gray-700">
          Inventory Value by Category
        </h3>

        <PieChart width={360} height={260}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          >
            {categoryData.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* PRODUCT BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="font-semibold mb-4 text-gray-700">
          Units & Value per Product
        </h3>

        <BarChart width={420} height={260} data={productBarData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="units" fill="#ec4899" />
          <Bar dataKey="value" fill="#6366f1" />
        </BarChart>
      </div>

      {/* PRODUCT CONTRIBUTION PIE */}
      <div className="bg-white p-6 rounded-xl shadow border lg:col-span-2">
        <h3 className="font-semibold mb-4 text-gray-700">
          Product Contribution to Total Inventory Value
        </h3>

        <PieChart width={520} height={300}>
          <Pie
            data={productPieData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
          >
            {productPieData.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
